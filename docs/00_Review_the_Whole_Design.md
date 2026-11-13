# Reviewing and running the whole design

The repository contains a design review hub, editable mobile prototype, historical prototype, dated live-web observations and handoff documents. These can run as static HTML, CSS and JavaScript. A production native app, account backend and payment service are not included.

## Current status

| Area | Status |
| --- | --- |
| Repository | Private and committed to main |
| Original complete design | Preserved with 12 advertised entry-state references |
| Current web | Six dated public observations; production application source not supplied |
| Mobile design | Editable draft with 49 candidate states |
| Documentation | Source audit, platform model, measurements, decisions and handoff criteria |
| Explorations | My Bookings A/B comparison documented as EXP-0001; neither selected |
| Requirements | 22 source criteria mapped; 15 inconsistencies grouped into six open decision issues |
| GitHub integrity CI | Passing; this is not product approval |
| GitHub capture workflow | Successfully rendered all 49 working-mobile states and uploaded evidence |
| Engineering handoff | Not approved; scoped decisions and named approvals remain open |
| Interactive hosting | Codespaces configuration is included; no permanent public preview is deployed |

The verified capture run is [43396621315](https://github.com/suyashb734/jaibhakti-design/actions/runs/43396621315). It rendered the working design at commit f3aa8833dd591651463a41d2661c07c06b91ba8a. Its PNGs and report are render evidence, not a backend or native-device test.

## Access for reviewers

Reviewers need access to the private repository. The owner can add the relevant GitHub accounts through Settings, Collaborators. No reviewer accounts have been invited automatically. Once access is granted, use either download, clone or Codespaces.

## Easiest local review

1. Open the repository and choose Code, Download ZIP.
2. Extract the complete folder and open index.html in Chrome or Edge.
3. Choose Working mobile prototype to use the revised flow. The left navigation lists every state; on a narrow screen choose All screens.
4. Use Reference captures and working preview to compare the frozen PNGs with the editable route.
5. Open Original complete design for the first prototype, and browse its screens folder for all 12 captured entry states.
6. Read the source audit, platform model and decision issues before evaluating handoff readiness.
7. Use Explorations for alternatives and Approved handoffs for the exact designs
   authorized for engineering. There are currently no approved handoffs.

Keep the complete folder structure. A lone downloaded HTML file from the working preview will be missing its local styles, fonts and scripts.

## Clone and serve locally

```bash
gh repo clone suyashb734/jaibhakti-design
cd jaibhakti-design
python3 tools/serve_design_hub.py
```

Open http://localhost:8000. The preview server uses the Python standard library; no application build or package installation is required. Ctrl+C stops the foreground server. The repository’s Markdown documentation is formatted when viewed on GitHub; the local server presents Markdown as readable text.

## Run in the browser through GitHub Codespaces

Open [the Codespaces creation page](https://codespaces.new/suyashb734/jaibhakti-design), or choose Code, Codespaces, Create codespace on main. The repository configuration validates the import, starts the static review server and forwards port 8000. Choose Open in Browser when prompted. If it does not open automatically, use the Ports tab and open Jai Bhakti Design Hub.

Forwarded ports default to private. A private port is visible to its Codespace owner, not automatically every repository collaborator. Each reviewer can open their own Codespace, subject to account/repository availability. See [GitHub’s port forwarding documentation](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace). Stop the Codespace when finished; Codespaces uses its account allowance. This repository setup does not create a running Codespace on anyone’s behalf.

This is an on-demand development preview, not a permanent shared deployment URL. If a team wants one shared private URL, choose an approved authenticated preview host or the supported organization-level sharing setup.

## What runs in GitHub Actions

The integrity workflow runs on commits and PRs. The Capture design evidence workflow can be run manually for working-mobile, the frozen candidate or the initial prototype. Download a completed run’s PNGs and report from its Artifacts section. Signed-in users need repository read access, as described in [GitHub’s artifact download guide](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/download-workflow-artifacts).

The capture artifact is a screenshot/report bundle. For the complete interactive design, use the repository download, clone or Codespaces.

## GitHub Pages

The static review hub and prototypes are technically suitable for GitHub Pages, subject to the account plan. Pages does not provide a production payment or application backend. A private repository also does not automatically produce a private Pages website; privately published Pages sites require an organization using GitHub Enterprise Cloud. See [Pages hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) and [Pages visibility](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site).

Pages has not been enabled for this repository. Keep the current draft private unless a public review deployment is explicitly selected.
