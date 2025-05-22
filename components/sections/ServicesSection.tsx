"use client"

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"

const services = [
  {
    title: "Academic Counseling",
    description: "Support for course selection, study strategies, and academic planning to help students excel in their pharmacy education.",
    icon: "📚",
  },
  {
    title: "Personal Counseling",
    description: "Individual sessions to address personal challenges, stress management, and emotional well-being.",
    icon: "🤝",
  },
  {
    title: "Career Guidance",
    description: "Career exploration, internship opportunities, and professional development guidance for pharmacy students.",
    icon: "🎯",
  },
  {
    title: "Group Workshops",
    description: "Interactive sessions on time management, stress reduction, and building healthy relationships.",
    icon: "👥",
  },
  {
    title: "Crisis Intervention",
    description: "Immediate support and resources for students facing urgent personal or academic challenges.",
    icon: "🆘",
  },
  {
    title: "Wellness Programs",
    description: "Promoting physical and mental health through various wellness initiatives and activities.",
    icon: "💪",
  },
]

export default function ServicesSection() {
  return (
    <Box as="main" bg="#F9F9F9">
      <Container maxW="container.xl" py={20}>
        <VStack gap={16}>
          <VStack gap={4}>
            <Heading as="h1" size="2xl" color="#019354" textAlign="center">
              Our Services
            </Heading>
            <Text fontSize="lg" color="gray.800" maxW="2xl" textAlign="center">
              We offer a comprehensive range of counseling services to support your academic journey and personal growth.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {services.map((service, index) => (
              <Box
                key={index}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="base"
                _hover={{ boxShadow: "lg" }}
                transition="all 0.2s"
                border="1px"
                borderColor="#019354"
              >
                <Text fontSize="4xl" mb={4}>
                  {service.icon}
                </Text>
                <Heading as="h3" size="md" color="#019354" mb={2}>
                  {service.title}
                </Heading>
                <Text color="gray.800" mb={4}>
                  {service.description}
                </Text>
                <Link href="/contact" passHref>
                  <Button
                    w="full"
                    variant="solid"
                    colorScheme="brand"
                  >
                    Learn More
                  </Button>
                </Link>
              </Box>
            ))}
          </SimpleGrid>

          <VStack gap={6}>
            <Heading as="h2" size="xl" color="#019354">
              Ready to Get Started?
            </Heading>
            <Text color="gray.800">
              Schedule a consultation with our counselors to discuss your needs and goals.
            </Text>
            <Link href="/contact" passHref>
              <Button
                variant="solid"
                colorScheme="brand"
                size="lg"
              >
                Book an Appointment
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
} 