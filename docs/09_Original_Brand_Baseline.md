# Original final design is the brand authority

The owner instructed: “The colors and branding used should be same from the
original final design.” This selects JB-BASELINE-001 / SRC-INITIAL for brand
foundations. It does not select the open My Bookings layout or approve a new
engineering handoff.

| Element | Original-final value |
| --- | --- |
| Wordmark | जय भक्ति, Martel 900, with the original temple mark |
| Interface type | Poppins with Noto Sans Devanagari fallback |
| Main text | #3A2B1A |
| Brand brown | #3A1604 |
| Muted text | #7A5530 |
| Link/accent | #8A2406 |
| Light canvas | #FFFDF9 |
| Cream | #FFF1D6 |
| Main CTA | 100° gradient, #FFD24A to #FF8A3D |
| CTA text | #41240A |

These values were read from the rendered original's computed styles. The SVG
temple mark and 18 font subsets were extracted from its embedded resources.
[The token record](../tokens/original-final.tokens.json) includes the source,
method and font hashes. The unchanged original export remains the reference.

Use [assets/brand/original-brand.css](../assets/brand/original-brand.css) and
[the extracted temple mark](../assets/brand/temple-mark.svg). The working app and
review surfaces consume these assets. The earlier candidate.tokens.json remains
an archival draft reference and is not the selected brand authority.

Actual photographs/artwork and product names can come from the launched live sevas,
as authorized by the owner. Do not infer a new app wordmark or co-brand treatment
from the live website header. Preserve existing reference screenshots; newly
rendered working designs can differ because the selected original brand is now
applied. Record those intentional changes in review evidence.

Status/feedback colors and accessibility treatment have semantic purposes. Review
their contrast and states separately rather than recoloring every status to the
brand gradient. Platform spacing and interaction patterns also require their own
review; selecting the brand baseline does not claim full visual or native parity.
