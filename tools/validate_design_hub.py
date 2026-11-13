"""Validate design registry integrity; optionally check the approval handoff gate."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
from html.parser import HTMLParser
import argparse
import hashlib
import json
import re
import sys

ROOT=Path(__file__).resolve().parents[1]


def load(path):
    return json.loads((ROOT/path).read_text(encoding='utf-8'))


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links=[]

    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        for key in ('href','src'):
            if attrs.get(key):self.links.append(attrs[key])


def validate():
    sources=load('registries/sources.json')['sources']
    screens=load('registries/screens.json')['screens']
    requirements=load('registries/requirements.json')['requirements']
    conflicts=load('registries/inconsistencies.json')['inconsistencies']
    changes=load('registries/changes.json')['changes']
    for name,records in [('sources',sources),('screens',screens),('requirements',requirements),('inconsistencies',conflicts),('changes',changes)]:
        ids=[x['id'] for x in records]
        assert len(ids)==len(set(ids)),f'Duplicate IDs in {name}'
    source_ids={s['id'] for s in sources}
    screen_ids={s['id'] for s in screens}
    for source in sources:
        assert (ROOT/source['path']).is_file(),source['path']
    for screen in screens:
        assert screen['source'] in source_ids,screen['id']
        assert screen['status'] in {'draft','reference','observed_live','in_review','approved_for_build','retired'},screen['id']
        if screen.get('image'):assert (ROOT/screen['image']).is_file(),screen['image']
        if screen.get('preview'):assert (ROOT/screen['preview'].split('#')[0]).is_file(),screen['preview']
    assert [r['source_acceptance_criterion'] for r in requirements]==list(range(1,23)),'Source criteria must map 1 to 22'
    for req in requirements:
        assert req['source'] in source_ids,req['id']
        assert all(s in screen_ids for s in req['candidate_screens']),req['id']
    cases=load('fixtures/scenarios.json')['cases']
    assert len({case['id'] for case in cases})==len(cases),'Duplicate scenario IDs'
    requirement_ids={req['id'] for req in requirements}
    for case in cases:
        assert all(id in requirement_ids for id in case['requirements']),case['id']
        assert case.get('verification') and case.get('expected'),case['id']
    for change in changes:
        assert all(s in screen_ids for s in change['screens']),change['id']
        assert change['design_status'] in {'draft','in_review','approved_for_build','retired'},change['id']
        assert (ROOT/change['package']).is_file(),change['package']
    files=load('registries/reference-files.json')['files']
    for entry in files:
        path=ROOT/entry['path']
        assert path.is_file(),entry['path']
        assert path.stat().st_size==entry['bytes'],f'Reference size changed: {entry["path"]}'
        assert hashlib.sha256(path.read_bytes()).hexdigest()==entry['sha256'],f'Immutable reference changed: {entry["path"]}'
    link_count=0
    for path in ROOT.rglob('*'):
        if any(part in {'.git','artifacts','.venv','node_modules','__pycache__'} for part in path.relative_to(ROOT).parts):continue
        if path.suffix not in {'.md','.html'} or not path.is_file():continue
        text=path.read_text(encoding='utf-8')
        if path.suffix=='.html':
            parser=Links();parser.feed(text);links=parser.links
        else:
            links=re.findall(r'\]\((<[^>]+>|[^)\n]+)\)',text)
        for link in links:
            link=link.strip().strip('<>')
            if link.startswith(('#','http:','https:','mailto:','tel:','data:','blob:')):continue
            if not link or '{{' in link:continue
            target=unquote(urlsplit(link).path)
            if not target:continue
            assert (path.parent/target).exists(),f'Broken local link in {path.relative_to(ROOT)}: {link}'
            link_count+=1
    counts={platform:sum(s['platform']==platform for s in screens) for platform in ['reference','web','app']}
    print(f'PASS: {len(files)} immutable reference files; screens {counts}; {len(requirements)} mapped source criteria; {len(conflicts)} registered inconsistencies; {link_count} local links')
    return sources,screens,requirements,conflicts,changes


def handoff_gate(conflicts,changes):
    approved=[r for r in load('releases/index.json')['releases'] if r.get('status')=='approved_for_build']
    if not approved:
        raise ValueError('HANDOFF BLOCKED: No approved release manifest exists. The baseline import and candidate remain unapproved.')
    known_changes={c['id']:c for c in changes}
    for release in approved:
        assert re.fullmatch(r'[0-9a-f]{40}',release.get('commit') or ''),'Approved handoff needs an exact 40-character commit SHA'
        assert release.get('change_ids'),'Approved handoff needs change IDs'
        for id in release['change_ids']:
            assert id in known_changes,id
            assert known_changes[id]['design_status']=='approved_for_build',f'{id} is not approved for build'
        for key in ('artifact_manifest','acceptance_report'):
            assert release.get(key) and (ROOT/release[key]).is_file(),f'Missing approved {key}'
        for role in release.get('required_approval_roles',[]):
            approval=release.get('approvals',{}).get(role)
            assert isinstance(approval,dict) and approval.get('name') and approval.get('evidence') and approval.get('approved_at'),f'Missing named approval and evidence: {role}'
        scope=set(release.get('scope',[]))
        blockers=[x['id'] for x in conflicts if x['severity']=='blocker' and x['status']!='resolved' and scope.intersection(x['blocks'])]
        assert not blockers,f'Unresolved scoped blockers: {", ".join(blockers)}'
    print(f'PASS: {len(approved)} recorded approved handoff manifests. Human evidence must still be reviewed; this validates the records only.')


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--handoff',action='store_true')
    args=parser.parse_args()
    try:
        _,_,_,conflicts,changes=validate()
        if args.handoff:handoff_gate(conflicts,changes)
    except (AssertionError,ValueError,KeyError,FileNotFoundError) as error:
        print(str(error),file=sys.stderr)
        sys.exit(2)
