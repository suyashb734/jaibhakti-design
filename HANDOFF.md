# Jai Bhakti agent handoff

Recorded 13 November 2026. The owner requested a handover, so feature work stopped
with **PR #9 open and unmerged**. Read this file before continuing. Do not assume
the newest branding/catalogue changes are already on the public site.

## Repositories and exact state

| Item | Location / state |
| --- | --- |
| Private authoring repo | https://github.com/suyashb734/jaibhakti-design |
| Local authoring checkout | /Users/mojave/Downloads/Jaibhakti/jaibhakti-design |
| Current local branch after this handoff | main; the pending implementation is on the branch below |
| Pending PR | https://github.com/suyashb734/jaibhakti-design/pull/9 |
| Implementation branch | change/JB-CHG-0001-original-brand-and-live-reference |
| Implementation commit | b79d6052c2e2ae08805ff081341da604daee9411 |
| PR integrity CI at that commit | Passed: https://github.com/suyashb734/jaibhakti-design/actions/runs/43411708798 |
| Public review site | https://suyashb734.github.io/jaibhakti-design-preview/ |
| Public generated export repo | https://github.com/suyashb734/jaibhakti-design-preview |
| Local export checkout | /Users/mojave/Downloads/Jaibhakti/jaibhakti-design-preview |
| Current public design snapshot | dfccf302d16b6e9ec51c3b98f5b81d4dd96155bd; 82 exported assets |
| Current public repo head at handoff | efe0b6c6e6c9d17d1cfdab19a6236f2740e77b3c; later README-only update |
| Pages state checked at handoff | Built, public, HTTPS enforced, main branch root |
| Last Pages run checked | https://github.com/suyashb734/jaibhakti-design-preview/actions/runs/43410639123 |

The public site currently contains the original 12-state tour, current 49-state
draft and existing exploration viewer. **The new live-seva catalogue, restored
brand and connected publishing workflow are in PR #9, not deployed yet.** The
catalogue URL should not be presented as live until that PR is merged and published.

This handoff adds documentation/status to main after the implementation branch
was created. Fetch main and reconcile it into the branch before final integration.
If README.md or registries/project.json conflicts, preserve this handoff link and
the truthful distinction between the published old snapshot and pending new work.

## Owner requirements already established

- Jai Bhakti App.html is the **first final design supplied for execution on
  jaibhakti.com**. It is recorded as JB-BASELINE-001. It is not an unapproved
  historical sketch. Its original execution date/production commit were not given.
- Only the web app is currently live. Web takes bookings; the proposed mobile app
  shows booking updates/history/media and also supports Book More.
- **Colors, wordmark and branding must follow the original final design**, not a
  new treatment inferred from the live site's header.
- The owner explicitly allowed actual images, text and assets from jaibhakti.com.
  Three recurring/Nirantar sevas are launched there.
- The owner accepted a public preview after being told it can be forwarded and
  noindex is not access control. Keep the authoring repo/private documents private.
  Do not reopen this already resolved visibility question.
- Multiple humans will use Codex and Claude. Use one shared agent policy, stable
  exploration IDs/folders, short-lived task branches and PRs, separate checkouts
  for concurrent agents, and a separate exact-version human-approved tech handoff.

## What is implemented in PR #9

1. **Original-final branding restored to the working draft/review surfaces.**
   Extracted the original temple SVG and 18 font subsets: Martel for the
   Devanagari wordmark, Poppins and Noto Sans Devanagari for the interface. Shared
   assets are under assets/brand/; provenance/tokens are in
   tokens/original-final.tokens.json. Main text #3A2B1A, brand brown #3A1604, canvas
   #FFFDF9 and the original 100-degree #FFD24A → #FF8A3D CTA are applied. The draft
   home co-brand treatment was replaced with the original wordmark. Original
   imports and frozen captures remain unchanged.
2. **Live catalogue with actual imagery and dated facts.** Six images cover a
   hero and temple photo for each offering. The reference manifest records source
   URLs, timestamps, dimensions and hashes. Observed weekly amounts are Rahu
   Paithani ₹51 then ₹121 (Saturday), Gaj Mahalakshmi/Ujjain ₹51 then ₹101 (Friday),
   and Triyuginarayan ₹51 then ₹151 (Monday). Product IDs are recorded; the
   Triyuginarayan package ID remains unverified. These observations do not resolve
   actual mandate terms or automatically replace existing purchase identities.
3. **Connected preview automation implemented.** The private repo's
   .github/workflows/publish-preview.yml validates relevant main changes, builds
   a clean allowlisted snapshot and pushes it to the separate public export repo.
   It also supports workflow_dispatch on main. It does not publish task branches.
   **This Action has not run yet**, because its code has not reached main.
4. **Safe snapshot synchronization and tests.** tools/sync_preview_checkout.py
   verifies the target repository and checksums, refuses uncommitted work and
   preserves the export repo guide/Git metadata. Four tests join the nine existing
   governance tests.
5. **Practical collaboration/brand/product documentation.** New guides:
   docs/07_Preview_and_Collaboration.md, docs/08_Live_Seva_Catalogue.md and
   docs/09_Original_Brand_Baseline.md. Onboarding, source/decision records and
   JB-CHG-0001 were updated. Existing A/B previews share app.js; new independent
   alternatives should use explorations/EXP-0001/options/variant/ and link their
   previews from the EXP record/index.

## Validation already performed

