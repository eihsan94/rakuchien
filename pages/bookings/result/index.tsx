import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useSWR from 'swr'
import Layout from '../../../components/base/layout'
import ErrorCard from '../../../components/cards/errorCard'
import { CircleCheckIcon } from '../../../components/icons/menuIcons'
import ThanksPageImage from '../../../components/images/thanksPageImage'
import LoadingSpinner from '../../../components/loadingSpinner'
import { postSingle } from '../../../utils/crudUtil'

const ResultPage: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    (async () => {
      setLoading(true)
      const bookingItems = JSON.parse(localStorage.getItem("bookingItems") as string)
      if (bookingItems) {
        try {
          await postSingle('bookings/batch', bookingItems)
        } catch (err) {
          setError(JSON.stringify(err))
        }
      }
      setLoading(false)
      localStorage.clear()
    })()
  }, [])

  return (
    <Layout title="Payment Complete" description="Thank you for booking 🙌🏻😉">
      {
        loading
          ? <LoadingSpinner />
          : error
            ? <ErrorCard error={error} />
            : <PaymentComplete />
      }
    </Layout>
  )
}

export default ResultPage


const PaymentComplete = () => (
  <Box shadow={"xl"} w="350px" p="8" borderRadius={"xl"} bg="#6441F1" mt="8" pos="relative">
    <ThanksPageImage w="100px" h="100px" color="black" mb="20px" />
    <Flex direction={"column"} alignItems={"flex-end"} color={"white"} pos="absolute" right="1.5em" top="1.5em">
      <CircleCheckIcon color={"white"} h="50px" w="50px" />
      <Text w="180px" fontSize={"1.1em"}>We booked your lesson successfully</Text>
    </Flex>
    <Button w="100%" >
      <Link href="/bookings">
        Look at your bookings
      </Link>
    </Button>
  </Box>
)