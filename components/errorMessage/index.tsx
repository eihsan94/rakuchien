import { Text, Box, Button, BoxProps } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

export interface ErrorProps {
    message: string,
    status: number,
}

const ErrorMessage: FC<ErrorProps> = ({ message, status }) => {
    console.log(status);

    const boxStyle: BoxProps = {
        bg: "red.200",
        p: 8,
        borderRadius: 8,
    }

    return (
        <Box {...boxStyle}>
            <Text variant='error' fontWeight={"bold"} >{status}</Text>
            <Text variant='error'>{message}</Text>
            <ErrorAction status={status} />
        </Box>
    )
}

export default ErrorMessage

const ErrorAction = ({ status }: { status: number }) => {
    const router = useRouter()
    const actionBtn = () => {
        switch (status) {
            case 401:
                return <Button colorScheme={"red"} onClick={() => signIn('google', { callbackUrl: router.pathname })}>Log in</Button>

            default:
                return <Button colorScheme={"red"} onClick={() => router.back()}>Go back</Button>
        }
    }
    return <>{actionBtn()}</>
}