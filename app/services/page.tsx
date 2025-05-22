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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Flex,
  keyframes,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Heart, Users, ClipboardList, ArrowRight } from 'lucide-react'
import { CalendarIcon } from '@chakra-ui/icons'
import HeroSection from '@/components/hero-section'
import Link from 'next/link'

const MotionModalContent = motion(ModalContent)

const bounceKeyframes = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`

const bounceAnimation = `${bounceKeyframes} 1.5s infinite`

const MotionBox = motion(Box)

const serviceCategories = [
  {
    title: 'Guidance & Counseling Services',
    description: 'Professional support services to help students navigate their academic and personal journey.',
    image: '/assets/counseling-bg.jpg',
    services: [
      {
        title: 'Guidance Interview',
        description: 'One-on-one sessions to understand student needs and provide personalized guidance.',
      },
      {
        title: 'Counseling',
        description: 'Professional counseling services for academic, personal, and career development.',
      },
      {
        title: 'Referral',
        description: 'Connect students with appropriate resources and specialists when needed.',
      },
    ],
  },
  {
    title: 'Assessment & Testing Services',
    description: 'Comprehensive evaluations and assessments to support student development and growth.',
    image: '/assets/psychological-testing-bg.jpg',
    services: [
      {
        title: 'Psychological Testing',
        description: 'Comprehensive psychological assessments to support student development.',
      },
    ],
  },
]

const allServices = [
  {
    title: 'Guidance Interview',
    description: 'Personalized one-on-one student guidance.',
    icon: Users,
    color: 'blue.50',
    path: '/services/guidance-interview',
  },
  {
    title: 'Counseling',
    description: 'Academic, personal, and career counseling.',
    icon: Heart,
    color: 'pink.50',
    path: '/services/counseling',
  },
  {
    title: 'Psychological Testing',
    description: 'Student psychological assessments.',
    icon: Brain,
    color: 'purple.50',
    path: '/services/psychological-testing',
  },
  {
    title: 'Referral Services',
    description: 'Connect with resources and specialists.',
    icon: ClipboardList,
    color: 'green.50',
    path: '/services/referral',
  },
]

const counselors = [
  {
    name: 'Ma. Sheila Q. Ricalde, MAEd, RPm, RGC, CMHA, CMHFR',
    role: 'Head Counselor',
    email: 'mqricalde@dlsmhsi.edu.ph',
  }
]

export default function Services() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const scrollToServices = () => {
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box as="main" minH="100vh">
      <Box position="relative">
        <HeroSection
          title="Our Services"
          subtitle="Comprehensive guidance and counseling services to support your academic and personal growth"
          backgroundImage="/assets/services-bg.jpg"
          height="100vh"
          showViewServicesButton={false}
        />
        <Box
          position="absolute"
          bottom="6"
          left="50%"
          transform="translateX(-50%)"
          textAlign="center"
          color="white"
          fontSize="lg"
          fontWeight="medium"
          cursor="pointer"
          animation={bounceAnimation}
          onClick={scrollToServices}
          transition="opacity 0.3s ease"
          _hover={{
            opacity: 0.8,
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          zIndex={10}
          textShadow="0 2px 4px rgba(0,0,0,0.3)"
        >
          <Text color="white" fontWeight="semibold">See more</Text>
          <Text color="white" fontWeight="semibold">↓</Text>
        </Box>
      </Box>

      {/* Service Categories Showcase */}
      <Box bg="white" py={20} id="services-section">
        <Container maxW="container.xl">
          <VStack spacing={20}>
            {serviceCategories.map((category, index) => (
              <Flex
                key={category.title}
                direction={{ base: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
                gap={12}
                align="center"
              >
                {/* Image Section */}
                <Box flex={1}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    borderRadius="2xl"
                    objectFit="cover"
                    w="full"
                    h={{ base: '300px', md: '400px' }}
                    fallbackSrc="https://via.placeholder.com/400x300?text=Placeholder"
                  />
                </Box>

                {/* Content Section */}
                <VStack flex={1} align="start" spacing={8}>
                  <VStack align="start" spacing={4}>
                    <Heading
                      as="h2"
                      size="xl"
                      color="emerald.900"
                      fontWeight="bold"
                    >
                      {category.title}
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                      {category.description}
                    </Text>
                  </VStack>

                  <Accordion allowMultiple w="full">
                    {category.services.map((service) => (
                      <AccordionItem
                        key={service.title}
                        border="none"
                        mb={4}
                      >
                        <AccordionButton
                          bg="gray.50"
                          borderRadius="lg"
                          _hover={{ bg: 'gray.100' }}
                          p={4}
                        >
                          <Box flex="1" textAlign="left">
                            <Heading size="md" color="emerald.900">
                              {service.title}
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <Text color="gray.600">
                            {service.description}
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </VStack>
              </Flex>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* All Services Grid */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading
              as="h2"
              size="xl"
              color="emerald.900"
              textAlign="center"
              fontWeight="bold"
            >
              All Services
            </Heading>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={8}
              w="full"
            >
              {allServices.map((service, index) => (
                <Flex
                  key={service.title}
                  direction="column"
                  justify="space-between"
                  border="2px solid"
                  borderColor="#047857"
                  borderRadius="xl"
                  p={10}
                  minH="400px"
                  maxW="360px"
                  mx="auto"
                  boxShadow="md"
                  role="group"
                  cursor="pointer"
                  transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    background: 'linear-gradient(to right, #047857, #065f46)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    borderColor: 'transparent',
                  }}
                >
                  <VStack spacing={6} align="center" flex="1" w="full" minH="220px" justify="center">
                    <Box color="#047857" transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" _groupHover={{ color: 'white' }} p={4}>
                      <service.icon size={56} />
                    </Box>
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="#047857" _groupHover={{ color: 'white' }}>
                      {service.title}
                    </Text>
                    <Text fontSize="md" color="#047857" textAlign="center" maxW="280px" _groupHover={{ color: 'white' }} mt={['Counseling', 'Referral Services'].includes(service.title) ? 6 : 0}>
                      {service.description}
                    </Text>
                  </VStack>
                  <Box pt={6} w="full" textAlign="center">
                    <HStack
                      as={Link}
                      href={service.path}
                      justify="center"
                      color="green.700"
                      fontWeight="semibold"
                      fontSize="md"
                      spacing={1}
                      _hover={{ textDecoration: 'underline' }}
                      role="group"
                      transition="color 0.2s"
                    >
                      <Text
                        transition="color 0.2s"
                        _groupHover={{ color: 'white' }}
                      >
                        Book now
                      </Text>
                      <Box
                        as={ArrowRight}
                        boxSize={5}
                        transition="transform 0.2s, color 0.2s"
                        _groupHover={{ color: 'white', transform: 'translateX(4px)' }}
                      />
                    </HStack>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Floating Booking Button */}
      <Tooltip label="Book an Appointment" placement="left">
        <IconButton
          icon={<CalendarIcon />}
          bg="#019354"
          color="white"
          size="lg"
          aria-label="Book Appointment"
          position="fixed"
          bottom={6}
          right={6}
          zIndex={20}
          borderRadius="full"
          onClick={onOpen}
          transition="all 0.2s ease-in-out"
          _hover={{ 
            bg: 'green.600',
            transform: 'scale(1.1)',
            boxShadow: 'lg'
          }}
        />
      </Tooltip>

      {/* Booking Modal */}
      <AnimatePresence>
        <Modal 
          isOpen={isOpen} 
          onClose={onClose} 
          size="md"
          motionPreset="slideInBottom"
          isCentered
        >
          <ModalOverlay 
            backdropFilter="blur(4px)"
            bg="blackAlpha.300"
          />
          <MotionModalContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            borderRadius="xl"
            shadow="2xl"
            bg="white"
            p={6}
          >
            <ModalHeader 
              color="#019354" 
              fontSize="2xl" 
              fontWeight="semibold"
              pb={4}
            >
              Book an Appointment
            </ModalHeader>
            <ModalCloseButton 
              color="gray.500"
              _hover={{ color: "#019354" }}
            />
            <ModalBody pb={6}>
              <form>
                <FormControl isRequired mb={4}>
                  <FormLabel fontSize="lg" color="gray.700" fontWeight="medium">
                    Full Name
                  </FormLabel>
                  <Input
                    variant="filled"
                    placeholder="Enter your full name"
                    focusBorderColor="#019354"
                    rounded="md"
                    _hover={{ bg: 'gray.100' }}
                    _focus={{ bg: 'white' }}
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel fontSize="lg" color="gray.700" fontWeight="medium">
                    Email
                  </FormLabel>
                  <Input
                    variant="filled"
                    type="email"
                    placeholder="Enter your email"
                    focusBorderColor="#019354"
                    rounded="md"
                    _hover={{ bg: 'gray.100' }}
                    _focus={{ bg: 'white' }}
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel fontSize="lg" color="gray.700" fontWeight="medium">
                    Service
                  </FormLabel>
                  <Select
                    variant="filled"
                    placeholder="Select a service"
                    focusBorderColor="#019354"
                    rounded="md"
                    _hover={{ bg: 'gray.100' }}
                    _focus={{ bg: 'white' }}
                  >
                    {allServices.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontSize="lg" color="gray.700" fontWeight="medium">
                    Message
                  </FormLabel>
                  <Textarea
                    variant="filled"
                    placeholder="Enter your message (optional)"
                    focusBorderColor="#019354"
                    rounded="md"
                    resize="none"
                    minHeight="120px"
                    _hover={{ bg: 'gray.100' }}
                    _focus={{ bg: 'white' }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="green"
                  width="full"
                  size="lg"
                  mt={4}
                  borderRadius="lg"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Submit Request
                </Button>
              </form>
            </ModalBody>
          </MotionModalContent>
        </Modal>
      </AnimatePresence>
    </Box>
  )
} 