'use client';

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import Link from 'next/link'
import { ImagePlaceholder } from '@/components/image-placeholder'
import { FaRegBell, FaRegCalendarAlt, FaRegLightbulb, FaRegSmile } from 'react-icons/fa'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebaseconfig'
import { doc, onSnapshot } from 'firebase/firestore'

const REMINDER_TYPES = [
  { label: 'Reminder', icon: <FaRegBell size={32} color="#019354" /> },
  { label: 'Announcement', icon: <FaRegCalendarAlt size={32} color="#019354" /> },
  { label: 'Tip', icon: <FaRegLightbulb size={32} color="#019354" /> },
  { label: 'Wellness', icon: <FaRegSmile size={32} color="#019354" /> },
]

export default function Home() {
  const [reminders, setReminders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    let unsubscribes: (() => void)[] = [];
    let results: any[] = Array(REMINDER_TYPES.length).fill(null);
    let updates = 0;

    REMINDER_TYPES.forEach((type, idx) => {
      const unsub = onSnapshot(doc(db, 'reminders', type.label), (snap) => {
        results = [...results]; // avoid mutation issues
        results[idx] = {
          label: type.label,
          title: snap.exists() ? (snap.data().title || type.label) : type.label,
          description: snap.exists() ? (snap.data().text || '') : '',
          icon: type.icon,
        };
        updates++;
        // Only set loading to false after all listeners have fired at least once
        if (updates >= REMINDER_TYPES.length) setLoading(false);
        setReminders([...results]);
      }, (error) => {
        results[idx] = {
          label: type.label,
          title: type.label,
          description: '',
          icon: type.icon,
        };
        setReminders([...results]);
        if (updates >= REMINDER_TYPES.length) setLoading(false);
      });
      unsubscribes.push(unsub);
    });
    return () => unsubscribes.forEach(unsub => unsub());
  }, []);

  return (
    <Box as="main" bg="#e9f4ef" minH="100vh">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(5, 122, 85, 0.92) 0%, rgba(5, 122, 85, 0.7) 40%, rgba(255,255,255,0.0) 100%), url(/heropic.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      >
        <div className="flex flex-col items-start justify-center gap-8 w-full px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-2xl flex flex-col justify-center items-start text-left pl-4 md:pl-32 lg:pl-48">
            <div className="text-xs md:text-sm tracking-widest text-white drop-shadow-lg mb-4 font-semibold uppercase">DLSMHSI Pharmacy</div>
            <h1 className="font-bold text-white drop-shadow-lg leading-tight mb-8" style={{ fontSize: 'clamp(2.5rem,6vw,3.5rem)' }}>
              Welcome to Guidance & Counseling Services 
            </h1>
            <div className="text-white/90 mb-8 drop-shadow-md max-w-md" style={{ fontSize: 'clamp(1rem,2.5vw,1.25rem)' }}>
              Promoting academic success, personal growth, and student wellness through counseling services.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/services#book-appointment" className="w-full sm:w-auto">
                <button className="px-8 py-4 rounded-full bg-green-600 text-white font-medium shadow-md hover:bg-green-700 transition text-base w-full">
                  Book Now
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="px-8 py-4 rounded-full border border-white text-green-600 bg-white/80 font-medium shadow-md hover:bg-green-50 transition text-base w-full">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Center Tagline Section */}
      <Container maxW="container.md" py={16}>
        <VStack gap={8}>
          <Heading as="h2" size="xl" color="black" fontWeight="bold" fontFamily="heading" textAlign="center">
            Supporting Your Wellness Journey
          </Heading>
          <Text color="gray.700" textAlign="center" maxW="2xl" mb={8}>
            Explore the full range of student support services and discover how we can help you thrive academically and personally.
          </Text>
        </VStack>
      </Container>

      {/* Daily Reminders Card Row */}
      <Box as="section" w="full" mt={0} mb={0}>
        {loading ? (
          <Flex justify="center" align="center" minH="200px"><Spinner size="xl" color="green.500" /></Flex>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 px-4 md:px-8">
            {reminders.map((reminder, idx) => (
              <Box
                key={reminder.label}
                bg={idx % 2 === 0 ? '#f7f6f3' : '#f7f6f3'}
                borderRadius="3xl"
                boxShadow="md"
                p={{ base: 6, sm: 8 }}
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="space-between"
                minH={{ base: "220px", sm: "260px" }}
                gap={{ base: 3, sm: 4 }}
                w="full"
                maxW={{ base: '90vw', md: '320px' }}
                flex="1 1 260px"
              >
                <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={2}>
                  {reminder.label}
                </Text>
                <Heading as="h3" size="md" color="black" fontWeight="bold" fontFamily="heading" mb={2}>
                  {reminder.title}
                </Heading>
                <Text color="gray.700" mb={6} noOfLines={2} fontSize={{ base: "sm", sm: "md" }}>
                  {reminder.description || `No ${reminder.label.toLowerCase()} set.`}
                </Text>
                <Box flexGrow={1} display="flex" alignItems="flex-end" w="full">
                  {reminder.icon}
                </Box>
              </Box>
            ))}
          </div>
        )}
      </Box>
    </Box>
  )
}
