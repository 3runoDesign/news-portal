'use client'

import React from "react";

import {
    Avatar,
    AvatarGroup,
    Box,
    Flex,
    Text,
    HStack,
} from "@chakra-ui/react";

import Link from "next/link";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import AsyncImage from "../AsyncImage";

type CommentsProps = {
    avatar: string;
    id: string;
}

export type PostProps = {
    id: string;
    title: string;
    description: string;
    cover: string;
    date: string;
    avatar: string;
    comments: CommentsProps[];
}

const PostCard: React.FC<PostProps> = ({
    id,
    title,
    description,
    avatar,
    comments
}) => {
    return (
        <Flex

            borderRadius='20px'
            bg="white"
            maxH='345px'
            w="full"
            direction='column'
            boxShadow='lg'
        >
            <Link href={`post/2`}>
                <HStack p='20px'>
                    <Box w='100%'>
                        <Text fontWeight='600' color="gray.800" w='100%' fontSize='2xl'>
                            {title}
                        </Text>
                        <AvatarGroup
                            size='sm'
                            max={4}
                            spacing={-2}
                            color="brand.200"
                        >
                            {comments.map((comment) => (
                                <Avatar size='sm' key={comment.id} src={comment.avatar} />
                            ))}
                        </AvatarGroup>
                    </Box>
                    <Box mb='10px'>
                        <AsyncImage
                            spinnerProps={{
                                size: "sm"
                            }}
                            boxSize="60px"
                            src={avatar}
                            me='auto'
                            alt="avatar-user"
                            borderRadius="6px"
                        />
                    </Box>
                </HStack>
                <Flex
                    bg="gray.50"
                    w='100%'
                    p='20px'
                    borderBottomLeftRadius='inherit'
                    borderBottomRightRadius='inherit'
                    height='100%'
                    direction='column'>
                    <Text
                        fontSize='sm'
                        color='gray.500'
                        lineHeight='24px'
                        pe='40px'
                        fontWeight='500'
                        mb='auto'>
                        {description}
                    </Text>
                </Flex>
            </Link>
        </Flex>
    );
}

export default PostCard;