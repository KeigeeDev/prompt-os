# PromptOS — Development Roadmap

**Version:** 0.1.0  
**Related:** [MVP Milestones](./mvp-milestones.md) · [Future Roadmap](./future-roadmap.md)

---

## Phased overview

```text
Phase 0  Foundation & architecture (clarifying Qs decided)  ← YOU ARE HERE
Phase 1  App shell + persistence skeleton (Windows, pnpm, Node LTS)
Phase 2  Asset CRUD + library + editor
Phase 3  Search + command palette + dashboard
Phase 4  Versions + relationships + graph
Phase 5  Workflows + agents specialization
Phase 6  Import/export + backup
Phase 7  Hardening, polish, MVP release
Phase 8+ Future features (see future-roadmap.md)
```

Each phase maps to one or more **MVP milestones** with exit criteria. Do not skip architecture approval.

---

## Phase 0 — Foundation (current)

**Deliverables:** PRD, architecture, schema, types, routing, design system, standards, README.

**Exit:** Explicit Milestone 0 sign-off. Clarifying questions are decided — see [clarifying-questions.md](../product/clarifying-questions.md).

---

## Phase 1 — Skeleton

- Scaffold Vite + React + TS + Tailwind + shadcn
- Tauri shell boots empty AppShell
- Prisma + SQLite connectivity via data client
- DI container wires repositories
- CI: lint, typecheck, unit test stub

---

## Phase 2 — Core assets

- Asset CRUD for all types (shared editor)
- Library list/filter
- Tags, variables, favorites, pin, archive
- TipTap editor + preview

---

## Phase 3 — Findability

- Fuse search index
- Command palette
- Dashboard widgets

---

## Phase 4 — Memory & graph

- Automatic revisions, compare, restore, fork
- Relationship CRUD
- Graph visualization (ego-graph)

---

## Phase 5 — Specialized surfaces

- Agent form fields / layout
- Workflow builder canvas + templates

---

## Phase 6 — Portability

- Import/export MD/JSON/YAML/ZIP
- Settings backup/restore

---

## Phase 7 — MVP release

- Performance pass, empty states, keyboard polish
- Packaging for target OS
- Documentation for users (short)

---

## Dependency graph

```text
Schema/Prisma ──▶ Asset CRUD ──▶ Editor
                     │
                     ├─▶ Search/Palette/Dashboard
                     ├─▶ Revisions
                     ├─▶ Relationships ──▶ Graph
                     ├─▶ Workflows / Agents UI
                     └─▶ Import/Export / Backup
```

---

## Risk register

| Risk | Mitigation |
|------|------------|
| Prisma + Tauri integration friction | Isolate behind DataClient; spike in Phase 1 |
| TipTap complexity | Start with starter kit; variables as marks/decorations later |
| Graph performance | Ego-graph default; virtualize later |
| Scope creep (AI providers) | Strict non-goals until Future phases |
| JSON extension regret | Zod per type; migrate to tables only if needed |
