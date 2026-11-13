"""Stage a validated export in the dedicated public preview checkout."""
from pathlib import Path, PurePosixPath
import argparse
import hashlib
import json
import shutil
import subprocess

ROOT=Path(__file__).resolve().parents[1]
EXPECTED_REMOTES={
    'git@github.com:suyashb734/jaibhakti-design-preview.git',
    'git@github.com:suyashb734/jaibhakti-design-preview',
    'https://github.com/suyashb734/jaibhakti-design-preview.git',
    'https://github.com/suyashb734/jaibhakti-design-preview',
}


def git(target,*args):
    return subprocess.check_output(['git','-C',str(target),*args],text=True).strip()


def checked_path(root,relative):
    path=PurePosixPath(relative)
    assert not path.is_absolute() and '..' not in path.parts,'Unsafe export path'
    assert not any(part.startswith('.') and part!='.nojekyll' for part in path.parts),'Internal files cannot be exported'
    target=(root/relative).resolve()
    assert target.is_relative_to(root.resolve()),'Export path escapes its directory'
    return target


def sync_bundle(bundle,target):
    assert Path(git(target,'rev-parse','--show-toplevel')).resolve()==target.resolve(),'Use a repository root checkout'
    assert git(target,'remote','get-url','origin') in EXPECTED_REMOTES,'Unexpected destination repository'
    assert not git(target,'status','--porcelain'),'Preview checkout has uncommitted work; preserve it before publishing'
    manifest=json.loads((bundle/'preview-info.json').read_text())
    assert manifest['working_tree_dirty'] is False,'Only a clean source snapshot can be published'
    new_paths=set()
    for entry in manifest['files']:
        source=checked_path(bundle,entry['path'])
        assert source.is_file() and hashlib.sha256(source.read_bytes()).hexdigest()==entry['sha256'],'Export checksum differs'
        checked_path(target,entry['path'])
        new_paths.add(entry['path'])
    old_manifest=target/'preview-info.json'
    old_paths={entry['path'] for entry in json.loads(old_manifest.read_text())['files']} if old_manifest.exists() else set()
    for relative in old_paths-new_paths:
        obsolete=checked_path(target,relative)
        assert relative!='README.md','Never remove the preview repository guide'
        if obsolete.is_file():obsolete.unlink()
    for relative in new_paths|{'preview-info.json'}:
        source=checked_path(bundle,relative)
        destination=checked_path(target,relative)
        destination.parent.mkdir(parents=True,exist_ok=True)
        shutil.copyfile(source,destination)
    subprocess.run(['git','-C',str(target),'add','--all'],check=True)
    print(f'Staged public review snapshot {manifest["source_commit"]}; repository guide and Git metadata preserved')


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('checkout',type=Path)
    parser.add_argument('--bundle',type=Path,default=ROOT/'artifacts/preview-site')
    args=parser.parse_args()
    sync_bundle(args.bundle.resolve(),args.checkout.resolve())
