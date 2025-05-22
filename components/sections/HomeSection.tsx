"use client"

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react"
import Link from "next/link"
import { ImagePlaceholder } from "@/components/image-placeholder"

export default function HomeSection() {
  return (
    <Box as="main" bg="#F9F9F9">
      <Container maxW="container.xl" py={20}>
        <VStack gap={16}>
          {/* Hero Section */}
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={12}
            align="center"
          >
            <VStack flex={1} align="stretch" gap={6}>
              <Heading as="h1" size="2xl" color="#019354">
                Welcome to College of Pharmacy Guidance & Counseling Unit
              </Heading>
              <Text fontSize="lg" color="gray.800">
                Promoting academic success, personal growth, and student wellness through professional counseling services for pharmacy students.
              </Text>
              <HStack gap={4}>
                <Button variant="solid" colorScheme="brand">
                  Book Now
                </Button>
                <Link href="/contact" passHref>
                  <Button variant="outline" colorScheme="brand">
                    Contact Us
                  </Button>
                </Link>
              </HStack>
            </VStack>
            <Box flex={1}>
              <ImagePlaceholder
                className="aspect-square rounded-lg shadow-xl"
                text="Hero Image"
              />
            </Box>
          </Flex>

          {/* About Section */}
          <Box bg="white" py={20} px={8} borderRadius="xl" boxShadow="sm">
            <VStack gap={8}>
              <Heading as="h2" size="xl" color="#019354">
                Student Wellness and Guidance and Counseling Department
              </Heading>
              <Text color="gray.800" textAlign="center" maxW="3xl">
                Our dedicated team of counselors is committed to supporting your academic journey and personal development through comprehensive guidance services.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
} 