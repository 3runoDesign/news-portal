'use client'

import {
    Button,
    HStack,
    HTMLChakraProps,
    chakra
} from '@chakra-ui/react';
import { useRef } from 'react';
import Container from '../Container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavigationSticky(props: HTMLChakraProps<'header'>) {
    const ref = useRef<HTMLHeadingElement>()

    const pathname = usePathname();
    const isRegistrationPage = pathname === '/posts/create';
    const isLoginPage = pathname === '/login';

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
                        {!isLoginPage ?
                            <Link href={isRegistrationPage ? `/` : `/posts/create`}>
                                <Button colorScheme="green" variant='solid'>
                                    {isRegistrationPage ? "Voltar" : "Criar poster"}
                                </Button>
                            </Link> : null
                        }

                        {isLoginPage ? <Link href='/'>
                            <Button colorScheme="blue" variant='solid'>
                                Criar conta
                            </Button>
                        </Link> : null}

                        {!isLoginPage ?
                            <Link href='/logout'>
                                <Button variant='ghost'>
                                    Sair
                                </Button>
                            </Link> : null
                        }

                    </HStack>
                </HStack>
            </Container>
        </chakra.nav>
    )
}

export default NavigationSticky