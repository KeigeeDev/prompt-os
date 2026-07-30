# PromptOS — Future Roadmap

**Version:** 0.1.0  
**Prerequisite:** MVP (Milestones 0–9) complete  

These items are **intentionally out of MVP**. Architecture seams (`AiProvider`, `SyncAdapter`, `PluginHost`) exist so these can land without rewriting features.

---

## Horizon A — Intelligence

| Feature | Notes | Depends on |
|---------|-------|------------|
| AI-assisted prompt improvement | Suggest edits via provider | `AiProvider` |
| Prompt evaluation | Scoring rubrics, test cases | Providers + eval schema |
| Multi-model execution | Run same prompt across models | Providers |
| Prompt comparison | Side-by-side outputs | Execution |
| Local LLM (Ollama) | First local provider adapter | `AiProvider` |
| OpenRouter | Unified cloud gateway | API keychain |
| ChatGPT / Claude / Gemini | First-party adapters | Keychain + settings UI |

**Design constraint:** Execution never blocks offline library use. Providers are optional plugins/adapters.

---

## Horizon B — Ecosystem

| Feature | Notes |
|---------|-------|
| MCP Server registry | Browse/install metadata; connect configs |
| Plugin system | Commands, views, importers via `PluginHost` |
| Community prompt packs | Import signed/verified packs (format TBD) |

---

## Horizon C — Sync & collaboration

| Feature | Notes |
|---------|-------|
| Git synchronization | Repo mapping, commit assets as files |
| Cloud synchronization | Optional backend; CRDT or revision-vector TBD |
| Workspaces | Multi-library profiles |
| Team collaboration | Sharing, roles — major product shift |

**Trade-off preview:** Git-as-sync favors plain markdown files on disk; may introduce a file-backed adapter *alongside* SQLite, or export-on-commit. Decision deferred to a dedicated ADR.

---

## Horizon D — Platform

| Feature | Notes |
|---------|-------|
| Semantic search (embeddings) | Local embeddings table |
| Mobile companion | Read-only first |
| Browser extension | Capture prompts from ChatGPT/Claude UIs |
| FTS5 search migration | Replace Fuse at scale |
| Rust-native SQLite | Remove Node sidecar if desired |

---

## Suggested post-MVP sequencing

```text
1. Ollama provider (local, privacy-aligned)
2. Prompt run + compare (single asset)
3. Git sync (power users)
4. MCP registry
5. Plugin host
6. Cloud sync / workspaces / teams
```

---

## Explicit parking lot

- Real-time multiplayer editing  
- Marketplace payments  
- Hosted SaaS multi-tenant control plane  

Revisit only with a new PRD addendum.
