import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '@/app/theme-provider';
import { DashboardPage } from '@/features/dashboard';

describe('DashboardPage', () => {
  it('renders the PromptOS brand and workspace status', async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: 'PromptOS' })).toBeInTheDocument();
    expect(await screen.findByText(/Connected \(0 assets\)/i)).toBeInTheDocument();
  });
});
