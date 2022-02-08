import { Box, BoxProps } from '@chakra-ui/layout'
import React from 'react'

interface Props extends BoxProps {
    color: any,
    progress_value: any
}

function ProgressBar(props: Props) {
    const { color, progress_value } = props;
    if (progress_value) {
        // delete props.progress_value
    }

    return (
        <Box {...props} height="10px" width="100%" bg="#e0e0de" borderRadius="full">
            <Box transition='width .5s ease-in-out' height="100%" width={`${progress_value}%`} bg={color} borderRadius="inherit" />
        </Box>
    )
}

export default ProgressBar
