// theme.js
import { coreTheme } from "core/theme/theme"
import { globalStyles } from "./styles"

const customThemes = {
    ...globalStyles,
    components: {
        Button: {
            baseStyle: {
                fontWeight: "bold", // Normally, it is "semibold"
            },
            variants: {
                primary: {
                    bg: "#6441F1",
                    color: "white",
                    _hover: {
                        transform: "skewY(-1.5deg) scale(1.1)"
                    },
                    _focus: {
                        transform: "skewY(-1.5deg) scale(1.1)"
                    },
                },
                accent: {
                    bg: "blue.500",
                    color: "white",
                    _hover: { bg: "blue.600" },
                },
                booking: {
                    fontSize: 'sm',
                    rounded: 'full',
                    bg: 'blue.400',
                    color: 'white',
                    boxShadow: '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                    _hover: {
                        bg: 'blue.500',
                    },
                    _focus: {
                        bg: 'blue.500',
                    },
                }
            },
        },
        Text: {
            variants: {
                panel: (props: any) => ({
                    color: props.colorMode === "dark" ? "white" : "gray.700",
                }),
                heroTitle: {
                    fontSize: { md: "50px", base: "30px" },
                    color: "white",
                    fontWeight: "800",
                    textShadow: "1px 1px blue",
                    lineHeight: { md: "80px", base: "30px" },
                    textTransform: "capitalize",
                },
                heroSubtitle: {
                    color: "white",
                    fontSize: { md: "1em", base: "1em" },
                    lineHeight: { md: "1.5em", base: "1.5em" },
                    textShadow: "1px 1px blue"
                },
                h3: (props: any) => ({
                    // color: props.colorMode === "dark" ? "white" : "gray.700",
                    color: "gray.700",
                    fontSize: { md: "1.5em", base: "1.3em" },
                    lineHeight: { md: "1.5em", base: "1.3em" },
                    fontWeight: "bold",
                }),
                error: {
                    color: "red.600",
                }
            }
        }
    },
}

const theme = coreTheme(customThemes)

export default theme