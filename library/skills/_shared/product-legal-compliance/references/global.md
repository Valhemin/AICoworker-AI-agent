# Global add-on

Read this only when the user asks for a global product or names a market outside Vietnam. Keep the Vietnam file for users in Vietnam. Do not implement every country. Do not claim GDPR, PCI, SOC 2, or ISO certification.

## EU and UK baseline

Use when the market includes the EU, EEA, UK, or unspecified "global".

- GDPR (EU) and UK GDPR: name the controller, purposes, lawful basis, recipients, retention, international transfers, and rights (access, rectify, erase, restrict, portability, object).
- Consent for non-essential cookies and similar tracking before those cookies are set. Essential session cookies may load without a marketing banner. Rejecting must be as easy as accepting.
- A data-subject request path with the same actions as the Vietnam data-rights screen. One screen may serve both if the text covers both instruments.
- Processors (host, email, analytics, payments) need a contract. Flag missing DPAs as OWNER ACTION.
- Transfers out of the EU/UK need a stated mechanism (adequacy or standard clauses). Flag it. Do not draft the clauses.
- Personal-data breach process: assess, and where required notify the supervisory authority within 72 hours and the people when risk is high. This is a runbook, not a fake filing.
- Distance consumer sales: identity, price including taxes and unavoidable fees, main characteristics, withdrawal right. The usual withdrawal period is 14 days for goods and services, with the digital-content exception only when the user expressly agrees to start immediately and acknowledges they lose the right. Link the exceptions in the terms instead of promising 14 days for every download.
- The EU online dispute resolution platform closed in 2025. Do not add that link.
- European Accessibility Act applies from 2025-06-28 to in-scope consumer services such as e-commerce. If the product sells to EU consumers, meet the repo's existing accessibility bar and record the gap. Do not claim conformance.
- A large online platform has extra Digital Services Act duties. A normal app needs clear terms, a contact, and a way to report illegal content if users publish content. Do not implement very-large-platform audits unless the user is that platform.

## United States baseline

Use when the market includes the United States or unspecified "global".

- California (CCPA/CPRA): notice at collection, a "Do not sell or share" path if the product sells or shares personal information for cross-context ads, and a way to request access or deletion. Do not add the link when the product does not sell or share.
- Children under 13: COPPA. Do not collect their data without a verifiable parent flow. If the product is not for children, say so in the notice and do not add child-directed features in the same slice.
- Marketing email needs a real identity, a real unsubscribe that works, and honest subject lines (CAN-SPAM). Canada (CASL) needs consent before commercial email. Build the unsubscribe when the product sends marketing mail.
- Card numbers stay with a PCI DSS processor. The app confirms the amount and does not store the PAN, CVV, or magnetic-stripe data.

## Named markets only

Add a row, do not invent a full statute:

| Named market | Add |
|---|---|
| Brazil | LGPD: lawful basis, rights, and a contact for the data subject |
| China | PIPL: separate consent for sensitive data and for export. Stop for counsel before any China launch |
| Singapore or Thailand | PDPA: notice, consent or stated exception, access and correction |
| Other | One line naming the privacy statute to verify. Do not code to a guess |

## Conflict

When two markets both apply, implement the stricter in-product control (separate consent, shorter retention, easier refusal). Record which instrument set the stricter rule. Do not drop the Vietnam notice because a GDPR notice exists.
