# PromptOS — Prisma Models (Reference)

**Canonical file (to be used at scaffold time):** [`/prisma/schema.prisma`](../../prisma/schema.prisma)

This document explains the Prisma models. The `.prisma` file is the machine-readable source of truth once scaffolding begins; until then both are kept in sync as foundation artifacts.

---

## Design notes

- Provider: `sqlite`
- IDs: `String` @id (ULID generated in application layer)
- Booleans stored natively by Prisma for SQLite
- `extension` and `modelCompatibility` stored as JSON strings or Prisma `Json` type
- Cascading deletes: tags join and variables cascade with asset; revisions cascade; relationships restrict or cascade (prefer cascade for MVP simplicity)

---

## Model map

| Prisma model | Table | Role |
|--------------|-------|------|
| `Asset` | `assets` | Core polymorphic asset |
| `Tag` | `tags` | Tag dictionary |
| `AssetTag` | `asset_tags` | M2M |
| `Variable` | `variables` | Template variables |
| `Revision` | `revisions` | Version snapshots |
| `Relationship` | `relationships` | Graph edges |
| `Setting` | `settings` | App preferences |

See the Prisma schema file for field-level definitions, indexes, and relations.
