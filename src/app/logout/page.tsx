"use client"

import {
  useToast,
  ToastId,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import Loading from "../../components/Loading";

const Logout = () => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      toastIdRef.current = toast({ status: "success", description: "usuario deslogado!" });
      router.push('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Loading isLoading={true} textLoad="espere, saindo...">
        <></>
      </Loading>
    </>
  );
};

export default Logout;
