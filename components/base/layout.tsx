import { Container } from '@chakra-ui/react'
import React, { FC } from 'react'
import NavBar from './navbar'

interface Props {}

const Layout:FC<Props> = ({children}) => {
    return (
        <Container maxW={'7xl'} py="90px">
            <NavBar />
            {children}
        </Container>
    )
}

export default Layout
