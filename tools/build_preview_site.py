"""Build the review site artifact from this public design repository."""
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit
from html.parser import HTMLParser
from datetime import datetime, timezone
import argparse
import hashlib
import json
import re
import shutil
import subprocess

from build_review_catalog import catalogue

ROOT=Path(__file__).resolve().parents[1]
REPOSITORY='https://github.com/suyashb734/jaibhakti-design'


def document_url(path):
    return REPOSITORY+'/blob/main/'+quote(path,safe='/')


def rewrite_document_links(text, source):
    def replace(match):
        path=match.group(2)
        if urlsplit(path).scheme or not urlsplit(path).path.endswith('.md'):
            return match.group(0)
        target=(source.parent/unquote(urlsplit(path).path)).resolve()
        assert target.is_relative_to(ROOT),path
        url=document_url(target.relative_to(ROOT).as_posix())
        if urlsplit(path).fragment:url+='#'+urlsplit(path).fragment
        return 'href='+match.group(1)+url+match.group(1)
    return re.sub(r'href=([\"\'])([^\"\']+)\1',replace,text)


class Links(HTMLParser):
    def __init__(self):
        super().__init__();self.links=[]
    def handle_starttag(self,tag,attrs):
        for key,value in attrs:
            if key in {'href','src'} and value:self.links.append(value)


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--out',default='artifacts/preview-site')
    parser.add_argument('--require-clean',action='store_true')
    args=parser.parse_args()
    out=(ROOT/args.out).resolve()
    assert out.is_relative_to(ROOT/'artifacts') and out!=ROOT/'artifacts','Choose a subfolder under artifacts/'
    commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
    dirty=bool(subprocess.check_output(['git','status','--porcelain'],cwd=ROOT,text=True).strip())
    if args.require_clean and dirty:raise SystemExit('Commit the reviewed source before publishing a snapshot')
    # Only this dedicated generated directory is replaced, never repository source.
    if out.exists():shutil.rmtree(out)
    out.mkdir(parents=True)
    files=[ROOT/'site/index.html.template',ROOT/'explorations/index.html',ROOT/'previews/mobile/Prototype.html',ROOT/'previews/mobile/Gallery.html',ROOT/'references/initial-prototype/Jai Bhakti App.html',ROOT/'catalogue/index.html',ROOT/'catalogue/styles.css',ROOT/'previews/mobile/index.html',ROOT/'design-system/index.html']
    for folder in ['walkthroughs/assets','previews/mobile/assets','assets/brand','explorations/EXP-0001/draft/assets']:
        files.extend(path for path in (ROOT/folder).rglob('*') if path.is_file())
    option_extensions={'.html','.css','.js','.json','.png','.jpg','.jpeg','.svg','.webp','.woff2','.ttf','.webm'}
    files.extend(path for path in (ROOT/'explorations').glob('*/options/**/*') if path.is_file() and path.suffix in option_extensions)
    live_assets=json.loads((ROOT/'references/live-sevas/2026-11-13/manifest.json').read_text())['assets']
    for asset in live_assets:
        relative=Path(asset['path'])
        assert relative.as_posix().startswith('references/live-sevas/') and '..' not in relative.parts,'Unexpected live asset location'
        assert relative.suffix.lower() in {'.jpg','.jpeg','.png','.webp','.svg'},'Only live image assets are exported'
        files.append(ROOT/relative)
    files.extend([ROOT/'explorations/EXP-0001/draft/Prototype.html',ROOT/'explorations/EXP-0001/draft/Gallery.html'])
    files.append(ROOT/'walkthroughs/index.html')
    files.extend((ROOT/'references/initial-prototype/screens').glob('*.png'))
    files.extend((ROOT/'references/daan-seva-candidate/Revised_Designs/screens').glob('*.png'))
    for source in sorted(set(files)):
        relative=Path('index.html') if source==ROOT/'site/index.html.template' else source.relative_to(ROOT)
        target=out/relative;target.parent.mkdir(parents=True,exist_ok=True)
        if source.suffix=='.html' or source==ROOT/'site/index.html.template':
            text=source.read_text()
            if source==ROOT/'site/index.html.template':
                text=text.replace('{{SOURCE_REVISION}}',commit+(' (local uncommitted changes)' if dirty else ''))
            text=rewrite_document_links(text,source)
            if 'name="robots"' not in text:
                text=re.sub(r'(<head[^>]*>)',r'\1\n<meta name="robots" content="noindex,nofollow" />',text,count=1,flags=re.I)
            target.write_text(text)
        else:shutil.copyfile(source,target)
    public_catalogue=catalogue()
    for tour in public_catalogue['tours']:tour['context']=document_url(tour['context'])
    (out/'walkthroughs/assets/catalog.generated.js').write_text('window.JB_REVIEW_CATALOG = '+json.dumps(public_catalogue,ensure_ascii=False,indent=2)+';\n')
    # Crawlers must be allowed to fetch HTML to see its noindex metadata.
    (out/'robots.txt').write_text('User-agent: *\nAllow: /\n')
    (out/'.nojekyll').touch()
    for path in out.rglob('*.html'):
        def redirect_unexported(match):
            link=match.group(2);parsed=urlsplit(link)
            if parsed.scheme or not parsed.path:return match.group(0)
            target=(path.parent/unquote(parsed.path)).resolve()
            if target.is_relative_to(out) and not target.exists():
                relative=target.relative_to(out)
                assert (ROOT/relative).is_file(),f'Unknown source link: {link}'
                return 'href='+match.group(1)+document_url(relative.as_posix())+match.group(1)
            return match.group(0)
        path.write_text(re.sub(r'href=([\"\'])([^\"\']+)\1',redirect_unexported,path.read_text()))
        parser=Links();parser.feed(path.read_text())
        for link in parser.links:
            parsed=urlsplit(link)
            if parsed.scheme or not parsed.path:continue
            target=(path.parent/unquote(parsed.path)).resolve()
            assert target.is_relative_to(out) and target.exists(),f'Missing exported link in {path.relative_to(out)}: {link}'
    manifest={'source_repository':REPOSITORY,'source_commit':commit,'working_tree_dirty':dirty,'built_at_utc':datetime.now(timezone.utc).isoformat(),'status':'design_review_snapshot_not_new_handoff_approval','search_indexing':'noindex requested; public hosting is not access control','files':[{'path':path.relative_to(out).as_posix(),'sha256':hashlib.sha256(path.read_bytes()).hexdigest()} for path in sorted(out.rglob('*')) if path.is_file()]}
    (out/'preview-info.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print(f'Exported {len(manifest["files"])} static review files into {out.relative_to(ROOT)}. Source documentation and repository configuration are linked rather than copied.')


if __name__=='__main__':main()
