import {FC} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
import { Lesson } from '../../types'

interface Props {
    isOpen: boolean
    onClose: () => void
    lesson: Lesson
}

const LessonBookingModal:FC<Props> = ({isOpen, onClose, lesson}) => {


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>o</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              {JSON.stringify(lesson)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    )
}

export default LessonBookingModal
