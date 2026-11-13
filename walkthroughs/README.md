# Visual design walkthroughs

Open [the walkthrough viewer](index.html) through the local server or Codespaces.
For file-only review, captured images remain available when browser restrictions
prevent controlling the original packed export. The original file remains unchanged.

| Review | What it covers |
| --- | --- |
| Original final design | All 12 advertised original entry states, with the owner's historical handoff context |
| Current app journey | Suggested discovery/booking, booking status, history, media, beneficiary and recovery review |
| My Bookings exploration | A's three category tabs and B's combined sections; no option selected |
| All 49 app states | Full draft state inventory, including loading, empty, partial/error and long-content cases |

Use the route selector, screen selector and Previous/Next controls. The viewer
jumps to independent sample states; progressing through it is a review sequence,
not proof that a real purchase creates the later records. The full-prototype link
lets you explore freely. The still-image link opens the imported capture, which
can differ from working source after edits.

The curated route definitions live in registries/walkthroughs.json. Screen IDs,
routes and image paths come from registries/screens.json. To update the browser
catalogue after changes, run `python3 tools/build_review_catalog.py`; CI checks it
for drift. This prebuilt catalogue also allows the viewer to work without fetch
requests when the repository is downloaded as a ZIP.

See [the review/access guide](../docs/00_Review_the_Whole_Design.md) and
[agent onboarding](../START_HERE.md).
