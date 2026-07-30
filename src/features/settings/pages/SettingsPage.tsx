import { Link, useParams } from 'react-router-dom';

import { useTheme, type ThemeMode } from '@/app/theme-context';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

const SECTIONS = [
  { id: 'general', label: 'General' },
  { id: 'shortcuts', label: 'Shortcuts' },
  { id: 'backup', label: 'Backup' },
  { id: 'ai', label: 'AI (soon)' },
  { id: 'sync', label: 'Sync (soon)' },
] as const;

const THEMES: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export function SettingsPage() {
  const params = useParams();
  const section = params.section ?? 'general';
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted">Preferences for this local workspace.</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {SECTIONS.map((item) => (
          <Link
            key={item.id}
            to={`/settings/${item.id}`}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors',
              section === item.id
                ? 'bg-surface font-medium text-foreground shadow-sm'
                : 'text-muted hover:text-foreground',
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {section === 'general' && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-foreground">Theme</h2>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((item) => (
              <Button
                key={item.value}
                type="button"
                variant={theme === item.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted">Default is light. Dark and system are available.</p>
        </section>
      )}

      {section === 'shortcuts' && (
        <p className="text-sm text-muted">
          Default shortcuts are documented here later. Command palette uses Ctrl+K.
        </p>
      )}

      {section === 'backup' && (
        <p className="text-sm text-muted">
          Manual database backup and restore arrive in Milestone 8.
        </p>
      )}

      {(section === 'ai' || section === 'sync') && (
        <p className="text-sm text-muted">Placeholder for a future milestone.</p>
      )}
    </div>
  );
}
