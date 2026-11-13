# Jai Bhakti Design Hub

[![Registry integrity](https://github.com/suyashb734/jaibhakti-design/actions/workflows/validate-design.yml/badge.svg)](https://github.com/suyashb734/jaibhakti-design/actions/workflows/validate-design.yml)

Versioned product design, decisions and engineering handoff for Jai Bhakti web and mobile. The web acquires bookings; the mobile app will show booking updates, evidence and management, and allow devotees to book more.

**Current status: baseline import and design review. No engineering handoff release is approved yet.** The 49-state Daan Seva prototype is a draft candidate. Its UI checks are useful evidence; they do not establish production readiness or product signoff.

## Review queue

Track the [first design change](https://github.com/suyashb734/jaibhakti-design/issues/7) and its six decision issues in the [handoff milestone](https://github.com/suyashb734/jaibhakti-design/milestone/1). The fifteen inconsistencies remain mapped in the structured register.

## Start here

- [Management recommendation](docs/03_GitHub_Workflow.md) explains the repository and review model.
- [Source audit and inconsistencies](docs/01_Source_Audit.md) compares the original design, live web and candidate.
- [Web and mobile model](docs/02_Web_and_Mobile_Model.md) defines proposed responsibilities, shared records and checkout continuity.
- [Measurement protocol](docs/04_Measurement_Protocol.md) defines what to measure before a change is accepted.
- [Decision queue](registries/decisions.json) groups the fifteen findings into six review decisions.
- [Tech handoff checklist](docs/05_Engineering_Handoff.md) defines the release gate.
- [Migration plan](PLANS.md) lists phases, exit criteria and the next concrete work.

Download the repository and open [index.html](index.html) to browse the local references. GitHub displays HTML as source; no public preview site is published by this repository.

## What was imported

| Source | Role | Evidence |
| --- | --- | --- |
| Original complete design | Historical design ancestor | [Jai Bhakti App.html](<references/initial-prototype/Jai Bhakti App.html>), 6,033,498 bytes, 40 bundled assets, 12 advertised entry states |
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
tokens/          Candidate design tokens awaiting visual approval
registries/      Sources, screen IDs, requirements, changes and decisions
changes/         One reviewable package for each product change
docs/            Platform, review, measurement and handoff guidance
references/      Immutable imports and dated live observations
previews/        Editable mobile draft and the web baseline entry
releases/        Approved handoff manifests, separate from live deployment
tools/           Integrity and handoff validation
.github/         Review templates, issue forms, code owners and CI
artifacts/       Generated comparison evidence, ignored by Git
```

Production web, native app and backend implementations can remain in their existing repositories. Each implementation ticket should link the approved design release, change ID and relevant screen or requirement IDs.

## Review workflow

Create a change branch and package, update its requirements and affected screens, attach comparable before and after evidence, and open a pull request. Record product and design decisions plus engineering acknowledgement. A design release is ready only when its scoped blockers are resolved and its versioned manifest is approved. Track implementation and verified deployment separately.

There are currently 49 app candidate states, 12 original entry-state references and 6 live observations in the screen registry. All candidate states remain Draft. The 22 specification acceptance criteria are mapped to representative candidate states, without claiming individual signoff.

## Checks

```bash
python3 tools/validate_design_hub.py
python3 tools/validate_design_hub.py --handoff
```

The first command validates registry links, IDs, reference hashes and document structure. The second deliberately fails until an approved handoff manifest exists with resolved blockers and named approvals. A passing integrity check is not a design approval.

## Ownership

Repository maintainer: [@suyashb734](https://github.com/suyashb734). Product, design, engineering, operations and payments approvers still need named assignment. CODEOWNERS routes repository review; GitHub branch rules and team review assignments must be configured for the organization’s actual access and plan.