- PR #9 integrity CI passed at b79d6052c2e2ae08805ff081341da604daee9411.
- 13 governance/publisher-sync tests passed.
- All 49 app states rendered at both 360 and 390 px: 98 cases, no horizontal
  overflow or JavaScript errors.
- Three before/after views use baseline dfccf302d16b6e9ec51c3b98f5b81d4dd96155bd,
  the same Chromium/viewport/locale, and fixed 12 November 2026 10 AM IST clock.
- Computed wordmark family/weight/color and CTA endpoint/text colors match the
  original-final reference. English hero text also uses Poppins.
- The live catalogue was checked at 360, 390 and 1280 px; all six images loaded.
- The 110-file static export's wordmark, catalogue navigation and embedded app
  loaded without script or asset errors. Private Markdown/DOCX/contracts/settings
  were excluded from publication.
- All original 139 imported reference hashes remain unchanged. Seven new dated
  reference files bring the validated total to 146.

On the feature branch, changes/JB-CHG-0001/brand-verification.json records source
hashes and tested/not-tested scope. Local screenshots/report are under
artifacts/JB-CHG-0001-brand/. They are ignored and will not exist in a fresh clone;
retain/reproduce evidence through Actions artifacts before any final handoff.
Do not claim a numerical quality improvement from these renders.

## What is left — next agent's execution order

1. **Read and review PR #9.** Read AGENTS.md, START_HERE.md, the assigned change
   and the three new guides on that branch. Confirm current Git/PR state; do not
   redo the source audit or recreate repositories, keys or assets.
2. **Bring the handoff/status commit from main into the PR branch.** Resolve any
   documentation/status overlap without losing original-brand direction or
   claiming unpublished work is already live. Run the branch's 13 tests and
   integrity/catalogue/export checks after resolving changes.
3. **Complete repository review/integration of the authorized preview update.**
   The owner requested the brand/assets/publishing setup. Preserve its Draft
   product status; merging this PR must not create a final engineering release
   or fabricate human approval of the open layout/product decisions.
4. **Verify the first automatic publication after merge.** Watch Publish review
   preview in the private repo, then Pages in the public repo. This is the main
   unfinished technical task. Initial key/secret setup is complete, but checkout,
   SSH push, Pages triggering and public refresh have not been proven end to end.
   If it fails, inspect logs and fix the actual cause; never print key material.
5. **Check the public result.** Fetch preview-info.json and confirm its source SHA
   is the merged source revision. Verify home, the original 12-state tour, app
   viewer, explorations and catalogue. Check original wordmark/fonts/CTA, the six
   real images, mobile layout and missing assets. Pages/browser caches may need a
   refresh. Do not merely assume an Actions success means the latest site loads.
6. **Update status/proof records.** Record the successful publish/Pages run URLs,
   source commit and verification time in registries/project.json. Remove the
   branch's “first automatic run pending” status only after real success. Update
   the handoff/README and project front door to reflect what is actually live.
7. **Return the stable links and editing instructions.** Explain: one short-lived
   branch per focused task; the EXP folder/ID persists; PR review/merge refreshes
   the shared URL; selection and final tech handoff approval remain separate.

## Publishing configuration already created

- Public destination: suyashb734/jaibhakti-design-preview, main at repository root.
- Source repo encrypted Actions secret: DESIGN_PREVIEW_DEPLOY_KEY (exists).
- Target deploy key: “Jai Bhakti public preview publisher”, ID 169755952,
  write enabled, scoped to that public repository (exists).
- Temporary private-key files were deleted after secure secret upload. No key or
  personal token was committed. Reuse the existing configuration; do not rotate
  or request another credential merely because a new agent takes over.
- Private Pages setup was attempted and rejected by the account plan. The separate
  public export repo is intentional; do not make the private source repo public.

## Useful commands

From the authoring checkout, inspect first, then switch to the pending work:

```bash
git status --short --branch
git fetch origin
gh pr view 9 --repo suyashb734/jaibhakti-design
gh pr checkout 9
git merge origin/main
python3 tools/validate_design_hub.py
python3 tools/build_review_catalog.py --check
python3 tools/build_live_catalogue.py --check
python3 -m unittest discover -s tests -v
python3 tools/build_preview_site.py --require-clean
```

The clean-export command requires committed source; commit resolved changes first.
Run the new main workflow only after it exists on main:

```bash
gh run list --repo suyashb734/jaibhakti-design --workflow publish-preview.yml
gh run list --repo suyashb734/jaibhakti-design-preview
gh api repos/suyashb734/jaibhakti-design-preview/pages
```

The local hub was running at http://localhost:8000 through tools/serve_design_hub.py.
It serves the current checkout, so switch to the feature branch to see its changes.
The browser bridge was unavailable; local Playwright/Chromium supplied the browser
checks. Public-site reads did not enter forms or authorize a payment.

## Longer-term product work still open

The six decision issues (#1–#6), JB-CHG-0001 (#7) and EXP-0001 (#8) remain open.
Brand authority is now selected, but tabs versus sections is not. Duration and
cancellation, catalogue/legacy purchase mapping, complete recurring consent,
account/beneficiary continuity, fulfilment/media events and exact handoff scope
still need human decisions. The existing ₹101/Hanuman app fixtures are examples,
not evidence that all three launched products are already integrated in the app.

Name actual product/design/engineering/operations reviewers, configure supported
branch/release controls, measure the coherent web-to-app slice, and obtain approval
of an exact version before a design-vX.Y.Z handoff. Native/backend/provider/staging
and usability-preference tests remain unverified. No new approved handoff release
exists; the historical first-final execution baseline remains separately recorded.
