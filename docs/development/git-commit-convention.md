# PromptOS — Git Commit Convention

**Version:** 0.1.0  
**Style:** [Conventional Commits](https://www.conventionalcommits.org/)

---

## Format

```text
<type>(<optional scope>): <short summary>

[optional body]

[optional footer]
```

### Summary rules

- Imperative mood: “add”, not “added”
- ≤ 72 characters
- No trailing period
- Lowercase summary preferred

---

## Types

| Type | Use |
|------|-----|
| `feat` | New user-facing capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting; no logic change |
| `refactor` | Code change without feature/fix |
| `perf` | Performance |
| `test` | Adding/fixing tests |
| `build` | Tooling, Vite, Tauri, Prisma generate |
| `ci` | CI workflows |
| `chore` | Maintenance |
| `revert` | Revert prior commit |

---

## Scopes (suggested)

`assets`, `editor`, `search`, `graph`, `workflows`, `agents`, `import`, `export`, `settings`, `db`, `ui`, `tauri`, `docs`

Example:

```text
feat(editor): highlight template variables in tiptap
fix(search): exclude soft-deleted assets from fuse index
docs(architecture): clarify sidecar data client decision
```

---

## Body

Use for **why** and trade-offs. Wrap at 72–100 chars.

---

## Footers

```text
BREAKING CHANGE: description
Fixes #123
```

---

## Examples

```text
feat(library): filter assets by type and favorite

docs: add PRD and system architecture foundation

chore(db): add prisma schema for assets and revisions

test(assets): cover fork and soft-delete in asset-service
```

---

## PR titles

Match the primary commit type/scope when squashing:

```text
feat(search): add command palette and fuse index
```
