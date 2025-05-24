'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/hero-section'

const MotionBox = motion.create(Box)

const counselors = [
  {
    name: 'Ma. Sheila Q. Ricalde, MAEd, RPm, RGC, CMHA, CMHFR',
    role: 'Head Counselor',
    email: 'mqricalde@dlsmhsi.edu.ph',
    telephone_phone: '046 4818000',
    local: '1448 (local)'
  }
]

export default function Contact() {
  return (
    <Box as="main" minH="100vh" bg="#e9f4ef">
      <HeroSection
        title="Contact Us"
        subtitle="Get in touch with our counselors to schedule an appointment or learn more about our services."
        backgroundImage="/heropic.png"
        height="100vh"
        showViewServicesButton={false}
      />

      <Box bg="#e9f4ef" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <Flex w="100%" justify="center" align="center" py={8}>
              {counselors.map((counselor, index) => (
                <MotionBox
                  key={counselor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  w="full"
                  maxW="360px"
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
                    _hover={{
                      background: 'linear-gradient(to right, #047857, #065f46)',
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                      borderColor: 'transparent',
                    }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    minH="400px"
                  >
                    <VStack spacing={6} align="center" w="full">
                      <Box>
                        <Image
                          src="/guidance.png"
                          alt="Guidance Icon"
                          w="32"
                          h="32"
                          borderRadius="full"
                          objectFit="cover"
                          transition="all 0.3s ease-in-out"
                          _groupHover={{ border: '2px solid white' }}
                          mb={4}
                        />
                      </Box>
                      <VStack spacing={2}>
                        <Heading 
                          as="h3" 
                          size="md" 
                          color="#047857" 
                          fontWeight="bold"
                          transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                          _groupHover={{ color: 'white' }}
                        >
                          {counselor.name}
                        </Heading>
                        <Text 
                          color="gray.700" 
                          fontWeight="medium"
                          transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                          _groupHover={{ color: 'white' }}
                        >
                          {counselor.role}
                        </Text>
                      </VStack>
                      <VStack spacing={3} w="full" align="center">
                        <HStack 
                          color="gray.600"
                          transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                          _groupHover={{ color: 'white' }}
                          justify="center"
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
                              _groupHover={{ color: 'white' }}
                            >
                              {counselor.email}
                            </Text>
                          </Link>
                        </HStack>
                        <HStack 
                          color="gray.600"
                          transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                          _groupHover={{ color: 'white' }}
                          justify="center"
                        >
                          <Phone size={16} />
                          <Text>{counselor.telephone_phone}</Text>
                        </HStack>
                        <HStack 
                          color="gray.600"
                          transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                          _groupHover={{ color: 'white' }}
                          justify="center"
                        >
                          <Phone size={16} />
                          <Text>{counselor.local}</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </Flex>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              w="full"
              maxW="container.lg"
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
              >
                <VStack spacing={6} align="center">
                  <Heading 
                    as="h2" 
                    size="lg" 
                    color="#047857" 
                    fontWeight="bold"
                    transition="color 0.3s ease-in-out"
                    textAlign="center"
                  >
                    Visit Us
                  </Heading>
                  <HStack 
                    color="gray.700"
                    transition="color 0.3s ease-in-out"
                    justify="center"
                    textAlign="center"
                  >
                    <MapPin size={16} />
                    <Text>College of Pharmacy Building, De La Salle Medical and Health Sciences Institute</Text>
                  </HStack>
                  <Box 
                    w="full" 
                    h="300px" 
                    bg="gray.100" 
                    borderRadius="xl" 
                    overflow="hidden"
                    transition="all 0.3s ease-in-out"
                  >
                    <iframe
                      src="https://www.google.com/maps?q=De+La+Salle+Medical+and+Health+Sciences+Institute&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="DLSMHSI Location Map"
                    />
                  </Box>
                </VStack>
              </Box>
            </MotionBox>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
} 