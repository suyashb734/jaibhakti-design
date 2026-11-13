# GitHub design management

Use one private `jaibhakti-design` repository for the product contract, reference history and design handoff. Keep production web, app and backend code in their implementation repositories. Link implementation work to an exact design release and commit.

This keeps design changes reviewable without assuming the mobile stack or turning exported prototype code into a second production application. If the team later consolidates into a product monorepo, the design hub can move intact under a design directory while preserving its IDs and release links.

## Authoring and references

Keep the supplied original HTML, dated live observations and imported candidate immutable. Their hash manifest records the import. Future design source belongs in `previews/web` and `previews/mobile`, with shared semantic tokens, copy and fixtures. The first migration should split readable layout, styles, logic and data; retain generated packed HTML as an export, not the routine authoring file.

The current mobile preview is a readable fork of the candidate. The web preview is a baseline entry pending a scoped web design change. Shared source extraction and web authoring should proceed after the first contract decisions. Sharing semantics and tokens is required; sharing DOM/native component code is a separate stack decision.

## IDs and ownership

Use JB-CHG for a change package, JB-REQ for a requirement, JB-WEB and JB-APP for screen states, INC for an inconsistency and DEC for a decision. Preserve D01–D23 as legacy aliases for the imported Daan Seva work. IDs survive filenames and layout changes.

Repository maintenance is assigned to @suyashb734. Product, design, operations/payments and engineering approval roles need named people or teams. CODEOWNERS alone does not establish their approval or configure protected branches.

## One change per reviewable package

1. Create a change issue and `change/JB-CHG-xxxx-description` branch.
2. Fill `changes/JB-CHG-xxxx/README.md` with the concrete problem, intended behavior, affected platforms, screen and requirement IDs, dependencies and explicit out-of-scope work.
3. Update readable sources, state fixtures, rule or copy decisions and the change register.
4. Generate before, after and comparison evidence under the same case IDs. Attach the artifact and summary to the PR. Explain intentional visual differences.
5. Record the product/design decision, operational confirmations where affected, and engineering acknowledgement of feasibility.
6. Merge the reviewed change and issue a versioned handoff manifest when its scoped gate passes.

Use a small project board: Draft, In review, Ready for build, In implementation, Staging verification and Verified live. Design state and implementation state are separate fields; merging a design PR does not deploy the product.

## Repository controls

The included CI job checks integrity and traceability. Configure required checks and PR reviews on main once collaborator roles and repository plan support are confirmed. Prefer no direct pushes for normal feature work. Use code owner review for shared contracts, tokens and release manifests. GitHub documents [PR templates, ownership and required checks](https://docs.github.com/en/pull-requests/reference/managing-and-standardizing-pull-requests) as review controls.

Use private PR artifacts or an access-controlled preview for routine reviews. A private repository is not, by itself, a private GitHub Pages website; privately published Pages sites require the supported organization setup described in [GitHub’s visibility documentation](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site). No Pages deployment is configured here.

## Generated files and releases

The initial 49 PNGs are retained once as reference evidence. Future regenerated screenshots and videos belong in ignored `artifacts/` output and PR artifacts. Promote the approved handoff package to retained release assets before routine CI artifacts expire. Store larger repeated media in the team’s approved asset system or release assets rather than adding every iteration to Git history.

Use candidate versions such as `design-v0.1.0-rc.1` during review. Create a stable `design-v0.1.0` handoff only after the manifest gate passes. Git tags identify the exact design commit; [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) can attach its package and notes. Production deployments have separate version and verification records.
