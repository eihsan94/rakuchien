import { FC } from 'react'
import { Center, Box, useColorModeValue, BoxProps } from '@chakra-ui/react'

interface Props extends BoxProps {

}

const Card: FC<Props> = (props: Props) => {
    const { children } = props
    return (
        <Center py={12} {...props}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
            >
                {children}
            </Box>
        </Center>
    )
}

export default Card
