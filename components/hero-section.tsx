"use client"

import { Box, Container, Heading, Text, VStack, Image, Button } from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionVStack = motion(VStack)

interface HeroSectionProps {
  title: string
  subtitle?: string
  backgroundImage: string
  height?: string | number | { [key: string]: string | number }
  showViewServicesButton?: boolean
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  height = "100vh",
  showViewServicesButton = false,
}: HeroSectionProps) {
  const scrollToServices = () => {
    document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box 
      position="relative" 
      h={height} 
      minH={{ base: "90vh", md: "100vh" }}
      w="100vw"
      overflow="hidden"
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        overflow="hidden"
        w="100%"
      >
        <Image
          src={backgroundImage}
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center"
          fallbackSrc="https://via.placeholder.com/400x300?text=Placeholder"
          transform={{ base: "scale(1.1)", md: "none" }}
          transition="transform 0.3s ease-in-out"
        />
      </Box>

      {/* Emerald Green Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(6, 78, 59, 0.75)"
        zIndex={1}
      />

      {/* Content */}
      <Container
        position="relative"
        zIndex={2}
        maxW="container.xl"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt={{ base: "24", md: "40" }}
        pb={{ base: "12", md: "20" }}
        transform={{ base: "translateY(-16px)", md: "translateY(-24px)" }}
        px={{ base: 4, sm: 6, md: 8 }}
      >
        <MotionVStack
          spacing={{ base: 6, md: 10 }}
          align="center"
          maxW="3xl"
          mx="auto"
          textAlign="center"
          color="white"
          px={{ base: 2, sm: 4, md: 8 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            as="h1"
            size={{ base: 'xl', sm: '2xl', md: '4xl' }}
            fontWeight="bold"
            lineHeight={{ base: "1.3", md: "1.2" }}
            color="white"
            fontFamily="heading"
            letterSpacing="tight"
            textShadow="0 2px 4px rgba(0,0,0,0.2)"
          >
            {title}
          </Heading>
          {subtitle && (
            <Text
              fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
              opacity={0.9}
              maxW="2xl"
              lineHeight={{ base: "1.5", md: "1.6" }}
              px={{ base: 2, md: 0 }}
            >
              {subtitle}
            </Text>
          )}
          {showViewServicesButton && (
            <Button
              onClick={scrollToServices}
              size={{ base: "md", md: "lg" }}
              px={{ base: 6, md: 8 }}
              py={{ base: 3, md: 4 }}
              mt={{ base: 4, md: 8 }}
              borderRadius="full"
              bg="white"
              color="#15803D"
              fontWeight="medium"
              boxShadow="sm"
              _hover={{
                bg: 'white',
                transform: 'scale(1.02)',
                boxShadow: '0 4px 12px rgba(21, 128, 61, 0.15)',
              }}
              transition="all 0.2s ease-in-out"
            >
              View Services
            </Button>
          )}
        </MotionVStack>
      </Container>
    </Box>
  )
}
