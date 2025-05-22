'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Button,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/hero-section'
import BookingModal from '@/components/modals/BookingModal'

const MotionBox = motion(Box)

export default function GuidanceInterview() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedServiceType, setSelectedServiceType] = useState('')

  const openModal = (serviceType: string) => {
    setSelectedServiceType(serviceType)
    setModalOpen(true)
  }

  return (
    <Box as="main" minH="100vh">
      <HeroSection
        title="Guidance Interview"
        subtitle="One-on-one sessions to understand student needs and provide personalized guidance for your academic journey."
        backgroundImage="/assets/guidance-interview-bg.jpg"
        height={{ base: '500px', md: '600px' }}
      />

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
              Select Your Interview Type
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={{ base: 4, md: 6 }}
              w="full"
              px={{ base: 4, md: 0 }}
            >
              <Button onClick={() => openModal('1st Year Interview')}>1st Year Interview</Button>
              <Button onClick={() => openModal('2nd Year Interview')}>2nd Year Interview</Button>
              <Button onClick={() => openModal('3rd Year Interview')}>3rd Year Interview</Button>
              <Button onClick={() => openModal('4th Year Interview')}>4th Year Interview</Button>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        serviceType={selectedServiceType}
      />
    </Box>
  )
} 