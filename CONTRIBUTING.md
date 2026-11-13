# Contributing design changes

Start with [the shared workspace model](docs/06_Shared_Design_Workspace.md) and
[AGENTS.md](AGENTS.md), whether working manually, with Codex or with Claude.
Use an EXP issue/package for an experiment and a JB-CHG issue/package for an
integrated change. Record one accountable human, baseline and file scope. Use a
separate branch and checkout/worktree for every concurrent task; coordinate shared
contracts and tokens. Preserve the supplied references and generate transient
review evidence under ignored artifacts.

Run `python3 tools/validate_design_hub.py` before committing. Use descriptive commit
messages with the EXP/change ID. Open a PR with source and affected IDs, comparable
evidence, intentional differences and test limitations. Update the relevant register
and decisions. A selected exploration and a merged draft remain unapproved for
development. Human approval attaches to the exact source commit and scoped release.

The initial repository maintenance owner is @suyashb734. Product, design, engineering and operations/payment approval responsibilities must be assigned before a handoff release. Do not invent their approval or treat an integrity check as signoff.

Follow the [workflow](docs/03_GitHub_Workflow.md) and [handoff gate](docs/05_Engineering_Handoff.md). Real booking data and authentication secrets do not belong in design fixtures or captures.
