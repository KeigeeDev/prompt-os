import { Search } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

export function TopBar() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-4 border-b border-border bg-surface/90 px-4 backdrop-blur">
      <div className="min-w-[220px]">
        <span className="text-lg font-semibold tracking-tight text-foreground">PromptOS</span>
      </div>

      <button
        type="button"
        className="flex h-8 max-w-xl flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 text-left text-sm text-muted transition-colors hover:border-accent/40"
        aria-label="Open search (coming soon)"
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="flex-1">Search assets…</span>
        <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-muted">
          Ctrl+K
        </kbd>
      </button>

      <Button type="button" size="sm" disabled title="Create comes in Milestone 2">
        New
      </Button>
    </header>
  );
}
