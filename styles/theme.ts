// theme.js
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color:"#1F2949",
      },
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold", // Normally, it is "semibold"
      },
      variants: {
        primary: {
          bg:"#6441F1",  
          color:"white", 
          _hover:{ 
            transform:"skewY(-1.5deg) scale(1.1)"
          }, 
          _focus:{
            transform:"skewY(-1.5deg) scale(1.1)"
          },
        },
        "accent": {
            bg: "blue.500",
            color: "white",
            _hover:{ bg: "blue.600"},
        },
      },
    },
    Text: {
      variants: {
        heroTitle: {
          fontSize: {md: "50px", base:"30px"},
          color:"white",
          fontWeight: "800",
          textShadow:"1px 1px blue",
          lineHeight: {md: "80px", base:"30px"},
          textTransform: "capitalize",
        },
        heroSubtitle: {
          color:"white",
          fontSize: {md: "1em", base:"1em"},
          lineHeight: {md: "1.5em", base:"1.5em"},
          textShadow:"1px 1px blue"
        },
      }
    }
  },
})

export default theme