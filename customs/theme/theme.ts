// theme.js
import { coreTheme } from "core/theme/theme"
import { globalStyles, primaryColorHex } from "./styles"

const bookingBtnProps = {
    fontSize: { base: 'xs', md: 'sm' },
    rounded: '1em',
    px: "2em",
    py: "1em",
}

const customThemes = {
    ...globalStyles,
    components: {
        Button: {
            baseStyle: {
                fontWeight: "bold", // Normally, it is "semibold"
            },
            variants: {
                primary: {
                    bg: primaryColorHex,
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
                    ...bookingBtnProps,
                    boxShadow: '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                    bg: primaryColorHex,
                    color: 'white',
                    _hover: {
                        bg: 'blue.500',
                    },
                    _focus: {
                        bg: 'blue.500',
                    },
                },
                cancelBooking: {
                    ...bookingBtnProps,
                    bg: 'gray.200',
                    color: 'black',
                    _hover: {
                        bg: 'red.100',
                        color: "red.500"
                    },
                    _focus: {
                        bg: 'red.500',
                    },
                },
            },
        },
        Text: {
            variants: {
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
                    color: props.colorMode === "dark" ? "white" : "gray.700",
                    // color: "gray.700",
                    fontSize: { md: "1.5em", base: "1.3em" },
                    lineHeight: { md: "1.5em", base: "1.3em" },
                    fontWeight: "bold",
                }),
                error: {
                    color: "red.600",
                },
                pageSectionTitle: (props: any) => ({
                    fontSize: "xl",
                    fontWeight: "bold",
                    color: props.colorMode === "dark" ? "white" : "gray.700",
                }),
                dayLabel: {
                    bg: "#6441F1",
                    color: "white",
                    p: "2",
                    px: "3",
                    borderRadius: "xl"
                }
            }
        }
    },
}

const theme = coreTheme(customThemes)

export default theme