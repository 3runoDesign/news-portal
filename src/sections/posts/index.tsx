import React, { useState } from 'react'
import { Box, BoxProps, Button, Center, HStack, Spinner, VStack } from '@chakra-ui/react'
import Container from '../../components/Container';
import { useQuery } from '@tanstack/react-query';
import PostCard, { PostProps } from '../../components/Post';
import { faker } from '@faker-js/faker';
import Loading from '../../components/Loading';

const _data: PostProps[] = [
    {
        id: faker.string.uuid(),
        title: faker.lorem.word(),
        cover: faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
        description: faker.lorem.paragraph(),
        date: faker.date.anytime().toDateString(),
        avatar: faker.image.avatarGitHub(),
        comments: [
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            }
        ]
    },
    {
        id: faker.string.uuid(),
        title: faker.lorem.word(),
        cover: faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
        description: faker.lorem.paragraph(),
        date: faker.date.anytime().toDateString(),
        avatar: faker.image.avatarGitHub(),
        comments: [
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            }
        ]
    },
    {
        id: faker.string.uuid(),
        title: faker.lorem.word(),
        cover: faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
        description: faker.lorem.paragraph(),
        date: faker.date.anytime().toDateString(),
        avatar: faker.image.avatarGitHub(),
        comments: [
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            }
        ]
    },
    {
        id: faker.string.uuid(),
        title: faker.lorem.word(),
        cover: faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
        description: faker.lorem.paragraph(),
        date: faker.date.anytime().toDateString(),
        avatar: faker.image.avatarGitHub(),
        comments: [
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            }
        ]
    },
    {
        id: faker.string.uuid(),
        title: faker.lorem.word(),
        cover: faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
        description: faker.lorem.paragraph(),
        date: faker.date.anytime().toDateString(),
        avatar: faker.image.avatarGitHub(),
        comments: [
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            },
            {
                avatar: faker.image.avatarGitHub(),
                id: faker.string.uuid()
            }
        ]
    },
]

const getData = async () => {
    return new Promise<PostProps[]>((resolve) => {
        setTimeout(() => { resolve(_data) }, 2000);
    })
}

export const SectionPost: React.FC<BoxProps> = props => {
    const [isAscending, setIsAscending] = useState(true);

    const { data, error: errorPosts, isLoading: isLoadingPosts } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            const data = await getData()
            return data
        },
    })

    const handleSortToggle = () => {
        setIsAscending(!isAscending);
    };

    const sortedData = data?.slice().sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return isAscending ? dateA - dateB : dateB - dateA;
    });

    return (
        <Box {...props}>
            <Loading isLoading={isLoadingPosts}>
                <Container py={10}>
                    <Button onClick={handleSortToggle}>
                        {isAscending ? 'Ordenar por Data (Decrescente)' : 'Ordenar por Data (Crescente)'}
                    </Button>

                    <VStack gap={8} mt={4} mb={20}>
                        {sortedData?.map((post) => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </VStack>

                    <Button onClick={handleSortToggle}>
                        {isAscending ? 'Ordenar por Data (Decrescente)' : 'Ordenar por Data (Crescente)'}
                    </Button>
                </Container>
            </Loading>
        </Box>
    )
};


export default SectionPost