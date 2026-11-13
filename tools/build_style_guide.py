"""Generate the public styling reference from measured original UI recipes."""
from pathlib import Path
from html import escape
import argparse
import json
import re

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'design-system/index.html'


def page():
    data = json.loads((ROOT/'tokens/original-ui.tokens.json').read_text())
    swatches = ''.join(f'<article><i style="background:{escape(value)}"></i><strong>{escape(name)}</strong><code>{escape(value)}</code></article>' for name,value in data['color'].items())
    samples = []
    for name,item in data['components'].items():
        # Computed keys use camelCase; CSS declarations use kebab-case.
        style=';'.join(re.sub(r'[A-Z]',lambda m:'-'+m[0].lower(),key)+':'+value for key,value in item['style'].items())
        control = f'<input readonly placeholder="{escape(item["text"])}" style="{escape(style)};max-width:100%">' if item['tag']=='INPUT' else f'<span class="sample" style="{escape(style)}">{escape(item["text"])}</span>'
        samples.append(f'<article><h3>{escape(name)}</h3>{control}<p>{escape(item["style"]["fontSize"])} · {escape(item["style"]["fontWeight"])} · radius {escape(item["style"]["borderRadius"])} · padding {escape(item["style"]["padding"])}</p><a href="../previews/mobile/Prototype.html#{item["screen"]}">Open original screen →</a></article>')
    states=['home','seva','detail','cart','pay','sevaSetup','mandate','success','sevaSuccess','sevaOrder','profile','bhent']
    screens=''.join(f'<article><a href="../previews/mobile/Prototype.html#{state}"><img src="../references/initial-prototype/screens/{state}.png" alt="Original {state} design" loading="lazy"><h3>{state}</h3></a></article>' for state in states)
    rules=''.join('<li>'+escape(rule)+'</li>' for rule in data['layout_rules'])
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Jai Bhakti original styling reference</title><link rel="stylesheet" href="../assets/brand/original-brand.css"><style>
*{{box-sizing:border-box}}body{{margin:0;background:#fffdf9;color:#3a2b1a;font:14px/1.65 var(--jb-font-body)}}header,main{{max-width:1200px;margin:auto;padding:24px}}header{{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}}nav{{display:flex;gap:20px;flex-wrap:wrap}}a{{color:#8a2406}}h1{{font-size:36px;line-height:1.25;max-width:800px}}h2{{margin-top:48px}}p{{max-width:850px}}.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}}article{{border:1px solid #eedbc0;border-radius:18px;padding:20px;background:#fff;overflow:hidden}}article i{{display:block;height:72px;border-radius:12px;margin-bottom:12px}}article code,article strong{{display:block}}article img{{width:100%;height:400px;object-fit:cover;object-position:top}}.sample{{display:inline-flex;align-items:center;justify-content:center;max-width:100%;white-space:pre-line;text-align:center}}.notice{{padding:20px;border-radius:18px;background:#fff1d6}}.jb-brand{{display:flex;align-items:center;gap:8px;font-family:Martel,serif;font-weight:900;font-size:24px;color:#3a1604;text-decoration:none}}.jb-brand img{{width:28px;height:28px}}@media(max-width:500px){{h1{{font-size:28px}}header,main{{padding:18px}}}}
</style></head><body><header><a class="jb-brand" href="../index.html"><img src="../assets/brand/temple-mark.svg" alt=""><span lang="hi">जय भक्ति</span></a><nav><a href="../previews/mobile/index.html">Original design</a><a href="../walkthroughs/index.html">Walkthroughs</a><a href="../docs/11_Original_Design_System.md">Agent styling guide</a></nav></header><main>
<p>OWNER-SELECTED COMPLETE ORIGINAL UI · JB-BASELINE-001</p><h1>One styling reference for every design contributor and agent</h1><p class="notice">Use the original screen structure, branding, typography, cards, forms, cart and checkout. Later proposals remain separately labelled. These measured recipes help identify styles; the original source preserves the complete implementation.</p>
<h2>Brand colors</h2><div class="grid">{swatches}</div><h2>Typography</h2><p>Interface: Poppins with Noto Sans Devanagari. Wordmark: Martel 900. Original form inputs use 16px; offering titles use 22px/27px at weight 600; the listing heading uses 25px/31px at weight 600. Keep the original component-specific scale.</p>
<h2>Component recipes</h2><p>Computed samples at the original 393 × 852 artboard. Each button has its own role; the white hero CTA, pill purchase action and rounded form submit are distinct.</p><div class="grid">{''.join(samples)}</div>
<h2>Layout and journey rules</h2><ul>{rules}</ul><h2>Original screens</h2><p>Open a screen to inspect its full interactive layout, including content below the fold.</p><div class="grid">{screens}</div>
<h2>Current jaibhakti.com reference</h2><p>Public home, offering detail and initial checkout were observed on 13 November 2026. Shared styles include Poppins, cream/brown colors and the gold-to-orange CTA. The live English co-branded header differs from the selected original Devanagari wordmark. Original styling remains authoritative. Full authenticated payment screens were not entered.</p><p><a href="https://jaibhakti.com">Live website →</a> · <a href="../catalogue/index.html">Actual launched offerings →</a> · <a href="../docs/11_Original_Design_System.md">Detailed source and agent rules →</a></p></main></body></html>'''


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args();text=page()
    if args.check:
        assert OUTPUT.is_file() and OUTPUT.read_text()==text,'Styling reference is stale; run python3 tools/build_style_guide.py'
        print('PASS: visual styling reference matches original UI token recipes')
    else:
        OUTPUT.parent.mkdir(parents=True,exist_ok=True);OUTPUT.write_text(text);print('Built original styling reference')


if __name__=='__main__':main()
