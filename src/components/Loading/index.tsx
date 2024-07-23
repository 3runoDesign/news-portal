import { Center, HStack, Spinner } from '@chakra-ui/react';
import React from 'react';

interface LoadingProps {
    textLoad?: string
    isLoading: boolean;
    children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, children, textLoad }) => {
    if (isLoading) {
        return (
            <Center minH='320px'>
                <HStack gap={2}>
                    <Spinner />
                    <p>{textLoad ? textLoad : "carregando..."}</p>
                </HStack>
            </Center>
        );
    }

    return <>{children}</>;
};

export default Loading;