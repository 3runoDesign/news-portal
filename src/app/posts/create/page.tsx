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
import useRestrictPage from "../../../hooks/useRestrictPage";
import { useMutation } from "@tanstack/react-query";

interface PostFormInputs {
    title: string;
    content: string;
}

const createPost = async (data: PostFormInputs): Promise<PostFormInputs> => {
    const response = await fetch('/api/create-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
    }

    return response.json();
};

const CreatePost = () => {
    const toast = useToast();
    const toastIdRef = useRef<ToastId | undefined>(undefined);

    const router = useRouter();

    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<PostFormInputs>();

    const mutation = useMutation({
        mutationFn: async (data: PostFormInputs) => {
          const response = await fetch('/api/create-news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create post');
          }
    
          const result = await response.json();
          return result;
        },
        onSuccess: (data) => {
          toastIdRef.current = toast({
            status: 'success',
            description: 'Post criado com sucesso!',
          });
          reset();
        },
        onError: (error: Error) => {
          const errorMessage = 'Falha ao criar post';
          setError('title', { type: 'manual', message: errorMessage });
          setError('content', { type: 'manual', message: errorMessage });
          toastIdRef.current = toast({
            status: 'error',
            description: error.message,
          });
        },
      });
    
      const onSubmit: SubmitHandler<PostFormInputs> = (data) => {
        mutation.mutate(data);
      };

    useRestrictPage();

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
