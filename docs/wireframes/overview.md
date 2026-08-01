# PromptOS — UI Wireframes

**Version:** 0.1.0  
**Format:** ASCII / structural wireframes (low-fidelity)  
**Fidelity note:** Not visual design — layout and hierarchy only. See [Design System](../design/design-system.md) for look & feel.

---

## W1 — App Shell (all pages)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ [Logo PromptOS]     [Search / ⌘K........................]    [+ New ▾]  │
├────────────┬─────────────────────────────────────────────────────────────┤
│ Dashboard  │                                                             │
│ Library    │                     MAIN CONTENT                            │
│ Agents     │                                                             │
│ Workflows  │                                                             │
│ Graph      │                                                             │
│ Packs      │                                                             │
│ ─────────  │                                                             │
│ Import     │                                                             │
│ Settings   │                                                             │
│            │                                                             │
└────────────┴─────────────────────────────────────────────────────────────┘
```

**First viewport rules:** For marketing/landing we do not ship a web marketing page in MVP. In-app dashboard is a **workspace**, not a promotional landing — cards used only where they group interactive modules.

---

## W2 — Dashboard

```text
┌─ Main ───────────────────────────────────────────────────────────────────┐
│  PromptOS                                                                │
│  Your AI knowledge base                                                  │
│                                                                          │
│  [ Quick search ........................................ ]               │
│                                                                          │
│  Pinned ..........................    Favorites ........................ │
│  · Asset A                        ·   · Asset D                          │
│  · Asset B                        ·   · Asset E                          │
│                                                                          │
│  Recently edited .................    Library stats .................... │
│  · Asset F  · 2m ago              ·   Prompts 128 · Agents 12 · …        │
│  · Asset G  · 1h ago              ·                                      │
└──────────────────────────────────────────────────────────────────────────┘
```

One job: orient and jump. No secondary promo clutter.

---

## W3 — Asset Library

```text
┌─ Library ────────────────────────────────────────────────────────────────┐
│  Library                          [Grid|List]  [Filters]  [+ New]        │
│  Types: [All][Prompt][Agent][Workflow][…]                                │
│  Tags:  (multi-select)   Status: ▾   ★ Favorites  Archived: off          │
│                                                                          │
│  Title                  Type      Updated     Tags        ★              │
│  ─────────────────────────────────────────────────────────────────────── │
│  Research synthesis     prompt    2h ago      research    ★              │
│  Code review agent      agent     yesterday   eng         ·              │
│  …                                                                       │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## W4 — Prompt / Asset Editor (tabbed preview)

```text
┌─ Editor ─────────────────────────────────────────────────────────────────┐
│  ← Library   Research synthesis          [★] [⋯ More]  [Copy] [Save]     │
│  status: active · v1.2.0 · models: gpt-4o, claude                        │
│  [ Editor ]  [ Preview ]                                                 │
├──────────────────────────────────────────────────────────────────────────┤
│  (active tab content)                                                    │
│                                                                          │
│  Markdown (TipTap)  OR  rendered preview                                 │
│  Consider {{audience}}                                                   │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  Variables: audience [____]  tone [____]   + Add variable                │
│  Tags: research, strategy    Category: Research / Synthesis (nested)     │
│  Notes: …                                                                │
└──────────────────────────────────────────────────────────────────────────┘
```

Default: **tabbed** Editor | Preview (not split). More menu: Duplicate, Fork, Export, History, Delete, Relationships.

---

## W5 — Version History

```text
┌─ History ────────────────────────────────────────────────────────────────┐
│  Research synthesis — Version history                                    │
│                                                                          │
│  Revisions              │  Diff                                          │
│  · #12  today 10:02     │  - old line                                    │
│  · #11  yesterday       │  + new line                                    │
│  · #10  Mon             │                                                │
│                         │  [Restore] [Fork from this] [Duplicate]         │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## W6 — Workflow Builder

```text
┌─ Workflow ───────────────────────────────────────────────────────────────┐
│  Content pipeline                          [Templates] [Save]            │
│                                                                          │
│     ┌─────────┐      ┌─────────┐      ┌─────────┐      ┌────────┐       │
│     │ Prompt  │─────▶│  Agent  │─────▶│ Prompt  │─────▶│ Output │       │
│     └─────────┘      └─────────┘      └─────────┘      └────────┘       │
│                                                                          │
│  Inspector (selected node): asset link, notes                            │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## W7 — Knowledge Graph

```text
┌─ Graph ──────────────────────────────────────────────────────────────────┐
│  [Focus asset ▾]  Depth: [1|2|3]  Types: […]                             │
│                                                                          │
│           (Research)───(Design)───(Dev)───(QA)                           │
│                \         |                                               │
│                 (Brief)  (Rules)                                         │
│                                                                          │
│  Click node → open asset                                                 │
└──────────────────────────────────────────────────────────────────────────┘
```

Prefer **ego-graph** by default (focus asset + depth). Full-library force layout is out of MVP.

---

## W8 — Command Palette

```text
┌─────────────────────────────────────────────┐
│  Ctrl+K  Type a command or search…          │
│  ─────────────────────────────────────────  │
│  Jump to: Research synthesis                │
│  Jump to: Code review agent                 │
│  Action: Create prompt                      │
│  Action: Create agent                       │
└─────────────────────────────────────────────┘
```

MVP scope: **navigate + create + search only** (no settings actions).

---

## W9 — Settings / Backup

```text
┌─ Settings ───────────────────────────────────────────────────────────────┐
│  General | Shortcuts | Backup | AI (soon) | Sync (soon)                  │
│                                                                          │
│  Theme: (•) Light  ( ) Dark  ( ) System   ← default: Light               │
│                                                                          │
│  Database (manual backup)                                                │
│  [Export backup]  [Restore from file…]                                   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## W10 — Import Wizard

```text
┌─ Import ─────────────────────────────────────────────────────────────────┐
│  1. Choose format: Markdown | JSON | YAML | ZIP                          │
│  2. Select file(s)                                                       │
│  3. Map / preview assets                                                 │
│  4. Confirm import                                                       │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Mobile / narrow window

**Windows desktop-first** (MVP platform). Below ~900px: collapse sidebar to icon rail; editor keeps tabbed preview. Not a primary mobile product. Single primary window only.
