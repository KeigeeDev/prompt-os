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

export interface Category {
  id: string;
  name: string;
  parentId?: string | null;
  sortOrder: number;
  createdAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color?: string | null;
  createdAt: Date;
}

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

export interface AssetBase {
  id: string;
  type: AssetType;
  title: string;
  description: string;
  body: string;
  categoryId?: string | null;
  category?: Category | null;
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

export type Asset = AssetBase & {
  extension: Record<string, unknown>;
};
