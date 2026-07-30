import { afterAll, describe, expect, it } from 'vitest';

import { PrismaDataClient } from '@/infrastructure/persistence/prisma/data-client';
import { disconnectPrisma } from '@/infrastructure/persistence/prisma/client';

describe('PrismaDataClient', () => {
  afterAll(async () => {
    await disconnectPrisma();
  });

  it('reports healthy status against SQLite', async () => {
    const client = new PrismaDataClient();
    const result = await client.healthCheck();
    expect(result.ok).toBe(true);
    expect(result.assetCount).toBeGreaterThanOrEqual(0);
  });
});
