# PromptOS — Product Requirements Document (PRD)

**Version:** 0.1.1  
**Status:** Draft — clarifying questions decided; pending final Milestone 0 approval  
**Last updated:** 2026-07-30  
**Owner:** Product / Architecture

---

## 1. Executive Summary

PromptOS is a **local-first desktop application** for personal AI knowledge management. It is not merely a prompt manager: it is a unified system for organizing every reusable AI asset—prompts, agents, workflows, templates, personas, MCP servers, coding rules, design briefs, research frameworks, automation recipes, prompt packs, notes, and snippets—in one offline-capable workspace.

The product experience should feel like a synthesis of:

| Inspiration | What we borrow |
|-------------|----------------|
| Obsidian | Knowledge graph, bidirectional links, local ownership |
| Notion | Structured organization, flexible metadata |
| GitHub | Version history, fork/compare/restore mental model |
| Raycast | Instant command palette, keyboard-first speed |
| VS Code | Power-user density, panels, shortcuts, extensibility |

Everything works **offline first**. Optional Git synchronization and cloud features are deferred to post-MVP phases.

---

## 2. Problem Statement

AI practitioners accumulate prompts, agent definitions, workflows, and related artifacts across ChatGPT, Claude, Notion docs, Slack messages, and scattered markdown files. There is no durable, searchable, versioned, relationship-aware home for this knowledge that:

1. Works without a network connection
2. Treats all AI asset types as first-class citizens
3. Preserves history and relationships between assets
4. Scales from a handful of prompts to a large personal knowledge base

**PromptOS solves this** by providing a single desktop workspace with strong typing, local SQLite persistence, rich editing, search, and a graph of asset relationships.

---

## 3. Goals & Non-Goals

### 3.1 Goals (MVP)

- Store, edit, search, tag, favorite, archive, and version all supported asset types locally
- Provide a fast dashboard (recent, favorites, pinned, stats)
- Offer a TipTap-based markdown editor with **tabbed** preview and `{{snake_case}}` variable placeholders
- Support import/export (Markdown, JSON, YAML, ZIP)
- Model relationships between assets and visualize them as an **ego-graph**
- Ship as a **Windows-only** Tauri desktop app with React + TypeScript UI
- Seed a **first-run sample library** (demo assets) for onboarding
- Establish clean architecture so future AI provider integrations and plugins do not require major refactoring

### 3.2 Non-Goals (MVP)

- macOS / Linux packaging (Windows-only for MVP)
- Multi-user collaboration or shared workspaces
- Real-time cloud sync
- Executing prompts against live LLM APIs (ChatGPT, Claude, etc.)
- Workflow *execution* (builder + visualization only)
- Hard delete / empty trash (soft delete only)
- Telemetry
- Plugin marketplace
- Mobile clients
- Team / org admin features
- Non-English localization

### 3.3 Success Metrics (qualitative for v1)

- User can create and find any asset in &lt; 3 seconds via search or command palette
- Zero data loss on crash (SQLite transactions + automatic revisions)
- Cold start &lt; 2s on typical hardware for libraries up to ~5,000 assets
- Import of a 100-file markdown ZIP completes without UI freeze

---

## 4. Personas

| Persona | Needs |
|---------|-------|
| **AI Power User** | Fast capture, variables, version history, keyboard shortcuts |
| **Developer / Agent Builder** | Agents, coding rules, MCP servers, workflows as structured assets |
| **Designer / Researcher** | Design briefs, research frameworks, linked prompt chains |
| **Prompt Pack Author** | Bundling assets into packs, export/share as ZIP/JSON |

Primary MVP persona: **AI Power User / Developer** working solo, offline-capable.

---

## 5. Supported Asset Types

All assets share a **common core schema** (title, description, body, metadata, versioning, favorites). Type-specific fields extend the core via a discriminated union / extension table pattern.

| Type | Purpose |
|------|---------|
| `prompt` | Reusable prompt with variables and model hints |
| `agent` | Purpose, responsibilities, I/O, recommended models |
| `workflow` | Ordered/graph of linked assets (prompt → agent → …) |
| `template` | Scaffold for creating other assets |
| `persona` | Voice, tone, role definition |
| `mcp_server` | MCP server connection/config metadata |
| `coding_rule` | Project or language coding conventions for AI |
| `design_brief` | Design goals, constraints, references |
| `research_framework` | Structured research method / question set |
| `automation_recipe` | Stepwise automation instructions |
| `prompt_pack` | Bundle/collection of related assets (**nested packs** allowed) |
| `note` | Freeform markdown note (**distinct** from snippet) |
| `snippet` | Short reusable text fragment (**distinct** from note) |

---

## 6. Functional Requirements

### 6.1 Dashboard

- Recent assets (configurable count)
- Favorites and pinned assets
- Library statistics (counts by type, archived, etc.)
- Quick search entry point
- Recently edited list

### 6.2 Asset Library

- Filter by type, **nested category**, tags, status, favorite, archived
- Sort by title, updated, created, type
- List and grid views
- Bulk actions: tag, archive, favorite, export, delete (**soft-delete only** in MVP)

### 6.3 Prompt Editor

- TipTap markdown editor + **tabbed** preview (Editor | Preview)
- Variable placeholders: **`{{snake_case}}`** with validation
- Actions: copy body, duplicate, fork, export
- Automatic version history on meaningful saves
- Model compatibility as **free tags** (e.g. `gpt-4o`, `claude-4`)

