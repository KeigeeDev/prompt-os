# PromptOS — Clarifying Questions (Decided)

**Status:** ✅ Decided — 2026-07-30  
**Purpose:** Product decisions locked for Milestone 0 / MVP.

---

## Product scope

| # | Question | Decision |
|---|----------|----------|
| 1 | Primary platforms for MVP? | **Windows only** |
| 2 | Default theme direction? | **Light-first** (dark + system still available in settings) |
| 3 | Soft delete vs hard delete? | **Soft delete only** in MVP (no hard-delete / empty-trash yet) |
| 4 | Variable syntax? | **`{{snake_case}}`** Mustache-style |
| 5 | Workflow execution in MVP? | **Builder + visualization only** (no run/execute) |
| 6 | Multi-window support? | **Single primary window** + optional preference panes |
| 7 | Onboarding? | **First-run sample library** (demo assets) |
| 8 | Localization? | **English only** |

## Data & privacy

| # | Question | Decision |
|---|----------|----------|
| 9 | Telemetry? | **None** in MVP |
| 10 | Encryption at rest? | **Rely on OS disk encryption**; no app-level DB passphrase in MVP |
| 11 | Auto-backup schedule? | **Manual backup in MVP**; optional scheduled backup is post-MVP |

## Asset model

| # | Question | Decision |
|---|----------|----------|
| 12 | Notes vs Snippets? | **Distinct** asset types |
| 13 | Prompt Packs? | **Nested packs** supported |
| 14 | Categories? | **Nested taxonomy** |
| 15 | Status values? | **`draft` \| `active` \| `archived` \| `deprecated`** |
| 16 | Model compatibility? | **Free tags** (e.g. `gpt-4o`, `claude-4`) |

## UX

| # | Question | Decision |
|---|----------|----------|
| 17 | Command palette scope? | **Navigation + create + search only** (no settings actions in MVP) |
| 18 | Graph view? | **Ego-graph** (selected asset + N hops) |
| 19 | Editor default? | **Tabbed preview** (Editor \| Preview tabs) |

## Engineering

| # | Question | Decision |
|---|----------|----------|
| 20 | Package manager? | **pnpm** |
| 21 | Sidecar runtime? | **Node LTS** |
| 22 | Monorepo? | **Single package** for MVP |
| 23 | License? | **MIT** |

---

These decisions override any earlier “provisional” defaults in architecture and product docs.
