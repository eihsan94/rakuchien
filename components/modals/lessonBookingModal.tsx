import {FC, useEffect, useState} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Spinner,
    Text,
    Box,
    Input,
  } from '@chakra-ui/react'
import { Lesson, Schedule } from '../../types'
import { gql, useQuery } from '@apollo/client'
import { fmt, parse } from '../../utils/dateUtils'
import { JPY } from '../../utils/currencyUtils'
import { ScheduleIcon } from '../icons/menuIcons'
import Stepper, { StepConfigProps } from '../stepper'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

const primary = "#6441F1"

interface Props {
    isOpen: boolean
    onClose: () => void
    lesson: Lesson
}

const GET_LESSON_COLLECTIONS = (id: string) =>  gql`
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

const LessonBookingModal:FC<Props> = ({isOpen, onClose, lesson}) => {
  const { loading, error, data } = useQuery<{lesson: Lesson}>(GET_LESSON_COLLECTIONS(lesson.sys.id));
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('') // TODO add email from global login context
  const [booking, setBooking] = useState<{dates: string[], totalPrice: number}>({
    dates:[],
    totalPrice: 0,
  })
  const onSelectSchedule = (s: Schedule) => {
    const protoBooking = {...booking}
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
    const protoBooking = {...booking}
    protoBooking.dates = []
    protoBooking.totalPrice = 0
    setBooking(protoBooking)
  }
  useEffect(() => {
      if (data) {
          setSchedules(data.lesson.schedulesCollection.items)
      }
  },[data])

  const onCloseModal = () => {
    onClose()
    onReset()
  }

  // MODAL CONTENT
  const steps: StepConfigProps[] = [
    // FIRST STEP
    {
      content:<Flex flexWrap={"wrap"}>
          {schedules.map((s:Schedule, i: number) => <ScheduleItem key={i} schedule={s} onSelectSchedule={onSelectSchedule} selectedDates={booking.dates}/>)}
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
      content:<Flex flexDirection={{base:"column", md:"row"}} justifyContent={"space-between"} >
          <Box flex={1}>
            <Text>Name</Text>
            <Input onChange={(evt) => setName(evt.target.value)}/>
          </Box>
          <Box flex={1} ml={{base:"", md:8}} mt={{base:"4", md:"0"}}>
            <Text>Email</Text>
            <Input type="email" onChange={(evt) => setEmail(evt.target.value)}/>
          </Box>
      </Flex>,
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
                  <Spinner color={"#775AF2"} size="xl" thickness='8px' emptyColor='pink' borderRadius={"full"}/>
              </Flex>
              :error 
                ? <Text variant="error">{JSON.stringify(error)}</Text>
                : <Stepper steps={steps}  
                    finalStepBtn={
                      <Button
                        disabled={!email || !name}
                        variant="primary"
                        rightIcon={<ScheduleIcon color="white" fontSize={"22px"} />}
                        onClick={() => {
                          
                          // TODO [make this last] ask them to login first

                          // TODO add stripe payment handler here
                          // TODO IN CONtentFUL create new booking records with user details init
                          // TODO IN FRONTEND create request for create new booking
                          console.log(email, name);
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
const ScheduleItem:FC<ScheduleItemProps> = ({schedule, onSelectSchedule, selectedDates}) => {
  const fmtDate = fmt(parse(schedule.date), "yyyy年MM月dd日")
  const fmtTime = fmt(parse(schedule.date), " HH:mm")
  const fmtDay = fmt(parse(schedule.date), "eee")
  const selected = !!selectedDates.find(d => d === schedule.date) 
  const onSelectScheduleItem = () => {
    onSelectSchedule(schedule)
  }

  return (
    <Box 
      shadow={"xl"} 
      p={8} pos="relative" 
      w={{base:"100%", md:"fit-content"}} 
      bg={selected ? primary : 'white'} 
      color={selected ? 'white' : 'black'} 
      _notFirst={{
        ml:{base:0, md:"3em"},
        mt:{base:"1em", md:0},
      }} 
      transition={"all .3s ease"}
      cursor={"pointer"}
      _hover={{
        transform:"skewY(-1.5deg) scale(1.1)",
      }}
      onClick={onSelectScheduleItem}
      borderRadius={"xl"}
    >
      <Text fontSize={"1.5em"}>{fmtTime}</Text>
      <Text fontWeight={"bold"}>{fmtDate}</Text>
      <Text pos="absolute" top="1em" right="1em" bg={primary} color={"white"} p="2" px="3" borderRadius={"full"}>{fmtDay}</Text>
    </Box>
  )
}