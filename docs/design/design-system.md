# PromptOS — Design System

**Version:** 0.1.1  
**Status:** Light-first confirmed · Graphite Ink palette  
**Stack:** Tailwind CSS + shadcn/ui + CSS variables

---

## 1. Product feel

PromptOS should feel like a **calm power tool**: dense enough for professionals, quiet enough for long writing sessions. Closer to a refined IDE + knowledge base than a SaaS marketing site.

**Inspiration mix:** VS Code information density, Obsidian focus, Raycast immediacy — not Notion’s blocky marketing chrome.

---

## 2. Visual direction

**Default theme: light.** Dark and system remain available in Settings.

Avoid default AI-slop aesthetics: no purple-on-white gradients, no cream+terracotta editorial cliché, no broadsheet hairline newspaper look, no glow-heavy dark neon.

### Palette — “Graphite Ink”

A cool neutral workspace with a single sharp accent (teal-ink), optimized for **light-first**, also readable in dark.

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `--background` | `#F3F5F7` | `#0F1215` | App background (subtle cool wash, not flat white) |
| `--surface` | `#FFFFFF` | `#171B20` | Panels |
| `--surface-muted` | `#E8ECF0` | `#1E242B` | Sidebar / secondary |
| `--border` | `#D5DCE3` | `#2A323C` | Hairlines |
| `--foreground` | `#12161A` | `#E8EEF3` | Primary text |
| `--muted` | `#5C6B78` | `#9AA8B5` | Secondary text |
| `--accent` | `#0F766E` | `#2DD4BF` | Interactive accent (teal) |
| `--accent-foreground` | `#FFFFFF` | `#042F2E` | On accent |
| `--danger` | `#B42318` | `#F97066` | Destructive |
| `--success` | `#067647` | `#3CCB7F` | Success |
| `--warning` | `#B54708` | `#FDB022` | Warning |

**Background atmosphere:** soft vertical gradient or faint grid/noise on `--background` (very low contrast) so the shell is not a flat single fill. Panels use `--surface`.

**Brand signal in-app:** Wordmark “PromptOS” in the top bar / dashboard header at clear hierarchy — not only a tiny nav glyph.

---

## 3. Typography

Do **not** use Inter, Roboto, Arial, or system-ui as the primary brand face.

| Role | Provisional choice | Fallback |
|------|--------------------|----------|
| UI / body | **IBM Plex Sans** | `ui-sans-serif`, sans-serif |
| Code / markdown mono | **IBM Plex Mono** | `ui-monospace`, monospace |
| Display (rare, dashboard wordmark) | **IBM Plex Sans** semibold/tracking | — |

Rationale: technical credibility, excellent readability, distinct from generic SaaS fonts, works in dense UI.

Load via `@fontsource/ibm-plex-sans` and `@fontsource/ibm-plex-mono` (self-hosted, offline-friendly).

### Scale (Tailwind-ish)

| Token | Size | Use |
|-------|------|-----|
| `text-xs` | 12 | Meta, shortcuts |
| `text-sm` | 13–14 | UI controls |
| `text-base` | 15–16 | Body / editor |
| `text-lg` | 18 | Section titles |
| `text-xl` | 20–22 | Page titles |
| `text-2xl` | 28 | Dashboard brand/header |

Line length in editor preview: ~65–80 characters.

---

## 4. Layout & spacing

- Sidebar width: 220px (collapsed 56px)
- Top bar height: 48px
- Content padding: 24px desktop, 16px compact
- Density: comfortable-compact (VS Code leaning)
- Radius: `6px` controls, `8px` panels — **avoid** `rounded-full` pills for primary chrome
- Shadows: single subtle elevation max; no multi-layer glow stacks

### Cards policy

- **Default: no cards.** Use whitespace, dividers, and panels.
- Cards only when they wrap a **discrete interactive unit** (e.g. pinned item hit-target) and removing chrome would hurt affordance.
- **Never** card the hero/header region of a page.

---

## 5. Motion

Ship intentional motion (2–3 patterns), not decoration:

1. **Command palette** — quick fade + 4–6px rise (~120ms)
2. **Sidebar / panel** — width/opacity transition (~150ms ease)
3. **List item navigate** — subtle highlight fade

Prefer `prefers-reduced-motion` media query to disable non-essential motion.

---

## 6. Component inventory (shadcn/ui)

Use shadcn primitives wrapped in `src/shared/components/ui`:

- Button, Input, Textarea, Label
- Dialog, Dropdown Menu, Popover, Tooltip
- Command (palette)
- Tabs, Separator, Scroll Area
- Select, Checkbox, Switch
- Toast / Sonner
- Badge (sparingly — not as hero overlays)

Feature components compose these; do not restyle ad hoc per page.

---

## 7. Iconography

Lucide React (consistent with shadcn). Stroke 1.75–2. Size 16/20 in chrome.

---

## 8. Editor chrome

- TipTap content area uses mono for code marks; body sans for prose
- Split view divider draggable
- Variable tokens in editor highlighted with subtle accent underline/background

---

## 9. Accessibility

- WCAG AA contrast for text/icon on surfaces
- Focus rings: accent outline, never remove focus styles
- Hit targets ≥ 32px in toolbars
- Keyboard: full navigation for shell, library, palette, editor essentials

---

## 10. Theme implementation

```css
:root {
  --background: #f3f5f7;
  --surface: #ffffff;
  /* … */
}

.dark {
  --background: #0f1215;
  --surface: #171b20;
  /* … */
}
```

Map tokens into Tailwind theme extension. shadcn CSS variables aligned to the same names where possible.

---

## 11. Open design questions

- Custom logo mark vs wordmark-only for MVP?
- Keep Graphite Ink accent or provide a brand accent from an existing logo?

**Decided:** Light-first default theme; English-only UI copy.
