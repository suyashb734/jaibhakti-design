# Daan Seva design audit

The existing visual identity can be retained. The required redesign separates the ongoing Nirantar Daan Seva from every dated seva and makes payment, beneficiary identity and completed evidence explicit. Fix these product and information gaps before polishing illustrations.

Review date: 12 November 2026. 23 change groups: 14 P0, 8 P1 and 1 P2. P0 blocks a coherent product flow; P1 completes the handoff and usability; P2 is visual polish. Priorities are proposed in this review, not labels from the source specification.

## Source set

The product authority is **My Bookings and Nirantar Daan Seva Update Specification**, version 1.0, dated 12 November 2026. Findings cite its section headings rather than unverified page numbers. The four PNG artboards and three HTML export views are the supplied design evidence. The four similarly named CPGZ companions are not counted as additional artboards.

The payment exports are two distinct variants and both were inspected. The variant whose archive name ends in “(1)” includes recurring pricing and rendered image assets; the other has no recurring price disclosure. Their example beneficiary gotras also differ. Neither is assumed to be the final approved variant.

## What to preserve

- Cream surfaces, deep brown text and saffron actions give the screens a recognisable devotional identity.
- Rounded cards, clear section grouping, offering quantity and full dates on list cards are a useful starting point.
- Keep the occurrence date rail and expandable bill pattern, with clearer scope, labels and states.
- The details export already collects name and gotra, and the alternative payment export begins to disclose recurring pricing.

## Change register

