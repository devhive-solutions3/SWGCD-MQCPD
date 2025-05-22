"use client"

import {
  Box,
  Flex,
  HStack,
  Link,
  Image,
  useColorModeValue,
  useToken,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useState, useEffect } from "react"
import { HamburgerIcon } from "@chakra-ui/icons"

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [emerald50] = useToken('colors', ['emerald.50'])
  const [emerald800] = useToken('colors', ['emerald.800'])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bgColor = useColorModeValue(
    isScrolled ? '#ecfdf5' : 'transparent',
    isScrolled ? '#166534' : 'transparent'
  )

  const textColor = isScrolled ? '#065f46' : 'white'

  const NavLinks = () => (
    <>
      {NAV_LINKS.map((link) => {
        const isActive = typeof window !== 'undefined' && window.location.pathname === link.href
        // Transparent state: use Chakra Link for proper pseudo-element support
        if (!isScrolled) {
          return (
            <Box
              key={link.href}
              borderRadius="full"
              transition="background 0.3s cubic-bezier(0.4,0,0.2,1)"
              _hover={{ bg: isActive ? 'green.100' : 'gray.100' }}
              bg={isActive ? 'green.100' : 'transparent'}
              px={0}
              py={0}
              display="flex"
              alignItems="center"
            >
              <Link
                as={NextLink}
                href={link.href}
                px={{ base: 3, md: 4, lg: 5 }}
                py={2}
                borderRadius="full"
                fontWeight={isActive ? 'semibold' : 'bold'}
                color={isActive ? 'black' : 'white'}
                position="relative"
                fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                onClick={onClose}
                bg="transparent"
                transition="color 0.3s cubic-bezier(0.4,0,0.2,1)"
                _after={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: '4px',
                  height: '2px',
                  width: 0,
                  bg: 'white',
                  borderRadius: 'full',
                  transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
                _hover={{
                  _after: {
                    width: '100%',
                  },
                }}
              >
                {link.label}
              </Link>
            </Box>
          )
        }
        // Scrolled state: keep overflow hidden for pill effect
        return (
          <Box
            key={link.href}
            overflow="hidden"
            borderRadius="full"
            transition="background 0.3s cubic-bezier(0.4,0,0.2,1)"
            _hover={{ bg: isActive ? 'green.100' : 'gray.100' }}
            bg={isActive ? 'green.100' : 'transparent'}
            px={0}
            py={0}
            display="flex"
            alignItems="center"
          >
            <Link
              as={NextLink}
              href={link.href}
              px={{ base: 3, md: 4, lg: 5 }}
              py={2}
              borderRadius="full"
              fontWeight={isActive ? 'semibold' : 'bold'}
              color={isActive ? 'black' : 'gray.800'}
              position="relative"
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
              onClick={onClose}
              bg="transparent"
              transition="color 0.3s cubic-bezier(0.4,0,0.2,1)"
              _hover={{ textDecoration: 'underline', bg: 'transparent' }}
            >
              {link.label}
            </Link>
          </Box>
        )
      })}
    </>
  )

  return (
    <Box
      position="fixed"
      top={isScrolled ? 4 : 0}
      left="50%"
      transform="translateX(-50%)"
      width={isScrolled ? 'auto' : '100%'}
      maxW={isScrolled ? undefined : { base: '90%', md: '85%' }}
      mx="auto"
      zIndex={1000}
      transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
      px={{ base: 4, md: 8 }}
    >
    {isScrolled ? (
      <Box
        bg="#ecfdf5"
        px={{ base: 6, md: 10, lg: 14 }}
        py={2}
        borderRadius="full"
        boxShadow="md"
        display="flex"
        alignItems="center"
        gap={{ base: 4, md: 6, lg: 8 }}
        transition="all 0.5s ease-in-out"
        maxW={{ base: "calc(100vw - 32px)", md: "container.xl" }}
        mx="auto"
      >
        <Image
          src="/main_logo.png"
          alt="SWGCD Logo"
          height={{ base: "24px", md: "32px" }}
          minH="24px"
          objectFit="contain"
          mr={{ base: 2, md: 6 }}
          transition="all 0.5s ease-in-out"
        />
        <HStack spacing={{ base: 4, md: 6, lg: 8 }} ml={2}>
          <NavLinks />
        </HStack>
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          variant="ghost"
          onClick={onOpen}
          color="gray.800"
          size="sm"
        />
      </Box>
    ) : (
      <Box
        bg="transparent"
        px={{ base: 6, md: 10, lg: 14 }}
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        transition="all 0.5s ease-in-out"
        maxW="100%"
        mx="auto"
      >
        <Image
          src="/main_logo.png"
          alt="SWGCD Logo"
          height={{ base: "28px", md: "40px" }}
          minH="28px"
          objectFit="contain"
          filter="drop-shadow(0 2px 8px rgba(0,0,0,0.25))"
          transition="all 0.5s ease-in-out"
        />
        <HStack spacing={{ base: 4, md: 6, lg: 8, xl: 10 }} display={{ base: "none", md: "flex" }}>
          {NAV_LINKS.map((link) => {
            const isActive = typeof window !== 'undefined' && window.location.pathname === link.href
            return (
              <Link
                as={NextLink}
                key={link.href}
                href={link.href}
                fontWeight="medium"
                fontSize={{ base: "sm", md: "md" }}
                color="white"
                px={{ base: 3, md: 4, lg: 5 }}
                py={2}
                position="relative"
                borderRadius="full"
                textShadow="0 2px 8px rgba(0,0,0,0.25)"
                transition="all 0.5s ease-in-out"
                _hover={{
                  _after: {
                    width: '100%',
                    opacity: 1,
                  },
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  height: '2px',
                  width: '0%',
                  bg: 'white',
                  opacity: 0,
                  transition: 'all 0.5s ease-in-out',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </HStack>
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          variant="ghost"
          onClick={onOpen}
          color="white"
        />
      </Box>
    )}

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              <NavLinks />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
