"""The restored design must retain the actual assets from its immutable baseline."""
import base64
import gzip
import json
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]


class OriginalAssetTests(unittest.TestCase):
    def test_extracted_assets_match_the_original_bundle(self):
        record = json.loads((ROOT/'previews/mobile/original-assets.json').read_text())
        text = (ROOT/record['source']).read_text()
        manifest = json.loads(re.findall(r'<script[^>]*>(.*?)</script>', text, re.S)[1])
        self.assertEqual({item['bundle_id'] for item in record['assets']}, set(manifest))
        for item in record['assets']:
            with self.subTest(asset=item['path']):
                source = manifest[item['bundle_id']]
                payload = base64.b64decode(source['data'])
                if source['compressed']:
                    payload = gzip.decompress(payload)
                self.assertEqual((ROOT/item['path']).read_bytes(), payload)


if __name__ == '__main__':
    unittest.main()
