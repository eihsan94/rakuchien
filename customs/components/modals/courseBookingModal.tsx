import { FC, useState } from 'react'
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
import { Course, Lesson } from '../../types'
import { ScheduleIcon } from '../../icons/menuIcons'
import Stepper, { StepConfigProps } from '../stepper'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useSession } from 'next-auth/react'
import { JPY } from '@utils/currencyUtils'
import { fmtDay, fmtDate, fmtTime } from '@utils/dateUtils'
import { postBookings } from '@queries/bookingQueries'
import { useRouter } from 'next/router'

const primary = "#6441F1"

interface Props {
  isOpen: boolean
  onClose: () => void
  course: Course
}

const CourseBookingModal: FC<Props> = ({ isOpen, onClose, course }) => {
  const { data: session } = useSession()
  const [bookingLoading, setBookingLoading] = useState(false)
  const router = useRouter()
  const onCloseModal = () => {
    onClose()
  }

  // MODAL CONTENT
  const steps: StepConfigProps[] = [
    // FIRST STEP
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
                <Th>
                  Name
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {course.lessonsCollection.items.map((l: Lesson, i: number) =>
                <Tr key={i}>
                  <Td>
                    <Text bg={primary} color={"white"} py="1" px="1.5" w="fit-content" borderRadius={"full"}>{fmtDay(l.startDate)}</Text>
                  </Td>
                  <Td>
                    <Text fontWeight={"bold"}>{fmtDate(l.startDate)}</Text>
                  </Td>
                  <Td>
                    <Text fontSize={"1.5em"}>{fmtTime(l.startDate)}</Text>
                  </Td>
                  <Td>
                    <Text>{l.name}</Text>
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
    await postBookings(customer_email, course, router.asPath)
    setBookingLoading(false)

  }
  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>
            {course.title} Booking
          </Text>
          <Text>
            {JPY(course.price).format()}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stepper
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CourseBookingModal
