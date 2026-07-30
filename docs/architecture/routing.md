# PromptOS — Application Routing

**Version:** 0.1.0  
**Router:** React Router v7 (or v6.4+ data APIs)  
**File when implemented:** `src/app/router.tsx`

---

## 1. Principles

- Flat, predictable URLs
- Asset detail always `/assets/:id` (type from data, not URL) — avoids broken links when types are wrong
- Type-filtered library via query or path segment
- Settings as nested routes
- Command palette is an overlay, not a route (`Ctrl+K` on Windows)

**Trade-off — `/assets/:id` vs `/prompts/:id`:**  
Type-specific URLs are prettier but complicate redirects and shared editor shells. Shared path + type badge is simpler and more extensible.

---

## 2. Route Table

| Path | Page | Feature | Notes |
|------|------|---------|-------|
| `/` | Dashboard | dashboard | Default landing |
| `/library` | Asset Library | library | All types |
| `/library/:type` | Filtered Library | library | `:type` ∈ AssetType |
| `/assets/new` | Create Asset | editor | `?type=prompt` query |
| `/assets/:id` | Asset Detail / Editor | editor | Split view |
| `/assets/:id/history` | Version History | versions | |
| `/assets/:id/history/:revisionId` | Revision Compare | versions | |
| `/agents` | Agent Library | agents | Convenience → library filter |
| `/workflows` | Workflow List | workflows | |
| `/workflows/:id` | Workflow Builder | workflows | |
| `/graph` | Knowledge Graph | graph | Optional `?focus=:id` |
| `/packs` | Prompt Packs | packs | |
| `/packs/:id` | Pack Detail | packs | |
| `/import` | Import Wizard | import-export | |
| `/export` | Export Wizard | import-export | |
| `/settings` | Settings Layout | settings | |
| `/settings/general` | General | settings | Theme, etc. |
| `/settings/shortcuts` | Shortcuts | settings | |
| `/settings/backup` | Backup & Restore | settings | |
| `/settings/ai` | AI Providers | settings | Placeholder (future) |
| `/settings/sync` | Git Sync | settings | Placeholder (future) |
| `*` | Not Found | shared | |

---

## 3. Layout Nesting

```text
AppShell
├── Sidebar (nav)
├── TopBar (search trigger, actions)
└── <Outlet />
    ├── DashboardPage
    ├── LibraryPage
    ├── EditorPage
    ├── WorkflowBuilderPage
    ├── GraphPage
    ├── Import/Export pages
    └── SettingsLayout
        └── <Outlet /> settings pages
```

---

## 4. Navigation Map (sidebar)

1. Dashboard  
2. Library  
3. Agents  
4. Workflows  
5. Graph  
6. Packs  
7. — separator —  
8. Import  
9. Settings  

Search / Command Palette opened via shortcut, not sidebar.

---

## 5. Deep-linking & State

- Library filters in URL search params: `?tag=foo&favorite=1&q=`
- Graph focus: `?focus=<assetId>&depth=2`
- Create flow: `/assets/new?type=agent`

Preserve filter state when navigating to editor and back (React Router location state or params).

---

## 6. Guards

- MVP: no auth guards
- Optional: **DatabaseReadyGuard** — block routes until migrations + search index warm-up complete (splash/loading shell)

---

## 7. Code-splitting

Lazy-load heavy features:

- TipTap editor
- Workflow canvas
- Graph visualization
- Import ZIP parsing

Use `React.lazy` + suspense boundaries per route.