### 6.4 Agent Library

Agent assets store structured fields:

- Purpose, responsibilities
- Inputs / outputs
- Connected workflows
- Recommended models
- Example conversations (markdown or structured JSON)

### 6.5 Workflow Builder

- Visual composition of nodes: Prompt → Agent → Prompt → … → Output
- Persist node graph and edge metadata
- Reusable workflow templates
- MVP: edit + visualize graph; **execution deferred**

### 6.6 Search

Full-text / fuzzy search across:

- Title, tags, variables, categories, models, notes, content body

Primary engine for MVP: **Fuse.js** over an indexed in-memory projection refreshed from SQLite. Architecture must allow swapping to SQLite FTS5 later without UI changes.

### 6.7 Relationships

- Explicit asset-to-asset links (typed: `references`, `depends_on`, `parent_of`, `related`, etc.)
- Graph visualization as **ego-graph** (selected asset + N hops)
- Navigate from asset detail to related assets

### 6.8 Version History

- Automatic revisions on save (debounced / content-hash gated)
- Compare (diff), restore, duplicate, fork from a revision

### 6.9 Import / Export

| Format | Import | Export |
|--------|--------|--------|
| Markdown | Yes | Yes |
| JSON | Yes | Yes |
| YAML | Yes | Yes |
| ZIP | Yes (bundle) | Yes (bundle) |

### 6.10 Settings

- Themes: **light-first** default; dark and system also available (Design System tokens)
- Single primary window; optional preference panes (no multi-window shell)
- Keyboard shortcuts: view defaults in MVP
- Database **manual** backup / restore (scheduled auto-backup is post-MVP)
- Encryption at rest: rely on **OS disk encryption**
- Placeholders for: Git Sync, AI Provider settings

### 6.11 Command Palette

- Global `Ctrl+K` (Windows)
- **Navigation + create + search only** (settings actions deferred)

---

## 7. Non-Functional Requirements

| Area | Requirement |
|------|-------------|
| Architecture | Feature-based, Clean Architecture, SOLID |
| Offline | Full core functionality without network |
| Performance | Responsive UI; avoid main-thread blocking for import/search |
| Typing | Strict TypeScript; Zod at boundaries |
| Security | Local data only; no telemetry in MVP; secrets never in repo |
| Testing | Vitest + RTL for domain and critical UI |
| DX | ESLint, Prettier, clear docs, conventional commits |
| Extensibility | Plugin/AI provider seams designed but not implemented |

---

## 8. Tech Stack (Confirmed)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Desktop shell | **Tauri** (Windows MVP) | Smaller binary, Rust security model, lower memory vs Electron |
| UI | React + Vite + TypeScript | Fast DX, ecosystem fit |
| Styling | Tailwind + shadcn/ui | Consistent primitives, accessible components |
| Routing | React Router | Standard SPA routing |
| Client state | Zustand | Lightweight, modular stores per feature |
| DB | SQLite + Prisma | Local-first, typed ORM, migrations |
| Validation | Zod | Runtime + type inference |
| Search | Fuse.js | Fast client fuzzy search for MVP scale |
| Editor | TipTap | Extensible markdown/rich text |
| Package manager | **pnpm** | Fast, strict |
| Sidecar runtime | **Node LTS** | Prisma stability |
| Repo layout | **Single package** | Avoid monorepo until needed |
| License | **MIT** | Open source |
| Test | Vitest + RTL | Aligned with Vite |
| Lint/format | ESLint + Prettier | Standard |

**Trade-off — Tauri vs Electron:** Prefer Tauri. Fall back to Electron only if a hard requirement (e.g. unsupported native module) cannot be met. Prisma + SQLite in Tauri runs via a local **Node LTS** data client / sidecar; see Architecture doc.

**Trade-off — Fuse.js vs FTS5:** Fuse.js is simpler for MVP and keeps search in the app layer. FTS5 is better for very large corpora; repository interface abstracts search so we can migrate later.

---

## 9. User Stories (MVP sample)

1. As a power user, I can create a prompt with variables and copy the resolved or raw text.
2. As a developer, I can define an agent with purpose and I/O and link it to a workflow.
3. As a researcher, I can connect a research framework to design and development prompts and see them on a graph.
4. As an author, I can export a prompt pack as ZIP and import it on another machine.
5. As a careful editor, I can restore a previous version after a bad edit.
6. As a keyboard user, I can open the command palette and jump to any asset.

---

## 10. Out of Scope Detail (Future — see Future Roadmap)

- AI-assisted prompt improvement / evaluation
- Multi-model execution and comparison
- Ollama / OpenRouter / ChatGPT / Claude / Gemini integrations
- MCP server registry (live)
- Plugin system
- Git / cloud sync
- Workspaces and team collaboration

---

## 11. Decided Product Questions

All clarifying questions are **answered** — see [Clarifying Questions](./clarifying-questions.md).

### Status enum (confirmed)

`draft` | `active` | `archived` | `deprecated`

### Categories (confirmed)

Nested taxonomy (parent/child categories), not free-text-only.

---

## 12. Approval Gate

**Clarifying questions: decided.**  
**No application feature implementation begins until Milestone 0 is explicitly approved** (architecture sign-off). After approval, delivery proceeds milestone-by-milestone per [MVP Milestones](../development/mvp-milestones.md).
