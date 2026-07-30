# PromptOS

**Local-first AI knowledge management for prompts, agents, workflows, and every reusable AI asset you own.**

PromptOS is a desktop application that combines the knowledge-graph feel of Obsidian, the organizational clarity of Notion, the version mindset of GitHub, the speed of Raycast, and the power-user density of VS Code — fully offline, with optional sync planned for later.

> **Status:** Milestone 1 scaffold. Windows MVP · Light-first · MIT.

---

## Vision

Organize all reusable AI assets in one place:

Prompts · Agents · Workflows · Templates · Personas · MCP Servers · Coding Rules · Design Briefs · Research Frameworks · Automation Recipes · Prompt Packs · Notes · Snippets

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Desktop | Tauri (**Windows MVP**) |
| UI | React, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Routing / state | React Router, Zustand |
| Database | SQLite + Prisma |
| Validation | Zod |
| Search | Fuse.js (Milestone 4) |
| Editor | TipTap, tabbed preview (Milestone 3) |
| Tooling | pnpm, Node LTS, Vitest, React Testing Library |
| License | MIT |

---

## Prerequisites (Windows)

- Node.js 20+ LTS
- [pnpm](https://pnpm.io/) 9+
- Rust toolchain ([rustup](https://rustup.rs/)) for Tauri
- WebView2 (included on modern Windows)

---

## Getting started

```bash
pnpm install
pnpm db:generate
pnpm exec prisma migrate deploy
pnpm dev          # Vite UI at http://localhost:1420
pnpm tauri:dev    # Desktop shell (Windows)
```

### Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

---

## Repository map

```text
docs/                 Product, architecture, design, development docs
prisma/               Schema + migrations
src/                  React application (features, domain, application, infrastructure)
src-tauri/            Tauri host (Windows NSIS/MSI targets)
```

**Documentation index:** [docs/README.md](./docs/README.md)  
**Project status:** [PROJECT_STATUS.md](./PROJECT_STATUS.md)

---

## Architecture notes (Milestone 1)

- UI → `DataClient` port → adapters (memory in the renderer; Prisma in Node)
- Prisma must not be imported from React components (WebView has no Node)
- Soft delete, nested categories, and ULID ids are defined in the schema
- Full Prisma sidecar bridge lands as persistence work continues in Milestone 2+

---

## Contributing

- Branching: [docs/development/git-branch-strategy.md](./docs/development/git-branch-strategy.md)
- Commits: [docs/development/git-commit-convention.md](./docs/development/git-commit-convention.md)
- Code: [docs/development/coding-standards.md](./docs/development/coding-standards.md)

---

## License

[MIT](./LICENSE)
