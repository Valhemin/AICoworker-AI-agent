---
name: non-functional-requirements
description: Elicit, specify, and validate non-functional requirements (NFRs) with measurable metrics — not vague quality attributes.
---

TRIGGER: requirements include performance, scalability, reliability, security, availability, compliance, or accessibility — especially if vague or missing metrics
OUTPUT: detailed — per-category NFRs with numeric metrics, assumptions, deferred attributes, at least one test strategy per NFR
SKIP: when NFRs already have numeric metrics; only use when vague qualifiers need to be converted to measurable criteria

---


Use when requirements include any of: performance, scalability, reliability, security, availability, maintainability, compliance, or accessibility. Also use when reviewing a spec where NFRs exist but lack metrics.

## Vague NFR rejection rule

Any NFR without a numeric metric or verifiable condition is REJECTED. Examples:

| Rejected (vague) | Required (measurable) |
|---|---|
| "Must be fast" | "API p95 latency < 300 ms under 500 concurrent requests" |
| "Should be reliable" | "Service availability ≥ 99.9% measured over 30-day rolling window" |
| "Must be secure" | "All user inputs sanitized; no stored secrets in plaintext; penetration test before launch" |
| "Should scale" | "Supports 10,000 MAU with < 2× infrastructure cost increase per 10× user growth" |
| "Must be accessible" | "WCAG 2.1 AA compliance; all interactive elements keyboard-navigable" |

If the user or requirements doc provides a vague NFR, elicit the metric before recording it.

## NFR categories and required metric format

### Performance
```
NFR-P1: [Operation] p[percentile] < [time] ms under [load condition]
NFR-P2: [Page/resource] loads in < [time] s on [network condition] (e.g., 4G, no cache)
```

### Scalability
```
NFR-S1: System supports [N] concurrent [users/requests/jobs] without [degradation condition]
NFR-S2: Data volume up to [N] [records/GB] with query time < [T] ms
```

### Availability / Reliability
```
NFR-A1: Service uptime ≥ [X]% over [rolling window] (e.g., 99.9% over 30 days)
NFR-A2: Recovery time objective (RTO): < [T] minutes after failure
NFR-A3: Recovery point objective (RPO): data loss window < [T] minutes
```

### Security
```
NFR-SEC1: [Specific control] — e.g., "All API endpoints require JWT auth; unauthenticated requests return 401"
NFR-SEC2: [Specific constraint] — e.g., "No secrets stored in environment variables in client bundle"
NFR-SEC3: [Compliance requirement] — e.g., "OWASP Top 10 addressed before launch"
```

### Accessibility
```
NFR-ACC1: WCAG [version] [level] compliance for all user-facing pages
NFR-ACC2: Screen reader compatibility tested with [VoiceOver | NVDA | JAWS]
NFR-ACC3: Keyboard-only navigation supports [specific flows]
```

### Maintainability
```
NFR-M1: Code coverage ≥ [X]% for [scope] (e.g., business logic layer)
NFR-M2: [Framework/version] used; no deprecated APIs in production bundle
NFR-M3: Deployment pipeline < [T] minutes from push to production
```

### Compliance
```
NFR-C1: [Regulation] compliance for [data type] — e.g., "GDPR for EU user PII: right to erasure implemented"
NFR-C2: [Audit log requirement] — e.g., "All auth events logged with user ID, timestamp, IP"
```

## Elicitation workflow

When NFRs are missing or vague, ask the minimum set of questions to derive measurable values:

1. **Who is the expected load?** (concurrent users, peak requests/s, data volume)
2. **What is the acceptable degradation threshold?** (max latency, error rate)
3. **What is the availability target?** (SLA expectation, tolerable downtime/month)
4. **What regulatory or compliance context applies?** (GDPR, HIPAA, PCI-DSS, SOC 2, local laws)
5. **What accessibility standard is required?** (WCAG level, target assistive tech)

Max 3 questions before applying assumptions. Record each assumption explicitly.

## Default assumptions (apply when user provides none)

```
ASSUMPTION: performance — no formal SLA stated; default p95 < 2000 ms at expected initial load
ASSUMPTION: availability — no SLA; default best-effort (no uptime commitment)
ASSUMPTION: security — OWASP Top 10 baseline; no formal penetration test scope
ASSUMPTION: accessibility — WCAG 2.1 AA floor unless client scope explicitly reduces it
ASSUMPTION: compliance — no regulated data (PII/financial) unless stated; reassess if feature scope changes
```

## Output format

```
## Non-Functional Requirements

### Performance
- NFR-P1: ...
- NFR-P2: ...

### Scalability
- NFR-S1: ...

### Availability
- NFR-A1: RTO < [T] minutes | RPO < [T] minutes

### Security
- NFR-SEC1: ...

### Accessibility
- NFR-ACC1: WCAG 2.1 AA

### Compliance
- NFR-C1: [none identified — ASSUMPTION: no regulated data]

### Assumptions
- [list all]

### Deferred / out of scope
- [explicit list of quality attributes not addressed this release]
```

## Done-definition

NFR section is READY when:
- Every NFR has a numeric metric or verifiable condition.
- No vague qualifiers remain (fast, reliable, secure, easy, scalable without a number).
- Compliance context is explicitly stated or explicitly declared "not applicable".
- At least one test strategy is implied per NFR (links to acceptance-test-planning skill for full test plan).
- Assumptions are recorded.
- Deferred attributes are listed.
