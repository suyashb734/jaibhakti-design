"""Check the site artifact deployed directly from the design repository."""
from pathlib import Path
import hashlib
import json
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
BUILDER = ROOT/'tools/build_preview_site.py'


class PreviewSiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        (ROOT/'artifacts').mkdir(exist_ok=True)
        cls.temp = tempfile.TemporaryDirectory(dir=ROOT/'artifacts', prefix='site-test-')
        cls.output = Path(cls.temp.name)/'site'
        cls.build()

    @classmethod
    def tearDownClass(cls):
        cls.temp.cleanup()

    @classmethod
    def build(cls):
        return subprocess.run([sys.executable, str(BUILDER), '--out',
                               str(cls.output.relative_to(ROOT))],
                              cwd=ROOT, capture_output=True, text=True, check=True)

    def test_artifact_contains_designs_and_verifiable_source_revision(self):
        info=json.loads((self.output/'preview-info.json').read_text())
        expected=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
        self.assertEqual(info['source_commit'], expected)
        for path in ['index.html','.nojekyll','previews/mobile/Prototype.html',
                     'design-system/index.html','walkthroughs/index.html']:
            self.assertTrue((self.output/path).is_file(), path)
        for entry in info['files']:
            self.assertEqual(hashlib.sha256((self.output/entry['path']).read_bytes()).hexdigest(), entry['sha256'])
        self.assertFalse((self.output/'AGENTS.md').exists())
        self.assertFalse((self.output/'.github').exists())
        self.assertIn('https://github.com/suyashb734/jaibhakti-design/blob/main/docs/11_Original_Design_System.md',
                      (self.output/'design-system/index.html').read_text())

    def test_rebuild_discards_obsolete_generated_files(self):
        stale=self.output/'obsolete-design.html'
        stale.write_text('A superseded export')
        self.build()
        self.assertFalse(stale.exists())

    def test_builder_refuses_to_replace_source_directory(self):
        result=subprocess.run([sys.executable,str(BUILDER),'--out','previews'],
                              cwd=ROOT,capture_output=True,text=True)
        self.assertNotEqual(result.returncode,0)
        self.assertTrue((ROOT/'previews/mobile/Prototype.html').is_file())


if __name__=='__main__':
    unittest.main()
