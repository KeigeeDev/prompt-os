import { variableKeySchema } from '@/domain/assets/schemas';

/** Wrap a snake_case key as a Mustache-style placeholder. */
export function toVariablePlaceholder(key: string): string {
  const parsed = variableKeySchema.parse(key);
  return `{{${parsed}}}`;
}

export function isSoftDeleted(deletedAt: Date | null | undefined): boolean {
  return deletedAt != null;
}
