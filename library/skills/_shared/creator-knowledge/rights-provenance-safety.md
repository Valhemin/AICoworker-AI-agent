# Rights, Provenance, Claims, and Safety Playbook

## Asset ledger

Every important asset should record:

```yaml
asset_rights:
  asset_id:
  asset_type:
  source_or_creator:
  source_url_or_contract:
  license_or_permission:
  allowed_uses:
  territory:
  duration:
  modification_allowed:
  attribution_required:
  likeness_or_voice_consent:
  platform_restrictions:
  model_or_dataset_terms:
  status: unknown|cleared|restricted|rejected
```

Code license, model-weight license, dataset license, and output terms may differ.

## Likeness and voice

Use real-person likeness or voice only with an appropriate basis and consent for the intended use. Record scope, territory, duration, synthetic-use permission, and revocation terms. Do not assume a public image grants commercial rights.

## Claims

Classify claims:

- objective and measurable;
- comparative;
- health/safety;
- financial or earnings;
- environmental;
- testimonial;
- aspirational or puffery;
- fictional narrative statement.

Match evidence and disclosure to risk. Localization may create a stronger claim than the source wording; review each locale.

## Generated-content disclosure

Disclosure depends on platform rules, law, context, and risk. Clearly label reconstructions or synthetic media when audiences could reasonably mistake them for real evidence or real people.

## Safety review

Review foreseeable harm, vulnerable audiences, dangerous imitation, harassment, discrimination, privacy, and misleading realism. Children’s content, political content, regulated categories, and high-stakes advice need specialized review.

## Open-source use

Before adopting a repository or model:

- verify the official source;
- read current license and model card;
- check commercial-use restrictions;
- inspect dependencies and custom nodes;
- record version and hashes;
- test security and privacy implications;
- do not redistribute weights unless allowed.

## Hard stops

- unknown rights for a critical final asset;
- fabricated endorsement or evidence;
- unauthorized voice/likeness use;
- unsubstantiated high-risk claim;
- deceptive reconstruction;
- prohibited content or unresolved legal risk.

## Acceptance criteria

The artifact is decision-ready, exposes assumptions and unresolved risk, follows the named target market and routine, and gives downstream owners enough structured information to proceed without inventing critical details.

