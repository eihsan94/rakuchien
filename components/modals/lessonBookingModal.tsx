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
  } from '@chakra-ui/react'
import { Lesson, Schedule } from '../../types'
import { gql, useQuery } from '@apollo/client'
import { fmt, parse } from '../../utils/dateUtils'
import { JPY } from '../../utils/currencyUtils'

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
  const [booking, setBooking] = useState<{dates: string[], totalPrice: number}>({
    dates:[],
    totalPrice: 0,
  })
  const onSelectSchedule = (s: Schedule) => {
    const protoBooking = {...booking}
    const index = protoBooking.dates.findIndex(d => d === s.date)
    console.log(index);
    
    if (index > -1) {
      protoBooking.dates.splice(index, 1)
    } else {
      protoBooking.dates.push(s.date)
    }
    protoBooking.totalPrice = lesson.price * protoBooking.dates.length
    setBooking(protoBooking)
  }
  useEffect(() => {
      if (data) {
          setSchedules(data.lesson.schedulesCollection.items)
      }
  },[data])

  return (
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
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
                : <Flex flexWrap={"wrap"}>
                    {schedules.map((s:Schedule, i: number) => <ScheduleItem key={i} schedule={s} onSelectSchedule={onSelectSchedule} />)}
                </Flex>
          }
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            bg={primary} 
            color="white"
            _hover={{
              transform:"skewY(-1.5deg) scale(1.1)",
            }}
            _focus={{
              transform:"skewY(-1.5deg) scale(1.1)",
            }}
            onClick={() => {
                
            }}
          >Book</Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LessonBookingModal

interface ScheduleItemProps {
  schedule: Schedule
  onSelectSchedule: (s: Schedule) => void
}
const ScheduleItem:FC<ScheduleItemProps> = ({schedule, onSelectSchedule}) => {
  const fmtDate = fmt(parse(schedule.date), "yyyy年MM月dd日")
  const fmtTime = fmt(parse(schedule.date), " HH:mm")
  const fmtDay = fmt(parse(schedule.date), "eee")
  const [select, setSelect] = useState(false)
  const onSelectScheduleItem = () => {
    setSelect(!select)
    onSelectSchedule(schedule)
  }

  return (
    <Box 
      shadow={"xl"} 
      p={8} pos="relative" 
      w={{base:"100%", md:"fit-content"}} 
      bg={select ? primary : 'white'} 
      color={select ? 'white' : 'black'} 
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