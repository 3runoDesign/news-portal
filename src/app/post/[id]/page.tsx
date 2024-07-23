'use client'

import { Box, Button, Card, CardBody, Center, chakra, Flex, FormControl, FormLabel, HStack, Icon, Text, Textarea, ToastId, useToast, VStack } from "@chakra-ui/react";
import Container from "../../../components/Container";
import AsyncImage from "../../../components/AsyncImage";
import { PostProps } from "../../../components/Post";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import NavigationSticky from "../../../components/Navigation";
import Loading from "../../../components/Loading";
import { ChatIcon } from '@chakra-ui/icons'

const _data: PostProps = {
  id: faker.string.uuid(),
  title: faker.lorem.word(),
  cover: faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
  description: faker.lorem.paragraphs(5, '<br style="magin-bottom: 12px"/>\n'),
  date: faker.date.anytime().toDateString(),
  avatar: faker.image.avatarGitHub(),
  comments: [
    {
      avatar: faker.image.avatarGitHub(),
      id: faker.string.uuid()
    },
    {
      avatar: faker.image.avatarGitHub(),
      id: faker.string.uuid()
    },
    {
      avatar: faker.image.avatarGitHub(),
      id: faker.string.uuid()
    },
    {
      avatar: faker.image.avatarGitHub(),
      id: faker.string.uuid()
    },
    {
      avatar: faker.image.avatarGitHub(),
      id: faker.string.uuid()
    },
    {
      avatar: faker.image.avatarGitHub(),
      id: faker.string.uuid()
    },
    {
      avatar: faker.image.avatarGitHub(),
      id: faker.string.uuid()
    },
    {
      avatar: faker.image.avatarGitHub(),
      id: faker.string.uuid()
    }
  ]
}

interface CommentFormInputs {
  content: string;
}

const getData = async () => {
  return new Promise<PostProps>((resolve) => {
    setTimeout(() => { resolve(_data) }, 2000);
  })
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  description,
  avatar,
  comments: postComments
}) => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);
  const [comments, setComments] = useState<[]>([]);

  const { data, error: errorPosts, isLoading: isLoadingPost } = useQuery({
    queryKey: ['getPost'],
    queryFn: async () => {
      const data = await getData()
      return data
    },
  })

  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<CommentFormInputs>();

  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    reset();
  };

  const handleDeleteComment = async (commentId: string) => {

  };

  return (
    <>
      <NavigationSticky />
      <Container maxW={"xl"} pb={20}>
        <Loading isLoading={isLoadingPost} textLoad="carregando post...">
          <Flex
            borderRadius='20px'
            p='20px'
            height='430px'
            my="62px"
            w={'full'}
            alignItems='center'
            direction='column'>

            <AsyncImage
              src={data?.cover}
              alt="image cover"
              w='100%'
              h="100%"
              borderRadius='8px'
              pointerEvents={"none"}
              objectFit={"cover"}
              objectPosition='top center'

            />
          </Flex>

          <Flex>
            <Text
              fontWeight='600'
              textAlign='start'
              fontSize='xl'
              w='100%'>
              {data?.title}
            </Text>

            <Flex w={"100%"} alignContent={"center"} gap={2} justifyContent={"flex-end"}>
              <AsyncImage
                spinnerProps={{
                  size: "sm"
                }}
                src={data?.avatar}
                alt="image cover"
                w='45px'
                h="45px"
                borderRadius='32px'
              />
              <VStack gap={1} alignItems={"start"} alignContent={"center"}>
                <chakra.h4 m={0}>Bruno fernando</chakra.h4>
                <chakra.h4 m={0}>20020</chakra.h4>
              </VStack>
            </Flex>
          </Flex>

          <Box mt={8}>
            <Center>
              <chakra.p lineHeight="33px" dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}></chakra.p>
            </Center>
          </Box>
        </Loading>

      </Container>

      {!isLoadingPost ? <Container maxW={"xl"} pb={20}>

        <Flex flexDirection="column" gap={"4"}>
          {/* <Heading>Post</Heading> */}

          <chakra.form w="100%" maxW="380px" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <FormControl mb={4} isInvalid={!!errors.content}>
              <FormLabel htmlFor="content">Conteúdo</FormLabel>
              <Textarea
                id="content"
                placeholder="Adicione um comentário"
                {...register('content', { required: 'Conteúdo é obrigatório' })}
              />
              {errors.content && <span>{errors.content.message}</span>}
            </FormControl>
            <Box>
              <Button type="submit" colorScheme={"blue"} color={"white"}>
                Criar comentário
              </Button>
            </Box>
          </chakra.form>

          <chakra.h1
            maxW='100%'
            mx='auto'
            fontSize="14px"
            fontFamily='heading'
            letterSpacing='tighter'
            fontWeight='extrabold'
            my='16px'
            textAlign="center"
            lineHeight='1'
          >
            Comentários
          </chakra.h1>

          <VStack gap={4}>

          <Card w="100%">
            <CardBody>
              <HStack gap={4}>
                <Icon as={ChatIcon} color='blue.500' />
                <HStack w="100%" gap={4}>
                  <Box w="100%">
                  <Text>os fhkjsad fjksad fhkjsa dhfjkas dhfsahf sajhsdf jkhasklf ahskjf hajksdhfjkas fjka sdjhkjahsdfskadhfkajshdflkajsdhfaksdjfpa</Text>
                  </Box>

                  <Button px={8} colorScheme='red' size='xs' onClick={() => handleDeleteComment("1")}>Delete</Button>
                </HStack>
              </HStack>
            </CardBody>
          </Card>

          </VStack>
        </Flex>

      </Container> : null}

    </>
  );
}

export default Post;