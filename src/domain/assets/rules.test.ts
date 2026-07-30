import { describe, expect, it } from 'vitest';

import { isSoftDeleted, toVariablePlaceholder } from '@/domain/assets/rules';
import { variableKeySchema } from '@/domain/assets/schemas';

describe('variable placeholders', () => {
  it('wraps snake_case keys', () => {
    expect(toVariablePlaceholder('audience')).toBe('{{audience}}');
    expect(toVariablePlaceholder('target_model')).toBe('{{target_model}}');
  });

  it('rejects non snake_case keys', () => {
    expect(() => variableKeySchema.parse('Audience')).toThrow();
    expect(() => variableKeySchema.parse('target-model')).toThrow();
  });
});

describe('soft delete helper', () => {
  it('detects deleted assets', () => {
    expect(isSoftDeleted(null)).toBe(false);
    expect(isSoftDeleted(undefined)).toBe(false);
    expect(isSoftDeleted(new Date())).toBe(true);
  });
});
