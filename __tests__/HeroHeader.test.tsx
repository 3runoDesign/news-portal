import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import HeroHeader from '../src/components/HeroHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock de dados
const queryClient = new QueryClient();

describe('Hero component', () => {
    it('renders with default styles and applies custom props', async () => {
        // arrange 
        render(<QueryClientProvider client={queryClient}>
            <HeroHeader />
          </QueryClientProvider>)

        // assert
        await waitFor(() => {
            expect(screen.getByText('Ler notícia')).toBeInTheDocument();
          });
    });
});
