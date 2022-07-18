import {
    Box,
    Grid,
    Text,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import Layout from '../../customs/components/base/layout'
import CourseBookingCard from '../../customs/components/cards/courseCard'
import { Course } from '../../customs/types'
import { gql, useQuery } from '@apollo/client';
import LoadingSpinner from '../../customs/components/loadingSpinner'
import { useI18n } from '../../core/hooks/useI18n'
import { COURSE_LISTS_QUERY } from '@queries/courseQuery'



const Index: FC = () => {
    const { loading, error, data } = useQuery(COURSE_LISTS_QUERY);
    const { translate } = useI18n()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        if (data) {
            setCourses(data.courseCollection.items)
        }
    }, [data])

    return (
        <Layout title={translate('COURSES_PAGE_TITLE')} description="Let's learn 🤓">
            {
                loading
                    ? <LoadingSpinner />
                    : error
                        ? <Text variant="error">{JSON.stringify(error)}</Text>
                        : <Box w="100%">
                            {courses.map((c: Course, i: number) => <CourseBookingCard key={i} course={c} />)}
                        </Box>
                // <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={16} w="100%">
                //     {courses.map((c: Course, i: number) => <CourseBookingCard key={i} course={c} />)}
                // </Grid>
            }
        </Layout>
    )
}

export default Index

