# Design tooling

`serve_design_hub.py` starts the static hub at localhost:8000. Open walkthroughs/
for guided review or explorations/ for the visual A/B entry point.

`build_review_catalog.py` generates the walkthrough browser data from the screen
and tour registries; use `--check` to detect stale generated data. It uses only the
Python standard library and supports offline ZIP review without fetch requests.

`build_preview_site.py` prepares a static hosting bundle under ignored
artifacts/preview-site. It copies an explicit set of design HTML, scripts, fonts,
sample media and reference PNGs. Private Markdown, DOCX, contracts, repository
settings and agent policy are not copied. Documentation links point back to the
private repository. The bundle has noindex/robots requests, not access control.
Copied HTML receives robots metadata; immutable source files remain unchanged.
Use `--require-clean` for a publishable snapshot with an exact source commit.
Building does not publish anything. Hosting visibility is a separate decision.
The robots file allows HTML fetching so compliant crawlers can read the noindex
metadata, following [Google's guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

`validate_design_hub.py` uses the Python standard library to check IDs, mappings, local links and immutable reference hashes. Add `--handoff` to check recorded approved release manifests. The gate is expected to fail until a handoff release is approved.

`capture_design_evidence.py` renders the editable mobile source or imported initial/candidate source into ignored artifacts, recording source hashes, commit, fixture clock, viewport, pixel ratio and browser/environment metadata. It does not edit the reference, compare pixels, approve the design or test a backend. Initial captures retain internal scroll-container metadata; top captures do not show their entire scrollable content.

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/python -m playwright install chromium
.venv/bin/python tools/capture_design_evidence.py --source working-mobile --screen JB-APP-050
.venv/bin/python tools/capture_design_evidence.py --source initial
```

The optional GitHub workflow runs captures manually and uploads a review artifact. After source migration, connect captures to scoped PR changes and add comparable visual baselines and behavioral tests as described in the measurement protocol. An artifact report is generated evidence, not proof of usability or production parity.

`build_live_catalogue.py` generates catalogue/index.html from the dated live asset
manifest and page template. Run --check to detect stale cards.

The owner authorized public review hosting. The Publish review preview Action
validates relevant main changes, builds a clean export and calls
`sync_preview_checkout.py` against the dedicated public checkout. The helper checks
the destination, preserves uncommitted work and verifies asset checksums. Pages
refreshes the same shared URL. See [the connected workflow](../docs/07_Preview_and_Collaboration.md).

`build_original_design.py` assembles the editable original screen fragments into
the ready-to-open current Prototype.html. Use --check to detect stale output.
`build_style_guide.py` generates design-system/index.html from measured original
component recipes. Use --check before committing styling-reference changes.
The capture source working-mobile now renders the 12 restored original states;
proposal renders the separate 49-state candidate under EXP-0001.
