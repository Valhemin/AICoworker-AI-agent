---
name: consent-and-erasure
description: "Use when a website or desktop app collects personal data and must store proof of consent, export that data, and delete it on the server."
---

TRIGGER: a website, web app, or desktop app collects personal data, asks for consent, or offers account export or deletion
OUTPUT: purpose list, where each consent row is stored, export path, server delete path, what is kept for a legal duty
SKIP: no personal data is stored. Say skipped and why

---

# Consent and erasure

`product-legal-compliance` names the screen. This skill is the record and the server action behind that screen. A checkbox with no stored row does not count. Uninstalling a desktop app does not delete the account.

Classify fields with `data-privacy-compliance` before choosing what export and delete must cover.

## Consent row

Write one row per purpose decision. Do not collapse every purpose into one boolean.

| Field | Rule |
|---|---|
| subject | User id. Before an account exists, a random id stored on the device. Not a copy of the national id |
| purpose | Stable key: `account`, `marketing`, `analytics`, `ads`, or another key named in the notice |
| choice | `granted`, `refused`, or `withdrawn` |
| policy_version | Version of the privacy notice shown |
| terms_version | Version of the terms shown, when the purpose depends on terms |
| occurred_at | Time of the choice |
| surface | Route or desktop screen name |

Optional purposes start as `refused`. A pre-ticked box is a bug. Silence is `refused`, not `granted`.

Keep old rows. A new choice adds a row. It does not overwrite history.

When `policy_version` or `terms_version` changes, ask again before using the old `granted` row for that purpose. Account access that the contract still requires may continue. Marketing, analytics, and ads may not.

## Export

One action returns the personal data the product stores for that subject, including the consent history. The user can download it from the web app or the desktop app.

Do not include password hashes, session tokens, or other people's data. A file that only lists the email address is incomplete when the product also stores orders, messages, or files.

## Delete

One server action, called from the web app or the desktop app:

- Delete or irreversibly anonymize that subject's personal data in the product database, object storage, and search index.
- Revoke sessions and refresh tokens.
- Ask each processor that has an API to delete the same subject. A processor with no API is `OWNER ACTION`, named in the output.
- Leave a tombstone with an internal id, `deleted_at`, and the reason. No name, email, phone, or content on that row.
- Keep invoices and accounting documents for the retention period accounting law requires. As of Luật Kế toán 2015, ordinary accounting documents are kept at least five years and documents the law marks as important are kept longer. If the task is more than 12 months after 2026-10-22, confirm the period before coding it. Strip personal fields the invoice does not have to show, and list every kept record with the duty that requires it.
- The same limit applies when the global add-on is on: erasure stops where a legal duty requires the record.

Withdrawal of one purpose stops future use of that purpose. It does not rewrite processing that already happened. Marketing withdrawal stops later sends.

A control that only hides the profile in the UI, or only deletes a local file, is not done.

## Output

```
## Consent and erasure

Purposes: [key — required or optional — default]
Row store: [table or collection]
Export: [route or IPC] — fields included
Delete: [route or IPC] — stores touched
Kept: [record — legal duty — period]
Processors: [name — API delete | OWNER ACTION]
```
