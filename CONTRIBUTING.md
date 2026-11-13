# Contributing design changes

Start with a change issue, create a change branch and use the change template. Preserve the supplied references. Work on source, contracts, copy and fixtures in an explicit change package, and generate review evidence under ignored artifacts.

Run `python3 tools/validate_design_hub.py` before committing. Use descriptive commit messages with the change ID. Open a PR with the required source IDs, screen/requirement IDs, before/after evidence, intentional differences and test scope. Update the change register and decision links. Treat the current candidate as Draft until the exact version is approved.

The initial repository maintenance owner is @suyashb734. Product, design, engineering and operations/payment approval responsibilities must be assigned before a handoff release. Do not invent their approval or treat an integrity check as signoff.

Follow the [workflow](docs/03_GitHub_Workflow.md) and [handoff gate](docs/05_Engineering_Handoff.md). Real booking data and authentication secrets do not belong in design fixtures or captures.
