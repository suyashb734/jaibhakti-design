# JB-CHG-0002 Restore the complete original design baseline

Requested by the project owner: “The original branding, styling, even the cart and
checkout page everything should be used.” The owner also requested that styling
from the original and current jaibhakti.com be documented for every agent.

Baseline: 440ca00aaf50d7c20e16566bbd586c549b00d831. Agent: Codex. Accountable human:
requesting project owner; named reviewer assignments remain unconfigured. Related
records: JB-BASELINE-001, DEC-006 and issue #6. This change restores the selected
original UI, without issuing a new engineering handoff or selecting a tracking layout.

The working preview now uses the original complete markup, styling, sample logic
and all 40 bundled assets. Listing, offering detail, cart, checkout, recurring setup
and confirmation are restored. The packed reference remains unchanged; an editable
copy is assembled from original HTML sections, fonts/global CSS and logic. The
existing runtime dependencies are preserved, with no new framework or package setup.

The later 49-state candidate is retained under explorations/EXP-0001/draft. Its
screen IDs, requirements and A/B comparison remain intact. It is labelled a proposal
and does not replace the original acquisition or checkout screens. Twelve working
baseline states are registered separately as JB-APP-050 through JB-APP-061.

Read [the complete styling policy](../../docs/11_Original_Design_System.md) and
[visual reference](../../design-system/index.html). Machine-readable recipes are in
tokens/original-ui.tokens.json. New live observations document home, offering detail
and initial checkout only; no forms or payments were submitted. The live co-branded
header does not override the original selected wordmark.

[Verification](verification.json) compares the restored journey with the unchanged
original at matching clock/browser/viewport and records source/export route and
purchase-flow checks. All 40 extracted assets match the original bytes, and the
complete template matches after resolving local asset paths and review-only wiring.
The 12 screen geometries match; measured raster differences are recorded explicitly.
