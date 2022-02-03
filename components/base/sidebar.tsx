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
import NextLink from "../nextLink"

interface MenuProps {
    label: string
    icon: JSX.Element
    href: string
}

const Menu: FC<MenuProps> = ({ label, icon, href }) => {
    return (
        <NextLink w="100%" href={href}>
            <Flex
                w="100%"
                alignItems={"center"}
                justifyContent={{ base: "center", xl: "flex-start" }}
                py={"20px"}
            >
                <Box display={{ base: "none", md: "inherit" }}>
                    <Tooltip label={label} fontSize='md'>
                        <Box>
                            {icon}
                        </Box>
                    </Tooltip>
                </Box>
                <Box display={{ base: "inherit", md: "none" }}>
                    {icon}
                </Box>
                <Box display={{ base: "none", xl: "inherit" }} pl="30px">
                    {label}
                </Box>
            </Flex>
        </NextLink>
    )
}

const UserMenu = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const avatarSize = { base: '1em', md: '1.5rem' }
    const avatarText = status === "authenticated" ? `${session?.user?.name}` : 'Login / Sign up'
    const src = session ? session?.user?.image : null

    const onClickHandler = () => {
        if (status === "authenticated") {
            router.push('/setting')
        } else {
            signIn('google', { callbackUrl: router.pathname })
        }

    }
    const AvatarProfile =
        <>
            <Box display={{ base: "none", md: "inherit" }}>
                {
                    src
                        ? <Avatar bg='#6441F1' size="md" icon={<UserIcon color="white" fontSize={avatarSize} />} src={src} ignoreFallback={true} />
                        : <Avatar bg='#6441F1' size="md" icon={<UserIcon color="white" fontSize={avatarSize} />} />
                }
            </Box>
            <Box display={{ base: "inherit", md: "none" }}>
                {
                    src
                        ? <Avatar bg='#6441F1' size="sm" icon={<UserIcon color="white" fontSize={avatarSize} />} src={src} ignoreFallback={true} />
                        : <Avatar bg='#6441F1' size="sm" icon={<UserIcon color="white" fontSize={avatarSize} />} />
                }
            </Box>
        </>
    return (
        <Flex direction={"column"} alignItems={"center"} w={{ base: "", md: "100%" }} pos={{ base: "relative", md: "absolute" }} bottom={{ base: "", md: "5em" }} left={{ base: "", md: "0em" }} as="button" onClick={onClickHandler}>
            <AvatarGroup>
                {AvatarProfile}
            </AvatarGroup>
            <Text mt="3" display={{ base: "none", xl: "inherit" }} fontWeight={"bold"}>{avatarText}</Text>
        </Flex>
    )
}


interface NavProps {
    menus: MenuProps[]
}
const DesktopNav: FC<NavProps> = ({ menus }) => {
    const logoSize = { base: "50px", md: "70px" }

    return (
        <Box
            borderRight={"solid 1px rgba(0,0,0,.1)"}
            h="100vh"
            spacing={4}
            px={{ base: "20px", xl: "40px" }}
            pos="relative"
        >
            <NextLink href="/">
                <Flex py="16" w="100%" overflow={"hidden"} alignItems={"center"}>
                    <Logo ml={{ base: "", xl: "2" }} h={logoSize} w={logoSize} color="black" />
                    <Text display={{ base: "none", xl: "inherit" }} fontWeight={"bold"}>RAKUCHIEN</Text>
                </Flex>
            </NextLink>
            <Box>
                {menus.map((m, i) => <Menu key={i} {...m} />)}
            </Box>
            <UserMenu />
        </Box>
    )
}
const MobileNav: FC<NavProps> = ({ menus }) => {

    return (
        <HStack
            pos="fixed" bottom="0"
            borderTop={"solid 1px rgba(0,0,0,.1)"} w="100vw"
            spacing={4} px="20px" pb="10px" zIndex={4}
            shadow="md"
            backdropFilter="saturate(180%) blur(15px)"
        >
            <NextLink href="/">
                <Flex w="50px" overflow={"hidden"} alignItems={"center"}>
                    <Logo w="100%" h="100%" color="black" />
                </Flex>
            </NextLink>
            {menus.map((m, i) => <Menu key={i} {...m} />)}
            <UserMenu />
        </HStack>
    )
}

export const RightBar: FC<BoxProps> = () => {
    const size = { base: "25px", md: "32px" }
    const menus: MenuProps[] = [
        { label: "Home", icon: <HomeIcon h={size} w={size} />, href: '/home' },
        { label: "Lesson", icon: <LessonIcon h={size} w={size} />, href: '/lessons' },
        { label: "Booking", icon: <BookingIcon h={size} w={size} />, href: '/bookings' },
    ]
    return (
        <>
            <Box display={{ base: "inherit", md: "none" }}>
                <MobileNav menus={menus} />
            </Box>
            <Box display={{ base: "none", md: "inherit" }}>
                <DesktopNav menus={menus} />
            </Box>
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