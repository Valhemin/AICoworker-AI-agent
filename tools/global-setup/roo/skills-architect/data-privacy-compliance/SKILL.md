---
name: data-privacy-compliance
description: Identify PII and regulated data in a feature spec, classify it, assign handling requirements, and produce a data-privacy section ready for implementation.
---

TRIGGER: feature spec involves user data, PII, analytics, payment, health, or any personally identifiable information
OUTPUT: detailed — data inventory table, regulatory mapping with requirement checklists, per-field handling requirements, risk flags
SKIP: features with no user data, no PII, and no regulated data involved

---


Use when a feature spec involves user data, account data, third-party data, analytics, or any personally identifiable information. Also use when reviewing a spec that mentions "user data" without classifying it.

## Trigger patterns

- Feature stores, transmits, or displays user information
- Third-party API returns data about real people or organizations
- Spec mentions: email, phone, location, payment, health, age, identity, profile
- Spec uses phrases like "user data", "analytics", "tracking", "logs" without further classification
- Compliance context: GDPR, CCPA, HIPAA, PCI-DSS, PDPA, LGPD, or "we have EU users"

## Phase 1 — Data inventory

List every data element the feature touches. For each:

```
| Field | Source | Classification | Retention | Shared with |
|---|---|---|---|---|
| email | user input | PII — contact | 90 days after account closure | [email provider] |
| IP address | server logs | PII — indirect | 30 days | none |
| payment card | Stripe | PCI-DSS — out of scope (Stripe handles) | not stored | Stripe |
```

**Classification tiers:**

| Class | Examples | Handling floor |
|---|---|---|
| PII — direct | Name, email, phone, address, SSN, DOB | Encrypt at rest; access-log all reads |
| PII — indirect | IP, device ID, browser fingerprint | Pseudonymize; log retention limits |
| Sensitive PII | Health, biometric, race, religion, sexual orientation | Explicit consent; stricter access control |
| Financial | Card number, bank account | PCI-DSS or delegate to compliant provider |
| Credentials | Passwords, tokens, API keys | Hash (bcrypt/argon2); never log |
| Business data | Company name, non-personal usage data | Standard data handling |
| Anonymous | Aggregated stats with k≥5 anonymity | No special handling required |

If a data element classification is unclear, flag it: `[NEEDS CLASSIFICATION]` — do not assume anonymous.

## Phase 2 — Regulatory mapping

Identify which regulations apply based on user geography and data types:

| Regulation | Applies when | Key requirements |
|---|---|---|
| GDPR | EU/EEA users or data | Lawful basis, consent, right to erasure, DPA |
| CCPA | California users, >$25M revenue or >50K users | Right to opt-out of sale, disclosure |
| HIPAA | US health data | BAA required, encryption, audit logs |
| PCI-DSS | Card payment handling | Scope minimization, or delegate to compliant provider |
| PDPA | Thai users | Consent-based, data subject rights |
| LGPD | Brazilian users | Similar to GDPR |

For each applicable regulation, list the minimum implementation requirements:

```
## Regulatory requirements

### GDPR (applies: EU users in scope)
- [ ] Lawful basis documented: [consent | legitimate interest | contract]
- [ ] Privacy policy updated to include this feature's data use
- [ ] Data subject rights implemented: access, rectification, erasure, portability
- [ ] Data retention schedule defined and enforced
- [ ] Sub-processor agreements in place for: [list third parties]
- [ ] Data breach notification procedure exists (72-hour window)
```

## Phase 3 — Data handling requirements

For each PII or regulated field, specify:

```
### [Field name]

- Storage: [encrypted at rest with AES-256 | hashed with bcrypt | not stored]
- Transit: [TLS 1.2+ | internal only | third-party name]
- Access control: [roles that can read/write]
- Audit log: [yes — log read access | no — write-only audit | not required]
- Retention: [N days | until account deletion | indefinitely with justification]
- Deletion path: [how data is purged when user requests erasure or account closes]
- Anonymization: [if applicable — how and when]
```

## Phase 4 — Risk flags

Flag these conditions as HIGH or CRITICAL if present:

| Condition | Severity | Required action |
|---|---|---|
| PII stored without encryption at rest | CRITICAL | Add encryption before launch |
| Passwords or tokens logged | CRITICAL | Remove logging, rotate affected secrets |
| No retention schedule for PII | HIGH | Define retention before launch |
| Third-party receives PII without DPA | HIGH | Add DPA or remove data sharing |
| User consent not captured for non-essential data use | HIGH | Add consent mechanism |
| Right-to-erasure path undefined | HIGH | Define deletion procedure |
| Sensitive PII (health, biometric) without explicit consent | CRITICAL | Block feature until consent implemented |

## Output format

```
## Data Privacy & Compliance

### Data inventory
[table]

### Applicable regulations
[list with requirements checklist]

### Per-field handling requirements
[per field blocks]

### Risk flags
[CRITICAL/HIGH items]

### Assumptions
- ASSUMPTION: jurisdiction — [assumed user geography if not stated]
- ASSUMPTION: compliance scope — [e.g., "GDPR applies; HIPAA not applicable — no health data"]

### Out of scope
[data or regulations explicitly excluded and why]

### Open items (NEEDS CLARIFICATION)
[only truly blocking items]
```

## Done-definition

Data privacy section is READY when:
- Every data element is classified (no `[NEEDS CLASSIFICATION]` remaining unless escalated to user).
- Every CRITICAL risk flag has a resolution or explicit owner.
- Applicable regulations are listed with requirement checklists.
- Retention and deletion path defined for every PII field.
- Assumptions recorded for jurisdiction and scope.

## Assumption policy

If user geography or compliance scope is not stated:
- Default: assume GDPR applies (strictest common baseline).
- Record: `ASSUMPTION: GDPR baseline — adjust if no EU users and confirmed by stakeholder`.
- Never assume "no compliance requirements apply" without explicit confirmation.
