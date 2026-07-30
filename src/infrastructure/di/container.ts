import type { DataClient } from '@/application/ports/data-client';
import { MemoryDataClient } from '@/infrastructure/persistence/memory/data-client';

let client: DataClient | undefined;

/**
 * Wire ports → adapters.
 * Renderer uses the memory client in Milestone 1.
 * PrismaDataClient is exercised in Node unit tests and will back the sidecar next.
 */
export function getDataClient(): DataClient {
  if (!client) {
    client = new MemoryDataClient();
  }
  return client;
}

/** Test-only override */
export function setDataClient(next: DataClient) {
  client = next;
}

export function resetDataClient() {
  client = undefined;
}
