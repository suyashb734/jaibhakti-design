# Daan Seva screen change specification

Update the four existing mobile screens and add the missing parent, payment, beneficiary and evidence views. Preserve the visual identity while separating ongoing booking management from tracking one date. The requirements below are applied in [Revised Designs](Revised_Designs/Gallery.html); annotated references in Design_Review.html show the current screens.

## Home and Profile

**Home — D01 D18 D22.** Replace Bookings with My Bookings and check the header at 360 and 390 px. Keep the existing acquisition action context; the Track Seva Details replacement applies to booked occurrences. Present the ₹51 introductory amount in a way that does not conceal the ongoing configured price. The full first and regular price disclosure must be visible before confirmation.

**Profile — D01 D05.** Replace My Orders with My Bookings and use the helper text “Track your Daan Sevas, certificates and videos”. The account holder’s name and assigned gotra are not a substitute for each booking’s beneficiary. Preserve the other profile rows unless their own scope changes.

## My Bookings alternatives

**Option A — tabbed.** Header My Bookings; tabs Nirantar Sevas, Upcoming, Completed. Default to Nirantar Sevas when an active or payment affected parent exists. Upcoming can be the default when no Nirantar booking exists. Each tab has independent loading, empty, error and populated variants. Keep tab selection visible and accessible.

**Option B — sections.** Header My Bookings; Nirantar Sevas, Upcoming Sevas, Completed Sevas in that order. Use controlled previews and View all on long lists. The full completed history cannot be limited to the preview. View all preserves the relevant category and ordering.

Remove Chadhava in both. Both options must use the same fixture and states below. Option A is the recommended first prototype, not a final selected design. Evaluate the five tasks from the specification: find the next weekly seva, open an older certificate, distinguish a family member’s booking, understand a payment problem, and find a preparing video. Compare task completion, mistakes, backtracking and ability to explain the parent versus date distinction. Set success thresholds with product before testing.

### Reusable parent card

In reading order show:

1. Nirantar Daan Seva and a separate cadence badge.
2. Full seva name and temple, with wrapping.
3. For beneficiary name and gotra.
4. Human readable schedule.
5. Cumulative completed count against the configured recommended milestone.
6. Next eligible seva date and whether Registered, Scheduled or Awaiting payment.
7. AutoPay state, next charge amount and next charge date when known.
8. View Details, or the payment specific action for the state.

This card links to the ongoing booking. A next eligible date may be shown here before payment registers it, clearly labelled Awaiting payment. That date must not appear as a registered item in Upcoming. The next charge and next seva can refer to different future cycles if the nearer seva is already paid; retain their separate labels.

### Reusable upcoming card

Show Nirantar or One time; offering and temple; For beneficiary and gotra; weekday, day, month and year; quantity; Registered or Scheduled; Track Seva Details. Sort nearest first. Include only the next registered or scheduled occurrence per Nirantar parent and all upcoming one time bookings. No future date projections or discontinued dates belong here.

### Reusable completed card

Show Nirantar or One time; offering and temple; beneficiary and gotra; actual performed date; quantity and actual amount paid. Add distinct Certificate and Videos areas. Preparing is an informative state, not an unexplained disabled control. Ready videos include their count. Use View Seva Details while all evidence is preparing, Watch Videos when available and View Certificate when ready. Download and Share can live inside each viewer. Sort newest performed date first and retain each dated occurrence.

## New Nirantar Daan Seva detail

Create a dedicated parent destination with these sections:

1. Identity, reference, cadence, schedule, temple, beneficiary and gotra.
2. Progress and current recommended milestone; next configured milestone when relevant.
3. Next eligible seva and its registration state.
4. AutoPay state, next actual charge, introductory and regular pricing context, retry end date where relevant, and UPI app cancellation guidance.
5. Date based occurrence history, including Discontinued dates. A View all destination exposes the full history.
6. Beneficiary editing before the first performed seva; locked state afterwards.
7. Email and WhatsApp support with the parent reference.

Supply Active, Payment retrying, Inactive and Cancelled variants. The latter two use Restart Nirantar Seva and Book This Seva Again respectively. Review beneficiary details before creating any new mandate. Do not add pause or skip controls. Do not promise an in app mandate cancellation control without confirmed provider support.

## Revise Daan Seva occurrence detail

Use Daan Seva Details and the current occurrence status. A Nirantar occurrence can show its parent link and date navigation; a one time occurrence does not need a parent rail.

Read in this order: source and selected date; offering, temple, quantity and beneficiary identity; current status; Booked, Scheduled and Performed timeline; expandable instructions; independent certificate and video sections; bill; rating after performance; support. Include a booking or occurrence reference in support actions. Email must be available alongside WhatsApp; call can remain as an additional option.

