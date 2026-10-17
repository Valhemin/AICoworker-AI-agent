# Interactive Narrative Design Playbook

## Purpose

Design branching stories, conversational experiences, choice-driven video, interactive lessons, and game-like narrative where user decisions produce understandable consequences without creating unmanageable content scope.

## Define the interaction promise

Clarify what agency means:

- choose route or order;
- express identity or relationship;
- solve a problem;
- manage a resource;
- discover information;
- change a later state;
- receive personalized explanation.

A cosmetic choice may be valid, but it must not be sold as consequential agency.

## State model

```yaml
narrative_state:
  variables:
    trust: {type: integer, range: [0, 5]}
    evidence_found: {type: set}
    route: {type: enum, values: []}
  invariants: []
  entry_state:
  ending_conditions: []
```

Separate persistent state from scene-local state. Keep variable count small enough to test.

## Node contract

```yaml
node:
  id:
  objective:
  entry_conditions:
  content:
  information_revealed:
  choices:
    - label:
      player_intent:
      immediate_feedback:
      state_changes: []
      next_node:
  exit_state:
  accessibility_notes:
```

Choices should be distinguishable by intent, not only wording. Consequences can be immediate, delayed, or cumulative, but the system should teach the player how causality works.

## Branching strategies

- foldback: local branches reconverge with persistent state differences;
- hub: users choose modules or paths from a stable center;
- parallel routes: distinct middle paths share an ending space;
- gated discovery: evidence or skill unlocks options;
- systemic: rules combine to produce outcomes rather than hand-authored branches.

Use foldback or stateful reconvergence to control production cost. Fully unique trees grow exponentially.

## Narrative design

Each branch needs a reason beyond content volume. Track promise, emotional arc, knowledge, character relationship, and unresolved setup. Endings should reflect accumulated decisions, not only the last choice.

## AI and dynamic generation

Define canon, allowed variation, safety boundaries, memory window, evidence source, and fallback responses. Generated dialogue must not silently change world rules, legal claims, scoring, or irreversible state. Log prompts, model versions, state, and safety actions.

## Testing matrix

Test:

- every reachable node;
- unreachable and loop states;
- contradictory variables;
- save/resume;
- rapid or malicious input;
- localization expansion;
- accessibility and input alternatives;
- narrative continuity across reconvergence;
- cost and latency under realistic sessions.

## Cost control

Measure unique authored minutes, generated tokens, state complexity, QA paths, voice/localization multiplication, and update propagation. Prototype with text and diagrams before producing final media.

## Failure recovery

- choices feel identical: rewrite around distinct player intents and tradeoffs;
- branches explode: reconverge with persistent state or remove low-value branches;
- consequence unclear: add immediate feedback and later callback;
- dynamic output breaks canon: constrain retrieval/state and use authored fallback;
- testing impossible: reduce variables and formalize transition validation.

## Acceptance criteria

All choices have documented intent and effect; state transitions validate; every ending is reachable and causally earned; accessibility, safety, latency, cost, and localization are tested for the intended release scope.
