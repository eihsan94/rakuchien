import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useSWR from 'swr'
import Layout from '../../../components/base/layout'
import { CircleCheckIcon } from '../../../components/icons/menuIcons'
import ThanksPageImage from '../../../components/images/thanksPageImage'

const ResultPage: NextPage = () => {
  // const router = useRouter()

  // // Fetch CheckoutSession from static page via
  // // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  // const { data, error } = useSWR(
  //   router.query.session_id
  //     ? `/api/checkout_sessions/${router.query.session_id}`
  //     : null,
  //   fetchGetJSON
  // )
  // console.log(data);
  // if (error) return <div>failed to load</div>

  return (
    <Layout title="Payment Complete" description="Thank you for booking 🙌🏻😉">
      <Box shadow={"xl"} w="350px" p="8" borderRadius={"xl"} bg="#6441F1" mt="8" pos="relative">
        <ThanksPageImage w="100px" h="100px" color="black" mb="20px" />
        <Flex direction={"column"} alignItems={"flex-end"} color={"white"} pos="absolute" right="1.5em" top="1.5em">
          <CircleCheckIcon  color={"white"} h="50px" w="50px"/>
          <Text w="180px" fontSize={"1.1em"}>We booked your lesson successfully</Text>
        </Flex>
        <Button as="a" href="/bookings" w="100%" >
          Look at your bookings
        </Button>
      </Box>
        
    </Layout>
  )
}

export default ResultPage
