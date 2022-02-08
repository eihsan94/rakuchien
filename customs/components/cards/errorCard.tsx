import { Box, BoxProps, Text } from '@chakra-ui/react'
import error from 'next/error'
import React from 'react'

interface Props extends BoxProps {
    error: string
}

function ErrorCard(props: Props) {
    const { error } = props

    return (
        <Box color="red" bg="red.100" p="6" {...props} borderRadius="8" >
            <Text fontWeight={"bold"} fontSize={"xl"} >
                Error occur below please contact admin
            </Text>
            <Text fontWeight={"bold"} fontSize={"md"} >
                {error}
            </Text>
        </Box >
    )
}

export default ErrorCard
