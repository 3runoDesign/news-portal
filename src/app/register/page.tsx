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
  Link,
  HStack,
  Box,
  chakra
} from "@chakra-ui/react";
import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { useAuthStore } from "../../stores/authStore";
import NavigationSticky from "../../components/Navigation";
import { useMutation } from "@tanstack/react-query";

interface RegisterFormInputs {
  username: string;
  password: string;
}

const Register = () => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterFormInputs>();

  const router = useRouter();
  const { isLogged } = useAuthStore();

  function errorToast(msg: string) {
    toastIdRef.current = toast({ status: "error", description: msg })
  }

  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [router]);

  const setToken = useAuthStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormInputs) => {
      const response = await fetch('/api/register', {
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

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    mutation.mutate(data);
  };
  return (
    <>
    <NavigationSticky />
      <Center minH={"100vh"} flexDirection="column" gap={"4"}>
        <Heading>Página de Registro</Heading>

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
            <Button type="submit" colorScheme="blue" color="white">
              Registrar
            </Button>
          </Box>
        </chakra.form>
      </Center>
    </>
  );
};

export default Register;
