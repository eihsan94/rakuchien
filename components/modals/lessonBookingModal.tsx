import { FC, useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Spinner,
  Text,
  Box,
  Table,
  Th,
  Td,
  Thead,
  Tr,
  Tbody,
} from '@chakra-ui/react'
import { Lesson, Schedule } from '../../types'
import { gql, useQuery } from '@apollo/client'
import { fmt, fmtDate, fmtDay, fmtTime, parse } from '../../utils/dateUtils'
import { JPY } from '../../utils/currencyUtils'
import { ScheduleIcon } from '../icons/menuIcons'
import Stepper, { StepConfigProps } from '../stepper'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { fetchPostJSON } from '../../utils/stripe/api-helpers'
import getStripe from '../../utils/stripe/get-stripejs'
import { useSession } from 'next-auth/react'

const primary = "#6441F1"

interface Props {
  isOpen: boolean
  onClose: () => void
  lesson: Lesson
}

const GET_LESSON_COLLECTIONS = (id: string) => gql`
  {
    lesson(id:"${id}") {
      schedulesCollection {
        items {
          sys {
            id
          }
          date
        }
      }
    }
  }
`

const LessonBookingModal: FC<Props> = ({ isOpen, onClose, lesson }) => {
  const { data: session } = useSession()
  const { loading, error, data } = useQuery<{ lesson: Lesson }>(GET_LESSON_COLLECTIONS(lesson.sys.id));
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [booking, setBooking] = useState<{ dates: string[], totalPrice: number }>({
    dates: [],
    totalPrice: 0,
  })
  const onSelectSchedule = (s: Schedule) => {
    const protoBooking = { ...booking }
    const index = protoBooking.dates.findIndex(d => d === s.date)
    if (index > -1) {
      protoBooking.dates.splice(index, 1)
    } else {
      protoBooking.dates.push(s.date)
    }
    protoBooking.totalPrice = lesson.price * protoBooking.dates.length
    setBooking(protoBooking)
  }
  const onReset = () => {
    const protoBooking = { ...booking }
    protoBooking.dates = []
    protoBooking.totalPrice = 0
    setBooking(protoBooking)
  }
  useEffect(() => {
    if (data) {
      setSchedules(data.lesson.schedulesCollection.items)
    }
  }, [data])

  const onCloseModal = () => {
    onClose()
    onReset()
  }

  // MODAL CONTENT
  const steps: StepConfigProps[] = [
    // FIRST STEP
    {
      content: <Flex flexWrap={"wrap"}>
        {schedules.map((s: Schedule, i: number) => <ScheduleItem key={i} schedule={s} onSelectSchedule={onSelectSchedule} selectedDates={booking.dates} />)}
      </Flex>,
      nextBtn:
        <Button
          disabled={booking.dates.length === 0}
          variant="primary"
          rightIcon={<ArrowForwardIcon />}
        >
          next
        </Button>,
    },
    // SECOND STEP
    {
      content:
        <Box>
          <Flex flexDirection={{ base: "column", md: "row" }} justifyContent={"space-between"} >
            <Box flex={1}>
              <Text>Name</Text>
              <Text>{session?.user?.name}</Text>
            </Box>
            <Box flex={1} ml={{ base: "", md: 8 }} mt={{ base: "4", md: "0" }}>
              <Text>Email</Text>
              <Text>{session?.user?.email}</Text>
            </Box>
          </Flex>
          <Table mt="2">
            <Thead>
              <Tr>
                <Th>
                  Day
                </Th>
                <Th>
                  Date
                </Th>
                <Th>
                  Time
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {booking.dates.map((d: string, i: number) =>
                <Tr key={i}>
                  <Td>
                    <Text bg={primary} color={"white"} py="1" px="1.5" w="fit-content" borderRadius={"full"}>{fmtDay(d)}</Text>
                  </Td>
                  <Td>
                    <Text fontWeight={"bold"}>{fmtDate(d)}</Text>
                  </Td>
                  <Td>
                    <Text fontSize={"1.5em"}>{fmtTime(d)}</Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>

      ,
      backBtn: <Button
        leftIcon={<ArrowBackIcon />}
      >
        back
      </Button>,
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>
            {lesson.name} Booking
          </Text>
          <Text>
            {JPY(booking.totalPrice).format()}
          </Text>
          <Text fontWeight={"normal"} color="gray.500" fontSize={"15px"}>
            {JPY(lesson.price).format()} per lesson
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            loading
              ? <Flex justifyContent={"center"} p={16}>
                <Spinner color={"#775AF2"} size="xl" thickness='8px' emptyColor='pink' borderRadius={"full"} />
              </Flex>
              : error
                ? <Text variant="error">{JSON.stringify(error)}</Text>
                : <Stepper
                  steps={steps}
                  finalStepBtn={
                    <Button
                      variant="primary"
                      isLoading={paymentLoading}
                      rightIcon={<ScheduleIcon color="white" fontSize={"22px"} />}
                      onClick={async () => {
                        setPaymentLoading(true)
                        // Create a Checkout Session.
                        const response = await fetchPostJSON('/api/checkout_sessions', {
                          line_items: booking.dates.map((d) => ({
                            name: `${lesson.name} - ${fmt(parse(d), "yyyy年MM月dd日 (eee) HH:mm")}`,
                            images: [lesson.image.url],
                            amount: lesson.price,
                            quantity: 1,
                          })),
                          customer_email: session?.user?.email,
                          success_url: '/lessons/result',
                          cancel_url: '/lessons',
                        })

                        if (response.statusCode === 500) {
                          console.error(response.message)
                          return
                        }

                        // Redirect to Checkout.
                        const stripe = await getStripe()
                        const { error } = await stripe!.redirectToCheckout({
                          // Make the id field from the Checkout Session creation API response
                          // available to this file, so you can provide it as parameter here
                          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                          sessionId: response.id,
                        })
                        console.warn(error.message)
                        setPaymentLoading(false)

                        // TODO IN CONtentFUL create new booking records with user details init
                        // TODO after stripe payment handler succeed open google calendar and connect user to it

                      }}
                    >
                      Book
                    </Button>
                  }
                />
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default LessonBookingModal

interface ScheduleItemProps {
  schedule: Schedule
  onSelectSchedule: (s: Schedule) => void
  selectedDates: string[]
}
const ScheduleItem: FC<ScheduleItemProps> = ({ schedule, onSelectSchedule, selectedDates }) => {
  const selected = !!selectedDates.find(d => d === schedule.date)
  const onSelectScheduleItem = () => {
    onSelectSchedule(schedule)
  }

  return (
    <Box
      shadow={"xl"}
      p={8} pos="relative"
      w={{ base: "100%", md: "fit-content" }}
      bg={selected ? primary : 'white'}
      color={selected ? 'white' : 'black'}
      _notFirst={{
        ml: { base: 0, md: "3em" },
        mt: { base: "1em", md: 0 },
      }}
      transition={"all .3s ease"}
      cursor={"pointer"}
      _hover={{
        transform: "skewY(-1.5deg) scale(1.1)",
      }}
      onClick={onSelectScheduleItem}
      borderRadius={"xl"}
    >
      <Text fontSize={"1.5em"}>{fmtTime(schedule.date)}</Text>
      <Text fontWeight={"bold"}>{fmtDate(schedule.date)}</Text>
      <Text pos="absolute" top="1em" right="1em" bg={primary} color={"white"} p="2" px="3" borderRadius={"full"}>{fmtDay(schedule.date)}</Text>
    </Box>
  )
}