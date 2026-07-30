# PromptOS — Database Schema

**Version:** 0.1.0  
**Engine:** SQLite  
**ORM:** Prisma  

---

## 1. Goals

- Represent all asset types without 13 near-identical tables
- Support versioning, relationships, tags, settings, and workflow graphs
- Keep common filters indexable
- Remain friendly to export/import and future sync (stable ULIDs)

---

## 2. ER Overview

```text
┌──────────────┐       ┌─────────────────┐
│   settings   │       │     assets      │◄────┐
└──────────────┘       │  (core entity)  │     │
                       └────────┬────────┘     │
                                │              │
              ┌─────────────────┼──────────────┼────────────┐
              ▼                 ▼              ▼            ▼
      ┌──────────────┐  ┌─────────────┐ ┌────────────┐ ┌────────────┐
      │ asset_tags   │  │  revisions  │ │relationships│ │  variables │
      └──────┬───────┘  └─────────────┘ └────────────┘ └────────────┘
             ▼
        ┌─────────┐
        │  tags   │
        └─────────┘
```

---

## 3. Tables

### 3.1 `assets`

Core polymorphic entity.

| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT PK | ULID |
| `type` | TEXT | AssetType enum string |
| `title` | TEXT NOT NULL | |
| `description` | TEXT | |
| `body` | TEXT | Markdown |
| `category` | TEXT | Nullable; indexed |
| `status` | TEXT | `draft` \| `active` \| `archived` \| `deprecated` |
| `version` | TEXT | Semver-like display version, e.g. `1.2.0` |
| `is_favorite` | INTEGER | 0/1 |
| `is_pinned` | INTEGER | 0/1 |
| `is_archived` | INTEGER | 0/1 (may mirror status) |
| `notes` | TEXT | Private user notes |
| `model_compatibility` | TEXT | JSON array of strings |
| `extension` | TEXT | JSON object; type-specific fields |
| `created_at` | DATETIME | |
| `updated_at` | DATETIME | |
| `deleted_at` | DATETIME | Soft delete |

**Indexes:** `(type)`, `(updated_at)`, `(is_favorite)`, `(is_pinned)`, `(is_archived)`, `(category)`, `(deleted_at)`, `(title)`

### 3.2 `tags`

| Column | Type |
|--------|------|
| `id` | TEXT PK |
| `name` | TEXT UNIQUE |
| `color` | TEXT NULL |
| `created_at` | DATETIME |

### 3.3 `asset_tags`

| Column | Type |
|--------|------|
| `asset_id` | TEXT FK → assets |
| `tag_id` | TEXT FK → tags |
| PK | `(asset_id, tag_id)` |

### 3.4 `variables`

Prompt/asset template variables.

| Column | Type |
|--------|------|
| `id` | TEXT PK |
| `asset_id` | TEXT FK |
| `key` | TEXT | e.g. `audience` |
| `label` | TEXT |
| `description` | TEXT |
| `default_value` | TEXT |
| `required` | INTEGER |
| `sort_order` | INTEGER |

**Unique:** `(asset_id, key)`

### 3.5 `revisions`

| Column | Type |
|--------|------|
| `id` | TEXT PK |
| `asset_id` | TEXT FK |
| `revision_number` | INTEGER | Monotonic per asset |
| `snapshot` | TEXT | Full JSON snapshot of asset + variables + tags |
| `change_summary` | TEXT | Optional |
| `created_at` | DATETIME |

**Unique:** `(asset_id, revision_number)`  
**Index:** `(asset_id, created_at)`

### 3.6 `relationships`

| Column | Type |
|--------|------|
| `id` | TEXT PK |
| `source_id` | TEXT FK → assets |
| `target_id` | TEXT FK → assets |
| `kind` | TEXT | `references` \| `depends_on` \| `parent_of` \| `related` \| `contains` \| `uses` |
| `label` | TEXT NULL |
| `created_at` | DATETIME |

**Unique:** `(source_id, target_id, kind)`  
Prevent self-loops at service layer.

### 3.7 `settings`

Key-value preferences (theme, shortcuts JSON, etc.).

| Column | Type |
|--------|------|
| `key` | TEXT PK |
| `value` | TEXT | JSON-encoded |
| `updated_at` | DATETIME |

---

## 4. Extension JSON Shapes (by type)

Validated in application layer with Zod (not DB constraints).

### `prompt`
```json
{
  "systemPreamble": "string?",
  "outputFormat": "string?"
}
```

### `agent`
```json
{
  "purpose": "string",
  "responsibilities": ["string"],
  "inputs": ["string"],
  "outputs": ["string"],
  "recommendedModels": ["string"],
  "exampleConversations": [{ "title": "string", "body": "string" }],
  "connectedWorkflowIds": ["string"]
}
```

### `workflow`
```json
{
  "nodes": [{ "id": "string", "assetId": "string?", "kind": "prompt|agent|output|note", "position": { "x": 0, "y": 0 }, "data": {} }],
  "edges": [{ "id": "string", "source": "string", "target": "string", "label": "string?" }],
  "isTemplate": false
}
```

### `persona`
```json
{ "tone": "string?", "voice": "string?", "traits": ["string"], "constraints": ["string"] }
```

### `mcp_server`
```json
{ "command": "string?", "args": ["string"], "env": {}, "transport": "stdio|sse|http?", "url": "string?" }
```

### `prompt_pack`
```json
{ "memberAssetIds": ["string"], "versionLabel": "string?" }
```

### Others (`template`, `coding_rule`, `design_brief`, `research_framework`, `automation_recipe`, `note`, `snippet`)

Minimal or empty extension; body/markdown carries content. Extend as product needs clarify.

---

## 5. Archival vs Status

- `is_archived` is a **fast filter flag**
- `status = 'archived'` should stay in sync via service rules
- Library default view excludes archived and soft-deleted

---

## 6. Backup / Restore

Backup = consistent copy of SQLite file (checkpoint WAL first).  
Restore = replace DB file while app is closed/unlocked, then rebuild search index.

Schema version tracked by Prisma migrations table `_prisma_migrations`.

---

## 7. Trade-offs Recap

| Choice | Benefit | Cost |
|--------|---------|------|
| JSON `extension` | One table, fast iteration | Nested field queries harder |
| Soft delete | Recoverability | Must filter everywhere |
| Full revision snapshots | Simple restore/compare | Storage growth; mitigate with retention policy later |
| Tags as relation | Normalize, rename once | Extra joins |

---

## 8. Future Schema Hooks (do not implement yet)

- `workspaces` / `workspace_id` on assets
- `sync_meta` (etag, remote_id)
- `embeddings` for semantic search
- `api_credentials` (encrypted)
