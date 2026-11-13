# Current design — complete original UI

The owner selected the entire original design: branding, styling, seva listing,
offering detail, cart, checkout, recurring setup and confirmation. Open index.html
for a screen selector, or Prototype.html for the full original interactive journey.

Read [the required styling policy](../../docs/11_Original_Design_System.md) and
[visual styling reference](../../design-system/index.html) before any UI edit.
Exact measured recipes are in tokens/original-ui.tokens.json. The original artboard
is 393 × 852; compare changes at the same fixture, clock and viewport.

## Editable source

| Design area | Source fragment under source/screens/ |
| --- | --- |
| Home / seva listing | home.html |
| One-time listing and detail | bhent-list.html, bhent-detail.html |
| Cart and sankalp | cart-sankalp.html |
| Checkout | payment.html |
| Recurring seva detail | weekly-seva-detail.html |
| Recurring setup | seva-setup-names-autopay.html |
| Confirmations | success.html, seva-started.html |
| Dated seva and profile | seva-order-detail.html, profile.html |
| Shared sheets and toast | sheets.html, toast.html |

source/sections.json preserves section order. Shared font declarations and global
CSS are source/fonts.css and source/styles.css. Original state, fixtures and
binding styles are in source/logic.js. The source/document.html.template holds the
shared shell. Auxiliary original content is preserved without claiming new flows.

After editing fragments, run `python3 tools/build_original_design.py` from the
repository root. It assembles the committed, ready-to-open Prototype.html using
only Python's standard library. Viewers need no installation or compilation.
The existing original runtime and all 40 decoded assets are under assets/original/;
original-assets.json records provenance. Avoid editing runtime dependencies as part
of a screen styling task. The unchanged packed reference remains under references/.

## Collaboration and proposals

Use one task branch and separate checkout per active person/agent. Agree changes
to shared logic, styles, fonts and tokens first. Different people can edit listing,
cart and checkout fragments independently, then review the assembled journey.
Follow [the daily workflow](../../docs/10_Design_Collaboration.md).

The later 49-state My Bookings candidate remains under
[explorations/EXP-0001/draft](../../explorations/EXP-0001/draft/Prototype.html).
Its separate screen files, fixtures and A/B alternatives are retained for proposals.
They do not replace this original acquisition/cart/checkout baseline.

All inherited booking/payment interactions are local design samples. Restoring the
original visual design does not verify production provider behavior or issue a new
engineering handoff release.
