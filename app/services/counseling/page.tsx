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
  Flex,
  Image,
  HStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import HeroSection from '@/components/hero-section'
import { useState } from 'react'
import BookingModal from '@/components/modals/BookingModal'

const MotionBox = motion(Box)

const counselor = {
  name: 'Ma. Sheila Q. Ricalde, MAEd, RPm, RGC, CMHA, CMHFR',
  role: 'Head Counselor',
  email: 'mqricalde@dlsmhsi.edu.ph',
  telephone_phone: '046 4818000',
  local: '1448 (local)',
  image: '/guidance.png',
}

export default function Counseling() {
  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false)

  return (
    <Box as="main" minH="100vh">
      <HeroSection
        title="Schedule a Counseling Session with a Counselor"
        subtitle="Counseling session focuses on helping a student overcome pressing needs, difficulties and problems, and thereby make appropriate actions and adjustments."
        backgroundImage="/assets/counseling-bg.jpg"
        height={{ base: '500px', md: '600px' }}
      />

      {/* Counselor Card Section */}
      <Box py={{ base: 12, md: 20 }} bg="white">
        <Container maxW="container.xl">
          <VStack spacing={{ base: 8, md: 12 }}>
            <Heading
              as="h2"
              size={{ base: 'lg', md: 'xl' }}
              color="black"
              textAlign="center"
              fontWeight="bold"
            >
              Our Counselor
            </Heading>
            <Flex w="100%" justify="center" align="center" py={8}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                w="full"
                maxW="700px"
                mx="auto"
              >
                <Box
                  bg="white"
                  p={8}
                  borderRadius="2xl"
                  boxShadow="md"
                  border="2px solid"
                  borderColor="#047857"
                  role="group"
                  transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  display="flex"
                  flexDirection={{ base: 'column', md: 'row' }}
                  alignItems={{ base: 'center', md: 'stretch' }}
                  textAlign={{ base: 'center', md: 'left' }}
                  minH="300px"
                  gap={{ base: 6, md: 10 }}
                >
                  {/* Image Section */}
                  <Flex align="center" justify="center" flexShrink={0}>
                    <Image
                      src={counselor.image}
                      alt="Guidance Icon"
                      w={{ base: '32', md: '40' }}
                      h={{ base: '32', md: '40' }}
                      borderRadius="full"
                      objectFit="cover"
                      transition="all 0.3s ease-in-out"
                      mb={{ base: 4, md: 0 }}
                    />
                  </Flex>
                  {/* Info Section */}
                  <Flex direction="column" justify="center" flex="1">
                    <VStack spacing={2} align={{ base: 'center', md: 'start' }} w="full">
                      <Heading 
                        as="h3" 
                        size="md" 
                        color="#047857" 
                        fontWeight="bold"
                        transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        {counselor.name}
                      </Heading>
                      <Text 
                        color="gray.700" 
                        fontWeight="medium"
                        transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        {counselor.role}
                      </Text>
                    </VStack>
                    <VStack spacing={3} w="full" align={{ base: 'center', md: 'start' }} mt={4}>
                      <HStack 
                        color="gray.600"
                        transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                        justify={{ base: 'center', md: 'flex-start' }}
                        alignItems="center"
                      >
                        <Mail size={16} />
                        <Link 
                          href={`mailto:${counselor.email}`}
                          textDecoration="none"
                          _hover={{ textDecoration: 'underline' }}
                          color="inherit"
                        >
                          <Text
                            color="emerald.600"
                            transition="color 0.3s ease-in-out"
                          >
                            {counselor.email}
                          </Text>
                        </Link>
                      </HStack>
                      <HStack 
                        color="gray.600"
                        transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                        justify={{ base: 'center', md: 'flex-start' }}
                        alignItems="center"
                      >
                        <Phone size={16} />
                        <Text>{counselor.telephone_phone}</Text>
                      </HStack>
                      <HStack 
                        color="gray.600"
                        transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                        justify={{ base: 'center', md: 'flex-start' }}
                        alignItems="center"
                      >
                        <Phone size={16} />
                        <Text>{counselor.local}</Text>
                      </HStack>
                    </VStack>
                    <Button
                      w={{ base: 'full', md: 'fit-content' }}
                      colorScheme="green"
                      size="lg"
                      borderRadius="lg"
                      mt={8}
                      transition="all 0.2s"
                      onClick={() => setIsCounselingModalOpen(true)}
                    >
                      Schedule a Session
                    </Button>
                  </Flex>
                </Box>
              </MotionBox>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Note Section */}
      <Box bg="#019354" py={{ base: 8, md: 12 }}>
        <Container maxW="container.xl">
          <Text
            color="white"
            fontSize={{ base: 'md', md: 'lg' }}
            fontStyle="italic"
            textAlign="center"
            maxW="3xl"
            mx="auto"
            px={{ base: 4, md: 0 }}
          >
            Please take note that the CMLS Guidance Offices are open to walk-in clients. But in order for us to properly serve your needs, we encourage students to make an appointment beforehand.
          </Text>
        </Container>
      </Box>

      <BookingModal 
        isOpen={isCounselingModalOpen}
        onClose={() => setIsCounselingModalOpen(false)}
        serviceType="Counseling"
      />
    </Box>
  )
} 