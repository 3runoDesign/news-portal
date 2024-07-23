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
import { SubmitHandler, useForm } from "react-hook-form";
import NavigationSticky from "../../components/Navigation";

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {

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
          </Box>
        </chakra.form>
      </Center>
    </>
  );
};

export default Login;
