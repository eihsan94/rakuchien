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
  Text,
  Box,
  Table,
  Th,
  Td,
  Thead,
  Tr,
  Tbody,
} from '@chakra-ui/react'
import { Lesson, PreBooking, Schedule } from '../../types'
import { gql, useQuery } from '@apollo/client'
import { ScheduleIcon } from '../../icons/menuIcons'
import Stepper, { StepConfigProps } from '../stepper'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useSession } from 'next-auth/react'
import ScheduleItem from '../scheduleItem'
import LoadingSpinner from '../loadingSpinner'
import { JPY } from '@utils/currencyUtils'
import { fmtDay, fmtDate, fmtTime } from '@utils/dateUtils'
import { postBookings } from '@queries/bookingQueries'

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
  const [bookingLoading, setBookingLoading] = useState(false)
  const [preBooking, setPreBooking] = useState<PreBooking>({
    dates: [],
    totalPrice: 0,
  })
  const onSelectSchedule = (s: Schedule) => {
    const protoPreBooking = { ...preBooking }
    const index = protoPreBooking.dates.findIndex(d => d === s.date)
    if (index > -1) {
      protoPreBooking.dates.splice(index, 1)
    } else {
      protoPreBooking.dates.push(s.date)
    }
    protoPreBooking.totalPrice = lesson.price * protoPreBooking.dates.length
    setPreBooking(protoPreBooking)
  }
  const onReset = () => {
    const protoPreBooking = { ...preBooking }
    protoPreBooking.dates = []
    protoPreBooking.totalPrice = 0
    setPreBooking(protoPreBooking)
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
        {schedules.map((s: Schedule, i: number) => <ScheduleItem key={i} schedule={s} onSelectSchedule={onSelectSchedule} selectedDates={preBooking.dates} />)}
      </Flex>,
      nextBtn:
        <Button
          disabled={preBooking.dates.length === 0}
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
              {preBooking.dates.map((d: string, i: number) =>
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
  const submitHandler = async () => {
    // Create a Checkout Session.
    setBookingLoading(true)
    const customer_email = `${session?.user?.email}`
    await postBookings(customer_email, lesson, preBooking)
    setBookingLoading(false)

  }
  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>
            {lesson.name} Booking
          </Text>
          <Text>
            {JPY(preBooking.totalPrice).format()}
          </Text>
          <Text fontWeight={"normal"} color="gray.500" fontSize={"15px"}>
            {JPY(lesson.price).format()} per lesson
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            loading
              ? <LoadingSpinner />
              : error
                ? <Text variant="error">{JSON.stringify(error)}</Text>
                : <Stepper
                  steps={steps}
                  finalStepBtn={
                    <Button
                      variant="primary"
                      isLoading={bookingLoading}
                      rightIcon={<ScheduleIcon color="white" fontSize={"22px"} />}
                      onClick={submitHandler}
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
