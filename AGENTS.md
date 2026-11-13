# Shared instructions for design contributors and agents

For continuation, read HANDOFF.md first. It identifies pending work on a separate
PR branch and distinguishes it from what is already on main or the public site.

This is a design workspace for Jai Bhakti web and mobile. Production code lives
elsewhere. Read START_HERE.md, README.md, the assigned exploration/change package, and its linked
decisions before editing. Use the repository records rather than private chat
history as the shared source of decisions.

## Authority and status

- `references/` contains immutable imports. Preserve their files and hashes.
- JB-BASELINE-001 records Jai Bhakti App.html as the owner's first final design
  handed over for execution on jaibhakti.com. Preserve that historical status;
  distinguish it from approval of the newer Daan Seva draft and future releases.
- Use the original-final branding in tokens/original-final.tokens.json and
  assets/brand/. Live images/product facts may be reused; the live header does not
  replace the owner's selected original wordmark, typography or colors.
- `explorations/` holds alternatives, hypotheses and findings. Selected means
  chosen for integration, not approved for engineering.
- `previews/` is the integrated working draft. `main`, a merged PR, green CI and
  a live observation do not constitute product approval.
- `releases/` identifies exact approved handoff versions and their scope.
  Engineering implements a named release, never an unspecified latest preview.
- Agents can propose designs, collect evidence and draft decisions. Human product
  and design approval plus engineering acknowledgement must name the exact source
  commit and link actual review evidence. Never invent or self-award signoff.
- Editing approved source requires a new revision and review. Preserve prior
  release records; a newer scoped release need not replace unrelated scope.

## Concurrent work

- Identify the responsible human, issue, EXP/JB-CHG ID and file scope first.
  An agent tool is not the accountable owner. Do not claim another person's task.
- For exploration and product changes use a separate branch and checkout/worktree
  per active person or agent: `explore/EXP-xxxx-owner-topic` or
  `change/JB-CHG-xxxx-owner-topic`. Never share one working checkout concurrently.
- Check Git status and the baseline commit before edits. Preserve unrelated work;
  do not reset, force-push or overwrite another contributor's changes.
- Coordinate shared contracts, tokens, copy and fixtures through the linked issue.
  Branch isolation does not prevent conflicting product decisions.
- Submit a PR. Merging preserves reviewed work; it does not approve a handoff.
  Relevant merges to main also publish the review preview, including open
  explorations. Branch changes remain private until merged and published.
  Tooling/documentation maintenance also does not confer product approval.
- Use each human's own GitHub access. Do not commit credentials, private agent
  transcripts or real devotee/payment information.

## Where to work

- Put isolated experiment source and rationale under its EXP directory. Existing
  imported alternatives can be documented with links rather than copied.
- Promote a selected option through a JB-CHG package and an explicit source diff.
  Keep one integrated source per platform under previews/, not full copies in each
  change package. Review any experimental pricing, copy or dependencies as well.
- Preserve screen, requirement, decision and change IDs. Update affected registries
  and keep proposed rules distinguishable from observed behavior.
- Record owner, agent used, baseline, affected IDs, exclusions, decisions, evidence
  and not-tested scope in the package. Use descriptive commit messages with its ID.

## Validation and review

- Run `python3 tools/validate_design_hub.py` before committing.
- For governance/tooling changes also run `python3 -m unittest discover -s tests -v`.
- For UI edits exercise the affected routes and generate comparable before/after
  evidence using tools/capture_design_evidence.py. Record source commit, fixture,
  clock, viewport and browser. Rendering is not a usability or backend test.
- When screen/tour metadata changes, run `python3 tools/build_review_catalog.py`.
  Use walkthroughs/index.html to review the guided flows and all registered states.
- When live-catalogue inputs change, run `python3 tools/build_live_catalogue.py`.
- Read docs/07_Preview_and_Collaboration.md for branch-per-task editing and the
  connected preview. Edit private source; do not author in the public export repo.
- Generate transient evidence under ignored artifacts/. Retain approved evidence
  with the release; routine Actions artifacts expire.
- For release work follow docs/05_Engineering_Handoff.md and run the handoff gate.
  Do not publish a final design release without recorded human authorization.

## Code Review Rules

- Flag any exploration or merged draft represented as approved for development.
- Flag approvals without exact version and human evidence, changes to immutable
  references, or payment/booking claims unsupported by their source.
- Flag approval reuse after changes to the approved design or its dependencies.
- See docs/06_Shared_Design_Workspace.md for the full collaboration model.
