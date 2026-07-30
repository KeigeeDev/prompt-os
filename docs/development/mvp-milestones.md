# PromptOS — MVP Milestones

**Version:** 0.1.0  
**Rule:** Implement milestone-by-milestone after architecture approval. Each milestone ends with reviewable, production-quality code (typed, linted, tested where specified).

---

## Milestone 0 — Architecture approval

**Type:** Documentation / decision  

### Done when

- [ ] PRD reviewed
- [ ] System architecture reviewed (including Tauri + Prisma approach)
- [ ] Critical clarifying questions answered
- [ ] Design system palette/fonts confirmed or explicitly accepted as provisional
- [ ] Green light to scaffold code

**No application feature code before this gate.**

---

## Milestone 1 — Project scaffold

### Scope

- Vite + React + TS (strict) + Tailwind + shadcn/ui baseline
- ESLint + Prettier + Vitest harness
- Tauri app window loads React shell
- Folder structure per architecture doc
- Prisma schema committed; migrate on fresh DB
- `DataClient` + in-memory *or* Prisma repository for health check
- README updated with dev commands

### Exit criteria

- `pnpm dev` / `pnpm tauri dev` runs
- CI workflow passes lint + typecheck + tests
- Empty AppShell visible

---

## Milestone 2 — Asset library & CRUD

### Scope

- Create / read / update / soft-delete assets (all types via shared form)
- Library page with type filter, sort, favorite, archive
- Basic metadata: category, tags, status, notes, model compatibility
- Variables CRUD on asset

### Exit criteria

- Service + repository tests for AssetService
- Can create 13 types and see them in library

---

## Milestone 3 — Editor experience

### Scope

- TipTap markdown editor + live preview
- Variable highlighting `{{var}}`
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
- ⌘K / Ctrl+K palette (navigate + create + search)

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
- Graph page with focus + depth

### Exit criteria

- Graph renders fixture subgraph
- No full-library force layout required for MVP

---

## Milestone 7 — Agents & workflows

### Scope

- Agent-specific editor sections (purpose, I/O, etc.)
- Workflow list + canvas (React Flow or chosen lib)
- Save nodes/edges; workflow templates flag

### Exit criteria

- Can build prompt→agent→prompt→output and reload

---

## Milestone 8 — Import / export / backup

### Scope

- Import MD, JSON, YAML, ZIP
- Export same
- Settings: theme, backup, restore
- Placeholder settings pages for AI + Sync

### Exit criteria

- Round-trip JSON export/import test
- Backup file restores on clean DB

---

## Milestone 9 — MVP polish & package

### Scope

- Empty states, error toasts, keyboard pass
- Performance check on ~1k assets fixture
- Tauri installers for agreed platforms
- Short USER_GUIDE.md

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
