# JB CHG 0001 Nirantar web and mobile alignment

Design status: Draft. Implementation status: not started in this repository. Product/design approval and engineering acknowledgement: pending.

Human owner: unassigned. Agents used for repository bootstrap: Codex with a read-only
review sidecar. No human product approval has been recorded. The existing layout
comparison is documented as [EXP-0001](../../explorations/EXP-0001/README.md); no
option has been selected. Integration source lives under previews/, not this folder.

The original and live purchase experience contain duration, identity and pricing differences from the new Nirantar direction. This change must align purchase expectations with ongoing management and dated evidence across web and app before handoff.

## Baselines and scope

Use SRC-INITIAL for the first complete design, SRC-LIVE for dated current presentation, SRC-SPEC for its stated product direction and SRC-CANDIDATE for the 49-state proposal. Preserve D01–D23 as historical aliases. The candidate’s 49 app state IDs and all 22 requirements are listed in the registries.

Scope includes shared catalogue/pricing, recurring consent and confirmation, My Bookings, Nirantar parent and occurrence details, beneficiaries, media and cross-platform identity. Legacy purchase display and conversion policy must be agreed. A production app rewrite and unrelated content features are excluded.

## Intended outcome

A user books the actual offering at the displayed temple with the agreed first and regular charges. The correct account sees the same booking in the app, identifies its beneficiary and gotra, finds the next registered date and every performed date, understands payment recovery, and accesses each date’s independently ready evidence. Milestones do not silently end the booking or reset progress.

## Decisions before approval

Resolve every blocking inconsistency affecting this scope, especially INC-001–INC-007, INC-010–INC-011 and INC-014–INC-015. Record the selected My Bookings layout and visual token decision. Do not reinterpret legacy purchases from prototype wording alone.

## Evidence and handoff

Existing candidate validation is prototype-only evidence. Generate comparable captures and scenario outcomes for the agreed vertical slice, including ₹121 and ₹151 offers as well as ₹101. Record named approval and operational/payment confirmation for the exact commit, then engineering acknowledgement. Add the handoff manifest only when the scoped gate passes.

No approved handoff release exists for this change yet.

## GitHub tracking

[Change issue](https://github.com/suyashb734/jaibhakti-design/issues/7) · [Handoff milestone](https://github.com/suyashb734/jaibhakti-design/milestone/1)

- [DEC-001](https://github.com/suyashb734/jaibhakti-design/issues/1) Recurring duration cancellation and legacy mandates
- [DEC-002](https://github.com/suyashb734/jaibhakti-design/issues/2) Catalogue identity configured pricing and consent
- [DEC-003](https://github.com/suyashb734/jaibhakti-design/issues/3) Account ownership and web to app continuity
- [DEC-004](https://github.com/suyashb734/jaibhakti-design/issues/4) Beneficiary gotra family add ons and documents
- [DEC-005](https://github.com/suyashb734/jaibhakti-design/issues/5) Fulfilment payment media events and support
- [DEC-006](https://github.com/suyashb734/jaibhakti-design/issues/6) Visual baseline layout selection and handoff approval
