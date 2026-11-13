"""Generate review captures into ignored artifacts without editing references.

Rendering creates evidence, not product approval, pixel comparison or backend tests.
"""
from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import json
import platform
import subprocess
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--source',choices=['working-mobile','proposal','candidate','initial'],default='working-mobile')
    parser.add_argument('--screen',help='Optional stable screen ID for a smoke capture')
    parser.add_argument('--width',type=int)
    parser.add_argument('--height',type=int)
    parser.add_argument('--scale',type=float,default=2)
    parser.add_argument('--out',default='artifacts/capture')
    args=parser.parse_args()
    out=(ROOT/args.out).resolve()
    assert out.is_relative_to(ROOT/'artifacts'),'Output must be under ignored artifacts/'
    out.mkdir(parents=True,exist_ok=True)
    initial=args.source in {'initial','working-mobile'}
    width=args.width or (393 if initial else 390)
    height=args.height or (852 if initial else 844)
    source=ROOT/({'initial':'references/initial-prototype/Jai Bhakti App.html','working-mobile':'previews/mobile/Prototype.html','proposal':'explorations/EXP-0001/draft/Prototype.html','candidate':'references/daan-seva-candidate/Revised_Designs/Prototype.html'}[args.source])
    registry=json.loads((ROOT/'registries/screens.json').read_text())['screens']
    frames=[s for s in registry if (s['platform']=='reference' if args.source=='initial' else s.get('source')==('SRC-WORKING-BASELINE' if args.source=='working-mobile' else 'SRC-WORKING'))]
    if args.screen:frames=[s for s in frames if s['id']==args.screen]
    assert frames,'No matching screens'
    try:commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True,stderr=subprocess.DEVNULL).strip()
    except subprocess.CalledProcessError:commit=None
    dirty=bool(subprocess.run(['git','status','--porcelain'],cwd=ROOT,capture_output=True,text=True).stdout.strip()) if commit else True
    report={'status':'rendered_not_reviewed','source':args.source,'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'repository_commit':commit,'working_tree_dirty':dirty,'generated_at_utc':datetime.now(timezone.utc).isoformat(),'clock':'2026-11-13T04:30:00Z' if initial else '2026-11-12T04:30:00Z','timezone':'Asia/Kolkata','locale':'en-IN','viewport':{'width':width,'height':height},'pixel_ratio':args.scale,'environment':platform.platform(),'screens':[],'errors':[],'comparison_status':'not_performed_no_approved_matching_baseline','scope':'Design rendering only. No native app, account, provider or backend behavior verified.'}
    dependencies=[source]+([] if args.source=='initial' else [f for f in (source.parent/'assets').rglob('*') if f.is_file()])
    report['source_files']=[{'path':f.relative_to(ROOT).as_posix(),'sha256':hashlib.sha256(f.read_bytes()).hexdigest()} for f in dependencies]
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True)
        report['browser']={'engine':'Chromium','version':browser.version}
        page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=args.scale,locale='en-IN',timezone_id='Asia/Kolkata')
        page.on('pageerror',lambda error:report['errors'].append(str(error)))
        page.add_init_script("""(()=>{const D=Date;const t=D.parse('%s');window.Date=class extends D{constructor(...args){super(...(args.length?args:[t]))}static now(){return t}};Math.random=()=>.125})()"""%report['clock'])
        if initial:
            page.goto(source.as_uri()+'?capture=1',wait_until='domcontentloaded')
            page.wait_for_function('typeof window.__dcSetProps === "function"')
            page.wait_for_function('!document.body.innerText.includes("{{") && document.body.innerText.length>20')
        for frame in frames:
            if initial:
                page.evaluate('(start)=>window.__dcSetProps(window.__dcRootName(),{start,still:true})',frame.get('route',frame['title']))
                page.wait_for_timeout(150)
            else:
                page.goto(source.as_uri()+'?capture=1#'+frame['route'],wait_until='domcontentloaded')
                page.wait_for_function('(route)=>document.getElementById("app")?.dataset.route===route',arg=frame['route'])
            page.evaluate('document.fonts.ready')
            if initial:
                page.evaluate('()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                page.evaluate('document.getAnimations().forEach(a=>{a.pause();a.currentTime=0})')
                page.evaluate('document.querySelectorAll("svg").forEach(s=>{s.pauseAnimations?.();s.setCurrentTime?.(0)})')
                page.evaluate('()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
            filename=frame['id']+'.png'
            page.screenshot(path=str(out/filename),full_page=not initial,animations='allow' if initial else 'disabled')
            geometry=page.evaluate('({width:innerWidth,height:innerHeight,documentWidth:document.documentElement.scrollWidth,documentHeight:document.documentElement.scrollHeight,internalScrollers:[...document.querySelectorAll("div")].filter(e=>e.scrollHeight>e.clientHeight+10&&getComputedStyle(e).overflowY==="auto").map(e=>({height:e.clientHeight,contentHeight:e.scrollHeight,scrollTop:e.scrollTop}))})')
            report['screens'].append({'id':frame['id'],'title':frame['title'],'image':filename,'image_sha256':hashlib.sha256((out/filename).read_bytes()).hexdigest(),'geometry':geometry,'horizontal_overflow':geometry['documentWidth']>width,'state_verification':'rendered_only'})
        browser.close()
    (out/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    if report['errors']:raise SystemExit('Rendering reported JavaScript errors; inspect artifacts/capture/report.json')
    print(f'Rendered {len(frames)} {args.source} states into {out.relative_to(ROOT)}. No visual comparison or approval is implied.')


if __name__=='__main__':main()
