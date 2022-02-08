import { Text } from '@chakra-ui/react'
import { useCrudHooks } from 'core/hooks/useCrudHooks'
import Layout, { LayoutProps } from 'customs/components/base/layout'
import { useRouter } from 'next/router'
import React from 'react'

interface Props { }

function BookingDetail(props: Props) {
    const router = useRouter()
    const { id, bookingName } = router.query
    const { data, loading, error } = useCrudHooks(`bookings/${id}`)
    const layoutProps: LayoutProps = {
        title: `${bookingName} details`,
        description: `Confirming your booking is a wise choice 🤓`,
        breadCrumbLinks: [
            { name: "Bookings", href: "/bookings" },
            { name: `${bookingName} details`, href: `/bookings/${id}` },
        ],
        loading,
        error
    }
    return (
        <Layout {...layoutProps}>
        </Layout>
    )
}

export default BookingDetail
