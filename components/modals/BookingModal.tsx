import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  SimpleGrid,
  Box,
  Text,
  VStack,
  Center,
  Icon,
  Flex,
  useToast,
  Tooltip,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { saveBookingToFirestore } from '../../lib/firebaseHelpers'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebaseconfig'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  serviceType: string
}

const MotionModalContent = motion(ModalContent)

const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM'
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}
function getMonthName(month: number) {
  return new Date(2000, month, 1).toLocaleString('default', { month: 'long' })
}

export default function BookingModal({ isOpen, onClose, serviceType }: BookingModalProps) {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    message: '',
    date: '',
    time: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingMap, setBookingMap] = useState<{ [key: string]: string[] }>({})
  const [isLoadingBookings, setIsLoadingBookings] = useState(false)

  useEffect(() => {
    if (isOpen && step === 2) {
      fetchBookings()
    }
  }, [isOpen, step])

  const fetchBookings = async () => {
    try {
      setIsLoadingBookings(true)
      const bookingsSnapshot = await getDocs(collection(db, "bookings"))
      const bookings = bookingsSnapshot.docs.map(doc => doc.data())
      
      const newBookingMap: { [key: string]: string[] } = {}
      bookings.forEach(({ date, time }) => {
        if (!newBookingMap[date]) newBookingMap[date] = []
        newBookingMap[date].push(time)
      })
      
      setBookingMap(newBookingMap)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch booking data. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoadingBookings(false)
    }
  }

  const isDateFullyBooked = (dateString: string) => {
    const bookedTimes = bookingMap[dateString] || []
    return bookedTimes.length >= timeSlots.length
  }

  const isTimeBooked = (dateString: string, timeSlot: string) => {
    return bookingMap[dateString]?.includes(timeSlot) || false
  }

  const isPastTime = (timeSlot: string) => {
    if (!selectedDate) return false
    
    const now = new Date()
    const selected = new Date(selectedDate)
    const isToday = now.toDateString() === selected.toDateString()
    
    if (!isToday) return false
    
    const [hour, minutePart] = timeSlot.split(' ')
    let [h, m] = hour.split(':').map(Number)
    if (minutePart === 'PM' && h !== 12) h += 12
    if (minutePart === 'AM' && h === 12) h = 0
    
    const slotTime = new Date(selected)
    slotTime.setHours(h, 0, 0, 0)
    return slotTime <= now
  }

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = 'Full Name is required.'
    if (!formData.email.trim()) newErrors.email = 'School Email is required.'
    if (!formData.course.trim()) newErrors.course = 'Course/Program is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleBackStep = () => {
    setStep(1)
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const bookingData = {
        fullname: formData.name,
        email: formData.email,
        program: formData.course,
        serviceType,
        type: serviceType === 'Counseling' ? 'Counseling' : 'Guidance',
        message: formData.message,
        date: formData.date,
        time: formData.time
      }
      const result: any = await saveBookingToFirestore(bookingData)
      if (result.success) {
        toast({
          title: 'Booking Successful',
          description: 'Your interview has been booked successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setStep(3)
      } else {
        toast({
          title: 'Booking Failed',
          description: result.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setStep(1)
    setErrors({})
    setFormData({
      name: '',
      email: '',
      course: '',
      message: '',
      date: '',
      time: '',
    })
    setSelectedDate(null)
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Calendar rendering logic
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
  const today = new Date()

  const renderCalendar = () => {
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Box key={`empty-${i}`} />)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentYear, currentMonth, day)
      const dateString = dateObj.toISOString().split('T')[0]
      const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const isFullyBooked = isDateFullyBooked(dateString)
      
      days.push(
        <Tooltip
          key={day}
          label={isFullyBooked ? "This date is fully booked" : ""}
          isDisabled={!isFullyBooked}
        >
          <Button
            variant={selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth && selectedDate?.getFullYear() === currentYear ? 'solid' : 'outline'}
            colorScheme={selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth && selectedDate?.getFullYear() === currentYear ? 'green' : 'gray'}
            onClick={() => {
              if (!isFullyBooked) {
                setSelectedDate(dateObj)
                setFormData({ ...formData, date: dateString })
              }
            }}
            isDisabled={isPast || isFullyBooked}
            h="40px"
            borderRadius="full"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'md',
            }}
            transition="all 0.2s"
          >
            {day}
          </Button>
        </Tooltip>
      )
    }
    return days
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      size={{ base: "full", md: "xl" }} 
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.300" />
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <MotionModalContent
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            borderRadius={{ base: "none", md: "xl" }}
            shadow="2xl"
            maxW={{ base: "100%", md: "600px" }}
            maxH={{ base: "100vh", md: "90vh" }}
            overflowY="auto"
          >
            <ModalHeader 
              color="#019354" 
              fontSize={{ base: "xl", md: "2xl" }} 
              fontWeight="semibold" 
              pb={4}
              px={{ base: 4, md: 6 }}
            >
              {serviceType} Booking
            </ModalHeader>
            <ModalCloseButton 
              color="gray.500" 
              _hover={{ color: "#019354" }}
              size="lg"
              top={{ base: 3, md: 4 }}
              right={{ base: 3, md: 4 }}
            />
            <ModalBody pb={6} px={{ base: 4, md: 6 }}>
              <FormControl isRequired mb={4} isInvalid={!!errors.name}>
                <FormLabel fontSize={{ base: "md", md: "lg" }} color="gray.700" fontWeight="medium">
                  Full Name
                </FormLabel>
                <Input
                  name="name"
                  variant="filled"
                  placeholder="Enter your full name"
                  focusBorderColor="#019354"
                  rounded="md"
                  size={{ base: "md", md: "lg" }}
                  _hover={{ bg: 'gray.100' }}
                  _focus={{ bg: 'white' }}
                  onChange={handleChange}
                  value={formData.name}
                />
                {errors.name && <Text color="red.500" fontSize="sm">{errors.name}</Text>}
              </FormControl>
              <FormControl isRequired mb={4} isInvalid={!!errors.email}>
                <FormLabel fontSize={{ base: "md", md: "lg" }} color="gray.700" fontWeight="medium">
                  School Email
                </FormLabel>
                <Input
                  name="email"
                  type="email"
                  variant="filled"
                  placeholder="Enter your school email"
                  focusBorderColor="#019354"
                  rounded="md"
                  size={{ base: "md", md: "lg" }}
                  _hover={{ bg: 'gray.100' }}
                  _focus={{ bg: 'white' }}
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
              </FormControl>
              <FormControl isRequired mb={4} isInvalid={!!errors.course}>
                <FormLabel fontSize={{ base: "md", md: "lg" }} color="gray.700" fontWeight="medium">
                  Course/Program
                </FormLabel>
                <Select
                  name="course"
                  variant="filled"
                  placeholder="Select your course"
                  focusBorderColor="#019354"
                  rounded="md"
                  size={{ base: "md", md: "lg" }}
                  _hover={{ bg: 'gray.100' }}
                  _focus={{ bg: 'white' }}
                  onChange={handleChange}
                  value={formData.course}
                >
                  <option value="pharmacy">College of Pharmacy</option>
                  <option value="dentistry">College of Dentistry</option>
                </Select>
                {errors.course && <Text color="red.500" fontSize="sm">{errors.course}</Text>}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel fontSize={{ base: "md", md: "lg" }} color="gray.700" fontWeight="medium">
                  Message (optional)
                </FormLabel>
                <Textarea
                  name="message"
                  variant="filled"
                  placeholder="Enter your message"
                  focusBorderColor="#019354"
                  rounded="md"
                  resize="none"
                  minHeight="120px"
                  size={{ base: "md", md: "lg" }}
                  _hover={{ bg: 'gray.100' }}
                  _focus={{ bg: 'white' }}
                  onChange={handleChange}
                  value={formData.message}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter 
              px={{ base: 4, md: 6 }}
              pb={{ base: 4, md: 6 }}
              flexDirection={{ base: "column", md: "row" }}
              gap={{ base: 3, md: 0 }}
            >
              <Button
                colorScheme="brand"
                mr={{ base: 0, md: 3 }}
                onClick={handleNextStep}
                size={{ base: "md", md: "lg" }}
                width={{ base: "full", md: "auto" }}
                borderRadius="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
                type="button"
              >
                Choose appointment time
              </Button>
              <Button
                onClick={handleClose}
                variant="ghost"
                size={{ base: "md", md: "lg" }}
                width={{ base: "full", md: "auto" }}
                borderRadius="lg"
              >
                Cancel
              </Button>
            </ModalFooter>
          </MotionModalContent>
        ) : step === 2 ? (
          <MotionModalContent
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            borderRadius={{ base: "none", md: "xl" }}
            shadow="2xl"
            maxW={{ base: "100%", md: "4xl" }}
            maxH={{ base: "100vh", md: "90vh" }}
            overflowY="auto"
          >
            <ModalHeader 
              color="#019354" 
              fontSize={{ base: "xl", md: "2xl" }} 
              fontWeight="semibold" 
              pb={4}
              px={{ base: 4, md: 6 }}
            >
              Choose Date and Time
            </ModalHeader>
            <ModalCloseButton 
              color="gray.500" 
              _hover={{ color: "#019354" }}
              size="lg"
              top={{ base: 3, md: 4 }}
              right={{ base: 3, md: 4 }}
            />
            <ModalBody pb={6} px={{ base: 4, md: 6 }}>
              <Flex 
                direction={{ base: 'column', md: 'row' }} 
                gap={{ base: 6, md: 8 }}
              >
                {/* Calendar Section */}
                <Box width={{ base: "100%", md: "auto" }}>
                  <Text 
                    fontSize={{ base: "md", md: "lg" }} 
                    fontWeight="medium" 
                    mb={4}
                  >
                    Select Date
                  </Text>
                  <Box 
                    borderWidth="1px" 
                    borderRadius="lg" 
                    p={{ base: 3, md: 4 }} 
                    bg="white" 
                    shadow="sm"
                  >
                    {/* Month Navigation */}
                    <Flex justify="space-between" align="center" mb={4}>
                      <Button
                        variant="ghost"
                        size={{ base: "sm", md: "md" }}
                        onClick={handlePrevMonth}
                        _hover={{ bg: 'green.50' }}
                        minW="40px"
                        h="40px"
                      >
                        <Icon as={ChevronLeft} />
                      </Button>
                      <Text 
                        fontSize={{ base: "md", md: "lg" }} 
                        fontWeight="semibold"
                      >
                        {getMonthName(currentMonth)} {currentYear}
                      </Text>
                      <Button
                        variant="ghost"
                        size={{ base: "sm", md: "md" }}
                        onClick={handleNextMonth}
                        _hover={{ bg: 'green.50' }}
                        minW="40px"
                        h="40px"
                      >
                        <Icon as={ChevronRight} />
                      </Button>
                    </Flex>
                    {/* Weekday Headers */}
                    <SimpleGrid columns={7} spacing={1} mb={2}>
                      {weekdayNames.map((day) => (
                        <Text 
                          key={day} 
                          fontWeight="bold" 
                          textAlign="center" 
                          fontSize={{ base: "xs", md: "sm" }}
                        >
                          {day}
                        </Text>
                      ))}
                    </SimpleGrid>
                    {/* Calendar Grid */}
                    <SimpleGrid columns={7} spacing={1}>
                      {renderCalendar()}
                    </SimpleGrid>
                  </Box>
                </Box>
                {/* Time Slots Section */}
                <Box flex="1">
                  <Text 
                    fontSize={{ base: "md", md: "lg" }} 
                    fontWeight="medium" 
                    mb={4}
                  >
                    Available Times
                  </Text>
                  <SimpleGrid 
                    columns={{ base: 1, sm: 2 }} 
                    spacing={3}
                  >
                    {timeSlots.map((time) => {
                      const dateString = selectedDate?.toISOString().split('T')[0] || ''
                      const isBooked = isTimeBooked(dateString, time)
                      const isPast = isPastTime(time)
                      
                      return (
                        <Tooltip
                          key={time}
                          label={isBooked ? "This time slot is already booked" : isPast ? "This time has already passed" : ""}
                          isDisabled={!isBooked && !isPast}
                        >
                          <Button
                            variant={formData.time === time ? 'solid' : 'outline'}
                            colorScheme={formData.time === time ? 'green' : 'gray'}
                            onClick={() => setFormData({ ...formData, time })}
                            h={{ base: "36px", md: "40px" }}
                            fontSize={{ base: "sm", md: "md" }}
                            borderRadius="full"
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'md',
                            }}
                            transition="all 0.2s"
                            isDisabled={!selectedDate || isBooked || isPast}
                          >
                            {time}
                          </Button>
                        </Tooltip>
                      )
                    })}
                  </SimpleGrid>
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter 
              px={{ base: 4, md: 6 }}
              pb={{ base: 4, md: 6 }}
              flexDirection={{ base: "column", md: "row" }}
              gap={{ base: 3, md: 0 }}
            >
              <Button
                colorScheme="brand"
                mr={{ base: 0, md: 3 }}
                onClick={handleSubmit}
                isLoading={isSubmitting || isLoadingBookings}
                loadingText="Booking..."
                isDisabled={isSubmitting || isLoadingBookings || !selectedDate || !formData.time}
                size={{ base: "md", md: "lg" }}
                width={{ base: "full", md: "auto" }}
                borderRadius="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Book Interview
              </Button>
              <Button
                onClick={handleBackStep}
                variant="ghost"
                size={{ base: "md", md: "lg" }}
                width={{ base: "full", md: "auto" }}
                borderRadius="lg"
              >
                Back
              </Button>
            </ModalFooter>
          </MotionModalContent>
        ) : (
          <MotionModalContent
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            borderRadius={{ base: "none", md: "xl" }}
            shadow="2xl"
            maxW={{ base: "100%", md: "600px" }}
            maxH={{ base: "100vh", md: "90vh" }}
            overflowY="auto"
          >
            <ModalHeader 
              color="#019354" 
              fontSize={{ base: "xl", md: "2xl" }} 
              fontWeight="semibold" 
              pb={4}
              px={{ base: 4, md: 6 }}
            >
              Booking Confirmed
            </ModalHeader>
            <ModalCloseButton 
              color="gray.500" 
              _hover={{ color: "#019354" }}
              size="lg"
              top={{ base: 3, md: 4 }}
              right={{ base: 3, md: 4 }}
            />
            <ModalBody pb={6} px={{ base: 4, md: 6 }}>
              <Center flexDirection="column" py={{ base: 6, md: 8 }}>
                <Icon as={CheckCircle} w={{ base: 12, md: 16 }} h={{ base: 12, md: 16 }} color="green.500" mb={4} />
                <Text 
                  fontSize={{ base: "lg", md: "xl" }} 
                  fontWeight="semibold" 
                  color="gray.700" 
                  mb={2}
                  textAlign="center"
                >
                  Your interview booking has been confirmed!
                </Text>
                <Text 
                  fontSize={{ base: "sm", md: "md" }} 
                  color="gray.600" 
                  textAlign="center"
                >
                  Thank you for scheduling your {serviceType}. We look forward to meeting with you on {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {formData.time}.
                </Text>
              </Center>
            </ModalBody>
            <ModalFooter 
              px={{ base: 4, md: 6 }}
              pb={{ base: 4, md: 6 }}
            >
              <Button
                colorScheme="green"
                onClick={handleClose}
                size={{ base: "md", md: "lg" }}
                width={{ base: "full", md: "auto" }}
                borderRadius="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Close
              </Button>
            </ModalFooter>
          </MotionModalContent>
        )}
      </AnimatePresence>
    </Modal>
  )
} 