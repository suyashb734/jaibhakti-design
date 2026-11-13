# Daan Seva required design changes

The existing cream, brown and saffron visual identity can be retained. The priority is to separate an ongoing Nirantar Daan Seva from each dated seva, then make beneficiary, payment and evidence states unambiguous.

The fixes are now applied in [Revised Designs](Revised_Designs/Gallery.html). Open the [clickable prototype](Revised_Designs/Prototype.html) to navigate the revised flow, or browse the PNG exports in `Revised_Designs/screens/`.

The original [visual design review](Design_Review.html) remains available for before and after comparison. It runs as a local HTML file with annotated references and priority filters; it does not require installation or an internet connection. The screenshots show the existing designs. The revised design source, screen exports and interaction notes are in `Revised_Designs/`.

## Contents

- [Revised screen gallery](Revised_Designs/Gallery.html) and [clickable prototype](Revised_Designs/Prototype.html) — applied fixes and exported designs.
- [Design changes applied](Revised_Designs/Design_Changes_Applied.md) — mapping from all 23 change groups to revised views.

- [Design audit](01_Design_Audit.md) — observed gaps, priorities, required changes and checks, linked to source specification sections.
- [Screen change specification](02_Screen_Changes.md) — screen structure, reusable card requirements, both IA alternatives, a common fixture and the design frame checklist.
- [States and acceptance checks](03_States_and_Acceptance.md) — payment, fulfilment and evidence matrices, edge cases, and coverage of all 22 source acceptance criteria.
- [Copy and open decisions](04_Copy_and_Open_Decisions.md) — proposed UI language and operational questions to resolve before implementation.
- [Source specification](references/Daan_Seva_My_Bookings_Update_Specification.docx) — unchanged copy of version 1.0 dated 12 November 2026.
- `references/screens/` — four unchanged PNG artboards and three browser rendered HTML reference captures.
- `references/html/` — all three original HTML exports extracted into separate folders, including their runtimes and supplied assets.
- `references/requirements.json` — structured version of the change register and visual marker locations.
- `references/source_manifest.json` — filenames and hashes of the original input files for traceability.

## Main changes

1. Use My Bookings and Nirantar Daan Seva consistently and remove Chadhava.
2. Separate ongoing parent bookings from Upcoming and Completed dated occurrences; prototype tabs and sections with identical data.
3. Show For beneficiary name and gotra everywhere and add pre first seva editing plus the locked support state afterwards.
4. Replace fixed eight seva progress with continuing configured milestones; keep AutoPay and history going.
5. Show actual introductory and recurring charges, retry deadlines and recovery actions. Register the next eligible date after retry success and preserve the missed one as discontinued.
6. Replace booked occurrence Start Seva actions with tracking or evidence actions, use real fulfilment milestones and ask for ratings only after performance.
7. Add independent certificate and video readiness, in app playback, per asset download and share, and the 48 hour expectation.
8. Correct the prepayment exports’ premature booking success claims and make recurring price and beneficiary review prominent.

The tabbed layout is a recommended starting point. Final layout selection and the operational questions in the copy document remain open. The original files in the parent folder have not been changed.
