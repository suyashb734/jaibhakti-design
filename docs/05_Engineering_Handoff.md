# Engineering handoff gate

Give the tech team one approved, versioned package with an exact commit. It must explain intended behavior, platform responsibilities, source data, changes and outstanding work. An HTML export or a green prototype integrity check is insufficient on its own.

## Required package

- Change ID, problem, final scope and source baseline IDs.
- Affected web/app screens and requirements with stable IDs.
- Readable design source, linked preview, brand assets, token version and copy.
- Representative fixtures with distinct account, beneficiary, product, temple, parent, occurrence, payment and asset IDs.
- State transitions, empty/loading/error/partial states and notification/deep-link destinations.
- First and regular price examples for the included offers; duration, cancellation, retry and legacy rules.
- Before/after/diff artifacts with capture metadata and the intentional changes explained.
- Acceptance results with tested/not-tested scope and remaining dependencies.
- Named product/design approvals, operational/payment confirmations where applicable, and engineering acknowledgement.
- Implementation issue/PR links and release manifest with source commit and artifact checksums.

## Readiness checklist

1. Every included screen and requirement is registered and linked to a change.
2. Every scoped blocker in the inconsistency register is resolved with a decision and evidence. Unrelated unresolved work may be explicitly excluded.
3. Product/package/temple mapping and purchased price snapshots are agreed. Existing purchases retain their actual accepted terms.
4. Web and app share the account and booking continuity contract; guest claiming and recovery are defined.
5. The correct first and recurring amounts, cadence, duration and cancellation route are visible before authorization in the selected flow.
6. Actual server/provider/fulfilment events drive payment, registration, milestones and media states.
7. The critical cross-platform slice and its recovery cases have design evidence; prototype-only checks are clearly separated from staging/native verification.
8. The selected My Bookings layout and visual tokens are recorded, with long-content and accessibility review.
9. The package is feasible for the agreed tech stack, including media sharing, in app playback, notifications and provider return handling.
10. Product and design approve the exact version, operations/payments confirm affected rules, and engineering acknowledges the handoff.

An approved design may enter implementation while staging/backend tests are scheduled, but those tests must remain open implementation acceptance conditions. They cannot be marked passed by a design preview.

## Release manifest

Create one manifest from [the template](../templates/handoff-manifest.json), record its exact commit and artifact checksums, and resolve its blockers. Run `python3 tools/validate_design_hub.py --handoff`. That check validates the record, not the authenticity of human approval; link the actual review evidence.

The repository currently has no approved handoff releases. Its source import and 49-state candidate must not be passed to engineering as a final approved product contract.

## Implementation and live verification

Engineering tickets cite the design release plus screen/requirement IDs. Any implementation departure is a linked decision or follow-up design change. Review staging against the same fixtures and cases, record the implementation commit and tested devices, and retain discrepancies. Mark Verified live only after release evidence, not when a design PR merges.
