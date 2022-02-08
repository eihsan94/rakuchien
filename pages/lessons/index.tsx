import {
    Grid,
    Text,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import Layout from '../../customs/components/base/layout'
import LessonBookingCard from '../../customs/components/cards/lessonCard'
import { Lesson } from '../../customs/types'
import { gql, useQuery } from '@apollo/client';
import LoadingSpinner from '../../customs/components/loadingSpinner'
import { useI18n } from '../../core/hooks/useI18n'

const GET_LESSON_COLLECTIONS = gql`
    query {
        lessonCollection {
            items {
                sys {
                    id
                }
                image {
                    url
                }
                categoriesCollection {
                    items {
                        name
                    }
                }
                name
                description
                duration
                url
                price
                teacher {
                    sys {
                        id
                    }
                    name
                    image {
                        url
                    }
                }
            }
        }
    }
`;


const Index: FC = () => {
    const { loading, error, data } = useQuery(GET_LESSON_COLLECTIONS);
    const { translate } = useI18n()
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        if (data) {
            setLessons(data.lessonCollection.items)
        }
    }, [data])

    return (
        <Layout title={translate('LESSONS_PAGE_TITLE')} description="Let's learn 🤓">
            {
                loading
                    ? <LoadingSpinner />
                    : error
                        ? <Text variant="error">{JSON.stringify(error)}</Text>
                        : <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={16} w="100%">
                            {lessons.map((l: Lesson, i: number) => <LessonBookingCard key={i} lesson={l} />)}
                        </Grid>
            }
        </Layout>
    )
}

export default Index

