# Jai Bhakti Design Hub

[![Registry integrity](https://github.com/suyashb734/jaibhakti-design/actions/workflows/validate-design.yml/badge.svg)](https://github.com/suyashb734/jaibhakti-design/actions/workflows/validate-design.yml)

Versioned product design, decisions and engineering handoff for Jai Bhakti web and mobile. The web acquires bookings; the mobile app will show booking updates, evidence and management, and allow devotees to book more.

**[Open the interactive design preview](https://suyashb734.github.io/jaibhakti-design-preview/)** — walkthroughs, complete designs, explorations and the launched-seva reference. Relevant merges to main refresh this same URL through the publish workflow.

**First final design:** `Jai Bhakti App.html` was handed over for execution on
jaibhakti.com, confirmed by the project owner and recorded as
[JB-BASELINE-001](baselines/JB-BASELINE-001.md).

**Current new work:** the 49-state Daan Seva prototype remains Draft. No new
design-vX.Y.Z handoff has been issued through this repository process yet.
`main` contains working material, including unresolved alternatives.

**New here? Read [START_HERE.md](START_HERE.md)** for the product history, user flow,
source authority, agent starting procedure and complete design-to-engineering path.
Read [the collaboration guide](docs/07_Preview_and_Collaboration.md) for editing a specific exploration and understanding branches, review and connected publishing.

## Find the right version

| You want to… | Start here |
| --- | --- |
| See the complete designs step by step | [Hosted walkthrough](https://suyashb734.github.io/jaibhakti-design-preview/walkthroughs/index.html) or [local viewer](walkthroughs/index.html) |
| Understand the launched products | [Visual live catalogue](catalogue/index.html) and [source notes](docs/08_Live_Seva_Catalogue.md) |
| Review ideas that are not final | [Visual explorations](explorations/index.html) and [outcome records](explorations/README.md) |
| Review the integrated draft | [Mobile preview](previews/mobile/Prototype.html), [web baseline](previews/web/index.html) and [change packages](registries/changes.json) |
| Find historical and new final designs | [Original execution baseline](baselines/JB-BASELINE-001.md); [new handoffs](releases/README.md) are pending |
| See work and decisions | [Private project](https://github.com/users/suyashb734/projects/1) and linked issues |
| Run or review the complete folder | [Review guide](docs/00_Review_the_Whole_Design.md) or [open in Codespaces](https://codespaces.new/suyashb734/jaibhakti-design) |

A selected exploration is a direction for integration. A merged change is shared
work. Human approval of an exact release authorizes the scoped engineering handoff.

## Review queue

Track the [first design change](https://github.com/suyashb734/jaibhakti-design/issues/7) and its six decision issues in the [handoff milestone](https://github.com/suyashb734/jaibhakti-design/milestone/1). The fifteen inconsistencies remain mapped in the structured register.

## Start here

- [Shared workspace model](docs/06_Shared_Design_Workspace.md) covers explorations, Codex/Claude collaboration and human finalization.
- [Run and review the whole design](docs/00_Review_the_Whole_Design.md) covers ZIP, clone, Codespaces and screenshot artifacts.
- [Management recommendation](docs/03_GitHub_Workflow.md) explains the repository and review model.
- [Source audit and inconsistencies](docs/01_Source_Audit.md) compares the original design, live web and candidate.
- [Web and mobile model](docs/02_Web_and_Mobile_Model.md) defines proposed responsibilities, shared records and checkout continuity.
- [Measurement protocol](docs/04_Measurement_Protocol.md) defines what to measure before a change is accepted.
- [Decision queue](registries/decisions.json) groups the fifteen findings into six review decisions.
- [Tech handoff checklist](docs/05_Engineering_Handoff.md) defines the release gate.
- [Migration plan](PLANS.md) lists phases, exit criteria and the next concrete work.

Download the whole repository and open [index.html](index.html), or clone it and run
`python3 tools/serve_design_hub.py` at http://localhost:8000. GitHub displays HTML as
source. The public preview is the easiest viewing route; Codespaces also provides
an on-demand preview of your own branch. The authoring repository stays private.

The public site is generated from an allowlist of review assets in a separate
public repository. Documentation and decisions stay private. Noindex is requested;
it does not restrict access. Hosting and source records are in
registries/project.json and the site’s preview-info.json.

## What was imported

| Source | Role | Evidence |
| --- | --- | --- |
| Original complete design | First final design given for website execution, owner-confirmed | [Jai Bhakti App.html](<references/initial-prototype/Jai Bhakti App.html>), 6,033,498 bytes, 40 bundled assets, 12 advertised entry states |
| Live web on 13 November 2026 | Dated public observations | [Observation manifest](references/live-web/2026-11-13/observations.json), home, three active details and two initial checkout views |
| My Bookings specification v1.0 | Inputs marked confirmed within the source document | [Specification](references/daan-seva-candidate/references/Daan_Seva_My_Bookings_Update_Specification.docx) |
| Revised Daan Seva work | Draft candidate with sample data | [49-state gallery](references/daan-seva-candidate/Revised_Designs/Gallery.html) and [clickable prototype](references/daan-seva-candidate/Revised_Designs/Prototype.html) |

Named approval evidence must be added to the exact design version. Being newer, committed, tested or visible on the live site does not by itself make a source the approved product contract.

## Working source

The [editable mobile prototype](previews/mobile/Prototype.html) is forked from the candidate with separate HTML, CSS and JavaScript. Its [gallery](previews/mobile/Gallery.html) clearly labels imported reference images. The [web baseline entry](previews/web/index.html) links historical and observed-live sources; production web code has not been supplied. Shared token, catalogue and copy extraction remains part of the scoped migration.

## Working structure

```text
contracts/       Shared product rules and proposed data semantics
content/         Draft glossary and shared copy keys
fixtures/        Scenario definitions and acceptance scope
tokens/          Owner-selected original branding and earlier candidate references
assets/brand/    Original-final wordmark, fonts and shared brand values
registries/      Sources, screen IDs, requirements, changes and decisions
changes/         One reviewable package for each product change
explorations/    Alternatives, findings and selection/rejection rationale
docs/            Platform, review, measurement and handoff guidance
references/      Immutable imports and dated live observations
baselines/       Recorded historical final-design handoffs and provenance
previews/        Editable mobile draft and the web baseline entry
walkthroughs/    Guided review and complete screen browser
catalogue/       Actual imagery and facts for the three launched sevas
releases/        Approved handoff manifests, separate from live deployment
tools/           Integrity and handoff validation
.github/         Review templates, issue forms, code owners and CI
.devcontainer/   On-demand Codespaces review environment
artifacts/       Generated comparison evidence, ignored by Git
```

Production web, native app and backend implementations can remain in their existing repositories. Each implementation ticket should link the approved design release, change ID and relevant screen or requirement IDs.

## Review workflow

Claim an issue and give each concurrent human/agent task its own branch and worktree.
Document alternatives in an EXP package. Promote a selected direction through a
JB-CHG package, integrated source diff, measurements and PR. Record named human
product/design approval for the exact source commit, plus engineering acknowledgement
and affected operational confirmations. Release only that approved scope. Keep
implementation and verified deployment separate. Codex and Claude share
[AGENTS.md](AGENTS.md), with [CLAUDE.md](CLAUDE.md) importing the same policy.

There are currently 49 app candidate states, 12 original entry-state references and 6 live observations in the screen registry. All candidate states remain Draft. The 22 specification acceptance criteria are mapped to representative candidate states, without claiming individual signoff.

## Checks

```bash
python3 tools/validate_design_hub.py
python3 -m unittest discover -s tests -v
python3 tools/validate_design_hub.py --handoff
```

The first command validates registry links, IDs, reference hashes and document
structure. The second runs governance tests. The third deliberately fails until
a new approved handoff manifest exists with resolved blockers and named approvals.
Historical handoff confirmation is recorded separately. Integrity checks do not
approve the newer candidate.

## Ownership

Repository maintainer: [@suyashb734](https://github.com/suyashb734). Product, design, engineering, operations and payments approvers still need named assignment. CODEOWNERS routes repository review; GitHub branch rules and team review assignments must be configured for the organization’s actual access and plan.

The private project is linked to the repository. Access to the project and the
private repository must both be granted to actual collaborators. Required-review
rules and release protections are not yet configured; instructions are guidance,
not permission enforcement.
