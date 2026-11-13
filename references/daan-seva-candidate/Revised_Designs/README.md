# Revised Daan Seva designs

The design fixes have been applied to a clickable mobile prototype and exported screen states. The original cream, brown and saffron identity is retained, with the booking structure, beneficiary information, payment copy and evidence experience revised.

Open [Gallery.html](Gallery.html) to review the exported designs, or [Prototype.html](Prototype.html) to use the connected screens. Both open locally without installation or a web server. The navigation beside the prototype opens each design state; on a phone choose All screens.

## What is included

- Updated Home and Profile.
- My Bookings with all three tabs, plus the section based comparison layout using the same booking fixture.
- Separate ongoing Nirantar and dated seva details, with full history and older certificate access.
- Active, retrying, inactive, cancelled, synchronizing and successful retry variants.
- Continuing milestone progress with the 7 of 14 state and no milestone certificate.
- Editable and locked beneficiary states, including validation.
- Registered, scheduled, performed and discontinued occurrence states.
- Independent certificate and video readiness, partial readiness, overdue media and a video error state.
- In app video playback, sample asset downloads and sharing where the browser supports the file type.
- Corrected details, verification and payment review, with processing, pending, failed and confirmed outcomes.
- Empty, loading and error states; cadence examples and long beneficiary names.

The `screens/` folder contains the PNG exports at twice the 390 px artboard resolution. `Screens_Manifest.json` maps every export to its prototype route. `Design_Changes_Applied.md` maps the original change register to the revised screens. `Screen_Overview.png` provides a quick look at the main designs.

## Useful prototype paths

1. Home → Book This Seva → enter beneficiary, gotra and phone → Verify Phone Number → enter **1234** → Review Seva and Payment.
2. Review the first and regular price, agree to the displayed AutoPay schedule, then select the payment action. No real payment is initiated. Use the navigation to inspect pending, failed and confirmed outcomes.
3. My Bookings → Upcoming → Track Seva Details. Scheduled sevas have no rating prompt.
4. My Bookings → Completed → Watch Videos or View Certificate. Each evidence viewer belongs to the selected performed date.
5. Active Nirantar detail → history → an older date → its certificate. A discontinued date remains in its own history after a successful retry.
6. Before the first seva → Edit Beneficiary → save. After the first performed seva, use the locked support state.

## Scope of the delivered fixes

These are revised designs and prototype interactions. Payments and phone verification use sample states; no UPI provider or SMS service is contacted. The video is an included, clearly labelled design preview, and certificates are watermarked samples. Support buttons do not send messages or place calls. Real support destinations, payment callbacks, retry cutoffs and the precise beneficiary lock event still need the operational confirmations in the change brief.

Cadence and long name screens are reusable card samples. The main booking, beneficiary, payment and evidence views provide the connected prototype flows.

Both information architecture options are available for review. The tabbed layout remains the recommended starting point; final selection should follow the evaluation tasks.

## Editable files

The design source is `Prototype.html`, `assets/styles.css` and `assets/app.js`. Fonts, the sample video and its poster are bundled locally. `Render_Exports.py` can regenerate the screen exports using Python and Playwright with Chromium. The Poppins licence is included in `assets/`.
