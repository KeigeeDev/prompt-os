# PromptOS — Folder Structure

**Version:** 0.1.0  
**Status:** Draft — target structure (not yet scaffolded in code)

This document defines the **canonical repository layout**. New files should follow it. Implementation scaffolding begins only after architecture approval.

---

## 1. Design Rationale

- **Feature-based** vertical slices for UI + feature state
- **Domain / application / infrastructure** separation for non-UI logic
- **Shared** for cross-feature UI and utilities
- **docs/** for product & architecture (source of truth alongside code)
- Avoid deep inheritance trees and “god” `components/` dumping grounds

**Trade-off:** Feature folders may duplicate small presentational pieces. Prefer promote-to-`shared` only after second use.

---

## 2. Target Tree

```text
prompt-os/
├── README.md
├── LICENSE                          # TBD after clarifying questions
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── components.json                  # shadcn/ui
├── eslint.config.js
├── .prettierrc
├── .editorconfig
├── .gitignore
├── .env.example
│
├── docs/
│   ├── README.md                    # Documentation index
│   ├── product/
│   │   ├── PRD.md
│   │   └── clarifying-questions.md
│   ├── architecture/
│   │   ├── system-architecture.md
│   │   ├── folder-structure.md
│   │   ├── typescript-interfaces.md
│   │   ├── routing.md
│   │   └── adr/                     # Architecture Decision Records
│   ├── database/
│   │   ├── schema.md
│   │   └── prisma-models.md         # Human-readable companion to schema.prisma
│   ├── design/
│   │   └── design-system.md
│   ├── wireframes/
│   │   └── *.md
│   └── development/
│       ├── coding-standards.md
│       ├── git-branch-strategy.md
│       ├── git-commit-convention.md
│       ├── roadmap.md
│       ├── mvp-milestones.md
│       └── future-roadmap.md
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts                      # Optional demo library
│
├── src-tauri/                       # Tauri Rust host
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   ├── icons/
│   └── src/
│       ├── main.rs
│       ├── lib.rs
│       └── commands/                # FS, backup, dialogs
│
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── providers.tsx            # Theme, router, error boundary
│   │   ├── router.tsx
│   │   └── layouts/
│   │       ├── AppShell.tsx
│   │       ├── Sidebar.tsx
│   │       └── TopBar.tsx
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── store/
│   │   │   ├── pages/
│   │   │   └── index.ts
│   │   ├── library/
│   │   ├── editor/
│   │   ├── agents/
│   │   ├── workflows/
│   │   ├── search/
│   │   ├── graph/
│   │   ├── versions/
│   │   ├── import-export/
│   │   ├── settings/
│   │   ├── command-palette/
│   │   └── packs/
│   │
│   ├── domain/
│   │   ├── assets/
│   │   │   ├── types.ts
│   │   │   ├── schemas.ts           # Zod
│   │   │   └── rules.ts             # Pure domain helpers
│   │   ├── revisions/
│   │   ├── relationships/
│   │   ├── workflows/
│   │   ├── search/
│   │   └── settings/
│   │
│   ├── application/
│   │   ├── services/
│   │   │   ├── asset-service.ts
│   │   │   ├── revision-service.ts
│   │   │   ├── search-service.ts
│   │   │   ├── import-export-service.ts
│   │   │   ├── relationship-service.ts
│   │   │   ├── workflow-service.ts
│   │   │   └── settings-service.ts
│   │   └── ports/                   # Interfaces / ports
│   │       ├── asset-repository.ts
│   │       ├── revision-repository.ts
│   │       ├── search-index.ts
│   │       ├── file-gateway.ts
│   │       └── ai-provider.ts       # Future seam
│   │
│   ├── infrastructure/
│   │   ├── persistence/
│   │   │   └── prisma/
│   │   │       ├── client.ts
│   │   │       ├── asset-repository.ts
│   │   │       └── mappers.ts
│   │   ├── search/
│   │   │   └── fuse-search-index.ts
│   │   ├── import-export/
│   │   │   ├── markdown.ts
│   │   │   ├── json.ts
│   │   │   ├── yaml.ts
│   │   │   └── zip.ts
│   │   ├── tauri/
│   │   │   └── bridge.ts
│   │   └── di/
│   │       └── container.ts         # Wire ports → adapters
│   │
│   ├── shared/
│   │   ├── components/              # Design system wrappers
│   │   │   ├── ui/                  # shadcn primitives
│   │   │   └── ...
│   │   ├── hooks/
│   │   ├── lib/                     # cn(), dates, ulid
│   │   ├── constants/
│   │   └── types/
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── test/
│       ├── setup.ts
│       └── fakes/                   # In-memory repos
│
├── scripts/
│   ├── dev.mjs
│   └── backup-check.mjs
│
└── .github/
    └── workflows/
        └── ci.yml
```

---

## 3. Feature Module Contract

Each feature folder should expose a public API via `index.ts`:

```ts
// src/features/dashboard/index.ts
export { DashboardPage } from './pages/DashboardPage';
```

Internal components are not imported across features. Cross-feature needs go through:

1. `shared/` components, or
2. `application/services`, or
3. domain types

---

## 4. Naming Conventions

| Kind | Convention |
|------|------------|
| React components | `PascalCase.tsx` |
| Hooks | `useSomething.ts` |
| Stores | `*-store.ts` |
| Services | `*-service.ts` |
| Repositories | `*-repository.ts` |
| Zod schemas | `*-schemas.ts` or colocated `schemas.ts` |
| Tests | `*.test.ts(x)` colocated or under `__tests__/` |

---

## 5. What Is Intentionally Absent (MVP)

- `packages/` monorepo workspaces
- `plugins/` runtime
- `electron/`
- Cloud API clients

These may appear in later milestones without relocating feature code if ports are respected.
