import {
    Box,
    SimpleGrid,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { BiCloudUpload } from 'react-icons/bi';
import Layout from '../../customs/components/base/layout'
import BookingCard from '../../customs/components/cards/bookingCard';
import { useCrudHooks } from '../../core/hooks/useCrudHooks';
import { useI18n } from '../../core/hooks/useI18n';
import { Booking } from '../../customs/types';


const Index: FC = () => {
    const { data: bookings, loading, error, reqLoading, deleteHandler } = useCrudHooks('bookings')
    const { translate } = useI18n()
    if (bookings) {
        bookings.sort((a: Booking, b: Booking) => (new Date(b.date) as any) - (new Date(a.date) as any)) // sort booking by the latest date
    }
    return (
        <Layout title={translate('BOOKINGS_PAGE_TITLE')} description="Don't miss it 😉" loading={loading} error={error}>
            {reqLoading &&
                <Box fontSize={"2em"} color="blue" pos="fixed" zIndex={2} right={"1em"} bottom={{ base: "3em", md: "1em" }}><BiCloudUpload /></Box>
            }
            {
                bookings &&
                <SimpleGrid pt={{ base: "1em" }} pb={{ base: "5em" }} columns={{ sm: 2, md: 2, lg: 3, xl: 4 }} spacing={{ base: "20px", md: "40px" }}>
                    {bookings.map((b: Booking, i: number) =>
                        <BookingCard
                            key={i}
                            booking={b}
                            deleteHandler={deleteHandler}
                            _notLast={{ mr: 8 }}
                        />
                    )}
                </SimpleGrid>
            }
        </Layout>
    )
}

export default Index
