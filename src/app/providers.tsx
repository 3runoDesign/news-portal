'use client';

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const reactQueryClient = new QueryClient();
import theme from "../theme/theme";


type ProvidersProps = {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={reactQueryClient}>
                {children}
            </QueryClientProvider>
        </ChakraProvider>
    );
}