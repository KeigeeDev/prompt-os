# PromptOS Documentation

Canonical product and engineering documentation for **PromptOS**.  
This folder is part of the repository’s single source of truth.

---

## Start here

1. [Product Requirements (PRD)](./product/PRD.md)
2. [Clarifying Questions](./product/clarifying-questions.md) — answer before coding
3. [System Architecture](./architecture/system-architecture.md)
4. [MVP Milestones](./development/mvp-milestones.md)

---

## Index of deliverables

| # | Deliverable | Location |
|---|-------------|----------|
| 1 | Product Requirements Document | [product/PRD.md](./product/PRD.md) |
| — | Clarifying Questions (**decided**) | [product/clarifying-questions.md](./product/clarifying-questions.md) |
| 2 | High-Level System Architecture | [architecture/system-architecture.md](./architecture/system-architecture.md) |
| 3 | Folder Structure | [architecture/folder-structure.md](./architecture/folder-structure.md) |
| 4 | Database Schema | [database/schema.md](./database/schema.md) |
| 5 | Prisma Models | [database/prisma-models.md](./database/prisma-models.md) · [`prisma/schema.prisma`](../prisma/schema.prisma) |
| 6 | TypeScript Interfaces | [architecture/typescript-interfaces.md](./architecture/typescript-interfaces.md) |
| 7 | Application Routing | [architecture/routing.md](./architecture/routing.md) |
| 8 | UI Wireframes | [wireframes/overview.md](./wireframes/overview.md) |
| 9 | Design System | [design/design-system.md](./design/design-system.md) |
| 10 | Development Roadmap | [development/roadmap.md](./development/roadmap.md) |
| 11 | Coding Standards | [development/coding-standards.md](./development/coding-standards.md) |
| 12 | Git Branch Strategy | [development/git-branch-strategy.md](./development/git-branch-strategy.md) |
| 13 | Git Commit Convention | [development/git-commit-convention.md](./development/git-commit-convention.md) |
| 14 | Repository Documentation | This file |
| 15 | Initial README | [../README.md](../README.md) |
| 16 | MVP Milestones | [development/mvp-milestones.md](./development/mvp-milestones.md) |
| 17 | Future Roadmap | [development/future-roadmap.md](./development/future-roadmap.md) |

---

## Approval gate

Clarifying questions are **decided**.  
**Do not implement application features until Milestone 0 architecture sign-off.**

After approval, proceed strictly by [MVP Milestones](./development/mvp-milestones.md).

---

## Contributing to docs

- Use Conventional Commits with scope `docs`
- Prefer updating these files over inventing parallel specs
- Record significant decisions as ADRs under `architecture/adr/` once that folder is in use
