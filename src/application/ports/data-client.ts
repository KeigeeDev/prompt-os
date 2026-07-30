export interface HealthCheckResult {
  ok: true;
  assetCount: number;
  databaseUrl: string;
}

/**
 * Application-facing data port.
 * UI and services talk to this — never Prisma directly.
 */
export interface DataClient {
  healthCheck(): Promise<HealthCheckResult>;
}
