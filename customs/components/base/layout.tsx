import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { MenuProps, SideNav } from '@components/Nav/sidenav'
import { BookingIcon, HomeIcon, LessonIcon } from 'customs/icons/menuIcons'
import React, { FC } from 'react'
import ErrorCard, { ErrorProps } from '../errorHandler/errorCard'
import LoadingSpinner from '../loadingSpinner'

interface Props {
    title: string
    error?: ErrorProps
    loading?: boolean
    description: string
}

const Layout: FC<Props> = ({ title, description, children, error, loading }) => {
    const size = "1em"
    const menus: MenuProps[] = [
        { label: "Home", icon: <HomeIcon h={size} w={size} />, href: '/home' },
        { label: "Lesson", icon: <LessonIcon h={size} w={size} />, href: '/lessons' },
        { label: "Booking", icon: <BookingIcon h={size} w={size} />, href: '/bookings' },
    ]
    return (
        <Box >
            <Flex pos="relative">
                <SideNav menus={menus} />

                <Box overflow={{ base: "auto", md: "auto" }} h={{ base: "100%", md: "100vh" }} w="100%">
                    <Box px={{ base: "30px", md: "12" }} pt={{ base: "12", md: "16" }}>
                        <Text as="h1" fontSize={"5xl"} fontWeight={"bold"}>{title}</Text>
                        <Text as="h6" fontSize={"sm"} color="gray.500">{description}</Text>
                    </Box>
                    <Flex
                        px={{ base: "30px", md: "12" }}
                        pb={{ base: "12", md: "16" }}>
                        {
                            error
                                ? <ErrorCard {...error} />
                                : loading
                                    ? <LoadingSpinner />
                                    : children
                        }
                    </Flex>
                </Box>
                {/* <LeftBar/> */}
            </Flex>
        </Box>
    )
}

export default Layout
