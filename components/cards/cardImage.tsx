import { Box, Image, ImageProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends ImageProps {
    src: string
}

function CardImage(props: Props) {
    const { src } = props

    return (
        <Box {...props}>
            <Image
                {...props}
                rounded={'lg'}
                width="100%"
                h="100%"
                objectFit={'cover'}
                src={src}
                alt={src}
                fallbackSrc={src}
            />
        </Box>
    )
}

export default CardImage
