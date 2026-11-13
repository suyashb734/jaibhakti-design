"""Validate design registry integrity; optionally check the approval handoff gate."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
from html.parser import HTMLParser
from datetime import datetime
import argparse
import hashlib
import json
import re
import sys

ROOT=Path(__file__).resolve().parents[1]


def load(path):
    return json.loads((ROOT/path).read_text(encoding='utf-8'))


def validate_explorations(explorations, screen_ids, change_ids, decision_ids):
    ids=[item['id'] for item in explorations]
    assert len(ids)==len(set(ids)),'Duplicate exploration IDs'
    for item in explorations:
        id=item['id']
        assert re.fullmatch(r'EXP-\d{4}',id),id
        assert item['status'] in {'active','selected','parked','rejected'},id
        assert re.fullmatch(r'[0-9a-f]{40}',item.get('baseline_commit') or ''),f'{id} needs a baseline commit'
        assert (ROOT/item['package']).is_file(),item['package']
        assert set(item['screens'])<=screen_ids,id
        assert set(item['change_ids'])<=change_ids,id
        assert set(item['decision_ids'])<=decision_ids,id
        if item['status']!='active':
            assert item.get('human_owner') and item.get('outcome_evidence'),f'{id} needs a human owner and outcome evidence'
        if item['status']=='selected':
            assert item.get('selected_option') and item['change_ids'],f'{id} selection needs an option and integration change'


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
    baselines=load('registries/baselines.json')['baselines']
    assert len({b['id'] for b in baselines})==len(baselines),'Duplicate baseline IDs'
    for baseline in baselines:
        assert baseline['source_id'] in source_ids,baseline['id']
        assert baseline['status']=='historical_final_handed_over_for_execution',baseline['id']
        assert baseline['confirmation']['statement'] and (ROOT/baseline['confirmation']['record']).is_file(),baseline['id']
        artifact=ROOT/baseline['artifact']
        assert artifact.is_file() and hashlib.sha256(artifact.read_bytes()).hexdigest()==baseline['artifact_sha256'],f'Historical baseline artifact differs: {baseline["id"]}'
        assert set(baseline['screen_ids'])<=screen_ids,baseline['id']
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
    explorations=load('registries/explorations.json')['explorations']
    validate_explorations(explorations,screen_ids,{c['id'] for c in changes},{d['id'] for d in load('registries/decisions.json')['decisions']})
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
    print(f'PASS: {len(files)} immutable reference files; screens {counts}; {len(requirements)} mapped source criteria; {len(conflicts)} registered inconsistencies; {len(explorations)} exploration records; {link_count} local links')
    return sources,screens,requirements,conflicts,changes


def handoff_gate(conflicts,changes):
    approved=[r for r in load('releases/index.json')['releases'] if r.get('status')=='approved_for_build']
    if not approved:
        raise ValueError('HANDOFF BLOCKED: No approved release manifest exists for a new design handoff. The historical execution baseline is recorded separately; the newer candidate remains unapproved.')
    known_changes={c['id']:c for c in changes}
    screen_ids={s['id'] for s in load('registries/screens.json')['screens']}
    requirement_ids={r['id'] for r in load('registries/requirements.json')['requirements']}
    for release in approved:
        assert re.fullmatch(r'[0-9a-f]{40}',release.get('commit') or ''),'Approved handoff needs an exact 40-character commit SHA'
        assert release.get('change_ids'),'Approved handoff needs change IDs'
        for id in release['change_ids']:
            assert id in known_changes,id
        # Current working status may return to Draft for a subsequent revision.
        # Historical approval belongs to this release's source commit, not main.
        assert release.get('scope'),'Approved handoff needs explicit scope'
        assert set(release['scope'])<=set().union(*(set(known_changes[id]['scope']) for id in release['change_ids'])),'Unknown handoff scope'
        assert release.get('screen_ids') and set(release['screen_ids'])<=screen_ids,'Approved handoff needs included screen IDs'
        assert release.get('requirement_ids') and set(release['requirement_ids'])<=requirement_ids,'Approved handoff needs included requirement IDs'
        assert isinstance(release.get('excluded_scope'),list),'Approved handoff needs explicit exclusions (an empty list is allowed)'
        for key in ('artifact_manifest','acceptance_report'):
            assert release.get(key) and (ROOT/release[key]).is_file(),f'Missing approved {key}'
        roles=set(release.get('required_approval_roles',[]))
        mandatory={'product','design','engineering_acknowledgement'}
        assert isinstance(release.get('operations_payments_affected'),bool),'State whether operations/payments are affected'
        if release['operations_payments_affected']:mandatory.add('operations_payments')
        assert mandatory<=roles,f'Missing required approval roles: {", ".join(sorted(mandatory-roles))}'
        for role in roles:
            approval=release.get('approvals',{}).get(role)
            assert isinstance(approval,dict) and approval.get('name') and approval.get('evidence') and approval.get('approved_at'),f'Missing named approval and evidence: {role}'
            assert approval.get('commit')==release['commit'],f'Approval source commit differs: {role}'
            assert datetime.fromisoformat(approval['approved_at'].replace('Z','+00:00')).tzinfo,f'Approval timestamp needs timezone: {role}'
        artifact_manifest=load(release['artifact_manifest'])
        assert artifact_manifest.get('source_commit')==release['commit'],'Artifact source commit differs'
        artifacts=artifact_manifest.get('artifacts',[])
        assert artifacts,'Approved handoff needs retained artifact checksums'
        for artifact in artifacts:
            assert re.fullmatch(r'[0-9a-f]{64}',artifact.get('sha256') or ''),'Artifact needs a SHA256 checksum'
            if artifact.get('path'):
                path=ROOT/artifact['path']
                assert path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest()==artifact['sha256'],f'Artifact checksum differs: {path}'
            else:
                assert artifact.get('url','').startswith('https://'),'Artifact needs a retained path or HTTPS URL'
        scope=set(release.get('scope',[]))
        blockers=[x['id'] for x in conflicts if x['severity']=='blocker' and x['status']!='resolved' and scope.intersection(x['blocks'])]
        assert not blockers,f'Unresolved scoped blockers: {", ".join(blockers)}'
    print(f'PASS: {len(approved)} recorded approved handoff manifests. Human evidence, source scope and remote artifact hashes still require review; this validates the records only.')


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
