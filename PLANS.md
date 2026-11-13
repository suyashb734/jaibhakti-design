# Jai Bhakti design management execution plan

Establish a versioned design hub that lets product, design and engineering agree what changed, which rules apply on web and app, and which exact version is ready to build. Preserve the first complete design and live observations without treating either as the current approved contract.

## Scope

This repository contains design governance, references, registries, proposed shared contracts and handoff records. Production web/app/backend implementation, a mobile framework migration and real payment integration are outside the baseline import. A shared checkout implementation is proposed for consideration rather than selected.

## Phase 0 Baseline import and review

Status: completed locally in the repository bootstrap.

Preserve the original HTML, all 12 advertised entry-state observations, six public live observations, the specification and existing Daan Seva candidate. Register sources, all screen states, 22 source acceptance criteria, 23 historical change groups and 15 inconsistencies. Fork readable mobile source without duplicating its reference PNGs. Add templates and integrity CI. No design approval or deployment is implied.

Exit: files are traceable by hash, links work, imports are labelled correctly and the team has a single entry point.

## Phase 1 Resolve the shared product contract

Repository collaboration setup now includes an exploration register, EXP-0001 for
the existing layout alternatives, shared Codex/Claude instructions, a private
project queue, review/run guidance and on-demand Codespaces configuration. The
working branch remains a draft workspace; final tech handoffs are scoped releases.
See docs/06_Shared_Design_Workspace.md. This setup does not resolve product decisions.

Name product, design, engineering and operations/payments owners. Resolve duration/cancellation, catalogue and temple mapping, price and add-ons, account/beneficiary identity, event sources, legacy purchase handling and source approval. Confirm the full consent flow with the payments team. Decide the initial mobile checkout implementation and browser fallback.

Exit: scoped blockers for the first vertical slice have recorded decisions and signed contract inputs. Design exploration can continue for unaffected areas.

## Phase 2 Build one complete design slice

Continue the readable mobile source migration and introduce the scoped web preview source. Extract shared semantic tokens, catalogue fixtures and copy, without forcing a production framework. Use the real observed product/package IDs where confirmed and clearly separate example IDs. Cover web discovery, consent/confirmation, app continuity, ongoing and dated records, independent evidence and recovery. Prototype both My Bookings layouts with identical content and select one through the specified tasks.

Exit: one coherent slice and its edge cases are reviewable, internally consistent and supported by comparable before/after evidence. The 49-state candidate is migrated or updated as scoped, not blindly declared approved.

## Phase 3 Measure and approve a handoff release

Pin the screenshot environment, fixtures, clock and viewport cases. Generate visual and behavioral evidence, complete content/accessibility review, and record named approvals plus engineering acknowledgement. Add a release manifest with exact commit, artifact hashes, scoped blockers and acceptance conditions.

Exit: the handoff gate passes for an explicitly versioned scope. Stable release tags identify approved design packages; candidate tags remain review versions.

## Phase 4 Implement and verify parity

Link implementation issues and PRs to the approved package. Resolve deviations explicitly, verify the agreed cases on staging and actual supported devices, then record deployment separately. Retain legacy record and payment continuity checks.

Exit: implementation and live verification evidence link back to the same requirement and screen IDs.

## Key assumptions and open decisions

Only the web is live. The mobile implementation stack and production API/provider details have not been supplied. Current public site observations are dated evidence, not backend confirmation. The source document labels decisions confirmed, but organization-level approval evidence is not yet recorded. Repository maintenance and product approval are different roles.

## Rejected starting approaches

Avoid one repeatedly overwritten packed HTML file: the 6 MB export makes rule changes difficult to review. Avoid independent web and app product rules: prices, beneficiary ownership and payment outcomes would drift. Avoid a production rewrite during repository setup: the stack and commercial decisions are unresolved. A separate design hub can move into a product monorepo later if the team prefers, preserving its IDs and release history.

## First execution brief

Assign owners and resolve the recurring duration, catalogue/pricing and web-to-app ownership decisions first. Produce one approved price and consent example for Rahu ₹51/₹121 and Gaj Mahalakshmi ₹51/₹101, with exact service identity, cadence, cancellation and status transitions. Review existing mandate terms before any legacy conversion. This unlocks a coherent checkout-to-app slice and gives the tech team something concrete to implement.
