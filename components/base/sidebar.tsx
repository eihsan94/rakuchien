import {
    Box,
    Flex,
    VStack,
    BoxProps,
    useBreakpointValue,
    Avatar,
    AvatarGroup,
    Text,
    Tooltip,
    HStack,
    Image,
} from "@chakra-ui/react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { BookingIcon, HomeIcon, LessonIcon, UserIcon } from "../icons/menuIcons"
import { Logo } from "../images/logo"

interface MenuProps {
    label: string
    icon: JSX.Element
    href: string
}

const Menu: FC<MenuProps> = ({ label, icon, href }) => {
    const tooltipIcon = useBreakpointValue({
        base:
            <Box>
                {icon}
            </Box>,
        md:
            <Tooltip label={label} fontSize='md'>
                <Box pr={{ base: "", xl: "30px" }}>
                    {icon}
                </Box>
            </Tooltip>,
    })
    return (
        <Flex
            as="a"
            href={href}
            w="100%"
            alignItems={"center"}
            justifyContent={{ base: "center", xl: "flex-start" }}
            py={{ base: "20px", md: "20px" }}
        >
            {tooltipIcon}
            <Box display={{ base: "none", xl: "inherit" }}>
                {label}
            </Box>
        </Flex>
    )
}

const UserMenu = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const avatarSize = useBreakpointValue({ base: '1em', md: '1.5rem' })
    const avatarText = status === "authenticated" ? `${session?.user?.name}` : 'Login / Sign up'
    const src = `${session?.user?.image}`
    const size = useBreakpointValue({ base: "sm", md: "md" })

    const onClickHandler = () => {
        if (status === "authenticated") {
            router.push('/profile')
        } else {
            signIn('google', { callbackUrl: router.pathname })
        }

    }

    return (
        <Flex direction={"column"} alignItems={"center"} w={{ base: "", md: "100%" }} pos={{ base: "relative", md: "absolute" }} bottom={{ base: "", md: "5em" }} left={{ base: "", md: "0em" }} as="button" onClick={onClickHandler}>
            <AvatarGroup>
                <Avatar bg='#6441F1' size={size} icon={<UserIcon color="white" fontSize={avatarSize} />} src={src} />
            </AvatarGroup>
            <Text mt="3" display={{ base: "none", xl: "inherit" }} fontWeight={"bold"}>{avatarText}</Text>
        </Flex>
    )
}


interface NavProps {
    menus: MenuProps[]
    logoSize?: string
}
const DesktopNav: FC<NavProps> = ({ menus, logoSize }) => {
    return (
        <VStack borderRight={"solid 1px rgba(0,0,0,.1)"} h="100vh" spacing={4} px={{ base: "20px", xl: "40px" }} pos="relative">
            <Flex as="a" href="/" py="16" w="100%" overflow={"hidden"} alignItems={"center"}>
                <Logo ml={{ base: "", xl: "2" }} h={logoSize} w={logoSize} color="black" />
                <Text display={{ base: "none", xl: "inherit" }} fontWeight={"bold"}>RAKUCHIEN</Text>
            </Flex>
            <Box>
                {menus.map((m, i) => <Menu key={i} {...m} />)}
            </Box>
            <UserMenu />
        </VStack>
    )
}
const MobileNav: FC<NavProps> = ({ menus, logoSize }) => {
    return (
        <HStack
            pos="fixed" bottom="0"
            borderTop={"solid 1px rgba(0,0,0,.1)"} w="100vw"
            spacing={4} px="20px" pb="10px" zIndex={4}
            shadow="md"
            backdropFilter="saturate(180%) blur(15px)"
        >
            <Flex as="a" href="/" w="60%" overflow={"hidden"} alignItems={"center"}>
                <Logo h={logoSize} w={logoSize} color="black" />
            </Flex>
            {menus.map((m, i) => <Menu key={i} {...m} />)}
            <UserMenu />
        </HStack>
    )
}

export const RightBar: FC<BoxProps> = () => {
    const size = useBreakpointValue({ base: "25px", md: "32px" })
    const logoSize = useBreakpointValue({ base: "50px", md: "70px" })
    const menus: MenuProps[] = [
        { label: "Home", icon: <HomeIcon h={size} w={size} />, href: '/home' },
        { label: "Lesson", icon: <LessonIcon h={size} w={size} />, href: '/lessons' },
        { label: "Booking", icon: <BookingIcon h={size} w={size} />, href: '/bookings' },
    ]
    const Nav = useBreakpointValue({ base: <MobileNav menus={menus} logoSize={logoSize} />, md: <DesktopNav menus={menus} logoSize={logoSize} /> })
    return (
        <>
            {Nav}
        </>
    )
}







interface LeftBarProps extends BoxProps {

}

export const LeftBar: FC<LeftBarProps> = (props) => {
    const { children } = props
    return (
        <VStack {...props}>
            leftbar
        </VStack>
    )
}