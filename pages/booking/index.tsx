import { 
    Spinner,
    Grid
 } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import React, { FC } from 'react'
import Layout from '../../components/base/layout'
import LessonBookingCard from '../../components/cards/lessonBookingCard'
import { Lesson } from '../../types'
import { gql } from '@apollo/client';
import { graphqlClient } from '../../utils/gqlClient'


export const getStaticProps: GetStaticProps = async() =>{
    const { data } = await graphqlClient.query({
        query: gql`
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
        `,
    });
    return {
      props: {
        lessons: data.lessonCollection.items
      },
      revalidate: 5,
    };
}

interface Props {
    lessons: Lesson[]
}


const Index:FC<Props> = ({lessons}) => {

    return (
        <Layout>
            {
                lessons 
                    ? 
                    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                        {lessons.map((l:Lesson, i: number) => <LessonBookingCard key={i} lesson={l} />)}
                    </Grid>
                    : <Spinner />
            }
        </Layout>
    )
}

export default Index

