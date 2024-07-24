"use client"

import {
  Center,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  useToast,
  ToastId,
  HStack,
  Link,
  Box,
  chakra
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import NavigationSticky from "../../components/Navigation";
import { useAuthStore } from "../../stores/authStore";
import { useMutation } from "@tanstack/react-query";

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Login failed');

      const result = await response.json();
      return result.token;
    },
    onSuccess: (token: string) => {
      toastIdRef.current = toast({ status: "success", description: "seja bem-vindo!" });
      setToken(token);
      router.push('/');
    },
    onError: (error: Error) => {
      toastIdRef.current = toast({ status: "error", description: error.message });
    }
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data);
  };

  return (
    <>
      <NavigationSticky />
      <Center minH={"80vh"} flexDirection="column" gap={"4"}>
        <Heading>Login page</Heading>

        <chakra.form w="100%" maxW="380px" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <FormControl mb={4} isInvalid={!!errors.username}>
            <FormLabel htmlFor="username">Usuário</FormLabel>
            <Input
              id="username"
              {...register('username', { required: 'Usuário é obrigatório' })}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </FormControl>
          <FormControl mb={4} isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type="password"
                {...register('password', { required: 'Senha é obrigatória' })}
              />
            </InputGroup>
            {errors.password && <span>{errors.password.message}</span>}
          </FormControl>
          <Box>
            <Button type="submit" colorScheme="green" color="white">
              Entrar
            </Button>

            {mutation.isError && <p>{mutation.error.message}</p>}
          </Box>
        </chakra.form>
      </Center>
    </>
  );
};

export default Login;
