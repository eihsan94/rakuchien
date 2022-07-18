import { gql } from '@apollo/client'
import { Text, Box, Heading, VStack, Wrap, WrapItem, Image, Button, HStack, Divider, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react'
import Card from '@components/Card/Card'
import CRender from '@components/CRender'
import { JPY } from '@utils/currencyUtils'
import { fmtDate } from '@utils/dateUtils'
import { graphqlClient } from '@utils/gqlClient'
import Layout from 'customs/components/base/layout'
import CourseAuthor from 'customs/components/courseAurhors'
import CourseTags from 'customs/components/courseTags'
import { useWindowSize } from "customs/hooks/useWindowSize"
import { Course, Lesson } from 'customs/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getCourseByIdQuery } from '@queries/courseQuery'
import React, { FC, useEffect, useState } from 'react'

interface Props {
    course: Course
}

function Course({ course }: Props) {
    const { title, description, teacher, imagesCollection, categories, requirements, price, lessonsCollection } = course
    const [cTitle, setCTitle] = useState("")
    const { width } = useWindowSize()
    useEffect(() => {
        if (width > 600) {
            setCTitle(title)
        }
    }, [title, width])
    const EnrollElement = <HStack mt="1em" w="100%">
        <Button mr="auto">
            Enroll now!🤞🏼
        </Button>
        <Text fontSize='2xl' fontWeight={"bold"} pr="1em">
            {JPY(price).format()}
        </Text>
    </HStack>
    return (
        <Layout title={cTitle} description={""}>
            <Box pb="10em" pos="relative" pt={{ base: "6em", md: "0" }}>
                <Box display={{ base: "none", md: "initial" }}>
                    {EnrollElement}
                    <Divider mt="1em" />
                </Box>
                <Card w="100%" pos="fixed" top="0" left="0" display={{ base: "initial", md: "none" }}>
                    <Heading as="h1" fontSize={"md"}>
                        {title}
                    </Heading>
                    {EnrollElement}
                </Card>
                <Wrap spacing="30px" marginTop="5">
                    <WrapItem width={{ base: '100%', sm: '100%', md: '45%', lg: '30%' }}>
                        <Box w="100%">
                            <Box borderRadius="lg" overflow="hidden">
                                <Image
                                    src={imagesCollection.items[0].url}
                                    alt="some text"
                                    objectFit="contain"
                                    width="100%"
                                />
                            </Box>
                            {categories && <CourseTags tags={categories} marginTop="3" />}
                            <Box p={"1em"}>
                                <Heading fontSize="xl" marginTop="2">
                                    Requirements
                                </Heading>
                                <Text as="p" fontSize="md" marginTop="2">
                                    {requirements && <CRender json={requirements.json} />}
                                </Text>
                                <CourseAuthor {...teacher} />
                            </Box>
                        </Box>
                    </WrapItem>
                </Wrap>
                <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
                    <Heading as="h2">What we will learn about</Heading>
                    {description && <CRender json={description.json} />}
                </VStack>
                <VStack paddingTop="40px" spacing="2" alignItems="flex-start" w="100%">
                    <Heading as="h2">The Lessons content</Heading>
                    <Lessons lessons={lessonsCollection.items} />
                </VStack>
            </Box>
        </Layout >
    )
}

export default Course


const Lessons: FC<{ lessons: Lesson[] }> = ({ lessons }) => {

    return (
        <Accordion allowMultiple w="100%" py="1em">
            {
                lessons.map(({ name, description, startDate, endDate }, i) =>
                    <AccordionItem key={i} py="1em">
                        <Heading as="h2">
                            <AccordionButton py="1em">
                                <Box flex='1' textAlign='left' fontWeight={"bold"}>
                                    {/* 1. need to putthe schedule and shit
                                    2. connect the enroll now button to payment and registration and shit */}
                                    {name}
                                    <Text mt="1em" fontSize={"xs"} color="rgba(0,0,0,.5)">
                                        {fmtDate(startDate)}
                                    </Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                        <AccordionPanel pb={4}>
                            {description && <CRender json={description.json} />}
                        </AccordionPanel>
                    </AccordionItem>
                )}
        </Accordion>
    )
}



export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const { id } = context.params!
    const course = await getCourseByIdQuery(`${id}`)
    return {
        props: {
            course
        },
        revalidate: 10, // In seconds
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await graphqlClient.query({
        query: gql`
            {
                courseCollection {
                    items {
                        sys {
                            id
                        }
                    }
                }
            }
        `
    })

    const { courseCollection } = data

    const paths = courseCollection.items.map((d: Course) => ({
        params: { id: d.sys.id }
    }))

    return {
        paths,
        fallback: false,
    };
};


