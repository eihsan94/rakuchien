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
import { json } from 'stream/consumers'
import CardImage from '../cards/cardImage'

const primary = "#6441F1"

interface Props {
  isOpen: boolean
  onClose: () => void
  booking: Booking
  onBookingCancel: () => void
}


const BookingDetailsModal: FC<Props> = ({ isOpen, onClose, booking, onBookingCancel }) => {
  const { date, totalPrice, lesson } = booking
  const { name, image, description } = lesson
  const onCloseModal = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size={"5xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>
            {name} Booking
          </Text>
          <Text>
            {fmtDate(date)}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={{ base: "column", md: "row" }}>
            <CardImage src={image} h="10em" w="10em" />
            <Box ml="1em">
              <Box>
                <Text fontWeight={"semibold"}>Price</Text>
                <Text fontSize={"xl"}>{JPY(totalPrice).format()}</Text>
              </Box>
              <Box>
                <Text fontWeight={"semibold"}>Description</Text>
                <Text>{description}</Text>
              </Box>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="cancelBooking" onClick={onBookingCancel} mr="1em">
            Cancel Booking
          </Button>
          <Button variant="primary" onClick={onClose} >
            Add to Gcal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BookingDetailsModal
