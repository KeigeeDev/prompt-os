import { Navigate, Route, Routes } from 'react-router-dom';

import { AppShell } from '@/app/layouts/AppShell';
import { DashboardPage } from '@/features/dashboard';
import { SettingsPage } from '@/features/settings';
import { PlaceholderPage } from '@/shared/components/PlaceholderPage';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="library" element={<PlaceholderPage title="Library" />} />
        <Route path="library/:type" element={<PlaceholderPage title="Library" />} />
        <Route path="agents" element={<PlaceholderPage title="Agents" />} />
        <Route path="workflows" element={<PlaceholderPage title="Workflows" />} />
        <Route path="graph" element={<PlaceholderPage title="Graph" />} />
        <Route path="packs" element={<PlaceholderPage title="Packs" />} />
        <Route path="import" element={<PlaceholderPage title="Import" />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="settings/:section" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
