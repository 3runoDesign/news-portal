'use client';

import {
    Center,
    Heading,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast,
    ToastId,
    HStack,
    Link,
    Box,
    chakra
} from "@chakra-ui/react";
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form';
import NavigationSticky from "../../../components/Navigation";

interface PostFormInputs {
    title: string;
    content: string;
}

const CreatePost = () => {
    const toast = useToast();
    const toastIdRef = useRef<ToastId | undefined>(undefined);

    const router = useRouter();

    const { register, handleSubmit, setError, formState: { errors } } = useForm<PostFormInputs>();

    const onSubmit: SubmitHandler<PostFormInputs> = async (data) => {

    };

    return (
        <>
            <NavigationSticky />
            <Center minH={"100vh"} flexDirection="column" gap={"4"}>
                <Heading>Post</Heading>

                <chakra.form w="100%" maxW="380px" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <FormControl mb={4} isInvalid={!!errors.title}>
                        <FormLabel htmlFor="title">Título</FormLabel>
                        <Input
                            id="title"
                            placeholder="Title"
                            {...register('title', { required: 'Título é obrigatório' })}
                        />
                        {errors.title && <span>{errors.title.message}</span>}
                    </FormControl>
                    <FormControl mb={4} isInvalid={!!errors.content}>
                        <FormLabel htmlFor="content">Conteúdo</FormLabel>
                        <Textarea
                            id="content"
                            {...register('content', { required: 'Conteúdo é obrigatório' })}
                        />
                        {errors.content && <span>{errors.content.message}</span>}
                    </FormControl>
                    <Box>
                        <Button type="submit" colorScheme="blue" color="white">
                            Criar post
                        </Button>
                    </Box>
                </chakra.form>
            </Center>
        </>
    );
};

export default CreatePost;
