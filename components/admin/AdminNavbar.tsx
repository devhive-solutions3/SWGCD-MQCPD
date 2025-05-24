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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { FiLogOut } from "react-icons/fi"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebaseconfig"
import { useEffect, useState } from "react"

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]

export default function AdminNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter();

  // Blur effect on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  const NavLinks = () => (
    <>
      {NAV_LINKS.map((link) => {
        const isActive = typeof window !== 'undefined' && window.location.pathname === link.href;
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
              px={{ base: 2, md: 4, lg: 5 }}
              py={2}
              borderRadius="full"
              fontWeight={isActive ? 'semibold' : 'bold'}
              color="black"
              position="relative"
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
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
              whiteSpace="nowrap"
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
      bg={scrolled ? "rgba(236,253,245,0.7)" : "transparent"}
      backdropFilter={scrolled ? "blur(8px)" : "none"}
      transition="background 0.2s, backdrop-filter 0.2s"
      px={0}
      py={0}
    >
      <Box
        maxW="1440px"
        mx="auto"
        px={{ base: 4, md: 10, lg: 14 }}
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="full"
        gap={2}
      >
        <Image
          src="/main_logo.png"
          alt="Admin Logo"
          height={{ base: "28px", md: "40px" }}
          minH="28px"
          objectFit="contain"
          filter="drop-shadow(0 2px 8px rgba(0,0,0,0.25))"
        />
        <Box
          flex={1}
          overflowX="auto"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={{ base: 4, md: 6, lg: 8, xl: 10 }}
          px={2}
          mx="auto"
          sx={{
            '::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = typeof window !== 'undefined' && window.location.pathname === link.href;
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
                  px={{ base: 2, md: 4, lg: 5 }}
                  py={2}
                  borderRadius="full"
                  fontWeight={isActive ? 'semibold' : 'bold'}
                  color="black"
                  position="relative"
                  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
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
                  whiteSpace="nowrap"
                >
                  {link.label}
                </Link>
              </Box>
            );
          })}
        </Box>
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
          ml={2}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )
} 