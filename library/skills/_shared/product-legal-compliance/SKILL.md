---
name: product-legal-compliance
description: "Use when specifying or implementing a website or desktop app that collects personal data, sells to consumers, or is aimed at Vietnam or a global market."
---

TRIGGER: a website, web app, or desktop app will collect personal data, create accounts, sell goods or services, show ads, accept user content, or ship to Vietnam or another named market
OUTPUT: legal surface checklist — market, required pages or desktop functions, in-product controls, OWNER ACTION filings, blocked items
SKIP: libraries, CLIs, and internal tools with no end-user personal data and no consumer sale. Say skipped and why

---

# Product legal compliance

Engineering checklist so implementation includes the pages and functions the cited laws require. This is not a legal opinion and not a compliance certificate. Do not write "legally compliant" or "certified". Say what the product implements and what a person must still file.

Instruments below were checked on 2026-10-22. If the task is more than 12 months later, or the user says the law changed, re-read the cited instrument before treating a row as current. Regulated products (banking, insurance, credit, health, education surveillance, news, social network, gambling, children as the audience) stop for a lawyer before build. Record that stop. Do not invent a license.

## Market

- No market named: Vietnam. Read [references/vietnam.md](references/vietnam.md).
- User says global, international, worldwide, or names a country outside Vietnam: Vietnam still applies to users in Vietnam, and [references/global.md](references/global.md) applies to the markets they named.
- "Global" with no country list: assume EU/UK plus US baseline. Record `ASSUMPTION: global = EU/UK + US. Add China, Brazil, Singapore, or Thailand only when named.`

## What to produce

Read [references/surfaces.md](references/surfaces.md).

- Web: add the pages the market section marks required. Each page is linked from the footer or the step where the user decides (checkout, signup, consent).
- Desktop: the same duties are screens or dialogs inside the app, not a website. Account, consent, data rights, and commerce flows must work offline-to-server as specified in that file.
- Copy can be placeholder only where the skill says the owner supplies the legal text. The route, screen, and the data fields must exist. Do not ship a footer link to a 404.
- Vietnamese UI for the Vietnam market includes a Vietnamese legal notice. A global product adds the language of each named market for privacy and consumer terms.

## In product vs owner filing

Implement in the product: notices, consent records, data-subject actions, price display, contract preview and download, complaint intake, return request, subscription cancel, cookie or ad choices. When personal data is stored, the consent row, export, and server delete follow `consent-and-erasure`. Field classification follows `data-privacy-compliance`.

Do not pretend a filing happened. Mark these `OWNER ACTION` and do not draw a government badge unless the user supplies the official URL:

- Bộ Công Thương notification or registration on online.gov.vn
- Personal-data impact file and cross-border transfer file to the police data-protection unit
- Tax e-invoice registration
- Domain notification to the ministry that manages internet resources
- A license for press, aggregated news, or a social network

## Done rule

The slice is not done when a required page or desktop function in scope is missing, or when personal data is collected with no per-purpose consent record.

A missing OWNER ACTION does not block the code slice. It must appear in the output so the user can file it.

## Output

```
## Legal surface

Market: [Vietnam | Vietnam + ...]
Product kind: [info site | account app | own-store | marketplace | desktop utility | ...]
Exemption claimed: [none | small/startup DPIA deferral — basis]

### In product
- [page or function] — [instrument] — [path or screen] — present | missing

### OWNER ACTION
- [filing] — [who] — not done in code

### Blocked
- [item that stops this slice, or "none"]

### Not claimed
This checklist does not certify legal compliance.
```
