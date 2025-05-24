'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  Link,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'
import HeroSection from '@/components/hero-section'

const MotionBox = motion.create(Box)

export default function PsychologicalTesting() {
  return (
    <Box as="main" minH="100vh">
      <HeroSection
        title="Psychological Testing"
        subtitle="Psychological Testing Administration, scoring and individual student narrative test interpretation is under the service of a credible testing agency."
        backgroundImage="/assets/psychological-testing-bg.jpg"
        height={{ base: '500px', md: '600px' }}
      />

      <Box bg="#e9f4ef" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <VStack spacing={6} align="stretch" bg="white" p={10} borderRadius="2xl" boxShadow="md">
                  <Heading as="h2" size="lg" color="black" fontWeight="bold">
                    About Psychological Testing
                  </Heading>
                  <Text color="gray.700">
                    Our psychological testing services are designed to help students understand their learning styles, career aptitudes, and personal strengths. These assessments provide valuable insights for academic planning and personal development.
                  </Text>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Learning Style Assessment
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Career Aptitude Testing
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Personality Assessment
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Emotional Intelligence Evaluation
                    </ListItem>
                  </List>
                </VStack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <VStack spacing={6} align="stretch" bg="white" p={10} borderRadius="2xl" boxShadow="md">
                  <Button
                    as={NextLink}
                    href="#"
                    colorScheme="brand"
                    size="lg"
                    borderRadius="full"
                    fontWeight="bold"
                    fontSize="lg"
                    _hover={{ bg: '#017a45' }}
                  >
                    Take your Psychological Test Here (MLS 3)
                  </Button>

                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="brand.100" />
                      No username/password required
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="brand.100" />
                      Fill out full name completely
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="brand.100" />
                      Restart if browser closes or connection fails
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="brand.100" />
                      Contact: <Link color="brand.100" href="mailto:example@email.com">Email</Link> or{' '}
                      <Link color="brand.100" href="#">FB Messenger</Link>
                    </ListItem>
                  </List>
                </VStack>
              </MotionBox>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
} 