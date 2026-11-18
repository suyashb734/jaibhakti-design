# Single public repository

The owner requested consolidation on 18 November 2026. jaibhakti-design now holds
the editable original design, proposed alternatives, shared styling, review records
and its GitHub Pages deployment. It is public. No repository transfer or history
rewrite is performed, and the existing isha branch is preserved.

## Editing and previewing

1. Work in a task branch of https://github.com/suyashb734/jaibhakti-design.
2. Read AGENTS.md and the original styling policy, edit the assigned source and
   regenerate affected design assets.
3. Run checks and open a PR. Main is the integrated shared draft.
4. After merge, Publish review preview builds a clean artifact and deploys it to
   https://suyashb734.github.io/jaibhakti-design/ using native Pages Actions.
5. Check preview-info.json for the source revision actually deployed.

Isha has active collaborator access, including source edits, pushes, issues and
PR merges. Personal repositories retain owner-only administrative settings; a
separate admin role requires an organization-owned repository. This migration does
not transfer ownership. See [GitHub's permission model](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository).

## Retired publishing repository

The old jaibhakti-design-preview repository is retained only to preserve its history
and redirect existing page links, including query strings and screen fragments.
After the canonical deployment and redirect are verified, it is archived/read-only.
All active work happens in jaibhakti-design. The obsolete SSH publishing secret,
deploy key and cross-repository sync helper are retired after cutover.

The old private project board is optional. Repository issues and PRs provide the
shared queue without another access requirement. Source, documentation, branches
and the complete repository history are now public; a branch is not a private space.
Original design authority, reference hashes and exact-version engineering approval
rules remain unchanged.
