# PromptOS — TypeScript Interfaces & Domain Types

**Version:** 0.1.0  
**Status:** Draft — reference for implementation  
**Location when coded:** `src/domain/**` and `src/application/ports/**`

These types are the **language of the domain**. Zod schemas should infer or mirror them at runtime boundaries.

---

## 1. Asset types

```ts
export const ASSET_TYPES = [
  'prompt',
  'agent',
  'workflow',
  'template',
  'persona',
  'mcp_server',
  'coding_rule',
  'design_brief',
  'research_framework',
  'automation_recipe',
  'prompt_pack',
  'note',
  'snippet',
] as const;

export type AssetType = (typeof ASSET_TYPES)[number];

export type AssetStatus = 'draft' | 'active' | 'archived' | 'deprecated';

export type RelationshipKind =
  | 'references'
  | 'depends_on'
  | 'parent_of'
  | 'related'
  | 'contains'
  | 'uses';
```

---

## 2. Core entities

```ts
export interface Variable {
  id: string;
  assetId: string;
  key: string;
  label: string;
  description: string;
  defaultValue: string;
  required: boolean;
  sortOrder: number;
}

export interface Tag {
  id: string;
  name: string;
  color?: string | null;
  createdAt: Date;
}

export interface AssetBase {
  id: string;
  type: AssetType;
  title: string;
  description: string;
  body: string;
  category?: string | null;
  status: AssetStatus;
  version: string;
  isFavorite: boolean;
  isPinned: boolean;
  isArchived: boolean;
  notes: string;
  modelCompatibility: string[];
  tags: Tag[];
  variables: Variable[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

/** Discriminated asset with typed extension */
export type Asset =
  | (AssetBase & { type: 'prompt'; extension: PromptExtension })
  | (AssetBase & { type: 'agent'; extension: AgentExtension })
  | (AssetBase & { type: 'workflow'; extension: WorkflowExtension })
  | (AssetBase & { type: 'persona'; extension: PersonaExtension })
  | (AssetBase & { type: 'mcp_server'; extension: McpServerExtension })
  | (AssetBase & { type: 'prompt_pack'; extension: PromptPackExtension })
  | (AssetBase & {
      type: Exclude<
        AssetType,
        'prompt' | 'agent' | 'workflow' | 'persona' | 'mcp_server' | 'prompt_pack'
      >;
      extension: Record<string, unknown>;
    });
```

---

## 3. Extensions

```ts
export interface PromptExtension {
  systemPreamble?: string;
  outputFormat?: string;
}

export interface AgentExtension {
  purpose: string;
  responsibilities: string[];
  inputs: string[];
  outputs: string[];
  recommendedModels: string[];
  exampleConversations: { title: string; body: string }[];
  connectedWorkflowIds: string[];
}

export interface WorkflowNode {
  id: string;
  assetId?: string;
  kind: 'prompt' | 'agent' | 'output' | 'note';
  position: { x: number; y: number };
  data?: Record<string, unknown>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface WorkflowExtension {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  isTemplate: boolean;
}

export interface PersonaExtension {
  tone?: string;
  voice?: string;
  traits: string[];
  constraints: string[];
}

export interface McpServerExtension {
  command?: string;
  args: string[];
  env: Record<string, string>;
  transport?: 'stdio' | 'sse' | 'http';
  url?: string;
}

export interface PromptPackExtension {
  memberAssetIds: string[];
  versionLabel?: string;
}
```

---

## 4. Revisions & relationships

```ts
export interface Revision {
  id: string;
  assetId: string;
  revisionNumber: number;
  snapshot: AssetSnapshot;
  changeSummary?: string | null;
  createdAt: Date;
}

/** Serializable snapshot stored in revisions.snapshot */
export type AssetSnapshot = Omit<AssetBase, 'tags' | 'variables'> & {
  type: AssetType;
  extension: Record<string, unknown>;
  tagNames: string[];
  variables: Omit<Variable, 'id' | 'assetId'>[];
};

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  kind: RelationshipKind;
  label?: string | null;
  createdAt: Date;
}
```

---

## 5. Inputs / filters

```ts
export interface CreateAssetInput {
  type: AssetType;
  title: string;
  description?: string;
  body?: string;
  category?: string;
  status?: AssetStatus;
  version?: string;
  notes?: string;
  modelCompatibility?: string[];
  extension?: Record<string, unknown>;
  tagNames?: string[];
  variables?: Omit<Variable, 'id' | 'assetId'>[];
}

export interface UpdateAssetInput {
  title?: string;
  description?: string;
  body?: string;
  category?: string | null;
  status?: AssetStatus;
  version?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  notes?: string;
  modelCompatibility?: string[];
  extension?: Record<string, unknown>;
  tagNames?: string[];
  variables?: Omit<Variable, 'id' | 'assetId'>[];
}

export interface AssetFilter {
  types?: AssetType[];
  category?: string;
  tags?: string[];
  status?: AssetStatus[];
  isFavorite?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  includeDeleted?: boolean;
  query?: string; // title-only quick filter; full search via SearchService
  sortBy?: 'title' | 'updatedAt' | 'createdAt' | 'type';
  sortDir?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
```

---

## 6. Search

```ts
export interface SearchDocument {
  id: string;
  type: AssetType;
  title: string;
  description: string;
  body: string;
  category?: string | null;
  tags: string[];
  variables: string[];
  models: string[];
  notes: string;
  status: AssetStatus;
  isFavorite: boolean;
  isArchived: boolean;
  updatedAt: number; // epoch ms for ranking
}

export interface SearchOptions {
  types?: AssetType[];
  limit?: number;
  includeArchived?: boolean;
}

export interface SearchHit {
  id: string;
  score: number;
  document: SearchDocument;
}
```

---

## 7. Ports (repository interfaces)

```ts
export interface AssetRepository {
  findById(id: string): Promise<Asset | null>;
  list(filter: AssetFilter): Promise<Asset[]>;
  count(filter: AssetFilter): Promise<number>;
  create(input: CreateAssetInput): Promise<Asset>;
  update(id: string, input: UpdateAssetInput): Promise<Asset>;
  softDelete(id: string): Promise<void>;
}

export interface RevisionRepository {
  listByAsset(assetId: string): Promise<Revision[]>;
  create(assetId: string, snapshot: AssetSnapshot, summary?: string): Promise<Revision>;
  findById(id: string): Promise<Revision | null>;
}

export interface RelationshipRepository {
  listForAsset(assetId: string): Promise<Relationship[]>;
  create(input: Omit<Relationship, 'id' | 'createdAt'>): Promise<Relationship>;
  delete(id: string): Promise<void>;
  listAll(): Promise<Relationship[]>;
}

export interface SearchIndex {
  rebuild(docs: SearchDocument[]): Promise<void>;
  upsert(doc: SearchDocument): Promise<void>;
  remove(id: string): Promise<void>;
  query(q: string, opts?: SearchOptions): Promise<SearchHit[]>;
}

export interface SettingsRepository {
  get<T = unknown>(key: string): Promise<T | null>;
  set(key: string, value: unknown): Promise<void>;
  getAll(): Promise<Record<string, unknown>>;
}
```

---

## 8. Settings

```ts
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  recentLimit: number;
  keyboardShortcuts: Record<string, string>;
}
```

---

## 9. Practices

- Prefer **discriminated unions** over optional soup fields
- Parse DB JSON → domain with Zod; never trust raw strings in UI
- Keep DTOs for UI thin; map in hooks/services
- Do not export Prisma types into features — map in infrastructure
