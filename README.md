# PromptOS

**Local-first AI knowledge management for prompts, agents, workflows, and every reusable AI asset you own.**

PromptOS is a desktop application that combines the knowledge-graph feel of Obsidian, the organizational clarity of Notion, the version mindset of GitHub, the speed of Raycast, and the power-user density of VS Code — fully offline, with optional sync planned for later.

> **Status:** Foundation / architecture phase. Application code is intentionally not started until architecture approval (Milestone 0).

---

## Vision

Organize all reusable AI assets in one place:

Prompts · Agents · Workflows · Templates · Personas · MCP Servers · Coding Rules · Design Briefs · Research Frameworks · Automation Recipes · Prompt Packs · Notes · Snippets

---

## Tech stack (planned)

| Layer | Choice |
|-------|--------|
| Desktop | Tauri |
| UI | React, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Routing / state | React Router, Zustand |
| Database | SQLite + Prisma |
| Validation | Zod |
| Search | Fuse.js |
| Editor | TipTap |
| Testing | Vitest, React Testing Library |

---

## Repository map

```text
docs/                 Product, architecture, design, development docs
prisma/schema.prisma  Draft database schema (not migrated yet)
src/                  Application source (scaffolded in Milestone 1)
src-tauri/            Tauri host (scaffolded in Milestone 1)
```

**Documentation index:** [docs/README.md](./docs/README.md)

---

## Current deliverables

Foundation documentation is complete:

1. [PRD](./docs/product/PRD.md)
2. [System Architecture](./docs/architecture/system-architecture.md)
3. [Folder Structure](./docs/architecture/folder-structure.md)
4. [Database Schema](./docs/database/schema.md)
5. [Prisma Models](./docs/database/prisma-models.md) / [`prisma/schema.prisma`](./prisma/schema.prisma)
6. [TypeScript Interfaces](./docs/architecture/typescript-interfaces.md)
7. [Routing](./docs/architecture/routing.md)
8. [Wireframes](./docs/wireframes/overview.md)
9. [Design System](./docs/design/design-system.md)
10. [Development Roadmap](./docs/development/roadmap.md)
11. [Coding Standards](./docs/development/coding-standards.md)
12. [Git Branch Strategy](./docs/development/git-branch-strategy.md)
13. [Git Commit Convention](./docs/development/git-commit-convention.md)
14. [Docs Index](./docs/README.md)
15. This README
16. [MVP Milestones](./docs/development/mvp-milestones.md)
17. [Future Roadmap](./docs/development/future-roadmap.md)

Please review [Clarifying Questions](./docs/product/clarifying-questions.md) before approving Milestone 0.

---

## Getting started (after Milestone 1 scaffold)

Commands will be:

```bash
pnpm install
pnpm dev          # Vite UI
pnpm tauri dev    # Desktop shell
pnpm test
pnpm lint
```

Until scaffold lands, there is nothing to run except reading the docs.

---

## Principles

- Clean Architecture · SOLID · Feature-based folders
- Offline-first · Strong typing · Extensibility without over-engineering the MVP
- UI → Services → Repositories → SQLite

---

## Contributing

- Branching: [docs/development/git-branch-strategy.md](./docs/development/git-branch-strategy.md)
- Commits: [docs/development/git-commit-convention.md](./docs/development/git-commit-convention.md)
- Code: [docs/development/coding-standards.md](./docs/development/coding-standards.md)

---

## License

TBD — see clarifying questions.
