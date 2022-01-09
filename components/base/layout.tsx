import { Container } from '@chakra-ui/react'
import React, { FC } from 'react'
import NavBar from './navbar'

interface Props {}

const Layout:FC<Props> = ({children}) => {
    return (
        <Container maxW={'7xl'} py="50px">
            <NavBar margin="auto"/>
            {children}
        </Container>
    )
}

export default Layout