| ID | Priority | Change |
| --- | --- | --- |
| [D01](#d01) | P1 | Use My Bookings at every entry point |
| [D02](#d02) | P0 | Replace Chadhava with the three booking categories |
| [D03](#d03) | P0 | Separate the ongoing booking from each dated seva |
| [D04](#d04) | P1 | Use Nirantar Daan Seva and a separate cadence |
| [D05](#d05) | P0 | Identify the beneficiary on every booking and occurrence |
| [D06](#d06) | P0 | Replace the eight box plan with continuing milestone progress |
| [D07](#d07) | P0 | Make the next AutoPay charge visible |
| [D08](#d08) | P0 | Show only eligible registered upcoming occurrences |
| [D09](#d09) | P1 | Use a tracking action for upcoming sevas |
| [D10](#d10) | P0 | Expose independent certificate and video states |
| [D11](#d11) | P0 | Add the Nirantar parent detail and full history |
| [D12](#d12) | P0 | Use actual fulfilment events in the occurrence timeline |
| [D13](#d13) | P1 | Show rating only after performance |
| [D14](#d14) | P0 | Design retry inactive and cancelled payment states |
| [D15](#d15) | P0 | Add beneficiary editing and the locked support state |
| [D16](#d16) | P0 | Explain the actual amount in each occurrence bill |
| [D17](#d17) | P0 | Remove booking success claims before payment |
| [D18](#d18) | P0 | Disclose the first and regular amounts together |
| [D19](#d19) | P1 | Make beneficiary review explicit outside the illustration |
| [D20](#d20) | P1 | Unify Daan Seva and the content glossary |
| [D21](#d21) | P1 | Add empty loading synchronization and error variants |
| [D22](#d22) | P1 | Validate accessibility long content and small screens |
| [D23](#d23) | P2 | Choose one illustration style after the flow is correct |

<a id="d01"></a>
## D01 Use My Bookings at every entry point

**P1 · Required by specification**. Location: Home, Profile.

Observed: Home says “Bookings”; Profile says “My Orders”. The list screen already says “My Bookings”, despite its exported filename.

Required change: Use “My Bookings” on Home and Profile. Profile helper text: “Track your Daan Sevas, certificates and videos”. Both open the same destination. Check the longer Home label at mobile widths.

Acceptance: Home and Profile reach the same My Bookings view without order terminology.

Reference: specification — Entry points and page header; Content updates to current screens

<a id="d02"></a>
## D02 Replace Chadhava with the three booking categories

**P0 · Required by specification**. Location: My Bookings.

Observed: The My Bookings screen has a “Chadhava Orders” control and three unbounded sections.

Required change: Remove Chadhava. Prototype A with Nirantar Sevas, Upcoming and Completed tabs, and B with the same three ordered sections and View all previews. Use identical records and states. Prefer A for the first prototype; select the final layout after task testing.

Acceptance: Both options cover the same data, including two beneficiaries and a payment issue; older certificates remain findable.

Reference: specification — My Bookings information architecture

<a id="d03"></a>
## D03 Separate the ongoing booking from each dated seva

**P0 · Required by specification**. Location: My Bookings, Seva Status.

Observed: The recurring card and date rail combine overall progress with tracking for an individual date. A dedicated parent detail is not supplied.

Required change: Create separate Nirantar parent and occurrence detail views. Parent cards use “View Details”; dated cards use “Track Seva Details”. Keep the parent reference and occurrence reference distinct. One time sevas have no parent.

Acceptance: Users can explain the difference between managing an ongoing seva and tracking one date; each dated record owns its bill and evidence.

Reference: specification — Booking model; Duplication rule; Nirantar Daan Seva detail

<a id="d04"></a>
## D04 Use Nirantar Daan Seva and a separate cadence

**P1 · Required by specification**. Location: My Bookings, Seva Status.

Observed: The list says “Recurring Sevas” and the date rail says “Recurring Sevas · Every Tuesday”.

Required change: Use “Nirantar Sevas” for the category and “Nirantar Daan Seva” for the parent type. Show Weekly, Monthly, Every Amavasya or Every Ekadashi separately, followed by a readable schedule where known.

Acceptance: All four cadences have appropriate labels and real dates when confirmed; no fixed weekly assumption leaks into lunar or monthly bookings.

Reference: specification — Terminology and naming; Cadence labels

<a id="d05"></a>
## D05 Identify the beneficiary on every booking and occurrence

**P0 · Required by specification**. Location: Profile, My Bookings, Seva Status, Your details export.

Observed: List cards show “Rohit Sharma” without “For” or gotra; occurrence identity lacks beneficiary details. The profile gotra describes the account holder.

Required change: Show “For {beneficiary name} · {gotra} gotra” on every parent and occurrence card and detail. Do not substitute the account profile identity. Keep a booking reference for identical names and gotras; let names wrap.

Acceptance: Two identical sevas for different beneficiaries or gotras can be distinguished from the list. Bills and historical records keep the occurrence identity.

Reference: specification — Beneficiary name and gotra; Multiple booking identification

<a id="d06"></a>
## D06 Replace the eight box plan with continuing milestone progress

**P0 · Required by specification**. Location: My Bookings, Seva Status.

Observed: The parent says “1 of 8 sevas completed” with eight boxes; the date rail says “1 of 8 done”. This implies a finite booking.

Required change: Use the configured recommended milestone, for example “4 of 7 recommended weeks completed”. Count performed occurrences only. At seven, recognise completion and show 7 of 14 when configured. Preserve the cumulative total and explain that AutoPay continues until cancelled through the UPI app.

Acceptance: Reaching a target neither resets the count, stops AutoPay nor creates a milestone certificate. Nonweekly labels match their configured cadence.

Reference: specification — Core product decision; Recommended milestone behavior

<a id="d07"></a>
## D07 Make the next AutoPay charge visible

**P0 · Required by specification**. Location: My Bookings.

Observed: The parent shows AutoPay Active and ₹101 per seva, but no next debit date or distinction from the ₹51 introductory bill.

Required change: Show current AutoPay state, actual next charge amount and date when known, alongside the next eligible seva and its registration state. Retain first charge and regular charge context in parent billing details.

Acceptance: A user can distinguish the next charge date from the seva date and the introductory charge from the recurring amount.

Reference: specification — Nirantar Daan Seva card requirements; Pricing and AutoPay

<a id="d08"></a>
## D08 Show only eligible registered upcoming occurrences

**P0 · Required by specification**. Location: My Bookings.

Observed: The current static example has one scheduled card; the supplied designs do not define projected dates, duplicates or source labels.

Required change: Upcoming contains only the next Registered or Scheduled occurrence per Nirantar parent plus all upcoming individual bookings. Use Nirantar or One time labels, beneficiary and gotra, full date including year, offering quantity and nearest first sorting. Unregistered future dates stay out of Upcoming.

Acceptance: There is at most one upcoming occurrence per parent; payment discontinued dates are excluded; a parent and its next occurrence are intentionally allowed in separate categories.

Reference: specification — Relationship rules; Upcoming occurrence card requirements

<a id="d09"></a>
## D09 Use a tracking action for upcoming sevas

**P1 · Required by specification**. Location: My Bookings.

Observed: The upcoming scheduled card uses “Start Seva”.

Required change: Replace it with “Track Seva Details” and route to that occurrence. This replacement is specific to a booked occurrence; acquisition CTAs on Home are a separate context.

Acceptance: The action opens the selected beneficiary and date, with room for the full label at narrow widths.

Reference: specification — Terminology and naming; Primary action matrix

<a id="d10"></a>
## D10 Expose independent certificate and video states

**P0 · Required by specification**. Location: My Bookings, Seva Status.

Observed: The completed card still says “Start Seva”; the detail combines certificates and video into one future promise. No asset viewers are supplied.

Required change: Keep every performed date in Completed, newest first, with actual amount and independent certificate and video readiness. Use View Seva Details while preparing, Watch Videos when available and View Certificate when ready. Add in app multi video playback and per asset Download and Share. Show the 48 hour expectation from performance; expose support if overdue.

Acceptance: Certificate ready with videos preparing, videos ready with certificate preparing, multiple videos and one failed asset all work independently.

Reference: specification — Completed occurrence card requirements; Certificate and video experience

<a id="d11"></a>
## D11 Add the Nirantar parent detail and full history

**P0 · Required by specification**. Location: Seva Status.

Observed: The current Seva Status screen supplies a useful horizontal date rail, but no independent ongoing booking management page.

Required change: Add identity, cadence, progress, next eligible seva, AutoPay, beneficiary management, email and WhatsApp support, and full date based history including Discontinued records. Keep the rail as an optional navigation component with state text and a View all history destination.

Acceptance: An older certificate and a discontinued date remain reachable; projected dates never look registered or completed.

Reference: specification — Nirantar Daan Seva detail; Date navigation

<a id="d12"></a>
## D12 Use actual fulfilment events in the occurrence timeline

**P0 · Required by specification**. Location: Seva Status.

Observed: “Seva instructions” is shown as a completed green timeline stage. There is no explicit Performed event, and certificate and video delivery are combined.

Required change: Use Booked, Scheduled and Performed as fulfilment stages. Move instructions into an expandable block. Add Discontinued for payment failure. Put certificate and video status in separate asset sections. Use the date scoped title “Daan Seva Details” with current status and beneficiary context.

Acceptance: Reading instructions never changes fulfilment progress. Performed is explicit and evidence readiness does not change the performed state.

Reference: specification — Daan Seva occurrence detail; Timeline guidance

<a id="d13"></a>
## D13 Show rating only after performance

**P1 · Required by specification**. Location: Seva Status.

Observed: The supplied detail asks for a rating while the selected occurrence is still scheduled.

Required change: Hide rating until the occurrence is Performed. Rating can be available while certificate or videos are preparing.

Acceptance: Registered and Scheduled occurrences have no rating prompt; a performed occurrence can be rated before its media arrive.

Reference: specification — Rating visibility

<a id="d14"></a>
## D14 Design retry inactive and cancelled payment states

**P0 · Required by specification**. Location: New states or screens not supplied.

Observed: Only AutoPay Active is shown. No payment recovery, retry deadline or UPI cancellation state is supplied.

Required change: Add Payment retrying, Inactive and Cancelled variants to parent cards and details. A failed payment discontinues the affected date; retries last up to 10 days. Successful retry registers the next eligible date without reviving the missed one. Inactive offers Restart Nirantar Seva; Cancelled offers Book This Seva Again. Explain UPI app cancellation. Include no pause or skip controls.

Acceptance: Retry success and expiry preserve the missed date as Discontinued. Restart reviews the beneficiary and creates a new mandate when necessary.

Reference: specification — Payment lifecycle; Plan payment states; Cancellation and restart

<a id="d15"></a>
## D15 Add beneficiary editing and the locked support state

**P0 · Required by specification**. Location: New states or screens not supplied.

Observed: No parent beneficiary edit flow or post first seva locked state is supplied.

Required change: Allow name and gotra review and editing before the first performed seva. Lock self service afterwards, with WhatsApp and Email Support. Preserve historical identities and define the precise lock timestamp with operations.

Acceptance: Before first performance the update applies to first and future sevas; afterwards a change request goes to support and past bills or certificates are not silently rewritten.

Reference: specification — Beneficiary name and gotra; Editing rules

<a id="d16"></a>
## D16 Explain the actual amount in each occurrence bill

**P0 · Required by specification**. Location: Seva Status.

Observed: The detail bill is ₹51 while the recurring card says ₹101 per seva; the introductory relationship is not explained.

Required change: Label the introductory occurrence bill “Amount paid ₹51 · Introductory price”. Later bills show the actual recurring amount paid. Place next expected AutoPay details in the parent; do not imply ₹51 repeats indefinitely.

Acceptance: A first ₹51 bill and later ₹101, ₹121 or ₹151 bills match their actual records without contradiction.

Reference: specification — Pricing and AutoPay; Detail and completion updates

<a id="d17"></a>
## D17 Remove booking success claims before payment

**P0 · Required by specification**. Location: Payment export without recurring price, Payment export with recurring price.

Observed: Both exports say “We’ve booked your Dan Seva” and “Your name and gotra have been sent” while also saying “Pay to confirm”. Their green success treatment reinforces the conflict.

Required change: Before payment use a review and payment state, for example “Review your Daan Seva”. Reserve booking success for confirmed payment and registration. Show sent or delivered only when the relevant operational event is confirmed. Add processing and pending verification states without a success promise.

Acceptance: No unpaid or unverified state claims a confirmed booking. Successful payment without confirmed registration remains pending until verified.

Reference: specification — Payment lifecycle; Timeline guidance. Purchase screens are adjacent consistency fixes, outside the full checkout redesign scope.

<a id="d18"></a>
## D18 Disclose the first and regular amounts together

**P0 · Required by specification**. Location: Home, Payment export without recurring price, Payment export with recurring price.

Observed: Home presents ₹51 against a struck ₹101 as an offer. The base payment export omits recurring pricing; the alternative adds only a small “₹101 autopay from next week · Cancel anytime” footer.

Required change: Before confirmation show “First Daan Seva ₹51 · Then ₹101 every Friday until cancelled in your UPI app” for this example, using configured amounts and cadence. Keep the disclosure prominent beside the payment action. Reconcile the offer treatment on Home with the ongoing price. Do not infer an end after a milestone.

Acceptance: Both amounts, cadence and the UPI cancellation route are readable before the user confirms. One time bookings never inherit recurring disclosure.

Reference: specification — Price disclosure; Confirmed product decisions. Checkout changes are limited to consistency with these product rules.

<a id="d19"></a>
## D19 Make beneficiary review explicit outside the illustration

**P1 · Required identity with recommended form treatment**. Location: Your details export, Payment export without recurring price, Payment export with recurring price.

Observed: The details form says “Your name”. Payment illustrations partially cover the name and gotra; the two variants use different gotras for their sample beneficiary.

Required change: Use “Beneficiary name” or “Who is this seva for?” and display a plain name and gotra review block before confirmation. Carry the entered values forward unchanged. Keep them out of decorative artwork as the sole review surface.

Acceptance: A booking for another family member is unambiguous; name and gotra are visible without interpreting the illustration.

Reference: specification — Beneficiary name and gotra; Initial booking. Form treatment is a design recommendation for the supplied adjacent screens.

<a id="d20"></a>
## D20 Unify Daan Seva and the content glossary

**P1 · Required by specification**. Location: My Bookings, Seva Status, Your details export, Payment export without recurring price, Payment export with recurring price.

Observed: HTML exports use “Dan Seva”; the PNGs use “Daan Seva”. Temple and ritual spellings also vary across the examples.

Required change: Use Daan Seva and Nirantar Daan Seva consistently. Agree approved temple names and ritual transliterations with content and operations, then reuse them across UI, notifications and certificates. Do not assume differing offerings in separate samples are one booking.

Acceptance: No “Dan Seva”, “Recurring Sevas”, Chadhava or customer facing order terminology remains in this booking journey.

Reference: specification — Terminology and naming; Content consistency

<a id="d21"></a>
## D21 Add empty loading synchronization and error variants

**P1 · Required booking states with recommended form states**. Location: New states or screens not supplied.

Observed: Supplied designs show populated happy paths; the form displays Verify and an empty OTP area together, with no supplied validation or expired code states.

Required change: Add per category empty views, stable loading placeholders, data errors, preserved last known UPI state during sync, media loading errors and download or share feedback. For the adjacent form, design phone validation, OTP sent, invalid and expired OTP, resend and expiry states if that flow remains in scope.

Acceptance: Loading does not falsely show Active or erase a ready asset. A failed video does not block a ready certificate. Form errors retain entered beneficiary information.

Reference: specification — Empty loading error and edge states; Loading and synchronization. OTP variants are an adjacent recommendation.

<a id="d22"></a>
## D22 Validate accessibility long content and small screens

**P1 · Required by specification**. Location: Home, Profile, My Bookings, Seva Status, Your details export, Payment export without recurring price, Payment export with recurring price.

Observed: The exports use fixed 393 by 852 containers with overflow hidden and bottom positioned actions. Some small helper text and long names need review; date states rely heavily on visual treatment.

Required change: Add state text, selected semantics, readable progress and meaningful video labels. Let long beneficiary, temple and offering names wrap. Check contrast and comfortable touch areas. Validate scrolling, safe areas, keyboard and text enlargement; keep the payment action and price disclosure reachable.

Acceptance: No clipping at 360 and 390 widths or enlarged text; focus order follows identity, status, instructions, media, bill, rating and support. Confirm contrast in the final design rather than assuming a failure.

Reference: specification — Accessibility and interaction requirements; Date rail behavior. Fixed layout observations describe the exports, not a tested production implementation.

<a id="d23"></a>
## D23 Choose one illustration style after the flow is correct

**P2 · Design recommendation**. Location: Payment export without recurring price, Payment export with recurring price.

Observed: The base payment export uses flat vector artwork; the alternative combines rendered phone and temple images. Both spend substantial space on decorative delivery imagery.

Required change: Choose one illustration family and use it consistently. Keep payment status, beneficiary review and recurring price higher in the hierarchy. Preserve the cream, deep brown and saffron identity and reusable rounded card treatment.

Acceptance: The selected variant communicates the actual current state before decorative content, with all required information visible.

Reference: specification — Visual review of both payment exports; visual design system is outside the specification scope.

## Scope and review limits

The main scope is My Bookings, parent and occurrence details, payment visibility, beneficiary management, and evidence. The supplied checkout exports are reviewed only for consistency with confirmed identity, registration and price rules. A full checkout or UPI integration redesign is not included.

Static designs show intended presentation, not backend behaviour. A missing state means it is absent from this supplied design set; it is not a claim that the production app lacks the feature. Contrast, touch targets, screen reader output and live payment synchronization need validation during implementation.
