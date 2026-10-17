# Abuse Protection

## Threat Surface for Multi-User Apps

| Threat | Mitigation |
|---|---|
| Brute force login | Rate limit by IP + by account; exponential backoff; CAPTCHA after N failures |
| Credential stuffing | Detect unusual login patterns; breach password detection (HaveIBeenPwned API) |
| Account enumeration | Same error message for "email not found" and "wrong password" |
| Spam account creation | Email verification required; CAPTCHA or proof-of-work on signup |
| Bot traffic | Honeypot fields; behavioral signals; rate limits by IP |
| Scraping | Rate limits per user/IP; authentication required for sensitive endpoints |
| Fake org / invitation abuse | Limit invitations per org per day; verify invitee email domain if applicable |
| Upload abuse | Per-user storage quota; file size limits; MIME type validation server-side |
| Resource exhaustion | Per-tenant request rate limits; per-user API quotas; compute timeouts |
| Privilege escalation via API | Auth check on every endpoint — not just at route entry; deny by default |

## Rate Limit Tiers

Define rate limits at multiple layers:

```
IP-level       — unauthenticated requests, auth endpoints
User-level     — authenticated API calls
Tenant-level   — aggregate across all users of an org
API-key-level  — for machine-to-machine access
Endpoint-level — expensive operations (search, export, AI calls)
```

Return `429 Too Many Requests` with `Retry-After` header. Never silently drop requests.

## Monitoring for Abuse

Alert on:
- Spike in 401/403 responses from a single IP
- Unusual signup volume
- Large data exports
- Failed payment spikes (card testing)
- Abnormal API call volume from a single tenant

Log the signals; don't assume absence of alerts = absence of abuse.
