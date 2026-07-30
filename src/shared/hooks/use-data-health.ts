import { useEffect, useState } from 'react';

import { getDataClient } from '@/infrastructure/di/container';

type HealthState =
  | { status: 'loading' }
  | { status: 'ok'; assetCount: number }
  | { status: 'error'; message: string };

export function useDataHealth() {
  const [health, setHealth] = useState<HealthState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const result = await getDataClient().healthCheck();
        if (!cancelled) {
          setHealth({ status: 'ok', assetCount: result.assetCount });
        }
      } catch (error) {
        if (!cancelled) {
          setHealth({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return health;
}
