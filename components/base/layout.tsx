import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import ErrorCard, { ErrorProps } from '../erroHandler/errorCard'
import LoadingSpinner from '../loadingSpinner'
import { LeftBar, RightBar } from './sidebar'

interface Props {
    title: string
    error?: ErrorProps
    loading?: boolean
    description: string
}

const Layout: FC<Props> = ({ title, description, children, error, loading }) => {
    return (
        <Box >
            <Flex pos="relative">
                <RightBar />
                <Box overflow={{ base: "inherit", md: "auto" }} h={{ base: "100%", md: "100vh" }} w="100%">
                    <Box px={{ base: "30px", md: "12" }} pt={{ base: "12", md: "16" }}>
                        <Text as="h1" fontSize={"5xl"} fontWeight={"bold"}>{title}</Text>
                        <Text as="h6" fontSize={"sm"} color="gray.500">{description}</Text>
                    </Box>
                    <Flex px={{ base: "", md: "12" }} justifyContent={{ base: "center", md: "flex-start" }} pb={{ base: "12", md: "16" }}>
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
