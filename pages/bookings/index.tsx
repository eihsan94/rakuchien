import {
    Avatar,
    Box,
    Button,
    Flex,
    SimpleGrid,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    UseToastOptions,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { BiCloudUpload } from 'react-icons/bi';
import Layout from '../../customs/components/base/layout'
import BookingCard from '../../customs/components/cards/bookingCard';
import { useCrudHooks } from '../../core/hooks/useCrudHooks';
import { useI18n } from '../../core/hooks/useI18n';
import { Booking } from '../../customs/types';
import Tables from 'core/views/Dashboard/Tables';
import Card from '@components/Card/Card';
import CardHeader from '@components/Card/CardHeader';
import CardBody from '@components/Card/CardBody';
import TablesTableRow from '@components/Tables/TablesTableRow';
import { tablesTableData } from 'core/variables/general';
import logo from 'customs/icons/logo';
import email from 'next-auth/providers/email';
import { fmtDate, fmtDay, fmtTime } from '@utils/dateUtils';
import { JPY } from '@utils/currencyUtils';
import NoResultLottie from 'customs/lottie/no-result';
import NextLink from '@components/NextLink';



const BookingTable: FC<{ bookings: Booking[] }> = ({ bookings }) => {
    const textColor = useColorModeValue("gray.700", "white");

    return (
        <Card overflow={{ sm: "scroll" }}>
            <CardHeader p="6px 0px 22px 0px">
                <Text variant='pageSectionTitle'>
                    All Booked Lessons
                </Text>
            </CardHeader>
            <CardBody>
                <Table variant="simple" color={textColor}>
                    <Thead>
                        <Tr my=".8rem" pl="0px" color="gray.400">
                            <Th pl="0px" color="gray.400">
                                Lesson
                            </Th>
                            <Th color="gray.400">Date</Th>
                            <Th color="gray.400">Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bookings.map((row, i) => {
                            return (
                                <Tr key={i}>
                                    <Td minWidth={{ sm: "230px" }} pl="0px">
                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                            <Avatar src={row.lesson.image} w="50px" borderRadius="12px" me="18px" />
                                            <Flex direction="column">
                                                <Text
                                                    fontSize="md"
                                                    color={textColor}
                                                    fontWeight="bold"
                                                    minWidth="100%"
                                                >
                                                    {row.lesson.name}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                    <Td minWidth={"300px"}>
                                        <Flex align={"center"} fontSize="sm"
                                            color={textColor}>
                                            <Text fontWeight="bold" >{fmtDate(row.date)}</Text>
                                            （{fmtTime(row.date)}）
                                            <Text ml="10px" variant='dayLabel'>
                                                {fmtDay(row.date)}
                                            </Text>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Text
                                            fontSize="md"
                                            color={textColor}
                                            fontWeight="bold"
                                            minWidth="100%"
                                        >
                                            {JPY(row.totalPrice).format()}
                                        </Text>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

const NearestBookings: FC<{ bookings: Booking[], deleteHandler: (pk: string, successToastOptions: UseToastOptions) => Promise<void> }> = ({ bookings, deleteHandler }) => {
    const displayBookings = bookings.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)) // sort booking by the latest date
    return (
        <Box>
            <Text variant="pageSectionTitle">Next Lessons</Text>
            <SimpleGrid w="100%" pt={{ base: "1em" }} pb={{ base: "5em" }} columns={{ sm: 1, md: 2, lg: 2, xl: 2 }} spacing={"20px"}>
                {displayBookings.map((b: Booking, i: number) =>
                    <BookingCard
                        key={i}
                        booking={b}
                        deleteHandler={deleteHandler}
                        _notLast={{ mr: 8 }}
                    />
                )}
            </SimpleGrid>
        </Box>
    )
}

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
                <>
                    {bookings.length
                        ? <SimpleGrid pt={{ base: "1em" }} pb={{ base: "10em" }} columns={{ sm: 1, md: 1, lg: 1, xl: 2 }} spacing={{ base: "20px", md: "40px" }}>
                            <NearestBookings bookings={bookings} deleteHandler={deleteHandler} />
                            <BookingTable bookings={bookings} />
                        </SimpleGrid>
                        : <Box>
                            <NoResultLottie />
                            <Text>
                                You have no booking now
                            </Text>
                            <NextLink href="/lessons">
                                <Button variant="solid" mt="1em">
                                    Book new lessons
                                </Button>
                            </NextLink>
                        </Box>
                    }
                </>
            }
        </Layout >
    )
}

export default Index
