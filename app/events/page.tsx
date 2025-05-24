'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  Spinner,
} from '@chakra-ui/react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/hero-section'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebaseconfig'

const MotionBox = motion.create(Box)

export default function Events() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const snap = await getDocs(query(collection(db, 'events'), orderBy('date', 'desc')))
      setEvents(snap.docs.map(doc => doc.data()))
      setLoading(false)
    }
    fetchEvents()
  }, [])

  return (
    <Box as="main" bg="#e9f4ef">
      <Box position="relative">
        <HeroSection
          title="Upcoming Events"
          subtitle="Explore enriching activities that support your academic and personal development."
          backgroundImage="/heropic.png"
          height="100vh"
          showViewServicesButton={false}
        />
      </Box>
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4}>
            <Heading as="h1" size="lg" color="#019354" fontWeight="bold" textAlign="center">
            Learn. Grow. Connect.
            </Heading>
            <Text fontSize="lg" color="black.600" maxW="2xl" textAlign="center">
            Your journey starts here.
            </Text>
          </VStack>

          {loading ? (
            <Spinner size="xl" color="green.500" />
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {events.map((event, index) => (
                <MotionBox
                  key={event.title + event.date}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  bg="white"
                  p={{ base: 6, sm: 8 }}
                  borderRadius="2xl"
                  border="2px solid"
                  borderColor="#047857"
                  boxShadow="md"
                  role="group"
                  _hover={{
                    background: 'linear-gradient(to right, #047857, #065f46)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    borderColor: 'transparent',
                  }}
                  w="full"
                  minH={{ base: "320px", sm: "360px" }}
                  maxW="300px"
                  mx="auto"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  h="full"
                >
                  {event.thumbnailURL && (
                    <img
                      src={event.thumbnailURL}
                      alt={event.title}
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px"
                      }}
                    />
                  )}
                  <VStack spacing={4} align="center" w="full">
                    <Box w="full" textAlign="center">
                      <Badge
                        bg="#019354"
                        color="white"
                        px={3}
                        py={1}
                        borderRadius="full"
                        mb={3}
                        display="inline-block"
                      >
                        {event.category}
                      </Badge>
                      <Heading
                        as="h3"
                        fontSize={{ base: "xl", sm: "2xl" }}
                        color="#047857"
                        fontWeight="extrabold"
                        lineHeight="short"
                        textAlign="center"
                        _groupHover={{ color: 'white' }}
                        transition="color 0.3s"
                      >
                        {event.title}
                      </Heading>
                    </Box>
                    <Text
                      color="#047857"
                      fontSize={{ base: "sm", sm: "md" }}
                      px={2}
                      textAlign="center"
                      _groupHover={{ color: 'white' }}
                      transition="color 0.3s"
                    >
                      {event.description}
                    </Text>
                  </VStack>

                  <VStack spacing={3} align="start" w="full" mt={4}>
                    <HStack color="gray.600" _groupHover={{ color: 'white' }} transition="color 0.3s" alignItems="center" w="full">
                      <Calendar size={16} />
                      <Text _groupHover={{ color: 'white' }} transition="color 0.3s" textAlign="left" fontSize={{ base: "sm", sm: "md" }}>{event.date}</Text>
                    </HStack>
                    <HStack color="gray.600" _groupHover={{ color: 'white' }} transition="color 0.3s" alignItems="center" w="full">
                      <Clock size={16} />
                      <Text _groupHover={{ color: 'white' }} transition="color 0.3s" textAlign="left" fontSize={{ base: "sm", sm: "md" }}>{event.time}</Text>
                    </HStack>
                    <HStack color="gray.600" _groupHover={{ color: 'white' }} transition="color 0.3s" alignItems="center" w="full">
                      <MapPin size={16} />
                      <Text _groupHover={{ color: 'white' }} transition="color 0.3s" textAlign="left" fontSize={{ base: "sm", sm: "md" }}>{event.location}</Text>
                    </HStack>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  )
} 