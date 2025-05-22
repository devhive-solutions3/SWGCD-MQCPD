"use client"

import {
  Box,
  Flex,
  HStack,
  Link,
  Image,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { HamburgerIcon } from "@chakra-ui/icons"
import { FiLogOut } from "react-icons/fi"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebaseconfig"

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]

export default function AdminNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  const NavLinks = () => (
    <>
      {NAV_LINKS.map((link) => {
        const isActive = typeof window !== 'undefined' && window.location.pathname === link.href
        return (
          <Box
            key={link.href}
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
              color="black"
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
                width: isActive ? '100%' : 0,
                bg: 'black',
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
      })}
    </>
  )

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      zIndex={1000}
      bg="#ecfdf5"
      px={0}
      py={0}
    >
      <Box
        maxW="1440px"
        mx="auto"
        px={{ base: 6, md: 10, lg: 14 }}
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="full"
      >
        <Image
          src="/main_logo.png"
          alt="Admin Logo"
          height={{ base: "28px", md: "40px" }}
          minH="28px"
          objectFit="contain"
          filter="drop-shadow(0 2px 8px rgba(0,0,0,0.25))"
        />
        <HStack spacing={{ base: 4, md: 6, lg: 8, xl: 10 }} display={{ base: "none", md: "flex" }}>
          <NavLinks />
        </HStack>
        <HStack spacing={4}>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            display={{ base: "flex", md: "none" }}
            variant="ghost"
            onClick={onOpen}
            color="white"
            size="sm"
          />
          <Button
            leftIcon={<FiLogOut />}
            colorScheme="red"
            variant="solid"
            onClick={handleLogout}
            size="sm"
            fontWeight="bold"
            color="white"
            bg="red.500"
            _hover={{
              bg: "red.600",
              color: "white",
            }}
          >
            Logout
          </Button>
        </HStack>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start">
              {NAV_LINKS.map(link => (
                <Link
                  as={NextLink}
                  key={link.href}
                  href={link.href}
                  px={4}
                  py={2}
                  borderRadius="md"
                  fontWeight="bold"
                  color="#047857"
                  fontSize="md"
                  _hover={{ bg: "gray.100", textDecoration: "none" }}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                leftIcon={<FiLogOut />}
                colorScheme="red"
                variant="solid"
                onClick={handleLogout}
                size="sm"
                fontWeight="bold"
                w="full"
                color="white"
                bg="red.500"
                _hover={{
                  bg: "red.600",
                  color: "white",
                }}
              >
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
} 