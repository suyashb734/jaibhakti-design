"""Re-render the editable prototype into the supplied screen PNGs.

Requires Python and Playwright with Chromium. No web server is required.
"""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent


def render_exports():
    (ROOT / 'screens').mkdir(exist_ok=True)
    results = []
    errors = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2)
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto((ROOT / 'Prototype.html').as_uri() + '?capture=1#home', wait_until='networkidle')
        frames = page.evaluate('window.designFrames')
        for frame in frames:
            page.goto((ROOT / 'Prototype.html').as_uri() + '?capture=1#' + frame['route'], wait_until='networkidle')
            page.wait_for_function('(route)=>document.getElementById("app").dataset.route===route', arg=frame['route'])
            page.evaluate('document.fonts.ready')
            geometry = page.evaluate('({width:innerWidth,body:document.body.scrollWidth,document:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight})')
            assert geometry['body'] <= 390 and geometry['document'] <= 390, (frame['route'], geometry)
            path = ROOT / 'screens' / (frame['file'] + '.png')
            page.screenshot(path=str(path), full_page=True, animations='disabled')
            results.append({**frame, 'image': 'screens/' + path.name, 'artboard_width':390, 'artboard_height':geometry['height'], 'export_scale':2})
        assert not errors, errors
        browser.close()
    (ROOT / 'Screens_Manifest.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
    print(f'Exported {len(results)} screen states at 2x. All render without horizontal overflow at 390 px.')


if __name__ == '__main__':
    render_exports()
