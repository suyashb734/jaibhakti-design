# Jai Bhakti source audit and inconsistencies

The original complete design, current live web and revised app candidate should be retained as separate references. They share a design history but differ in catalogue, product rules and implementation status. Resolve the commercial and identity conflicts before approving a recurring booking handoff.

The owner has clarified that `Jai Bhakti App.html` was the first final design given
for execution on jaibhakti.com. [JB-BASELINE-001](../baselines/JB-BASELINE-001.md)
records this historical handoff, preserving the original file. The newer candidate
and future handoff approvals remain separate; the original's status is not Draft.

## Review scope

The original packed export was unpacked for inspection: 40 embedded assets comprising 33 WOFF2 fonts, 4 JavaScript resources and 3 PNG images. Its 12 advertised start states were rendered and their content and controls inventoried. Product logic, setup, payment simulation, legacy management handlers and the dated seva view were inspected. Generated React/runtime assets were identified as dependencies rather than treated as authored product logic.

The live web was observed on 13 November 2026 at a 390×844 mobile-sized viewport on public pages. Home, the Rahu, Gaj Mahalakshmi and Triyuginarayan detail pages, and initial Rahu and Gaj Mahalakshmi checkout details were reviewed. No phone verification, mandate authorization, payment or private booking history was performed. The final capture loaded public pages without filling or submitting forms. Earlier phone-emulated checkout inspection blocked non-read requests. Later verified-user checkout behavior is unverified.

The revised candidate has 49 advertised design states and existing prototype validation evidence. It uses sample data and sample media. A supplied reference says decisions are confirmed, but no named product/design release approval is recorded.

The source also contains legacy or deferred navigation and content fragments beyond the advertised entry states. Some start names, including bookings, sevaManage, Gyan and several content routes, are normalized back to Home. Their presence in source is not proof of a complete delivered flow. Rashifal/content expansion requires separate roadmap scope.

## Main comparison

| Area | Original export | Live observations | New specification and candidate |
| --- | --- | --- | --- |
| Catalogue | Seven home cards; Lakshmi at Kolhapur; Hanuman active in the sample | Eight home cards; three active offerings including Rahu and Triyuginarayan; Gaj Mahalakshmi at Ujjain | Representative Ujjain and Hanuman fixtures, not a production catalogue |
| Ongoing duration | Fixed 4/8/16-week configuration and expiry calculations remain in source | Auto-renews wording and selected-week expiry promise coexist | Continuing Nirantar Seva until UPI cancellation |
| Plan actions | Legacy pause and immediate stop handlers | Actual live mandate controls not tested | No pause or skip; cancellation through UPI app |
| Price | Common ₹51/₹101 example, ₹20 sankalp UI, ₹51 legacy extra-name calculation | Active introductory ₹51, with ₹121/₹101/₹151 regular amounts on details | ₹101 acquisition example; regular amount must be configured |
| Beneficiary | Account name/gotra and optional family concepts mixed | Initial checkout collects WhatsApp, name and gotra | Distinct beneficiary per booking and history snapshot required |
| Evidence | Booking certificate and a completed stage coexist in the dated sample | Completed-seva certificate and video promised | Evidence belongs to each performed occurrence and can be independently ready |
| Status | Some legacy completion/payment counts inferred from elapsed time | Backend status source not inspected | Actual fulfilment and provider events required |
| Platform | Packed mobile-sized prototype including legacy one time cart flows | Web only is live | App candidate and future booking continuity need shared contracts |

## Inconsistency register

Severity describes the affected handoff scope. An unresolved billing decision blocks billing approval; it does not stop unrelated visual exploration. The source register keeps owner roles, decisions and eventual issue links.

