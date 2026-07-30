import { Link } from 'react-router-dom';

import { useDataHealth } from '@/shared/hooks/use-data-health';

export function DashboardPage() {
  const health = useDataHealth();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">PromptOS</h1>
        <p className="mt-2 text-sm text-muted">
          Your local-first AI knowledge base. Asset library and editor arrive in the next milestones.
        </p>
      </div>

      <section className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-medium text-foreground">Workspace status</h2>
        <dl className="mt-3 grid gap-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Theme</dt>
            <dd className="text-foreground">Light-first</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Platform target</dt>
            <dd className="text-foreground">Windows</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Database</dt>
            <dd className="text-foreground">
              {health.status === 'loading' && 'Checking…'}
              {health.status === 'ok' && `Connected (${health.assetCount} assets)`}
              {health.status === 'error' && `Unavailable — ${health.message}`}
            </dd>
          </div>
        </dl>
      </section>

      <section className="flex flex-wrap gap-3 text-sm">
        <Link className="text-accent underline-offset-4 hover:underline" to="/library">
          Open library
        </Link>
        <Link className="text-accent underline-offset-4 hover:underline" to="/settings">
          Open settings
        </Link>
      </section>
    </div>
  );
}
