import React, { FC } from 'react'
import Layout from '../../customs/components/base/layout'
import { useI18n } from '../../core/hooks/useI18n'
import Dashboard from 'core/views/Dashboard/Dashboard';


const Index: FC = () => {
    // const { loading, error, data } = useQuery(GET_LESSON_COLLECTIONS);
    const { translate } = useI18n()

    return (
        <Layout title={translate('HOME_PAGE_TITLE')} description="Welcome Back, we miss you 🥰">
            <Dashboard />
        </Layout>
    )
}

export default Index

