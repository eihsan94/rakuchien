import { Stack, Flex, Avatar, Button, BoxProps, Text, useDisclosure, Box, useToast, UseToastOptions } from "@chakra-ui/react";
import Card from "@components/Card/Card";
import { fmtDate, fmtDay, fmtTime } from "@utils/dateUtils";
import { Booking } from "customs/types";
import { FC } from "react";
import BookingDetailsModal from "../modals/bookingDetailsModal";
import CardImage from "./cardImage";

interface SenseiAvatarProps extends BoxProps {
  image: string
  name: string
}

const SenseiAvatar: FC<SenseiAvatarProps> = ({ image, name, ...otherProps }) => <>
  {/* AVATAR */}
  <Stack direction={'row'}
    {...otherProps}
    spacing={{ base: 2, md: 4 }} align={'center'} justifyContent={"flex-start"}>
    <Avatar
      w={{ base: "1em", md: "2em" }}
      h={{ base: "1em", md: "2em" }}
      src={image}
      alt={name}
    />
    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
      <Text fontWeight={600}>{name}</Text>
    </Stack>
  </Stack></>

interface Props extends BoxProps {
  booking: Booking;
  deleteHandler: (pk: string, successToaster: UseToastOptions) => Promise<void>
}

const BookingCard: FC<Props> = ({ booking, deleteHandler, ...props }) => {
  const { lesson, date, pk } = booking
  const { image, name } = lesson
  const imgSize = { base: "4em", md: "5em" }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toaster = useToast()
  return (
    <Card {...props} pos="relative" onClick={onOpen} cursor="pointer" transition={"all .3s ease"} _hover={{
      transform: "translateY(-.5em)",
      boxShadow: "xl"
    }}>
      <Flex align={'center'}>
        <CardImage src={image} w={imgSize} h={imgSize} />
        <Flex ml={"1em"} flexWrap={"wrap"} direction="column" fontSize={{ base: "sm", md: "md" }} w={{ base: "56%", md: "50%" }} >
          <Box fontSize="1em" w="100%">
            <Text fontWeight={"bold"} w="100%" overflow={"hidden"} whiteSpace="nowrap" textOverflow={"ellipsis"}>
              {name}
            </Text>
            <Text>{fmtDate(date)}</Text>
            <Text >{fmtTime(date)}</Text>
          </Box>
        </Flex>
        <Text top="1em" right="1em" pos="absolute" variant="dayLabel" >{fmtDay(date)}</Text>
      </Flex>
      <BookingDetailsModal isOpen={isOpen} onClose={onClose} booking={booking} onBookingCancel={
        async () => {
          toaster({
            title: `Cancelling ${name} booking`,
            status: "warning",
            description: <>
              <Text>Are you sure? 🤨</Text>
              <Button variant="primary" onClick={() => toaster.closeAll()}>no</Button>
              <Button ml="1em" variant="basic" onClick={async () => {
                toaster.closeAll()
                await deleteHandler(`${pk}`, { title: `Cancelled ${name} ${fmtDate(date)} ${fmtTime(date)} (${fmtDay(date)}) booking successfully` })
                onClose()
              }}>Yes</Button>
            </>,
          })
        }} />
    </Card >

  );
}

export default BookingCard