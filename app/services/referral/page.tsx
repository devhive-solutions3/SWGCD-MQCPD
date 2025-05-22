'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import HeroSection from '@/components/hero-section'

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)

export default function Referral() {
  return (
    <Box as="main" minH="100vh">
      <HeroSection
        title="Refer a Student"
        subtitle="To establish and strengthen helping relationships with parents/teachers in order to promote holistic welfare and achieve self-actualization. As the need arises, family counseling, home visits, and telephone counseling are given."
        backgroundImage="/assets/referral-bg.jpg"
        height={{ base: '500px', md: '600px' }}
      />

      {/* Main Content Section */}
      <Box bg="white" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={{ base: 8, md: 12 }}>
            {/* Decorative Icon */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Icon
                as={Users}
                w={16}
                h={16}
                color="#019354"
                opacity={0.8}
              />
            </MotionBox>

            {/* Glassmorphism CTA Card */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              w="full"
              maxW="2xl"
              mx="auto"
            >
              <Box
                bg="white"
                p={10}
                borderRadius="2xl"
                boxShadow="md"
                border="1px"
                borderColor="gray.200"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <VStack spacing={6}>
                  <Heading
                    as="h2"
                    size="lg"
                    color="black"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    Submit a Referral
                  </Heading>
                  <Text color="gray.700" textAlign="center">
                    Help a fellow student receive the support they need by submitting a referral. Our counselors will review the information and take appropriate action.
                  </Text>
                  <Button
                    as="a"
                    href="#"
                    colorScheme="brand"
                    size="lg"
                    borderRadius="full"
                    fontWeight="bold"
                    fontSize="lg"
                    w="full"
                    _hover={{ bg: '#017a45' }}
                  >
                    Submit Referral Form
                  </Button>
                </VStack>
              </Box>
            </MotionBox>

            {/* Additional Information */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Box
                  bg="white"
                  p={8}
                  borderRadius="xl"
                  boxShadow="sm"
                  border="1px"
                  borderColor="gray.200"
                >
                  <VStack align="start" spacing={4}>
                    <Heading as="h3" size="md" color="black" fontWeight="bold">
                      When to Refer
                    </Heading>
                    <Text color="gray.700">
                      Consider referring a student when you notice:
                    </Text>
                    <Text color="gray.700">
                      • Significant changes in academic performance<br />
                      • Behavioral or emotional concerns<br />
                      • Social isolation or relationship difficulties<br />
                      • Signs of stress, anxiety, or depression<br />
                      • Any other concerns affecting their well-being
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Box
                  bg="white"
                  p={8}
                  borderRadius="xl"
                  boxShadow="sm"
                  border="1px"
                  borderColor="gray.200"
                >
                  <VStack align="start" spacing={4}>
                    <Heading as="h3" size="md" color="black" fontWeight="bold">
                      What Happens Next
                    </Heading>
                    <Text color="gray.700">
                      After submitting a referral:
                    </Text>
                    <Text color="gray.700">
                      • Our counselors will review the information<br />
                      • The student will be contacted confidentially<br />
                      • Appropriate support services will be arranged<br />
                      • You may be contacted for additional information<br />
                      • Follow-up will be provided as needed
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
} 