# Pages and desktop functions

Use the rows whose condition is true. A page may be one route with anchors. A desktop function may be one settings screen with sections. The user must reach it without already paying or already sending the data.

Placeholder legal prose is allowed when the owner has not supplied final text. The heading, the required facts, and the action (accept, download, request deletion) must work.

## Web pages

| Condition | Page | Must contain |
|---|---|---|
| Any processing of personal data | Privacy notice | Controller identity, data types, purposes, retention, recipients, rights, how to exercise them. Vietnam: Luật 91/2025 Điều 9 and Luật 19/2023 Điều 16 |
| Account or ongoing service | Terms of use | What the service is, acceptable use, how to close the account |
| Personal data | Contact for privacy and complaints | A channel a person can actually use |
| Sale of goods or services | Owner identity on the home page | Name, address, registration or tax code, phone or direct contact. NĐ 52 Điều 29 |
| Sale | Offer / product | Characteristics, origin, label facts required for that good |
| Sale | Price | Whether tax, packing, and shipping are included |
| Sale | General terms | Limits, inspection, return, refund path, warranty, duties of each side. Separate accept at checkout. Vietnamese for Vietnam |
| Physical delivery | Shipping | Methods, estimated time, geographic limits, cancel if late |
| Payment | Payment | Methods, and a confirm step before charge |
| Sale | Contract copy | Preview before accept, download after accept |
| Sale or account | Complaints | How to submit, and what happens next |
| Subscription or continuous service | Cancel | Send termination, keep a copy, show it was received. NĐ 52 Điều 22 |
| Non-essential cookies or ad tracking | Cookie and ads choice | Accept and reject before non-essential tags. Vietnam Điều 28; EU/UK when global |
| User-generated content | Report content | Category, the item, a record for takedown |
| Marketplace | Seller terms and disputes | Seller identity, buyer-seller complaint, five-day notice before material term changes |

Do not add a checkout, tax registration, or ministry badge to a site that does not sell.

## Desktop functions

Same duties, inside the app. A link to a website counts only if the app also works when that page is the documented place and the task says the legal text is hosted there. Account deletion and consent withdrawal must still be callable from the app.

| Condition | Function | Behavior |
|---|---|---|
| Collects personal data | Privacy notice | Shown before the first collection, including on first launch if the app collects on launch |
| Collects personal data | Consent | Per purpose, stored, not pre-ticked for optional purposes. Sensitive data is labeled sensitive |
| Account or stored personal data | My data | View, correct, export, delete, withdraw consent. Deleting the OS app is not a substitute for server deletion |
| Consumer sale | Legal identity | Same facts as the web owner block, in About or during purchase |
| Consumer sale | Purchase review | Line items, total, fees, taxes, delivery, return rules, then explicit confirm |
| Consumer sale | Orders | History, status contact, download of the accepted contract |
| Consumer sale | Returns and complaints | Request path with the policy fields |
| Subscription | Cancel | In the app, not only by emailing support. Confirmation kept |
| Marketing | Refusal | Stops further marketing sends |
| User content | Report | Same as web |
| Auto-update | Signed update | Already required by `security-threat-model`. Do not add a second updater |
| Crash or diagnostics | Opt-in when not essential | Logs contain no passwords, tokens, or national ids |

A desktop utility that never collects personal data and never sells needs an About screen with who publishes it and how to contact them. It does not need checkout or data-rights flows.

## Global extras on the same surfaces

When `references/global.md` is in scope, extend the privacy notice and the consent screen. Do not create a second hidden policy. Add the "Do not sell or share" action only if the US baseline applies and the product sells or shares personal information.
