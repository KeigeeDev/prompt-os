import type { DataClient, HealthCheckResult } from '@/application/ports/data-client';

/**
 * Browser-safe client for the Vite renderer.
 * Prisma runs in Node (tests / future Tauri sidecar), not in the WebView.
 */
export class MemoryDataClient implements DataClient {
  private assetCount = 0;

  async healthCheck(): Promise<HealthCheckResult> {
    return {
      ok: true,
      assetCount: this.assetCount,
      databaseUrl: 'memory://local',
    };
  }

  /** Test helper — not part of DataClient port */
  setAssetCount(count: number) {
    this.assetCount = count;
  }
}
