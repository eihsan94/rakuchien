import { Button } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Layout from '../../components/base/layout'
import { redirectTop } from '../../utils/ssrAuth'

interface Props { }

function Index(props: Props) {
    const { data: session } = useSession()
    return (
        <Layout title='Profile' description={`Welcome back ${session?.user?.name}`}>
            <Button onClick={() => signOut()}>
                Sign Out
            </Button>
        </Layout>
    )
}

export default Index


export const getServerSideProps: GetServerSideProps = async (context) => {
    return redirectTop(context)
};