import {
    Box,
    Flex,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { BiCloudUpload } from 'react-icons/bi';
import Layout from '../../components/base/layout'
import BookingCard from '../../components/cards/bookingCard';
import { useCrudHooks } from '../../hooks/useCrudHooks';
import { Booking } from '../../types';



const Index: FC = () => {
    const { data: bookings, loading, error, reqLoading, deleteData } = useCrudHooks('bookings')

    if (bookings) {
        bookings.sort((a: Booking, b: Booking) => (new Date(b.date) as any) - (new Date(a.date) as any)) // sort booking by the latest date
    }
    return (
        <Layout title="Bookings" description="Don't miss it 😉" loading={loading} error={error}>
            {reqLoading &&
                <Box fontSize={"2em"} color="blue" pos="fixed" zIndex={2} right={"1em"} bottom={{ base: "3em", md: "1em" }}><BiCloudUpload /></Box>
            }
            {
                bookings && <Flex flexWrap={"wrap"} justifyContent={{ base: "center", md: "flex-start" }}>
                    {bookings.map((b: Booking, i: number) =>
                        <BookingCard key={i} booking={b}
                            deleteData={deleteData}
                            _notLast={{ mr: 8 }}
                        />
                    )}
                </Flex>
            }
        </Layout>
    )
}

export default Index
