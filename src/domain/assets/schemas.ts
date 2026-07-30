import { z } from 'zod';

import { ASSET_TYPES } from '@/domain/assets/types';

export const assetTypeSchema = z.enum(ASSET_TYPES);

export const assetStatusSchema = z.enum(['draft', 'active', 'archived', 'deprecated']);

/** Variable keys must be snake_case for {{snake_case}} placeholders */
export const variableKeySchema = z
  .string()
  .regex(/^[a-z][a-z0-9]*(_[a-z0-9]+)*$/, 'Variable key must be snake_case');

export const createAssetInputSchema = z.object({
  type: assetTypeSchema,
  title: z.string().min(1),
  description: z.string().optional(),
  body: z.string().optional(),
  categoryId: z.string().nullable().optional(),
  status: assetStatusSchema.optional(),
  version: z.string().optional(),
  notes: z.string().optional(),
  modelCompatibility: z.array(z.string()).optional(),
  extension: z.record(z.unknown()).optional(),
  tagNames: z.array(z.string()).optional(),
});

export type CreateAssetInput = z.infer<typeof createAssetInputSchema>;
