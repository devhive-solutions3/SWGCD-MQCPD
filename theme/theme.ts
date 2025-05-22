import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#FAF9F6", // Soft cream background
        color: "#1a202c",
        fontFamily: "'Inter', sans-serif",
      },
    },
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  colors: {
    brand: {
      50: "#FAF9F6", // Cream background
      100: "#019354", // Green accent
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "full",
        fontSize: "lg",
        px: 8,
        py: 6,
      },
      variants: {
        solid: {
          bg: "brand.100",
          color: "white",
          _hover: {
            bg: "#017f48",
          },
        },
        outline: {
          borderColor: "brand.100",
          color: "brand.100",
          _hover: {
            bg: "brand.100",
            color: "white",
          },
        },
      },
    },
    Card: {
      baseStyle: {
        borderRadius: "2xl",
        boxShadow: "md",
        bg: "white",
        p: 6,
      },
    },
  },
})

export default theme 