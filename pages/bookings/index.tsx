import {
    Flex,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import Layout from '../../components/base/layout'
import BookingCard from '../../components/cards/bookingCard';
import { useBookingHooks } from '../../hooks/bookingsHooks';
import { Booking } from '../../types';


const Index: FC = () => {
    const { bookings, loading, error } = useBookingHooks()

    return (
        <Layout title="Bookings" description="Don't miss it 😉" loading={loading} error={error}>
            {
                bookings && <Flex flexWrap={"wrap"} justifyContent={{ base: "center", md: "flex-start" }}>
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

