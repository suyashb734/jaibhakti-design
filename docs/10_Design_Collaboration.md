# Three-person design collaboration

The deliverable is a design asset: editable screens, reusable visual elements,
sample states and evidence that people can review. Keep the source static and easy
to open. Product implementation happens in its own repositories.

## A small daily loop

1. Pick one issue or EXP/JB-CHG task. Record the human owner, design question,
   starting commit and files the agent may edit.
2. Create a short-lived task branch in its own checkout/worktree. Start Codex or
   Claude there and have it read AGENTS.md, START_HERE.md and the task record.
3. Edit the relevant screen files. Keep alternatives in the EXP folder and shared
   brand assets consistent. Record assumptions instead of silently deciding open
   product rules.
4. Open the affected states, run integrity checks and capture proportionate
   before/after evidence. A small visual change does not need the entire product
   handoff process.
5. Open a PR. One of the other two humans reviews the design, evidence and shared
   effects. Rotate reviewers; the third person can keep working on another task.
6. Merge reviewed work into main. The publisher refreshes the same public preview
   URL. Record an exploration outcome when a human selects, parks or rejects it.

All three people can author concurrently. Roles belong to a task, rather than
permanent branches named after people. Every concurrently editing agent gets a
separate checkout, even when several agents assist the same person.

Example from a clean source clone; replace YOURNAME and choose the assigned ID:

```bash
git fetch origin
git worktree add -b explore/EXP-0001-YOURNAME-booking-cards ../jb-booking-cards origin/main
```

## Files that make parallel work practical

Use [the mobile editing map](../previews/mobile/README.md) to choose a screen family.
For example, one person can refine bookings.js, another media.js, and another
discovery.js. Agree shared CSS/component/fixture edits first and review the combined
result. Branch isolation protects files on disk; it does not settle design conflicts.

| Location | Meaning |
| --- | --- |
| explorations/EXP-xxxx/options/ | Isolated visual alternatives and their rationale |
| previews/ | One integrated working design per platform |
| assets/brand/ and tokens/ | Shared original-final brand authority |
| changes/JB-CHG-xxxx/ | Scope, reasons, comparisons and review records |
| references/ | Preserved imports and dated evidence |
| releases/ | Exact approved design versions for engineering |

The public export repository is generated. Author in the private design repository.
Review unmerged branches locally or in Codespaces. After merging, use the shared
[preview](https://suyashb734.github.io/jaibhakti-design-preview/) and its preview-info.json
to identify the successfully published design revision.

## What a normal review needs

Record the task/owner, affected screens, branch/commit, preview or captures, intended
differences, checks and any unresolved questions. Use the same fixtures, viewport
and clock for comparisons. A reviewer should be able to open the design and explain
the change without reading an agent conversation.

Useful agent brief:

> Work on [ID] for [human owner], starting at [commit]. Edit [files] to explore
> [design question]. Read AGENTS.md and the linked task. Preserve original-final
> branding and registered routes. Check affected states, capture comparable
> evidence, and prepare a PR. Record assumptions and review questions.

Named collaborator access and GitHub review controls still need the actual roster
and supported repository settings. The written workflow does not configure them.

## Final design handoff

Main is the shared draft. Exploration selection, a PR merge and publication are
separate from approval for engineering. When a scoped design is ready for handoff,
use the exact-version approval and retained evidence process in
[the handoff guide](05_Engineering_Handoff.md). Open commercial or backend decisions
block their affected handoff scope; they do not prevent unrelated visual exploration.
