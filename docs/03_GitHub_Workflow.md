# GitHub design management

Use one private `jaibhakti-design` repository for the product contract, reference history and design handoff. Keep production web, app and backend code in their implementation repositories. Link implementation work to an exact design release and commit.

This keeps design changes reviewable without assuming the mobile stack or turning exported prototype code into a second production application. If the team later consolidates into a product monorepo, the design hub can move intact under a design directory while preserving its IDs and release links.

Use [the shared workspace model](06_Shared_Design_Workspace.md) for the distinction
between explorations, integrated drafts and approved releases. Main holds shared
working material; a merge is not authorization to build.

## Authoring and references

Keep the supplied original HTML, dated live observations and imported candidate immutable. Their hash manifest records the import. Future design source belongs in `previews/web` and `previews/mobile`, with shared semantic tokens, copy and fixtures. The first migration should split readable layout, styles, logic and data; retain generated packed HTML as an export, not the routine authoring file.

The original HTML has confirmed historical final-handoff status for website
execution, recorded as JB-BASELINE-001. That history remains intact while future
changes use the new review/release process. New agents begin at START_HERE.md.

The current mobile preview is a readable fork of the candidate. The web preview is a baseline entry pending a scoped web design change. Shared source extraction and web authoring should proceed after the first contract decisions. Sharing semantics and tokens is required; sharing DOM/native component code is a separate stack decision.

## IDs and ownership

Use EXP for an exploration, JB-CHG for a change package, JB-REQ for a requirement,
JB-WEB and JB-APP for screen states, INC for an inconsistency and DEC for a decision.
Preserve D01–D23 as legacy aliases. IDs survive filenames and layout changes.

Repository maintenance is assigned to @suyashb734. Product, design, operations/payments and engineering approval roles need named people or teams. CODEOWNERS alone does not establish their approval or configure protected branches.

## One change per reviewable package

1. Claim an issue with a human owner and scope. Use an EXP record/branch for an alternative; use a `change/JB-CHG-xxxx-owner-description` branch for integration. Give each concurrent task its own checkout/worktree.
2. Fill `changes/JB-CHG-xxxx/README.md` with the concrete problem, intended behavior, affected platforms, screen and requirement IDs, dependencies and explicit out-of-scope work.
3. Update readable sources, state fixtures, rule or copy decisions and the change register.
4. Generate before, after and comparison evidence under the same case IDs. Attach the artifact and summary to the PR. Explain intentional visual differences.
5. Record the product/design decision, operational confirmations where affected, and engineering acknowledgement of feasibility.
6. Merge reviewable work without implying approval. Issue a versioned handoff manifest only when its scoped gate passes with human approval of that exact version.

The private [project](https://github.com/users/suyashb734/projects/1) has Work type,
Status (design state) and Implementation state fields. The design states distinguish
Exploring, Draft, In review, Approved for build, Parked, Rejected and Superseded.
Selection of an exploration is recorded in its EXP outcome, not as build approval.
Keep implementation state independent; issue closure and design approval do not
prove deployment. Board fields are manual navigation, not authoritative signoff.

## Repository controls

The included CI job checks integrity and traceability. Configure required checks and PR reviews on main once collaborator roles and repository plan support are confirmed. Prefer no direct pushes for normal feature work. Use code owner review for shared contracts, tokens and release manifests. GitHub documents [PR templates, ownership and required checks](https://docs.github.com/en/pull-requests/reference/managing-and-standardizing-pull-requests) as review controls.

Use private PR artifacts or an access-controlled preview for routine reviews. A private repository is not, by itself, a private GitHub Pages website; privately published Pages sites require the supported organization setup described in [GitHub’s visibility documentation](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site). No Pages deployment is configured here.

## Generated files and releases

The initial 49 PNGs are retained once as reference evidence. Future regenerated screenshots and videos belong in ignored `artifacts/` output and PR artifacts. Promote the approved handoff package to retained release assets before routine CI artifacts expire. Store larger repeated media in the team’s approved asset system or release assets rather than adding every iteration to Git history.

Use candidate versions such as `design-v0.1.0-rc.1` during review. Create a stable
`design-v0.1.0` handoff only after the manifest gate passes. Its manifest identifies
the approved source commit; the release/tag includes the handoff record and assets.
[GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
can retain its package and notes. Preserve issued versions and state superseded
scope explicitly. Production deployments have separate verification records.
