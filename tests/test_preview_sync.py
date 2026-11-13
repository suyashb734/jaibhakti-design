"""Check that snapshot updates preserve unrelated work and enforce the destination."""
from pathlib import Path
import hashlib
import importlib.util
import json
import subprocess
import tempfile
import unittest

spec=importlib.util.spec_from_file_location('sync_preview',Path(__file__).resolve().parents[1]/'tools/sync_preview_checkout.py')
sync=importlib.util.module_from_spec(spec);spec.loader.exec_module(sync)


class PreviewSyncTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name);self.target=self.root/'checkout';self.bundle=self.root/'bundle'
        self.target.mkdir();self.bundle.mkdir()
        self.git('init','-q');self.git('remote','add','origin','git@github.com:suyashb734/jaibhakti-design-preview.git')
        (self.target/'README.md').write_text('Keep the repository guide')
        (self.target/'old.png').write_bytes(b'old image')
        (self.target/'preview-info.json').write_text(json.dumps({'files':[{'path':'old.png'}]}))
        self.git('add','.');self.git('-c','user.name=Test','-c','user.email=test@example.invalid','commit','-qm','Initial fictional snapshot')
        (self.bundle/'index.html').write_text('new snapshot')
        self.manifest={'source_commit':'a'*40,'working_tree_dirty':False,'files':[{'path':'index.html','sha256':hashlib.sha256(b'new snapshot').hexdigest()}]}
        self.write_manifest()

    def git(self,*args):
        return subprocess.check_output(['git','-C',str(self.target),*args],text=True,stderr=subprocess.DEVNULL).strip()

    def write_manifest(self):
        (self.bundle/'preview-info.json').write_text(json.dumps(self.manifest))

    def test_updates_snapshot_and_preserves_guide_and_git(self):
        sync.sync_bundle(self.bundle,self.target)
        self.assertFalse((self.target/'old.png').exists())
        self.assertEqual((self.target/'index.html').read_text(),'new snapshot')
        self.assertEqual((self.target/'README.md').read_text(),'Keep the repository guide')
        self.assertTrue((self.target/'.git').is_dir())

    def test_refuses_a_different_repository(self):
        self.git('remote','set-url','origin','https://github.com/example/other.git')
        with self.assertRaisesRegex(AssertionError,'Unexpected destination'):
            sync.sync_bundle(self.bundle,self.target)

    def test_preserves_someone_elses_uncommitted_work(self):
        (self.target/'README.md').write_text('Human edit')
        with self.assertRaisesRegex(AssertionError,'uncommitted work'):
            sync.sync_bundle(self.bundle,self.target)
        self.assertEqual((self.target/'README.md').read_text(),'Human edit')

    def test_rejects_export_path_escape(self):
        self.manifest['files'][0]['path']='../outside'
        self.write_manifest()
        with self.assertRaisesRegex(AssertionError,'Unsafe export path'):
            sync.sync_bundle(self.bundle,self.target)


if __name__=='__main__':unittest.main()
