import {
    Box,
    Flex,
    Text,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { BiCloudUpload } from 'react-icons/bi';
import Layout from '../../customs/components/base/layout'
import BookingCard from '../../customs/components/cards/bookingCard';
import { useCrudHooks } from '../../core/hooks/useCrudHooks';
import { useI18n } from '../../core/hooks/useI18n';
import { Booking } from '../../customs/types';
import Card from '@components/Card/Card';
import Dashboard from 'core/views/Dashboard/Dashboard';



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
            <Dashboard />
            {/* {
                bookings && <Flex flexWrap={"wrap"} justifyContent={{ base: "center", md: "flex-start" }}>
                    {bookings.map((b: Booking, i: number) =>
                        <Card key={i}>
                            {JSON.stringify(b)}
                        </Card>
                        // <BookingCard
                        //     key={i}
                        //     booking={b}
                        //     deleteHandler={deleteHandler}
                        //     _notLast={{ mr: 8 }}
                        // />
                    )}
                </Flex>
            } */}
        </Layout>
    )
}

export default Index
