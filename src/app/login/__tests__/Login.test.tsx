import React, { ReactNode } from 'react';
import Login from '../page';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouterContextProviderMock } from '@/test/lib/app-router-context-provider-mock';

const queryClient = new QueryClient();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    query: {},
    asPath: '',
  }),
  usePathname: () => '/',
}));

describe('Login component', () => {
  it('should render login with required fields', async () => {
    const push = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <AppRouterContextProviderMock router={{ push }}>
          <Login />
        </AppRouterContextProviderMock>
      </QueryClientProvider>
    );


    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(screen.getByText('Usuário é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
    });
  });

  it('should render unauthorized login', async () => {
    const push = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Login failed' }),
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers(),
        redirected: false,
        url: 'http://localhost.com',
      } as Response)
    );

    render(
      <QueryClientProvider client={queryClient}>
        <AppRouterContextProviderMock router={{ push }}>
          <Login />
        </AppRouterContextProviderMock>
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText('Usuário'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(screen.getByText('Login failed')).toBeInTheDocument();
    });
  });
});