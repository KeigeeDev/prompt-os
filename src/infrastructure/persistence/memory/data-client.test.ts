import { describe, expect, it } from 'vitest';

import { MemoryDataClient } from '@/infrastructure/persistence/memory/data-client';

describe('MemoryDataClient', () => {
  it('reports healthy status', async () => {
    const client = new MemoryDataClient();
    client.setAssetCount(3);
    const result = await client.healthCheck();
    expect(result.ok).toBe(true);
    expect(result.assetCount).toBe(3);
    expect(result.databaseUrl).toBe('memory://local');
  });
});
