# Editable mobile design asset

Open Prototype.html directly, or use the local design server. This is a static,
clickable design with sample data. Classic deferred scripts preserve offline file
review; there is no package install or application build step.

## Where to edit

| Design area | Source |
| --- | --- |
| Home and profile | assets/screens/discovery.js |
| My Bookings tabs and sections | assets/screens/bookings.js |
| Nirantar details and history | assets/screens/nirantar.js |
| Dated seva detail | assets/screens/occurrence.js |
| Certificate and video designs | assets/screens/media.js |
| Beneficiary details | assets/screens/beneficiary.js |
| Details, review and payment sample states | assets/screens/checkout.js |
| Support design | assets/screens/support.js |
| Cadence and long-name samples | assets/screens/examples.js |
| Shared cards, icons, formatting and visual sections | assets/components.js |
| Sample bookings, people, dates and scenario variants | assets/fixtures.js |
| Review sidebar routes and labels | assets/screen-index.js |
| Navigation, forms and demonstration interactions | assets/app.js |
| Shared layout and screen styles | assets/styles.css |
| Original-final brand assets and values | ../../../assets/brand/original-brand.css |

Each script uses the small shared `window.JBDesign` namespace. Prototype.html loads
fixtures, the screen index, components, screen files and finally preview wiring,
in that order. Add any new screen script before app.js. Preserve registered route
and screen IDs; update the registries deliberately when adding a state.

## Parallel editing

Give each task a human owner, branch and separate checkout. Agree screen file scope
before starting an agent. Shared CSS, components, fixtures and brand edits need
coordination because they can affect all screen families. Put independent visual
variants under explorations/EXP-xxxx/options/ rather than overwriting the integrated
design. See [the daily workflow](../../../docs/10_Design_Collaboration.md).

Gallery.html pairs working routes with frozen imported screenshots. Those images
do not update with source edits. Capture current evidence under ignored artifacts/
using tools/capture_design_evidence.py and include the result in the change review.
All payments, support and media remain design demonstrations.
