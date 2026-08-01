# PromptOS — Coding Standards

**Version:** 0.1.0  
**Applies to:** All application and infrastructure code after Milestone 1

---

## 1. Language & typing

- TypeScript **strict** mode (`strict: true`, `noUncheckedIndexedAccess` recommended)
- Prefer `type` / `interface` from domain modules; do not leak Prisma types into UI
- No `any` unless documented with `// eslint-disable` + reason
- Use `unknown` + Zod parse at boundaries (IPC, import files, JSON columns)
- Prefer `async/await` over raw Promise chains

---

## 2. Architecture rules

1. **Features** may import `shared`, `domain`, `application` — never `infrastructure` directly (use DI/hooks that wrap services).
2. **Application services** may depend on ports only, not Prisma.
3. **Infrastructure** implements ports; maps DB ↔ domain.
4. **React components** stay presentational where possible; hooks orchestrate.
5. No circular imports across layers; enforce with path discipline / lint if available.

---

## 3. React conventions

- Function components only
- Feature pages in `pages/`; reusable UI in `components/`
- Prefer modern React patterns already adopted by the team (`useEffectEvent`, `startTransition`, `useDeferredValue` when appropriate)
- Do **not** add `useMemo` / `useCallback` by default; follow React Compiler guidance if enabled
- Colocate tests as `*.test.tsx`

---

## 4. State

- Zustand stores: one store per feature concern; avoid a single global mega-store
- Persist only settings-like UI state if needed; never persist entire asset cache as source of truth (DB is SoT)
- Server/data state goes through services

---

## 5. Styling

- Tailwind utility classes; extract components when repetition hurts readability
- Use design tokens / CSS variables from the Design System
- No inline styles except dynamic geometry (e.g. graph positions)
- Respect cards/motion rules in the Design System

---

## 6. File size & structure

- Prefer files &lt; ~300 lines; split when a component owns multiple concerns
- One primary export per component file
- Barrel `index.ts` per feature for public API only

---

## 7. Error handling

- Domain errors: typed classes or discriminated unions
- UI shows toast + optional detail dialog; log full error locally
- Never swallow errors empty-handed

---

## 8. Testing

- Unit-test services and pure domain rules
- Repository integration tests against temp SQLite for critical paths
- RTL for interactive flows (save, search, palette)
- Fixtures in `src/test/fixtures`

---

## 9. Comments & docs

- Comment **why**, not what
- Public ports and complex domain rules get short JSDoc
- Update architecture docs when decisions change (add ADR)

---

## 10. Security

- No secrets in repo; `.env` gitignored; `.env.example` only keys
- Future API keys via OS keychain
- Sanitize file paths from import dialogs (no path traversal)

---

## 11. Tooling

```bash
pnpm lint
pnpm format
pnpm typecheck
pnpm test
```

Pre-commit (optional later): lint-staged + prettier.

---

## 12. Forbidden for MVP

- Adding Electron “just in case”
- Implementing live LLM calls without an approved milestone
- Introducing a second state library (Redux, etc.) without ADR
- Copy-pasting shadcn components outside `shared/components/ui`
