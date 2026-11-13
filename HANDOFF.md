# Jai Bhakti design workspace handoff

Updated 13 November 2026. This repository is a design asset for collaborative visual
work. Production web/app/backend implementations live elsewhere. Begin with
AGENTS.md, START_HERE.md, docs/11_Original_Design_System.md and
docs/10_Design_Collaboration.md.

The project owner clarified that the complete original UI is required, including
listing, offering detail, cart and checkout. JB-CHG-0002 restores that journey under
previews/mobile/. The later 49-state proposal is retained separately under
explorations/EXP-0001/draft/. Do not carry its simplified acquisition flow forward
as the main design. The public styling reference is design-system/index.html.

## Preview publishing is verified

[PR #9](https://github.com/suyashb734/jaibhakti-design/pull/9) was reconciled with main
and merged. Original-final branding, the three-seva visual reference and connected
publishing are integrated. The old handoff describing PR #9 as open is superseded;
its history remains in Git.

- Shared preview: https://suyashb734.github.io/jaibhakti-design-preview/
- Walkthrough: https://suyashb734.github.io/jaibhakti-design-preview/walkthroughs/index.html
- Catalogue: https://suyashb734.github.io/jaibhakti-design-preview/catalogue/index.html
- Private authoring repository: https://github.com/suyashb734/jaibhakti-design
- Public generated repository: https://github.com/suyashb734/jaibhakti-design-preview

First verified automatic publication:

| Record | Exact value |
| --- | --- |
| Source revision | eddb9484d490333c6837b747b4edb568932a1e54 |
| Generated public commit | 100114614cbc4d02e7f9dd598cb63243218bc623 |
| Publisher | [Successful run](https://github.com/suyashb734/jaibhakti-design/actions/runs/43424046140) |
| Pages | [Successful run](https://github.com/suyashb734/jaibhakti-design-preview/actions/runs/43424078118) |
| Export | 110 static assets in that first publication |

Public browser checks covered the landing page, original/app embedded walkthroughs,
explorations, restored wordmark/fonts and catalogue at mobile/desktop widths. All
six catalogue images loaded, with no script errors or broken images. Verification
time and proof are recorded in registries/project.json. Subsequent main changes can
publish newer snapshots; preview-info.json is the current public source revision.

The publisher validates relevant main changes, builds a clean allowlisted export
and pushes to the public repository. Pages then deploys it. Branch work stays in
local/Codespaces review until merged. If publishing fails, inspect the actual Action
logs and verify the public result rather than assuming it refreshed.

The existing DESIGN_PREVIEW_DEPLOY_KEY secret and repository-scoped write deploy
key work. Reuse them. No credentials need recreation or rotation for continuation.
The owner accepted public review hosting; keep the authoring repository and its
private documents private. Noindex is requested and does not restrict access.

## Editing as a three-person design team

The current original UI is organized into editable HTML screen fragments, font/global
CSS and original binding logic. The separate later proposal retains nine screen-family
files and shared fixtures/components. See
previews/mobile/README.md for the editing map. The structure uses plain deferred
scripts, so downloaded Prototype.html still opens directly without a build step.
Changes/JB-CHG-0001 records the source organization scope and comparison evidence.

Use one human owner, issue/EXP/JB-CHG scope, short-lived branch and separate checkout
per active task or agent. One of the other humans reviews the design/evidence;
rotate reviewers. Agree shared CSS, fixture, component and brand edits before
parallel work. Independent alternatives belong under explorations/EXP-xxxx/options/.
Main remains the integrated working draft. Author in the private source, never the
public generated export. AGENTS.md is shared; CLAUDE.md imports it.

Routine exploration needs proportionate visual evidence and review. Exact-version
product/design approval and engineering acknowledgement apply when issuing a
handoff. Unresolved commercial decisions block their affected handoff scope, while
unrelated visual work can proceed with labelled sample assumptions.

## Established design authority

- Jai Bhakti App.html is the owner's first final design supplied for execution on
  jaibhakti.com, recorded as JB-BASELINE-001. Preserve it and its historical status.
- Use original-final colors, wordmark and typography from assets/brand/ and
  tokens/original-final.tokens.json. Actual live offering imagery is allowed.
- The web takes bookings. The proposed app shows updates, history and media and
  also supports Book More. The 49-state candidate remains a separate Draft proposal.
- Live references cover Rahu Paithani 51/121, Gaj Mahalakshmi Ujjain 51/101 and
  Triyuginarayan 51/151, in rupees. They are dated presentation observations;
  Triyuginarayan's package ID remains unverified. Sample Hanuman records do not
  establish another launched offering.
- Immutable imports, screen/requirement IDs, open layout alternatives and prior
  release records must be preserved. Agents cannot invent human design approval.

## Remaining design and handoff decisions

The six decision issues (#1–#6), JB-CHG-0001 (#7) and EXP-0001 (#8) remain the product
queue. Brand authority is selected; tabs versus sections is not. Duration and
cancellation, legacy/catalogue mapping, recurring consent, account/beneficiary
continuity, fulfilment/media events and exact handoff scope still need human review.
No new approved design-vX.Y.Z engineering handoff exists.

The actual three collaborator identities/access and review controls remain to be
configured with their roster. Existing documentation is workflow guidance, not
permission enforcement. Native/backend/provider/staging behavior and usability
preference remain outside the prototype validation.

Inspect Git status, branch, current PRs and public preview-info.json before new
work. Do not repeat the source audit, recreate repositories or infer source approval
from a merged PR, passing tests or publication.

## Original-design restoration checks

changes/JB-CHG-0002/verification.json records the full original template round trip, all
40 asset byte matches, 12 paired original screen captures and 122 current/proposal
source/export route checks. Original detail-to-cart-to-payment and recurring setup
flows were exercised. Fourteen tests pass. Confirmation artwork has animation/raster
variance recorded explicitly; exact frame equality is not claimed for those captures.
The shared styling guide and original journey publish through the existing workflow.
