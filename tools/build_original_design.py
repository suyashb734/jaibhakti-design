"""Assemble editable original-design fragments into the ready-to-open preview."""
from pathlib import Path
import argparse
import json

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'previews/mobile/source'
OUTPUT = ROOT / 'previews/mobile/Prototype.html'


def assembled_design():
    text = (SOURCE / 'document.html.template').read_text()
    sections = json.loads((SOURCE / 'sections.json').read_text())
    assert len(sections) == len(set(sections)), 'Duplicate original design section'
    for name in sections:
        assert Path(name).name == name and name.endswith('.html'), name
    values = {
        'FONTS': (SOURCE / 'fonts.css').read_text(),
        'STYLES': (SOURCE / 'styles.css').read_text(),
        'SCREENS': ''.join((SOURCE / 'screens' / name).read_text() for name in sections),
        'LOGIC': (SOURCE / 'logic.js').read_text(),
    }
    for key, value in values.items():
        marker = '[[JB:' + key + ']]'
        assert text.count(marker) == 1, marker
        text = text.replace(marker, value)
    assert '[[JB:' not in text
    return text


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    text = assembled_design()
    if args.check:
        assert OUTPUT.is_file() and OUTPUT.read_text() == text, 'Original design preview is stale; run python3 tools/build_original_design.py'
        print('PASS: original design preview matches editable source fragments')
    else:
        OUTPUT.write_text(text)
        print('Assembled the original design preview from editable fragments')


if __name__ == '__main__':
    main()
