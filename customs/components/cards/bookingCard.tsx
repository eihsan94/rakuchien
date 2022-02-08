import { useBreakpointValue, Stack, Heading, Flex, Avatar, Button, BoxProps, Text } from "@chakra-ui/react";
import Card from "@components/Card/Card";
import { fmtDate, fmtTime } from "@utils/dateUtils";
import { Booking } from "customs/types";
import { FC } from "react";
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
  deleteHandler: (pk?: string) => Promise<void>
}

const BookingCard: FC<Props> = ({ booking, deleteHandler, ...props }) => {
  const { lesson, date, pk } = booking
  const { image, name, teacher } = lesson
  const imgSize = { base: "100%", md: "250" }

  return (
    <Card >
      <CardImage src={image} w={imgSize} h={imgSize} />
      <Stack pt={10} align={'center'}>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          {name}
        </Heading>
        <Flex flexWrap={"wrap"} direction={{ base: "column", md: "row" }} justifyContent="center" alignItems="center" fontSize={{ base: "sm", md: "md" }}>
          <Text>{fmtDate(date)}</Text>
          <Text ml={{ base: 0, md: "10px" }}>{fmtTime(date)}</Text>
        </Flex>

        {teacher && <SenseiAvatar display={{ base: "none", md: "inherit" }} name={teacher.name} image={teacher.image} />}
      </Stack>

      {/* detail */}
      <Stack
        width={'100%'}
        mt={'1.5em'}
        direction={{ base: 'column', xl: 'row' }}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Button variant={"booking"} flex={1} w="100%">
          Booking Detail
        </Button>
        <Button variant={"cancelBooking"} flex={1} w="100%" onClick={async () => {
          await deleteHandler(pk)
        }}>
          Cancel Booking
        </Button>
      </Stack>
    </Card >
  );
}

export default BookingCard