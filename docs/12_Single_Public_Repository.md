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
The canonical deployment and redirects were verified; the old repository is now
archived/read-only.
All active work happens in jaibhakti-design. The obsolete SSH publishing secret,
deploy key and cross-repository sync helper have been removed.

The old private project board is optional. Repository issues and PRs provide the
shared queue without another access requirement. Source, documentation, branches
and the complete repository history are now public; a branch is not a private space.
Original design authority, reference hashes and exact-version engineering approval
rules remain unchanged.

## Verified cutover

The [first native deployment](https://github.com/suyashb734/jaibhakti-design/actions/runs/44292403112)
published clean source revision `3ae322e1d9f49c85e7521c135c29838720f906a4`
with 168 exported files. Browser checks covered all 12 original screen routes,
the detail → cart → checkout flow, the styling guide, walkthrough and retained
proposal. No script errors or broken images occurred on the checked guide pages.

The [legacy redirect deployment](https://github.com/suyashb734/jaibhakti-design-preview/actions/runs/44292939269)
published revision `bb25727cc125e1b2210f6dacf85304b1e502f89b`. All 12 tested
legacy entry URLs reached their matching canonical page with query strings and
anchors intact, including the original cart, after the old repository was archived.
The original design source, assets, immutable references and `isha` branch were
unchanged by this consolidation. Migration facts are retained in
[registries/project.json](../registries/project.json). These publication checks
do not issue a new design or engineering approval.
