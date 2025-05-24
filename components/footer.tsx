"use client"

import {
  Box,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react"

export default function Footer() {
  return (
    <Box as="footer" bg="#e9f4ef" color="gray.700" py={8}>
      <Container maxW="container.xl">
        <Stack spacing={8} align="center">
          <Text fontSize="sm" textAlign="center">
            © 2025 College of Pharmacy Guidance Counseling. All rights reserved. 
          </Text>
          <Text fontSize="sm" textAlign="center">
            Powered by DevHive Solutions Co. 
          </Text>
        </Stack>
      </Container>
    </Box>
  )
}
