import {
    Spinner,
    Grid,
    Text,
    Flex,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import React, { FC, useEffect, useState } from 'react'
import Layout from '../../components/base/layout'
import LessonBookingCard from '../../components/cards/lessonCard'
import { Lesson } from '../../types'
import { gql, useQuery } from '@apollo/client';
import { graphqlClient } from '../../utils/gqlClient'

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
            teacher {
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
    const [lessons, setLessons] = useState([])
    useEffect(() => {
        if (data) {
            setLessons(data.lessonCollection.items)
        }
    }, [data])

    return (
        <Layout title="Home" description="Welcome Back, we miss you 🥰">
            {
                loading
                    ? <Flex justifyContent={"center"} p={16}>
                        <Spinner color={"#775AF2"} size="xl" thickness='8px' emptyColor='pink' borderRadius={"full"} />
                    </Flex>
                    : error
                        ? <Text variant="error">{JSON.stringify(error)}</Text>
                        : <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={16} w="100%">
                            {/* {lessons.map((l:Lesson, i: number) => <LessonBookingCard key={i} lesson={l} />)} */}
                            home
                        </Grid>
            }
        </Layout>
    )
}

export default Index

