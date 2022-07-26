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
  ModalFooter,
} from '@chakra-ui/react'
import { Booking, PreBooking, Schedule } from '../../types'
import { gql, useQuery } from '@apollo/client'
import { ScheduleIcon } from '../../icons/menuIcons'
import Stepper, { StepConfigProps } from '../stepper'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useSession } from 'next-auth/react'
import ScheduleItem from '../scheduleItem'
import LoadingSpinner from '../loadingSpinner'
import { JPY } from '@utils/currencyUtils'
import { fmtDay, fmtDate, fmtTime } from '@utils/dateUtils'
import CardImage from '../cards/cardImage'
import CRender from '@components/CRender'
import { useRouter } from 'next/router'

const primary = "#6441F1"

interface Props {
  isOpen: boolean
  onClose: () => void
  booking: Booking
  onBookingCancel: () => void
}


const BookingDetailsModal: FC<Props> = ({ isOpen, onClose, booking, onBookingCancel }) => {
  const router = useRouter()
  const { totalPrice, course } = booking
  const { title, imagesCollection, description, lessonsCollection } = course

  const date = lessonsCollection.items[0].startDate
  const image = imagesCollection.items[0].url

  const onCloseModal = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size={"5xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>
            {title} Booking
          </Text>
          <Text>
            {fmtDate(date)}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={{ base: "column", md: "row" }}>
            <CardImage border={"1px solid rgba(0,0,0,.1)"} src={image} h="100%" w="100%" />
            <Box ml="1em">
              <Box>
                <Text fontWeight={"semibold"}>Price</Text>
                <Text fontSize={"xl"}>{JPY(totalPrice).format()}</Text>
              </Box>
              <Box>
                <Text fontWeight={"semibold"}>Description</Text>
                {description &&
                  <Box
                    as={"p"}
                    display="-webkit-box"
                    maxW="90%"
                    overflow="hidden"
                    __css={{
                      "-webkit-line-clamp": "3",
                      "-webkit-box-orient": "vertical",
                    }}
                  >
                    <CRender json={description.json} />
                  </Box>

                }
              </Box>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="cancelBooking" onClick={onBookingCancel} mr="1em">
            Cancel Booking
          </Button>
          <Button variant="primary" onClick={() => router.push(course.url)} >
            Join the lesson
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BookingDetailsModal
