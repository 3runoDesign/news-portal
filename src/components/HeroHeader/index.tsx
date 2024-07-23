'use client'

import {
    Button,
    HTMLChakraProps,
    Image,
    chakra
} from '@chakra-ui/react';
import { useRef } from 'react';
import { faker } from "@faker-js/faker";
import AsyncImage from '../AsyncImage';
import { useQuery } from '@tanstack/react-query';

type DataProps = {
    title: string;
    date: string;
    image: string;
    slug: string;
}

const _data: DataProps = {
    title: faker.lorem.word(),
    date: faker.date.anytime().toDateString(),
    image: faker.image.urlPicsumPhotos({ width: 2400, height: 1900 }),
    slug: faker.lorem.slug({ min: 1, max: 3 })
}

const getData = async () => {
    return new Promise<DataProps>((resolve) => {
        setTimeout(() => { resolve(_data) }, 2000);
    })
}

function HeroHeader(props: HTMLChakraProps<'header'>) {
    const ref = useRef<HTMLHeadingElement>()

    const { data, error, isLoading } = useQuery({
        queryKey: ['heroHeader'],
        queryFn: async () => {
            const data = await getData()
            return data
        },
    })

    return (
        <chakra.header
            ref={ref}
            w={"full"}
            h={"90vh"}
            overflow={'hidden'}
            pos={"relative"}
            {...props}
        >
            {/* IMAGE */}
            <chakra.div
                pos={"absolute"}
                w={"full"}
                top={0}
                right={0}
                bottom={0}
                left={0}
                bg="black"
                opacity={0.3}
                zIndex={1}
            />
            <chakra.div
                pos={"absolute"}
                w={"full"}
                top={0}
                right={0}
                bottom={0}
                left={0}
            >
                <AsyncImage
                    src={data?.image}
                    alt="image-hero"
                    display={'block'}
                    pos={'absolute'}
                    top={0}
                    right={0}
                    width={"100%"}
                    height={"100%"}
                    pointerEvents={"none"}
                    objectFit={"cover"}
                    objectPosition='center center'
                />
            </chakra.div>

            {/* TITLE */}
            <chakra.div
                maxW="calc(100% - 300px)"
                bottom={0}
                color={"white"}
                left={0}
                p={"0px 0px 60px 60px"}
                position="absolute"
                width="100%"
                zIndex={9}
            >
                <chakra.h1 textTransform={"uppercase"} fontSize={"3.25rem"} m={0}>{data?.title}</chakra.h1>
                <chakra.h4 textTransform={"uppercase"} fontSize={".875rem"} m={0}>
                    {data?.date}
                </chakra.h4>
            </chakra.div>

            {/* BUTTON */}
            <chakra.div
                bottom={0}
                padding={"0 40px 40px 0"}
                position={"absolute"}
                right={0}
                zIndex={3}
            >

                <Button
                    borderColor={"white"}
                    color={"white"}
                    variant='outline'
                    _active={{
                        bg: 'rgba(255, 255, 255, 0.3)'
                    }}
                    _hover={{
                        bg: 'rgba(255, 255, 255, 0.45)',
                        transform: 'scale(1.05)',
                    }}
                >
                    Ler noticía
                </Button>
            </chakra.div>
        </chakra.header>
    )
}

export default HeroHeader