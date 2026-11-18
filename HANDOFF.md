# Jai Bhakti design workspace handoff

Updated 18 November 2026. The owner requested one public repository for source and
preview, with full collaborator access for Isha. Use
https://github.com/suyashb734/jaibhakti-design for all design work, issues and PRs.
The repository, branches, documentation and history are public.

## Current workflow

- Canonical preview: https://suyashb734.github.io/jaibhakti-design/
- Original design: https://suyashb734.github.io/jaibhakti-design/previews/mobile/
- Styling reference: https://suyashb734.github.io/jaibhakti-design/design-system/
- Publishing: .github/workflows/publish-preview.yml validates a clean main
  revision, builds the static artifact and deploys directly through GitHub Pages.
- Authentication: GitHub Actions token and OIDC. No separate repository checkout,
  SSH deploy key or personal token is needed.
- The old jaibhakti-design-preview repository is retired as a read-only redirect.
  Existing review links continue to the corresponding canonical page. Do not edit
  it or reinstate the old cross-repository sync helper.
- The site's preview-info.json identifies the actual deployed source revision.
  A merge or workflow start alone is not proof of successful publication.

ishaamalhotra has accepted collaborator access and can edit, push branches, work
with issues, review/merge PRs and manage releases. GitHub personal repositories
have one owner and collaborators; owner-only settings cannot be delegated as a
separate admin role. Do not claim admin access was granted. The existing isha
source branch is preserved; inspect its current state before working on it.
Use repository issues/PRs as the shared queue. The older separate project board is
optional and is not required for Isha's normal design workflow.

## Design authority

This repository is a design asset. Production implementations live elsewhere.
Read AGENTS.md, START_HERE.md and docs/11_Original_Design_System.md before UI work.
The project owner selected the complete original UI: branding, styling, listing,
offering detail, cart, checkout, recurring setup and confirmation. JB-BASELINE-001
is the source authority, and its immutable imported file must remain unchanged.

The current editable original is under previews/mobile/source/. Screen fragments,
fonts/global CSS and original logic assemble into the ready-to-open Prototype.html.
All 40 original bundled assets are reused. The later 49-state proposal remains
separately labelled under explorations/EXP-0001/draft/. Its simplified acquisition
flow must not silently replace the original. Machine-readable styling recipes are
in tokens/original-ui.tokens.json; the public styling guide is design-system/.

Original restoration evidence is in changes/JB-CHG-0002/verification.json. It
records source/asset equivalence, 12 paired original screen geometries and 122
source/export route checks. Confirmation artwork has documented animation/raster
variance; blanket pixel-perfect equality is not claimed.

## Working together

Use a short-lived task branch and separate checkout per active human/agent. Agree
shared style/logic/fixture edits first. Another human reviews the scoped design
and evidence. Main is the integrated draft; merging and publishing do not select
a proposed layout or issue a final engineering handoff. Exact-version handoff
approval remains separate, and no new approved design-vX.Y.Z release exists.

Run registry integrity, generated-output checks and the existing test suite before
committing. build_preview_site.py --require-clean builds the site artifact. The
site tests check artifact provenance, stale-output removal and source-directory
protection. No native/backend/provider integration or usability preference is
established by these design checks.

Inspect Git status, current PRs and live preview-info.json before continuing. The
original 13 November two-repository hosting setup and its first publication records
remain in Git history and registries/project.json as historical evidence; they are
not the current operating instructions.
