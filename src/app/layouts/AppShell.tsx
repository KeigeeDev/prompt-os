import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/app/layouts/Sidebar';
import { TopBar } from '@/app/layouts/TopBar';

export function AppShell() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
