# PromptOS — MVP Milestones

**Version:** 0.1.0  
**Rule:** Implement milestone-by-milestone after architecture approval. Each milestone ends with reviewable, production-quality code (typed, linted, tested where specified).

---

## Milestone 0 — Architecture approval

**Type:** Documentation / decision  

### Done when

- [x] Clarifying questions answered ([clarifying-questions.md](../product/clarifying-questions.md))
- [x] PRD reviewed
- [x] System architecture reviewed (including Tauri + Prisma / Node LTS approach)
- [x] Design system light-first / Graphite Ink accepted
- [x] Green light to scaffold code (**signed off**)

**Application feature code begins at Milestone 1.**

---

## Milestone 1 — Project scaffold

### Scope

- Vite + React + TS (strict) + Tailwind + shadcn/ui baseline
- **pnpm** workspace (single package)
- ESLint + Prettier + Vitest harness
- Tauri app window loads React shell (**Windows** target)
- Folder structure per architecture doc
- Prisma schema committed; migrate on fresh DB (incl. nested `categories`)
- `DataClient` + Prisma repository via **Node LTS** sidecar/bridge
- Light theme default
- README updated with Windows dev commands
- `LICENSE` (MIT)

### Exit criteria

- [x] `pnpm dev` runs (Vite UI)
- [x] `pnpm tauri:dev` configured for Windows (`src-tauri`)
- [x] CI workflow: lint, typecheck, test, build
- [x] Empty AppShell visible (light theme)
- [x] Prisma initial migration + `DataClient` port (memory in renderer; Prisma in Node)

---

## Milestone 2 — Asset library & CRUD

### Scope

- Create / read / update / soft-delete assets (all types via shared form) — **no hard delete**
- Nested category taxonomy CRUD + filter
- Library page with type filter, sort, favorite, archive
- Basic metadata: category, tags, status (`draft|active|archived|deprecated`), notes
- Model compatibility as free tags
- Variables CRUD (`{{snake_case}}` keys)
- Optional: seed path preparation for demo library

### Exit criteria

- Service + repository tests for AssetService
- Can create 13 types and see them in library

---

## Milestone 3 — Editor experience

### Scope

- TipTap markdown editor + **tabbed** preview (Editor | Preview)
- Variable highlighting `{{snake_case}}`
- Copy body, duplicate, fork
- Autosave or explicit save with dirty state

### Exit criteria

- Editor RTL smoke test
- Fork creates new ULID asset linked optionally via relationship

---

## Milestone 4 — Dashboard, search, command palette

### Scope

- Dashboard: recent, favorites, pinned, stats
- Fuse.js index build/upsert
- Global search UI
- `Ctrl+K` palette — **navigate + create + search only**
- First-run **sample library** / demo assets seed on empty DB

### Exit criteria

- Search returns expected fixtures in unit tests
- Palette opens from keyboard

---

## Milestone 5 — Version history

### Scope

- Auto-revision on save (content-hash gated)
- History list, diff compare, restore, duplicate-from-revision

### Exit criteria

- RevisionService tests cover restore

---

## Milestone 6 — Relationships & graph

### Scope

- Link/unlink assets with kinds
- Asset detail “Related” panel
- Graph page: **ego-graph** with focus + depth

### Exit criteria

- Graph renders fixture subgraph
- No full-library force layout required for MVP

---

## Milestone 7 — Agents & workflows

### Scope

- Agent-specific editor sections (purpose, I/O, etc.)
- Workflow list + canvas (React Flow or chosen lib) — **builder + visualization only**
- Nested prompt packs (`childPackIds`)
- Save nodes/edges; workflow templates flag

### Exit criteria

- Can build prompt→agent→prompt→output and reload

---

## Milestone 8 — Import / export / backup

### Scope

- Import MD, JSON, YAML, ZIP
- Export same
- Settings: light-first theme toggle, **manual** backup/restore
- Placeholder settings pages for AI + Sync
- English-only copy

### Exit criteria

- Round-trip JSON export/import test
- Backup file restores on clean DB

---

## Milestone 9 — MVP polish & package

### Scope

- Empty states, error toasts, keyboard pass
- Performance check on ~1k assets fixture
- Tauri **Windows** installer only
- Short USER_GUIDE.md (English)

### Exit criteria

- Tagged `v0.1.0-mvp`
- Milestone checklist complete

---

## Definition of Done (every coding milestone)

1. Types strict; no `any` without justification  
2. Zod validation at boundaries  
3. Tests for new domain/service logic  
4. Docs updated if architecture changes  
5. Conventional commits on a feature branch  
6. Lint + typecheck clean  
