# JB-CHG-0001 design collaboration source organization

Work type: repository maintenance, requested by the project owner in this session.
Agent: Codex. Baseline: eddb9484d490333c6837b747b4edb568932a1e54, after PR #9.
Product/design release approval remains pending; this task makes the design asset
easier for three people and their agents to edit.

The former shared app.js combined every screen, sample record and interaction.
It is separated into nine screen-family files, shared visual components, sample
fixtures, a review screen index, and a smaller controller for preview interactions.
The [editing map](../../previews/mobile/README.md) identifies the file for each task.
Classic deferred scripts support direct file opening and static export. Shared CSS,
brand assets and fixture changes still need coordination.

Affected scope: all 49 JB-APP states, their shared preview wrapper/source files,
onboarding and collaboration instructions. Existing screen IDs, routes, sample
records, layout alternatives, product wording and behaviors are preserved. Imported
references and release records are preserved. This task adds no production services
or product-rule decisions and does not select the tabs/sections alternative.

Validation is recorded in [source-organization-verification.json](source-organization-verification.json).
Local comparison captures and reports are under ignored artifacts/collaboration-*.
The exact source hashes make the measured design reproducible. Rendering and
simulated interactions do not verify a backend, real payment or usability preference.
