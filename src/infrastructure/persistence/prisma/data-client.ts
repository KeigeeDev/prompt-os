import type { DataClient, HealthCheckResult } from '@/application/ports/data-client';
import { getPrismaClient } from '@/infrastructure/persistence/prisma/client';

/**
 * Node-only Prisma adapter.
 * Imported from Node test files / future sidecar — not from the React tree.
 */
export class PrismaDataClient implements DataClient {
  async healthCheck(): Promise<HealthCheckResult> {
    const prisma = getPrismaClient();
    const assetCount = await prisma.asset.count({
      where: { deletedAt: null },
    });

    return {
      ok: true,
      assetCount,
      databaseUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
    };
  }
}
