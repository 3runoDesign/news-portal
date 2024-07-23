import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export const Container: React.FC<BoxProps> = props => (
  <Box w="full" maxW={'7xl'} mx="auto" {...props} />
);


export default Container