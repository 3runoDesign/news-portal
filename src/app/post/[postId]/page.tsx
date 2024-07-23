'use client'

import { Box, Button, Card, CardBody, Center, chakra, Flex, FormControl, FormLabel, HStack, Icon, Text, Textarea, ToastId, useToast, VStack } from "@chakra-ui/react";
import NavigationSticky from "../../../components/Navigation";
import { useParams, useRouter } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import AsyncImage from "../../../components/AsyncImage";
import { PostDetails } from "../../../types";
import Container from "../../../components/Container";
import { ChatIcon } from '@chakra-ui/icons'
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef } from "react";

interface CommentFormInputs {
  content: string;
}

const fetchPostDetails = async (postId: string): Promise<PostDetails> => {
  const response = await fetch(`/api/posts/${postId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostNews: React.FC = ({
}) => {
  const params = useParams();
  const postId = params?.postId as string;

  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<CommentFormInputs>();

  const { data, error, isLoading: isLoadingPost } = useQuery({
    queryKey: ['postDetails', postId],
    queryFn: () => fetchPostDetails(postId),
    enabled: !!postId,
  });

  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    reset();
  };

  const handleDeleteComment = async (commentId: string) => {
    toastIdRef.current = toast({ status: "success", description:`comentário ${commentId} apagado com sucesso.`});
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
                src={data?.author.avatar}
                alt="image cover"
                w='45px'
                h="45px"
                borderRadius='32px'
              />
              <VStack gap={1} alignItems={"start"} alignContent={"center"}>
                <chakra.h4 m={0}>{data?.author.username}</chakra.h4>
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
          <chakra.form w="100%" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <FormControl mb={4} isInvalid={!!errors.content}>
              <FormLabel htmlFor="content">Comentário</FormLabel>
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

            {data?.comments.map((comment) => (
              <Card w="100%">
                <CardBody>
                  <HStack gap={4}>
                    <Icon as={ChatIcon} color='blue.500' />
                    <HStack w="100%" gap={4}>
                      <Box w="100%">
                        <Text>{comment.content}</Text>
                      </Box>

                      {data.author.id === comment.authorId ? (
                        <Button px={8} colorScheme='red' size='xs' onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
                      ) : null}
                    </HStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}

          </VStack>
        </Flex>

      </Container> : null}
    </>
  );
}

export default PostNews;