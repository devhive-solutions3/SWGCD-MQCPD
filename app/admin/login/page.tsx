"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, Alert, AlertIcon } from "@chakra-ui/react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebaseconfig"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/admin/counselor")
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Box bg="white" p={8} borderRadius="xl" boxShadow="lg" minW={{ base: "90vw", sm: "400px" }}>
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <img src="/main_logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
          <Heading size="lg" color="green.700">Counselor Login</Heading>
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Text fontSize="sm">{error}</Text>
            </Alert>
          )}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="green"
            w="full"
            isLoading={loading}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </div>
  )
}

export const dynamic = 'force-static' 