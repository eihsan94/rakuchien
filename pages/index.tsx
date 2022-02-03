import { Container, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Hero from '../components/top/hero'
import Navbar from '../components/base/navbar'
import FeatureOffering from '../components/top/feature'
import Testimonials from '../components/top/testimonials'
import Pricing from '../components/top/pricing'
import ContactUs from '../components/top/contactUs'
import Footer from '../components/base/footer'

const Home: NextPage = () => {
  return (
    <>

      <Box
        background={"#F5F8FC"}
        backgroundImage="url(/images/heroBg2.svg), url(/images/heroBg1.svg)"
        backgroundPosition={{ xl: "100% 0%, 50% 0%", md: "80% 0%, 50% 0%", base: "72% 0%, 30% 0%" }}
        backgroundSize="auto, auto"
        backgroundRepeat="no-repeat, no-repeat"
      >
        <Container maxW={'5xl'} >
          <Navbar pos="absolute" />
          <Hero />
        </Container>
        <FeatureOffering />
        <Testimonials />
        <Pricing />
        {/* 
          <ContactUs /> 
          */}
        <Footer />
      </Box>
    </>
  )
}

export default Home
