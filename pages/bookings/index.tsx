import {
    Spinner,
    Flex,
    Box,
    Text,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import Layout from '../../components/base/layout'
import BookingCard from '../../components/cards/bookingCard';
import { getAllBookings } from '../../queries/bookingQueries';
import { Booking } from '../../types';

const Index: FC = () => {
    const [loading, setLoading] = useState(false)
    const [bookings, setBookings] = useState<Booking[]>([])
    useEffect(() => {
        (async () => {
            setLoading(true)
            const b = await getAllBookings()
            console.log(b);
            setBookings(b)
            setLoading(false)
        })()
    }, [])

    return (
        <Layout title="Bookings" description="Don't miss it 😉">
            {
                loading
                    ? <Flex justifyContent={"center"} p={16} >
                        <Spinner color={"#775AF2"} size="xl" thickness='8px' emptyColor='pink' borderRadius={"full"} />
                    </Flex>
                    : <Flex flexWrap={"wrap"}>
                        {bookings.map((b: Booking, i: number) =>
                            <BookingCard key={i} booking={b}
                                _notLast={{ mr: 8 }}
                            />
                        )}
                    </Flex>
            }
        </Layout>
    )
}

export default Index

