import { Box, Container, Flex, Text } from '@chakra-ui/react'
import BreadCrumbs, { BreadCrumbLinks } from '@components/BreadCrumbs'
import ErrorCard, { ErrorProps } from '@components/ErrorHandler/ErrorCard'
import { MenuProps, SideNav } from '@components/Nav/sidenav'
import { BookingIcon, HomeIcon, LessonIcon } from 'customs/icons/menuIcons'
import { primaryColorHex } from 'customs/theme/styles'
import React, { FC } from 'react'
import LoadingSpinner from '../loadingSpinner'

export interface LayoutProps {
    title?: string
    error?: ErrorProps
    loading?: boolean
    description?: string
    breadCrumbLinks?: BreadCrumbLinks[]

}

const Layout: FC<LayoutProps> = ({ title, description, children, error, loading, breadCrumbLinks }) => {
    const size = "20px"
    const menus: MenuProps[] = [
        { label: "Home", icon: <HomeIcon h={size} w={size} />, href: '/home' },
        { label: "Course", icon: <LessonIcon h={size} w={size} />, href: '/courses' },
        { label: "Booking", icon: <BookingIcon h={size} w={size} />, href: '/bookings' },
    ]
    return (
        <Box>
            <Flex pos="relative">
                <SideNav menus={menus} />

                <Box overflow={{ base: "auto", md: "auto" }} h={{ base: "100%", md: "100vh" }} w="100%">
                    <Box px={{ base: "30px", md: "12" }} py={{ base: "4", md: "6" }}>
                        <Text as="h1" fontSize={["4xl", "5xl"]} fontWeight={"bold"} textTransform={"capitalize"}>{title}</Text>
                        <Text as="h6" fontSize={"sm"} color="gray.500">{description}</Text>
                        {breadCrumbLinks && <BreadCrumbs links={breadCrumbLinks} mt="10px" textTransform={"capitalize"} fontWeight={"600"} color={primaryColorHex} />}
                    </Box>
                    <Flex
                        px={{ base: "30px", md: "12" }}
                    >
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
