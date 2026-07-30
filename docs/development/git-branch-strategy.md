# PromptOS — Git Branch Strategy

**Version:** 0.1.0

---

## 1. Permanent branches

| Branch | Role |
|--------|------|
| `main` | Production-ready history; protected |
| `develop` | Optional integration branch; **MVP may use `main` only** |

**MVP recommendation:** Trunk-based on `main` with short-lived feature branches. Introduce `develop` only if release cadence needs a stabilization line.

---

## 2. Branch naming

```text
<type>/<short-description>
```

Examples:

- `feat/asset-library`
- `fix/search- Ranking` → `fix/search-ranking`
- `chore/ci-setup`
- `docs/prd-update`
- `refactor/asset-service`

Cloud agent branches may use: `cursor/<short-description>-<id>`

Rules:

- Lowercase kebab-case
- No personal names as prefix required
- Max ~50 chars when practical

---

## 3. Workflow

```text
main
  └── feat/editor-tiptap
        ├── commits…
        └── PR → main (squash or merge commit)
```

1. Branch from up-to-date `main`
2. Implement one milestone slice per PR when possible
3. Open PR with summary + test notes
4. Require CI green before merge
5. Delete branch after merge

---

## 4. Protection (recommended)

On `main`:

- Require PR
- Require status checks: lint, typecheck, test
- No force push
- Linear history preferred (squash)

---

## 5. Release tags

```text
v0.1.0-mvp
v0.2.0
v1.0.0
```

SemVer: MAJOR breaking, MINOR features, PATCH fixes. Pre-1.0: rapid MINOR allowed.

---

## 6. Hotfixes

```text
main ← fix/crash-on-import
```

Cherry-pick not needed without `develop`.
