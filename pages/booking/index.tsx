import { AspectRatio, Box, Text } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../components/base/layout'
import NavBar from '../../components/base/navbar'

interface Props {}

function Index(props: Props) {
    const {} = props

    return (
        <Box bg="#FBFCFD">
            <NavBar margin={"auto"}/>
            <AspectRatio h="100vh"  overflow={"hidden"} >
                <iframe
                    title='ihsan sensei booking'
                    src='https://calendly.com/rakuchien/pitch-project?text_color=#1F2949'
                    allowFullScreen
                />
            </AspectRatio>
            <Box position={"fixed"} zIndex={5} right={0} bottom={0} p={8} boxShadow={"xl"} >
                <Text >
                    値段は￥100
                </Text>
            </Box>
        </Box>
    )
}

export default Index
