# Design tooling

`validate_design_hub.py` uses the Python standard library to check IDs, mappings, local links and immutable reference hashes. Add `--handoff` to check recorded approved release manifests. The gate is expected to fail until a handoff release is approved.

`capture_design_evidence.py` renders the editable mobile source or imported initial/candidate source into ignored artifacts, recording source hashes, commit, fixture clock, viewport, pixel ratio and browser/environment metadata. It does not edit the reference, compare pixels, approve the design or test a backend. Initial captures retain internal scroll-container metadata; top captures do not show their entire scrollable content.

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/python -m playwright install chromium
.venv/bin/python tools/capture_design_evidence.py --source working-mobile --screen JB-APP-001
.venv/bin/python tools/capture_design_evidence.py --source initial
```

The optional GitHub workflow runs captures manually and uploads a review artifact. After source migration, connect captures to scoped PR changes and add comparable visual baselines and behavioral tests as described in the measurement protocol. An artifact report is generated evidence, not proof of usability or production parity.
