'use client'

import {
    Button,
    HStack,
    HTMLChakraProps,
    chakra
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import Container from '../Container';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';

function NavigationSticky(props: HTMLChakraProps<'header'>) {
    const ref = useRef<HTMLHeadingElement>()

    const pathname = usePathname();
    const isRegistrationPage = pathname === '/register';
    const isLoginPage = pathname === '/login';
    const isHomePage = pathname === '/';

    const { isLogged, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            logout();

            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <chakra.nav
            ref={ref}
            w={"full"}
            pos={"sticky"}
            boxShadow='2xl'
            top={0}
            bg={"white"}
            zIndex={10}
            {...props}
        >
            <Container py={8}>
                <HStack>
                    <Link href="/">Home</Link>

                    <HStack w={"100%"} justifyContent={"flex-end"}>


                        {/* {!isRegistrationPage ? : null} */}
                        {!isLoginPage && !isRegistrationPage ?
                            <Link href={isRegistrationPage ? `/` : `/posts/create`}>
                                <Button colorScheme="green" variant='solid'>
                                    {isRegistrationPage ? "Voltar" : "Criar poster"}
                                </Button>
                            </Link> : null
                        }

                        {!isLogged && (isRegistrationPage || isHomePage) ?
                            <Link href='/login'>
                                <Button colorScheme="blue" variant='solid'>
                                    Login
                                </Button>
                            </Link> : null
                        }

                        {isLoginPage ? <Link href='/register'>
                            <Button colorScheme="blue" variant='solid'>
                                Criar conta
                            </Button>
                        </Link> : null}

                        {isLogged ?
                            <Button variant='ghost' onClick={handleLogout}>
                                Sair
                            </Button> : null
                        }

                    </HStack>
                </HStack>
            </Container>
        </chakra.nav>
    )
}

export default NavigationSticky