| ID | Severity | Finding | Owner role |
| --- | --- | --- | --- |
| [INC-001](#inc-001) | blocker | Recurring duration contradicts itself | Product and payments |
| [INC-002](#inc-002) | blocker | Pause and cancellation ownership differ | Product and payments |
| [INC-003](#inc-003) | blocker | Temple and product identity have drifted | Product and operations |
| [INC-004](#inc-004) | blocker | Recurring pricing must be configurable | Product and payments |
| [INC-005](#inc-005) | blocker | Sankalp and family rules are unresolved across sources | Product and operations |
| [INC-006](#inc-006) | blocker | Web bookings do not yet have a documented app ownership contract | Product and engineering |
| [INC-007](#inc-007) | blocker | Booking receipt and performed seva certificate are different artifacts | Product and operations |
| [INC-008](#inc-008) | gap | The candidate is a prototype with separate scenario branches | Design and engineering |
| [INC-009](#inc-009) | decision | Support configuration differs between live and candidate | Operations |
| [INC-010](#inc-010) | blocker | Elapsed time is not a fulfilment event | Operations and engineering |
| [INC-011](#inc-011) | blocker | Initial live checkout displays the first amount without the regular rate | Product and payments |
| [INC-012](#inc-012) | decision | Visual primitives have no selected approved baseline | Design |
| [INC-013](#inc-013) | decision | Information architecture remains a comparison | Product and design |
| [INC-014](#inc-014) | blocker | Legacy mandate migration is unspecified | Product and payments |
| [INC-015](#inc-015) | blocker | Source confirmation and release approval are different | Product, design and engineering |

<a id="inc-001"></a>
## INC-001 Recurring duration contradicts itself

Live detail pages say auto-renews and also that a mandate ends after selected weeks. The original prototype contains fixed 4/8/16-week configuration; the new specification describes indefinite Nirantar Seva.

Resolution needed: Decide actual mandate terms for new bookings, correct every purchase and management surface, and preserve the terms of existing purchases.

Owner role: Product and payments. Affected scopes: recurring-checkout, nirantar-management, legacy-import.

<a id="inc-002"></a>
## INC-002 Pause and cancellation ownership differ

The original source contains pause and stop handlers with immediate AutoPay claims. The new specification forbids pause and skip and directs cancellation to the UPI app. Live mandate controls were not tested.

Resolution needed: Identify provider-supported operations and authoritative states. Remove or classify obsolete prototype controls; define delayed cancellation updates.

Owner role: Product and payments. Affected scopes: recurring-checkout, nirantar-management.

<a id="inc-003"></a>
## INC-003 Temple and product identity have drifted

The original Lakshmi offering is at Mahalakshmi Kolhapur. The live Lakshmi offering is Gaj Mahalakshmi Ujjain. The live catalogue also includes Rahu Paithani and Triyuginarayan.

Resolution needed: Create the authoritative product, package and temple ID mapping. Never match bookings by deity name or silently substitute temples.

Owner role: Product and operations. Affected scopes: catalogue, booking-import, booking-more.

<a id="inc-004"></a>
## INC-004 Recurring pricing must be configurable

Live active offerings show first ₹51 then ₹121, ₹101 or ₹151. The revised app uses a ₹101 example in its acquisition and checkout path.

Resolution needed: Use per-offer pricing, cadence and purchased price snapshots. Test all three active regular price examples across web and app.

Owner role: Product and payments. Affected scopes: recurring-checkout, booking-more, billing.

<a id="inc-005"></a>
## INC-005 Sankalp and family rules are unresolved across sources

Original setup exposes a personal sankalp add-on for ₹20; legacy family calculation uses an extra ₹51. Initial live checkout collects name and gotra; the revised app assumes a distinct beneficiary per booking.

Resolution needed: Define account holder, payer, beneficiaries, assignment of unknown gotra, optional additions and their pricing. Verify later live checkout stages before concluding that an add-on is present or absent.

Owner role: Product and operations. Affected scopes: recurring-checkout, beneficiary-management, billing.

<a id="inc-006"></a>
## INC-006 Web bookings do not yet have a documented app ownership contract

The web uses verified WhatsApp identity. The app prototype uses sample accounts and bookings. Guest claiming, account recovery and legacy mapping are unspecified.

Resolution needed: Agree stable account ownership, authentication/claiming and safe web-to-app handoff. Demonstrate one web-created booking appearing in the same account in the app.

Owner role: Product and engineering. Affected scopes: web-app-continuity, booking-import.

<a id="inc-007"></a>
## INC-007 Booking receipt and performed seva certificate are different artifacts

Original sevaOrder shows a booking certificate promising future performance beside a completed stage. The new specification ties fulfilment certificates to each performed occurrence.

Resolution needed: Name booking receipt and seva certificate separately, define issuance events and keep all media attached to the dated occurrence.

Owner role: Product and operations. Affected scopes: evidence, occurrence-detail.

<a id="inc-008"></a>
## INC-008 The candidate is a prototype with separate scenario branches

The 49 states use sample fixtures, code 1234 for phone verification and sample media. A confirmed checkout scenario does not prove persistence or cross-platform booking synchronization.

Resolution needed: Approve one connected end-to-end slice with realistic fixture IDs and acceptance cases, then verify the implementation on staging.

Owner role: Design and engineering. Affected scopes: web-app-continuity, engineering-handoff.

<a id="inc-009"></a>
## INC-009 Support configuration differs between live and candidate

The live public pages expose WhatsApp and 10:30 AM–9 PM hours. The candidate support actions are demonstrations and email routing is unconfigured.

Resolution needed: Confirm shared support destinations, channel availability, hours and reference-prefill format before approving those actions.

Owner role: Operations. Affected scopes: support, beneficiary-management.

<a id="inc-010"></a>
## INC-010 Elapsed time is not a fulfilment event

The original source infers performed and paid progress from the clock. The specification requires actual performance to increment milestones, and independent certificate/video readiness.

Resolution needed: Define backend event sources and timestamps, including retry discontinuation and per-asset readiness. UI must not infer completion from a scheduled date passing.

Owner role: Operations and engineering. Affected scopes: occurrence-detail, progress, evidence.

<a id="inc-011"></a>
## INC-011 Initial live checkout displays the first amount without the regular rate

The initial checkout details stage reviewed for Rahu and Gaj Mahalakshmi shows Today ₹51 and Pay ₹51. Later verified-user/mandate stages were not entered.

Resolution needed: Review the full consent flow with the payments owner and show the configured recurring amount, cadence, duration and cancellation route before authorization. Do not claim the complete live authorization lacks disclosure based on this initial-stage observation.

Owner role: Product and payments. Affected scopes: recurring-checkout.

<a id="inc-012"></a>
## INC-012 Visual primitives have no selected approved baseline

The packed original, live web and candidate differ in branding, typography, CTA sizing and palette values. The original artboard is 393×852; candidate exports use 390 px artboards at 2×.

Resolution needed: Select semantic tokens and brand assets, distinguish web/app differences, and compare only matching fixtures, viewports and render environments.

Owner role: Design. Affected scopes: design-system, visual-comparison.

<a id="inc-013"></a>
## INC-013 Information architecture remains a comparison

Tabs and sections are both included in the candidate; no named approval or task-test result selects the final layout. Screen count does not establish usability.

Resolution needed: Run the five specification tasks on both layouts with identical content and record the selected option and rationale.

Owner role: Product and design. Affected scopes: my-bookings.

<a id="inc-014"></a>
## INC-014 Legacy mandate migration is unspecified

If existing purchases used a finite mandate, the new indefinite Nirantar model cannot be assumed to describe their purchased terms. Actual provider terms have not been inspected.

Resolution needed: Inventory legacy records and accepted terms. Define display, history import and any explicitly authorized new-mandate conversion; do not silently extend prior purchases.

Owner role: Product and payments. Affected scopes: legacy-import, nirantar-management.

<a id="inc-015"></a>
## INC-015 Source confirmation and release approval are different

The original final execution handoff is owner-confirmed as JB-BASELINE-001. The
newer DOCX calls its inputs confirmed, but exact-version approval and engineering
acknowledgement for the next Daan Seva handoff are not recorded. Earlier prototype
validation is not production verification.

Resolution needed: Preserve the historical handoff record and obtain approval
evidence, tech acknowledgement and implementation links for the newer version.

Owner role: Product, design and engineering. Affected scopes: engineering-handoff.

## Source precedence

Use live observations to describe current public presentation. The original export
is the owner's confirmed first final execution baseline. Use the specification to
identify its stated newer direction and candidate previews as proposals. A named
decision or approved new release resolves a changed rule; a later timestamp alone
does not. Confirm backend and mandate behavior before documenting it as implemented.

See [source metadata](../registries/sources.json), [immutable file hashes](../registries/reference-files.json), [screen registry](../registries/screens.json) and [catalogue observations](../contracts/catalogue-observations.json).
