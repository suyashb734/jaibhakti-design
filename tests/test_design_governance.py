"""Exercise approval boundaries using fictional records in temporary directories."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec=importlib.util.spec_from_file_location('validator',Path(__file__).resolve().parents[1]/'tools/validate_design_hub.py')
validator=importlib.util.module_from_spec(spec)
spec.loader.exec_module(validator)


class GovernanceTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name)
        self.patch=patch.object(validator,'ROOT',self.root)
        self.patch.start()
        self.addCleanup(self.patch.stop)
        self.write('registries/screens.json',{'screens':[{'id':'JB-APP-001'}]})
        self.write('registries/requirements.json',{'requirements':[{'id':'JB-REQ-001'}]})
        (self.root/'evidence.txt').write_text('Fictional retained test evidence')
        self.write('artifacts.json',{'source_commit':'a'*40,'artifacts':[{'path':'evidence.txt','sha256':hashlib.sha256((self.root/'evidence.txt').read_bytes()).hexdigest()}]})
        self.write('acceptance.json',{'note':'Fictional test report'})
        commit='a'*40
        roles=['product','design','engineering_acknowledgement']
        self.release={'id':'design-v0.1.0','status':'approved_for_build','commit':commit,'change_ids':['JB-CHG-0001'],'scope':['my-bookings'],'screen_ids':['JB-APP-001'],'requirement_ids':['JB-REQ-001'],'excluded_scope':[],'artifact_manifest':'artifacts.json','acceptance_report':'acceptance.json','operations_payments_affected':False,'required_approval_roles':roles,'approvals':{role:{'name':'Fictional reviewer','evidence':'https://example.test/review','approved_at':'2026-11-13T10:00:00Z','commit':commit} for role in roles}}
        self.changes=[{'id':'JB-CHG-0001','scope':['my-bookings'],'design_status':'draft'}]

    def write(self,path,value):
        target=self.root/path
        target.parent.mkdir(parents=True,exist_ok=True)
        target.write_text(json.dumps(value))

    def gate(self,release=None,conflicts=None):
        self.write('releases/index.json',{'releases':[self.release if release is None else release]})
        validator.handoff_gate(conflicts or [],self.changes)

    def test_no_final_release_remains_blocked(self):
        self.write('releases/index.json',{'releases':[]})
        with self.assertRaisesRegex(ValueError,'No approved release'):
            validator.handoff_gate([],self.changes)

    def test_archived_approval_survives_next_working_draft(self):
        self.gate()

    def test_empty_roles_cannot_bypass_human_approval(self):
        release=copy.deepcopy(self.release)
        release['required_approval_roles']=[]
        with self.assertRaisesRegex(AssertionError,'required approval roles'):
            self.gate(release)

    def test_source_edit_invalidates_prior_approval(self):
        release=copy.deepcopy(self.release)
        release['commit']='b'*40
        with self.assertRaisesRegex(AssertionError,'Approval source commit differs'):
            self.gate(release)

    def test_payment_change_requires_its_human_confirmation(self):
        release=copy.deepcopy(self.release)
        release['operations_payments_affected']=True
        with self.assertRaisesRegex(AssertionError,'operations_payments'):
            self.gate(release)

    def test_affected_blocker_prevents_handoff(self):
        with self.assertRaisesRegex(AssertionError,'Unresolved scoped blockers'):
            self.gate(conflicts=[{'id':'INC-001','severity':'blocker','status':'open','blocks':['my-bookings']}])

    def test_retained_evidence_cannot_silently_change(self):
        (self.root/'evidence.txt').write_text('Changed evidence')
        with self.assertRaisesRegex(AssertionError,'Artifact checksum differs'):
            self.gate()

    def test_unknown_screen_cannot_enter_handoff_scope(self):
        release=copy.deepcopy(self.release)
        release['screen_ids']=['UNKNOWN']
        with self.assertRaisesRegex(AssertionError,'included screen IDs'):
            self.gate(release)

    def test_selected_exploration_requires_human_outcome(self):
        (self.root/'exploration.md').write_text('Fictional test exploration')
        item={'id':'EXP-0001','status':'selected','baseline_commit':'a'*40,'package':'exploration.md','screens':[],'change_ids':['JB-CHG-0001'],'decision_ids':[],'selected_option':'A','human_owner':None,'outcome_evidence':None}
        with self.assertRaisesRegex(AssertionError,'human owner and outcome evidence'):
            validator.validate_explorations([item],set(),{'JB-CHG-0001'},set())


if __name__=='__main__':
    unittest.main()
