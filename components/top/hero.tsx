import { Box, BoxProps, Container, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Typewriter from 'typewriter-effect';
import HeroImage from '../images/heroImage';

function Hero(props: BoxProps) {
    return (
        <>
            <Box
                {...props}
                pt={{base:"150px", md:"150px"}}
                pb={{base:"50px", md:"150px"}}
            >
                <HeroTitle />
                <HeroImage mt={{base:"50px", md:"0"}} borderRadius={"full"} bg="beige" pos={{md:"absolute", base: "initial"}} color={"beige"} w={{base:"350px", md:"400px"}} top="300px" left={{md: "50%", base: "0%"}} />
            </Box>
        </>
    )
}

export default Hero


/**
 * @returns HEADING FOR HERO
 */
const HeroTitle = () => (
    <Container maxW={'5xl'}>
        <Text variant="heroTitle">where learning is</Text>
        <Box
            mt="10px"
            fontSize={{md: "80px", base:"55px"}}
            lineHeight={{md: "70px", base:"55px"}}
            fontWeight="800"
            textShadow={"3px 3px blue"}
            textTransform="capitalize"
            color="#E7F1FC"
        >
            <Typewriter
                options={{
                    loop: true,
                }}
                onInit={(typewriter)=> {
                    const words = ["fun", "enjoyable", "interesting", "rakuchien"]
                    words.map((w) => 
                        typewriter
                            .typeString(w)
                            .pauseFor(1000)
                            .deleteAll()
                            .start()
                    )
                }}
                />
        </Box>
        <HeroSubtitle />
        <CTABtn />
    </Container>
)

/**
 * @returns HEADING FOR HERO
 */
const HeroSubtitle = (props:BoxProps) => (
    <Box w={300} my="57px" {...props}>
        <Text variant="heroSubtitle">
            Rakuchien is a community of learners and teachers interacting with each other to learn new things while having fun!
        </Text>
    </Box>
)

/**
 * @returns CTA BTN
 */
const CTABtn = () => (
    <Box 
        px="60px" 
        py="20px" 
        borderRadius={"20px"} 
        bg="white" 
        w="fit-content"
        backgroundImage="url(/images/ctaBtn.svg)"
        backgroundPosition="-18%, 40%"
        backgroundSize="auto"
        backgroundRepeat="no-repeat"
        fontSize={"20px"}
        fontWeight={"bold"}
        transition={"all .3s ease"}
        pos="relative"
        as={'a'}
        href='/booking'
        _hover={{
            bg: "purple",
            color: "white"
        }}
    >
        <Flex bg="#4312f2" h="2em" px="20px" py="10px" justifyContent={"center"} borderRadius={"5px"} pos={"absolute"} left="-10px" top={"25%"}>
            <Image h="100%" src="/images/clickIcon.png" alt="/images/clickIcon.png" fallbackSrc="/images/clickIcon.png"/>
        </Flex>
        Begin Learning
    </Box>
)