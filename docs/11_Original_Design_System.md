# Original design and styling policy — required for every UI task

The project owner selected the complete original design, not only its logo or
colors: branding, typography, imagery treatment, listing, offering detail, cart,
checkout, recurring setup and confirmation must be reused. JB-BASELINE-001 is the
authority. Keep proposed changes explicit and separate until requested/selected.

Open [the current original design](../previews/mobile/index.html) and
[the visual styling reference](../design-system/index.html) before editing. Use
[the machine-readable recipes](../tokens/original-ui.tokens.json) for measured
component values. Exact original implementations are in previews/mobile/source/.

## Authority and the current website

The unchanged original export remains under references/initial-prototype/. The
working copy decodes its 40 existing assets and preserves its markup and sample
logic. It is assembled from editable screen fragments; no new visual interpretation
is needed. Live jaibhakti.com is a dated secondary reference for deployed presentation
and actual offering imagery. It does not silently replace the selected original UI.

Public home, offering detail and initial checkout were rechecked on 13 November
2026. Poppins, cream/brown colors and the gold-to-orange CTA are shared. The live
English “Jai Bhakti / by Astrotalk” header differs from the selected Devanagari
wordmark. Keep the original wordmark. Exact URLs, timestamps and computed styles
are in references/live-style/2026-11-13/observations.json. Later authenticated payment
screens were not entered; no form or payment was submitted.

## Brand palette

| Role | Original value |
| --- | --- |
| Main ink | #3A2B1A |
| Brand brown | #3A1604 |
| Muted text | #7A5530 |
| Link/accent | #8A2406 |
| Canvas | #FFFDF9 |
| Cream | #FFF1D6 |
| CTA gold | #FFD24A |
| CTA orange | #FF8A3D |
| CTA ink | #41240A |
| Primary gradient | linear-gradient(100deg, #FFD24A 0%, #FF8A3D 100%) |

Keep the original component-specific white/cream surfaces, translucent gradients,
borders, support/status colors and shadows. The token file also inventories the
original source color literals; that inventory is not a set of interchangeable
semantic colors. Do not flatten all surfaces to one cream or recolor every button
with the primary gradient.

## Typography and component dimensions

| Element | Original measured styling |
| --- | --- |
| Wordmark | Martel 900; जय भक्ति with the original temple mark |
| Interface | Poppins, Noto Sans Devanagari, sans-serif |
| Home hero title | 24px / 30px, weight 700 |
| Listing heading | 25px / 31px, weight 600 |
| Offering title | 22px / 27px, weight 600 |
| Section titles | 17–19px, weight 600, using the original component rule |
| Name/gotra input | 16px, weight 400; 54px height; 16px radius; 16px horizontal padding |
| Hero Book Seva | White surface; 48px height; 12px radius; 15px, weight 600 |
| Sticky Start seva / Proceed / cart Pay | Gold-orange gradient; 54px height; pill radius; 15px, weight 600; 24px horizontal padding |
| Main payment confirmation | Gradient; 56px height; pill radius; 16px, weight 600 |
| Recurring setup Pay | Gradient; 54px height; 16px radius; 19px, weight 600 |
| Payment method row | 16px radius; 8px 10px padding; selected surface/border from the original |
| Back/share controls | 44px circular controls |

Measurements use the original 393 × 852 artboard at a fixed 13 November 2026 clock.
Use the exact border, shadow, padding, line height and color recipes in the JSON
and source. A cart quantity control and a listing purchase action have different
dimensions; preserve their roles rather than imposing one universal button style.

## Journey and layout rules

- Preserve the original family hero, image-led offering cards, temple identity,
  offering information hierarchy and listing sections.
- Keep a complete offering-detail page before cart/setup. The beneficiary form is
  not a replacement for offering detail.
- Preserve cart selections, quantity/add-on controls, beneficiary/gotra fields,
  price summary, sticky action and their original visual treatment.
- Preserve checkout method rows, selected states, recurring setup and confirmation
  layouts. Original payment interactions are local design demonstrations.
- Preserve spacing, radii, surfaces, shadows, icons and scroll/sticky positioning
  from each original screen. Keep the exact original assets and font subsets.
- Existing sample offering identities/terms are preserved as historical design
  fixtures. Actual launched offerings are separately documented in the catalogue;
  changes to product IDs, pricing or terms need an explicit scoped design task.
- Proposed My Bookings/tracking states live under explorations/EXP-0001/draft/.
  They do not replace the selected acquisition/cart/checkout baseline.

## Agent starting procedure

1. Read AGENTS.md, this guide, tokens/original-ui.tokens.json and the assigned task.
2. Open the corresponding original screen and its source fragment. State which
   layout, component and styling rules the task affects.
3. Edit only the agreed files in a separate task checkout. Shared logic, fonts,
   styles and brand assets require coordination with other contributors.
4. Run `python3 tools/build_original_design.py` after editing original fragments.
   The assembled Prototype.html is committed and already opens without setup.
5. Compare against the unchanged original at matching viewport, fixture and clock.
   Record intended deviations. A successful render alone does not establish fidelity.
6. Keep new alternatives in an EXP package. Do not redesign unchanged screens or
   promote a later draft to the current baseline while doing repository maintenance.

## Editing map and checks

Screen fragments are in previews/mobile/source/screens/: home.html,
bhent-list.html, bhent-detail.html, cart-sankalp.html, payment.html,
weekly-seva-detail.html, seva-setup-names-autopay.html, seva-started.html,
seva-order-detail.html and profile.html. Preserved auxiliary fragments remain listed
in source/sections.json. Fonts and global CSS are source/fonts.css and styles.css;
original binding/state styles are in source/logic.js. The existing runtime files
under assets/original/ are extracted dependencies, not routine design-edit targets.

```bash
python3 tools/build_original_design.py
python3 tools/build_style_guide.py --check
python3 tools/validate_design_hub.py
python3 tools/capture_design_evidence.py --source initial --out artifacts/original-before
python3 tools/capture_design_evidence.py --source working-mobile --out artifacts/original-after
```

Use the shared design review process for proposed changes. This original-baseline
selection does not create a new engineering release or resolve open commercial,
identity, fulfilment or layout decisions in the later proposal.
