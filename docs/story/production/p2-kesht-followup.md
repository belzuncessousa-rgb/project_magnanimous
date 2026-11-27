---
id: p2-kesht-followup
title: What Can Go in the Referral
kind: conditional
when: "flag.intelligence_assessment_ready"
location: capital
token: security
portraits: [kesht, salgado]
background: intelligence-office
---

⚙️ Conditional follow-up after an authorized assessment. Proposed integration keys: `intelligence_assessment_ready` gates dispatch; `intelligence_assessment_result` is 1 (evidence supports a referral), 2 (inconclusive), or 3 (a forward-looking safeguard is available); `intelligence_public_claim_exceeds_record` is true only if an earlier public statement goes beyond verified evidence. These are not live-game flags. Never treat a referral as proof of guilt or a safeguard as an answer about the past.

## review

Kesht has brought an envelope to the Justice ministry. Salgado sets a folder beside it and checks whether the two offices can retain the same material.

> **Darian Kesht:** "You can keep this copy. The other part is still with the office that gave it to us. They haven't agreed to release it."

> **Renata Salgado:** "Then let's start with what we can read."

She turns the folder so you can see the cover sheet. The receiving office has listed what it can review and what remains outside its authority.

1. **"Show me what the evidence can establish."** `[once]`
   ↳ `[if: flag.intelligence_assessment_result == 1]` > **Renata Salgado:** "These records support the concern we reviewed. The receiving office will decide whether the material warrants a case and what else it needs."
   ↳ `[if: flag.intelligence_assessment_result == 2]` > **Darian Kesht:** "This is the entry we went looking for. We didn't find anything to corroborate it. I can tell you which records we were able to check."
   ↳ `[if: flag.intelligence_assessment_result == 3]` > **Renata Salgado:** "We can change who verifies the next decision. That may improve the record from now on. It won't answer the allegation about the earlier decision."
2. **"What can the receiving office do with the material?"** `[once]`
   ↳ > **Renata Salgado:** "It can review what it has lawful access to. It decides whether the evidence warrants a case and what additional records it needs."
3. **"I'm ready to decide what the government should do."** `→ decision`

→ review

## decision

Salgado leaves the receiving office's list open. Kesht keeps the envelope closed; its contents remain under the original custodian's rules.

1. **"Refer the material the receiving office can use."** `[show if: flag.intelligence_assessment_result == 1]`
   ↳ Renata Salgado gets the register number from her aide and gives it to Darian Kesht.
   ↳ > **Renata Salgado:** "Anyone who asks can use this number to confirm that the office received the file. The investigators will decide what follows."
2. **"Apply the authorized safeguard to future decisions."** `[show if: flag.intelligence_assessment_result == 3]`
   ↳ Renata Salgado gives the clerk the revised form.
   ↳ > **Renata Salgado:** "Ask the office to tell us when it has begun using this version. That will document the change; it won't resolve the earlier allegation."
3. **"Record what we established and leave the rest open."**
   ↳ Darian Kesht closes the folder at the outstanding request.
   ↳ > **Darian Kesht:** "I'll keep asking for the missing record. If they release it, you'll receive another report."
4. **"End the government's review here."**
   ↳ Renata Salgado asks the clerk to record the evidence already held and any independent referral still outstanding.
   ↳ > **Renata Salgado:** "Closing our review doesn't cancel a case held by another office."
5. **"Correct the statement we made about this matter."** `[show if: flag.intelligence_public_claim_exceeds_record]`
   ↳ > "Our earlier statement went further than the evidence allowed. We have information that warrants examination. No finding of guilt has been made."
   ↳ > **Renata Salgado:** "I'll give the press office that correction. They can publish it once you approve the wording."
6. **"Leave the public statement as it stands."** `[show if: flag.intelligence_public_claim_exceeds_record]`
   ↳ Renata Salgado records Lara's decision. The receiving office still gets the same evidence; the public statement does not change what it may investigate.

⚙️ Carry only verified evidence and authorized safeguards into later case outcomes. The receiving institution independently decides whether to open or close a proceeding.

→ END
