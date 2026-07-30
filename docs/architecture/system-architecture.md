# PromptOS — High-Level System Architecture

**Version:** 0.1.1  
**Status:** Clarifying questions decided — pending Milestone 0 sign-off  
**Companion docs:** [PRD](../product/PRD.md) · [Folder Structure](./folder-structure.md) · [Database Schema](../database/schema.md) · [Decisions](../product/clarifying-questions.md)

---

## 1. Architectural Vision

PromptOS is a **local-first desktop client** with three logical layers:

```
┌─────────────────────────────────────────────────────────┐
│  Presentation (React + Tailwind + shadcn/ui)            │
│  Features · Shared UI · Hooks · Zustand stores          │
├─────────────────────────────────────────────────────────┤
│  Application / Domain                                   │
│  Use-cases · Services · Domain models · Zod schemas     │
├─────────────────────────────────────────────────────────┤
│  Infrastructure                                         │
│  Repositories · Prisma/SQLite · FS import/export · IPC  │
└─────────────────────────────────────────────────────────┘
         ▲
         │ Tauri IPC (commands / events)
         ▼
┌─────────────────────────────────────────────────────────┐
│  Tauri Host (Rust)                                      │
│  Windowing · FS dialogs · App paths · Backup helpers    │
└─────────────────────────────────────────────────────────┘
```

**Core idea:** UI never talks to Prisma directly. Features call **services**; services call **repositories**; repositories own persistence. This keeps the app testable and ready for future sync backends.

---

## 2. Design Principles

| Principle | How we apply it |
|-----------|-----------------|
| Clean Architecture | Dependencies point inward: UI → application → domain; infra implements ports |
| SOLID | Small interfaces (`IAssetRepository`), single-responsibility services |
| Feature-based | Vertical slices under `src/features/*` |
| Offline-first | SQLite is source of truth; no network required for MVP |
| Extensibility | Ports for search, AI providers, sync, plugins — stubbed or unimplemented |
| Strong typing | TypeScript strict + Zod at IPC and import boundaries |
| MVP restraint | No plugin runtime, no LLM execution, no sync in v1 |

---

## 3. Process Model (Tauri)

### Recommended approach for MVP

**Hybrid local backend:**

1. **Tauri (Rust)** — shell, native dialogs, secure app data directory, backup file copy.
2. **Frontend (React)** — all UX.
3. **Data access** — Prisma against SQLite in a **Node LTS sidecar** (or thin local RPC started by Tauri).

### Trade-off analysis

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **A. Prisma in Node LTS sidecar** | Full Prisma DX, migrations, familiar TS | Extra process to manage | **Accepted for MVP** |
| **B. Prisma in renderer via Node polyfills** | Single process illusion | Fragile in Tauri WebView; not production-safe | Reject |
| **C. Pure Rust SQLite (sqlx) + no Prisma** | Native, fast | Lose Prisma migrations/DX; rewrite TS domain mapping | Future optimization |
| **D. Electron + Prisma in main** | Simpler Node integration | Heavier app; contradicts Tauri preference | Fallback only |

**Decision:** Option **A**. The application layer exposes a `DataClient` interface. The sidecar implements it over localhost IPC or stdin/stdout JSON-RPC. The UI only knows `DataClient`.

**Future:** If sidecar overhead becomes painful, reimplement repositories in Rust behind the same ports (Option C) without changing features.

---

## 4. Domain Model Overview

```
Asset (polymorphic core)
 ├── AssetType (enum)
 ├── Metadata (tags, category, status, flags)
 ├── Variables[]
 ├── ModelCompat[]
 ├── Revisions[]
 ├── Relationships[] (edges)
 └── TypeExtension (JSON / side table per type)

Workflow = Asset + Graph(nodes, edges)
PromptPack = Asset + membership links
```

**Polymorphism strategy:** Single `assets` table with `type` discriminator + `extensions` JSON column for type-specific fields *or* normalized extension tables.  

**Decision for MVP:** **Single table + typed JSON extension** validated by Zod per `AssetType`. Rationale: fewer joins, faster iteration across 13 types, easy export. Normalize later if query patterns demand it.

**Trade-off:** JSON extensions are flexible but weaker for SQL filtering on nested fields. Mitigate with indexed columns for common filters (type, status, favorite, archived, category) and keep hot filters out of JSON.

---

## 5. Layer Responsibilities

### 5.1 Presentation

- Feature pages and feature-local components
- Shared UI kit wrapping shadcn/ui
- Zustand stores for ephemeral UI state (sidebar, palette, selection)
- React Query *optional* later; for MVP, service calls + Zustand or local React state for server-like data

**Decision:** MVP uses **service hooks** (`useAssets`, `useAsset(id)`) that call the data client and cache in Zustand feature stores. React Query can be introduced when caching complexity grows.

### 5.2 Application Services

Examples:

- `AssetService` — CRUD, fork, duplicate, archive
- `RevisionService` — snapshot, compare, restore
- `SearchService` — index build, query
- `ImportExportService` — parse/serialize formats
- `RelationshipService` — link/unlink, graph projection
- `WorkflowService` — graph CRUD
- `SettingsService` — preferences, backup/restore orchestration

Services are pure orchestration + domain rules; no React imports.

### 5.3 Repositories (ports + adapters)

