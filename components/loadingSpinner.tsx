import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function LoadingSpinner(props: Props) {
    const { } = props

    return (
        <Flex justifyContent={"center"} p={16}>
            <Spinner color={"#775AF2"} size="xl" thickness='8px' emptyColor='pink' borderRadius={"full"} />
        </Flex>

    )
}

export default LoadingSpinner