Use text and accessible labels to distinguish Completed, Selected, Upcoming and Discontinued dates. Never imply a future projected date has been paid or registered. The full history includes discontinued dates even though Completed contains performed dates only.

The bill shows the actual occurrence charge and whether it was introductory. It must not present the regular recurring price as money already paid. Keep the existing expandable bill pattern if useful.

## New evidence viewers

**Certificate.** Show the occurrence date and beneficiary identity with the certificate. Support view, download and share, plus loading and failure feedback.

**Videos.** Play within the app. Display a thumbnail or descriptive title, meaningful numbering and duration when available. Support multiple videos and download and share for each. One failed playback or download must not hide other ready videos or the certificate.

Use a single expectation of within 48 hours after performance. If only one asset is ready, expose it immediately. If an expected asset is overdue, add support with the occurrence reference. Do not create a milestone certificate.

## Beneficiary editing

Provide editable name and gotra with review and save confirmation before the first seva is performed. Explain that the change applies to the first and future occurrences. Add validation, saving and failure states. After the first performed seva, show locked fields and WhatsApp Support and Email Support. A support request for a future change must not automatically rewrite older bills or certificates.

## Payment and details export consistency

These are targeted changes to the supplied adjacent screens, not a complete checkout redesign.

- Details: change the ambiguous Your name label to Beneficiary name or introduce Who is this seva for. Keep name and gotra editable and carry the entered values into an explicit review block.
- Prepayment: use review or payment pending language. Remove booked, delivered and green success claims until the corresponding event is confirmed.
- Disclosure: show the first amount, ongoing amount, cadence and UPI app cancellation route together near the confirmation action. The alternative export’s footer is a starting point, not the whole disclosure.
- Payment: distinguish awaiting action, processing, pending confirmation, failure and success with confirmed registration. Do not substitute these payment states for occurrence fulfilment states.
- Review: show beneficiary and gotra as normal readable text outside the envelope artwork. Use one consistent illustration style after the flow is settled.
- Layout: allow scroll, keyboard access and safe area space. The fixed 393 by 852 reference artboards do not establish responsive production behaviour.

## Common evaluation fixture

Use this same fictional snapshot in both layout prototypes: **12 November 2026 at 10 AM IST**. It is a test fixture, not a report of actual bookings. All history dates, amounts and readiness states in a prototype must agree with it.

| Record | Example state | Where it appears |
| --- | --- | --- |
| N1 Rohit Sharma Kashyap gotra weekly Tuesday | Active, 4 of 7 performed; 10 November is latest performed; next eligible 17 November awaits payment; next charge ₹101 on 16 November | Nirantar and parent detail; the unregistered 17 November date is absent from Upcoming |
| N2 Aarav Sharma Bharadwaj gotra weekly Friday | Active, 3 of 7 performed; ₹101 charge on 12 November registered 13 November; next charge ₹101 on 19 November | Nirantar plus the 13 November Scheduled occurrence in Upcoming |
| N3 Meera Sharma Kashyap gotra weekly Tuesday | Payment retrying; 10 November Discontinued; example retry deadline 20 November | Nirantar and full history, never Completed or Upcoming for the missed date |
| O1 Kavita Sharma Vashishtha gotra one time | Scheduled for 14 November | Upcoming only, no parent |
| N1 occurrence on 10 November | Performed; certificate Ready and 2 videos Ready; actual bill ₹101 | Completed and its own dated detail |
| O2 one time occurrence on 12 November at 9 AM | Performed; certificate Preparing and videos Preparing at the snapshot time | Completed; 48 hour expectation begins at its performed timestamp |

N1 and N3 should use the same Tuesday offering and temple to test beneficiary identification. Include older dates for the certificate retrieval task. Test milestone completion, retry success, inactive, cancelled and the two partial media readiness combinations as additional variants. Do not silently change the fixture between layout options.

## Design frame checklist

The corresponding frames and state variants are now included in [the revised screen gallery](Revised_Designs/Gallery.html) and [clickable prototype](Revised_Designs/Prototype.html). Use this checklist to review the design handoff.

- Updated Home and Profile entry points.
- My Bookings Option A in all three selected tabs, and Option B with the same fixture and View all lists.
- Nirantar card variants for four payment states and four supported cadences.
- Upcoming cards for Nirantar and one time sevas, including long names and gotras.
- Completed cards for both preparing, certificate only ready, videos only ready, and both ready.
- Parent detail with full history, milestone recognition and next milestone progression.
- Occurrence details for Registered, Scheduled, Performed and Discontinued.
- Beneficiary edit before first performance, validation failure and locked support state afterwards.
- Certificate viewer, multi video viewer, asset error and overdue support states.
- Payment retry deadline, retry success into the next eligible date, retry expiry and new mandate review.
- Empty, loading, error and synchronization variants for the lists and details.
- Adjacent details and payment review corrections, with accessible layouts and prepayment disclosure.