```ts
interface AssetRepository {
  findById(id: string): Promise<Asset | null>;
  list(filter: AssetFilter): Promise<Asset[]>;
  create(input: CreateAssetInput): Promise<Asset>;
  update(id: string, input: UpdateAssetInput): Promise<Asset>;
  softDelete(id: string): Promise<void>;
}
```

Prisma adapter lives in `src/infrastructure/persistence/prisma/`.

### 5.4 Infrastructure

- Prisma client & migrations
- Fuse.js search index adapter
- File system import/export (via Tauri FS APIs)
- Backup (copy SQLite file + WAL safely)

---

## 6. Data Flow Examples

### Create prompt

```
UI Editor → AssetService.create()
  → Zod validate CreatePromptInput
  → AssetRepository.create()
  → RevisionService.recordInitial()
  → SearchService.upsert()
  → return Asset DTO to UI
```

### Search

```
UI SearchBox → SearchService.search(query, filters)
  → SearchIndex (Fuse) query
  → optional hydrate full assets from repository
  → return ranked results
```

### Restore revision

```
UI History → RevisionService.restore(assetId, revisionId)
  → load revision snapshot
  → AssetRepository.update (body + metadata)
  → RevisionService.record (restore event)
  → SearchService.upsert()
```

---

## 7. Cross-Cutting Concerns

### 7.1 IDs

Use **ULID** (sortable, unique) for assets and revisions. Avoid autoincrement for export/merge friendliness.

### 7.2 Soft delete

`deletedAt` on assets. **Soft delete only in MVP** — no hard-delete / empty-trash UI yet.

### 7.3 Transactions

Multi-step writes (create + revision + relationships) must be transactional at the repository/Prisma level.

### 7.4 Migrations

Prisma Migrate; ship migrations with the app; run on startup before UI unlocks DB.

### 7.5 Error model

Typed `Result` / thrown domain errors mapped to toast + log. Never leak SQL errors to UI.

### 7.6 Logging

Local structured logs in app data dir; no remote telemetry in MVP.

### 7.7 Security

- DB file in OS app data directory with default OS permissions
- Future AI API keys in OS keychain via Tauri plugin — not plaintext settings JSON

---

## 8. Search Architecture

```
SQLite (source of truth)
    │ on change / startup
    ▼
SearchDocument projection
    │
    ▼
Fuse.js index (in-memory)
```

**Search port:**

```ts
interface SearchIndex {
  rebuild(docs: SearchDocument[]): Promise<void>;
  upsert(doc: SearchDocument): Promise<void>;
  remove(id: string): Promise<void>;
  query(q: string, opts?: SearchOptions): Promise<SearchHit[]>;
}
```

Swap Fuse → FTS5 adapter later without feature changes.

---

## 9. Workflow Graph

Store as:

- `workflows` extension: `{ nodes: WorkflowNode[], edges: WorkflowEdge[] }`
- Nodes reference `assetId` + local `nodeId`
- Edges: `{ from, to, label? }`

Visualization: React Flow (recommended) or custom SVG. **Not installed until Workflow milestone** — architecture assumes a graph library behind `WorkflowCanvas` port.

---

## 10. Relationship Graph

Global knowledge graph projection uses **ego-graph** queries (focus asset + depth N). Do not load the full library graph by default.

---

## 11. Future Seams (designed, not built)

| Seam | Interface sketch | Future use |
|------|------------------|------------|
| `AiProvider` | `complete(prompt, opts)` | Ollama, OpenRouter, etc. |
| `SyncAdapter` | `push/pull/status` | Git sync, cloud sync |
| `PluginHost` | `registerCommand/view` | Plugin system |
| `McpRegistry` | `list/install` | MCP registry |

Keep these as empty folders or `*.port.ts` interfaces with no implementations in MVP.

---

## 12. Testing Strategy

| Layer | Approach |
|-------|----------|
| Domain / Zod | Unit tests |
| Services | Unit tests with in-memory repository fakes |
| Repositories | Integration tests against temp SQLite |
| UI | RTL for critical flows (editor save, search) |
| E2E | Deferred (Playwright + Tauri later) |

---

## 13. Deployment / Distribution

- Tauri bundler → **Windows** installer only for MVP (msi/nsis). macOS/Linux deferred.
- CI: lint, typecheck, unit tests, build (architecture milestone sets this up)

---

## 14. Explicit Non-Architecture (MVP)

- No microservices
- No Electron dual-support matrix
- No event sourcing (revisions table is enough)
- No GraphQL
- No multi-window complex sync protocol

---

## 15. Decision Log (ADR summaries)

| ID | Decision | Status |
|----|----------|--------|
| ADR-001 | Tauri over Electron; Windows-only MVP | Accepted (pending Milestone 0 sign-off) |
| ADR-002 | Prisma + SQLite via Node LTS data client / sidecar | Accepted (pending Milestone 0 sign-off) |
| ADR-003 | Single assets table + Zod JSON extensions; nested `categories` | Accepted (pending Milestone 0 sign-off) |
| ADR-004 | Fuse.js search behind port | Accepted (pending Milestone 0 sign-off) |
| ADR-005 | TipTap editor with tabbed preview | Accepted (pending Milestone 0 sign-off) |
| ADR-006 | Zustand for client state | Accepted (pending Milestone 0 sign-off) |
| ADR-007 | ULID identifiers | Accepted (pending Milestone 0 sign-off) |
| ADR-008 | Soft delete only; light-first; MIT; pnpm; single package | Accepted (pending Milestone 0 sign-off) |

Full ADRs will live in `docs/architecture/adr/` after approval.
