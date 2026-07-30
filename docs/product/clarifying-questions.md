# PromptOS — Clarifying Questions

**Status:** Awaiting product decisions  
**Purpose:** Resolve ambiguities before implementation begins.

Architecture docs make **provisional defaults** where needed. Confirm or override these before Milestone 0 coding starts.

---

## Product scope

1. **Primary platforms for MVP?** macOS only, or macOS + Windows + Linux from day one?
2. **Default theme direction?** Light-first, dark-first, or system with a distinctive brand palette? (Design System proposes a provisional palette pending confirmation.)
3. **Soft delete vs hard delete in MVP?** Provisional: soft delete + trash later.
4. **Variable syntax?** Provisional: `{{snake_case}}` Mustache-style. Confirm, or prefer `${var}` / Handlebars?
5. **Workflow execution in MVP?** Provisional: **builder + visualization only**, no run/execute.
6. **Multi-window support?** Provisional: single primary window + optional preference panes.
7. **Onboarding?** Empty-state tips only, or a first-run sample library (demo assets)?
8. **Localization?** English-only for MVP?

## Data & privacy

9. **Telemetry?** Provisional: **none** in MVP.
10. **Encryption at rest?** Provisional: rely on OS disk encryption; optional DB passphrase is future.
11. **Auto-backup schedule?** Provisional: manual backup in MVP; optional daily copy post-MVP.

## Asset model

12. **Are Notes and Snippets distinct enough**, or should Snippet be a Note subtype?
13. **Prompt Packs:** ordered membership only, or nested packs?
14. **Categories:** free text, flat controlled vocabulary, or nested taxonomy?
15. **Status values?** Provisional: `draft | active | archived | deprecated`.
16. **Model compatibility:** free tags (e.g. `gpt-4o`, `claude-4`) or curated enum list?

## UX

17. **Command palette scope in MVP:** navigation + create + search only, or also settings actions?
18. **Graph view:** full-library graph, or ego-graph (selected asset + N hops) for performance?
19. **Editor default:** split preview, tabbed preview, or WYSIWYG-only with source mode toggle?

## Engineering

20. **Package manager?** Provisional: **pnpm**.
21. **Node vs Bun for sidecar?** Provisional: **Node LTS** for Prisma stability.
22. **Monorepo?** Provisional: **single package** for MVP; split `apps/desktop` + `packages/*` when needed.
23. **License?** MIT / Apache-2.0 / proprietary / unlicensed for now?

---

Please answer in-line or in a follow-up. Unanswered items keep the provisional defaults above.
