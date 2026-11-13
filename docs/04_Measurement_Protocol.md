# Measuring design changes

Measure behavioral correctness, completeness and visual changes against an identified baseline. File count, code churn and the number of screenshots do not establish that a design is better or ready to build.

## What is known now

- Original packed export: 6,033,498 bytes, 40 embedded assets and 12 advertised entry states. All 12 were inventoried and rendered at the 393×852 reference artboard with a fixed 13 November 2026 10 AM IST clock.
- Candidate: 49 advertised screen states, with 390 px PNG artboards at 2×. Prior validation records sample UI flows, native browser playback of sample media, links and horizontal overflow checks at 360 and 390 px.
- Source specification: 22 acceptance criteria, now mapped to representative candidate states. Coverage is marked represented, not individually approved or production verified.
- Live: six dated public observations cover home, three active details and two initial checkout views. Later verified-user checkout and backend behavior remain unmeasured.

The original and candidate were captured at different artboard sizes and scales. No meaningful percentage visual improvement or regression score can be claimed from those images alone.

## Per change evidence

| Measure | Required record | Interpretation |
| --- | --- | --- |
| Affected scope | Stable screen/state IDs and web/app flags | What changed, not a quality score |
| Requirement coverage | Case IDs and pass/fail/not-tested by requirement | Behavior represented and actually exercised |
| State coverage | Normal, pending, failed, empty, error, partial media and recovery cases | Missing states remain explicit |
| Visual delta | Before/after/diff plus changed geometry, type or tokens | Separate intended changes from regressions |
| Usability | Specified task, participants, success count/attempts, time and errors | Targets agreed before evaluation; no invented results |
| Accessibility | Keyboard, selected state, names, text size, contrast and touch checks | Report tested cases and limitations, not blanket compliance |
| Implementation parity | Staging commit/version and case evidence | Separate from design approval |

## Reproducible captures

Each capture must record source commit/hash, source ID, scenario and screen ID, fixture version, clock and timezone, locale, viewport, pixel ratio, browser version, operating environment and relevant scroll position. Keep sample data free of real booking information. Freeze timers, IDs and media or animation states for comparison.

For paired checks use identical viewport and fixture data. Recommended cases are small web/mobile, standard mobile and desktop web; exact sizes and supported devices must be selected in the design contract. Keep the historical 393×852 export as its own reference. Actual iPhone/Android payment handoff tests are separate from viewport emulation.

Wait for the required UI state and fonts, not merely a fixed delay. A page’s text can exist behind a splash overlay; do not accept that screenshot as the completed view. Full-page screenshots also do not capture every part of an internal scroll container: record scroll positions or tile those screens.

Choose one pinned rendering environment for automated image baselines. Mac captures and Linux CI captures can differ in fonts and antialiasing. Set per-case visual tolerances only after reviewing the first comparable run; do not use a global threshold to hide missing content.

## Behavioral assertions before handoff

The next vertical slice must prove: the correct account owns a web purchase in the app; beneficiary and gotra remain distinct from account identity; first and regular charges use the selected package; a client return does not fabricate payment success; an unregistered future date stays out of Upcoming; performed-only progress advances without reset; failed dates remain discontinued after retry; certificate and videos are independently ready; historical amounts and identities remain unchanged; and cancellation state synchronizes without briefly becoming Active.

Record separate implementation outcomes for legacy purchases, unknown gotra, several beneficiaries, unavailable catalogue items, app-not-installed links, offline or stale state and interruption during checkout.

## Reporting and storage

Write machine-readable results and a short human explanation into the change package. Use pass, fail, not tested and not applicable with reasons. Any measured improvement needs a comparable denominator and raw evidence. A before/after showing one ₹101 example does not verify ₹121 and ₹151.

`tools/validate_design_hub.py` measures registry and reference integrity only. Visual comparison and native/backend test automation are migration work, not silently claimed by that CI check. Future runs should upload the screenshots, report and preview as [GitHub Actions artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data); approved handoff evidence must have durable release retention.
