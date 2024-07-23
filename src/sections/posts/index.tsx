import React, { useEffect, useState } from 'react'
import { chakra, Box, BoxProps, Button, Center, HStack, Spinner, VStack } from '@chakra-ui/react'
import Container from '../../components/Container';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import PostCard, { PostProps } from '../../components/Post';
import { faker } from '@faker-js/faker';
import Loading from '../../components/Loading';
import { Post, PostsResponse } from '../../types';
import { useInView } from 'react-intersection-observer';

const fetchPosts = async ({ pageParam = 1 }): Promise<PostsResponse> => {
    const response = await fetch(`/api/posts?page=${pageParam}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const SectionPost: React.FC<BoxProps> = props => {
    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    const [isAscending, setIsAscending] = useState(true);

    const {
        data,
        error,
        fetchNextPage,
        isLoading: isLoadingPosts,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['allPosts'],
        queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });

    const posts: Post[] = data?.pages.flatMap((data) => data.posts) ?? [];

    const handleLoadMore = () => {
        fetchNextPage();
    };

    const handleSortToggle = () => {
        setIsAscending(!isAscending);
    };

    const sortedData = posts.slice().sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return isAscending ? dateA - dateB : dateB - dateA;
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    return (
        <Box {...props}>
            <Loading isLoading={isLoadingPosts}>
                <Container py={10}>
                    <Button onClick={handleSortToggle}>
                        {isAscending ? 'Ordenar por Data (Decrescente)' : 'Ordenar por Data (Crescente)'}
                    </Button>

                    <VStack gap={8} mt={4} mb={20}>
                        {sortedData.map((post: Post) => (
                            <PostCard
                                key={post.id}
                                {...post}
                            />
                        ))}
                    </VStack>

                    <chakra.div ref={ref} />
                    <Center>
                        {isFetchingNextPage && <chakra.div>Loading more...</chakra.div>}
                        <chakra.div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</chakra.div>
                        {error && <chakra.div>Error: {error.message}</chakra.div>}
                    </Center>
                </Container>
            </Loading>
        </Box>
    )
};


export default SectionPost