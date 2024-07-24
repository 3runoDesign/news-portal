'use client'

import { Box, Button, Card, CardBody, Center, chakra, Flex, FormControl, FormLabel, Heading, HStack, Icon, Text, Textarea, ToastId, useToast, VStack } from "@chakra-ui/react";
import NavigationSticky from "../../../components/Navigation";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import AsyncImage from "../../../components/AsyncImage";
import { Comment, PostDetails } from "../../../types";
import Container from "../../../components/Container";
import { ChatIcon } from '@chakra-ui/icons'
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

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
  const router = useRouter()

  const [comments, setComments] = useState<Comment[]>([]);

  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<CommentFormInputs>();

  const { data: dataPostDetails, error: errorPostDetails, isLoading: isLoadingPost } = useQuery({
    queryKey: ['postDetails', postId],
    queryFn: () => fetchPostDetails(postId),
    enabled: !!postId
  });

  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    const newComment: Comment = {
      id: uuidv4(),
      content: data.content,
      authorId: dataPostDetails?.author.id || '',
      postId
    };

    setComments((prevComments) => [...prevComments, newComment]);
    reset();
  };

  const handleDeleteComment = async (commentId: string) => {
    setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
    toastIdRef.current = toast({
      status: "success",
      description: `Comentário ${commentId} apagado com sucesso.`,
    });
  };

  useEffect(() => {
    if (dataPostDetails?.comments) {
      setComments(dataPostDetails.comments);
    }
  }, [dataPostDetails]);

  return (
    <>
      <NavigationSticky />

      {errorPostDetails ? <>
        <Container>
        <Center minH={"80vh"} flexDirection="column" gap={"4"}>
          <Heading>Oops!</Heading>
          <p>erro ao carregar post!</p>
          <Button onClick={() => {
            router.refresh()
          }}>
            tentar novamente
          </Button>
        </Center>
      </Container>
      </> : <>
      <Container maxW={"xl"} pb={20}>
        {!errorPostDetails ?
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
              src={dataPostDetails?.cover}
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
              {dataPostDetails?.title}
            </Text>

            <Flex w={"100%"} alignContent={"center"} gap={2} justifyContent={"flex-end"}>
              <AsyncImage
                spinnerProps={{
                  size: "sm"
                }}
                src={dataPostDetails?.author.avatar}
                alt="image cover"
                w='45px'
                h="45px"
                borderRadius='32px'
              />
              <VStack gap={1} alignItems={"start"} alignContent={"center"}>
                <chakra.h4 m={0}>{dataPostDetails?.author.username}</chakra.h4>
              </VStack>
            </Flex>
          </Flex>

          <Box mt={8}>
            <Center>
              <chakra.p lineHeight="33px" dangerouslySetInnerHTML={{ __html: dataPostDetails?.description ?? "" }}></chakra.p>
            </Center>
          </Box>
        </Loading>
        :
        <p>erro ao carregar</p>
        }

      </Container>

      {!isLoadingPost && !errorPostDetails ? <Container maxW={"xl"} pb={20}>

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

            {comments.map((comment) => (
              <Card w="100%">
                <CardBody>
                  <HStack gap={4}>
                    <Icon as={ChatIcon} color='blue.500' />
                    <HStack w="100%" gap={4}>
                      <Box w="100%">
                        <Text>{comment.content}</Text>
                      </Box>

                      {dataPostDetails?.author.id === comment.authorId ? (
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
      </> }
    </>
  );
}

export default PostNews;