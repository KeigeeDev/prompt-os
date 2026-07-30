import { NavLink } from 'react-router-dom';
import {
  Box,
  FolderKanban,
  GitFork,
  Home,
  Network,
  Settings,
  Upload,
  Workflow,
} from 'lucide-react';

import { cn } from '@/shared/lib/utils';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: Home, end: true },
  { to: '/library', label: 'Library', icon: FolderKanban },
  { to: '/agents', label: 'Agents', icon: Box },
  { to: '/workflows', label: 'Workflows', icon: Workflow },
  { to: '/graph', label: 'Graph', icon: Network },
  { to: '/packs', label: 'Packs', icon: GitFork },
] as const;

const SECONDARY_ITEMS = [
  { to: '/import', label: 'Import', icon: Upload },
  { to: '/settings', label: 'Settings', icon: Settings },
] as const;

export function Sidebar() {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-border bg-surface-muted/70 px-3 py-4">
      <nav className="flex flex-1 flex-col gap-1" aria-label="Primary">
        {NAV_ITEMS.map(({ to, label, icon: Icon, ...rest }) => (
          <NavLink
            key={to}
            to={to}
            end={'end' in rest ? rest.end : false}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted transition-colors',
                isActive
                  ? 'bg-surface font-medium text-foreground shadow-sm'
                  : 'hover:bg-surface/80 hover:text-foreground',
              )
            }
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="my-3 border-t border-border" />

      <nav className="flex flex-col gap-1" aria-label="Secondary">
        {SECONDARY_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted transition-colors',
                isActive
                  ? 'bg-surface font-medium text-foreground shadow-sm'
                  : 'hover:bg-surface/80 hover:text-foreground',
              )
            }
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
