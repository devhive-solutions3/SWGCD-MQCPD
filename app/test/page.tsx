'use client'

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'

export default function TestPage() {
  return (
    <Box p={6}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" placeholder="Enter your email" />
      </FormControl>
      <Button mt={4} colorScheme="green">Submit</Button>
    </Box>
  )
} 