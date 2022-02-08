import React, { FC } from 'react'
import {
  Avatar, BoxProps, Button,
  Heading,
  Stack,
  Text,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Booking } from '../../types'
import Card from './card';

import CardImage from './cardImage';
import { fmtTime } from '@utils/dateUtils';

interface Props extends BoxProps {
  booking: Booking;
  deleteHandler: (pk?: string) => Promise<void>
}

const BookingCard: FC<Props> = ({ booking, deleteHandler, ...props }) => {
  const { lesson, date, pk } = booking
  const { image, name, teacher } = lesson
  const imgSize = useBreakpointValue({ base: "200px", md: "250" })

  return (
    <Card {...props}>
      <CardImage src={image} w={imgSize} h={imgSize} />
      <Stack pt={10} align={'center'}>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          {name}
        </Heading>
        <Flex alignItems={"center"}>
          <Text fontSize={"1.2em"}>{fmtTime(date)}</Text>
        </Flex>
        {/* AVATAR */}
        <Stack direction={'row'} spacing={4} align={'center'} justifyContent={"flex-start"}>
          <Avatar
            src={teacher.image}
            alt={teacher.name}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{teacher.name}</Text>
          </Stack>
        </Stack>
      </Stack>
      {/* detail */}
      <Stack
        width={'100%'}
        mt={'1.5em'}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Button variant={"booking"} flex={1} >
          Booking Detail
        </Button>
        <Button flex={1} onClick={async () => {
          await deleteHandler(pk)
        }}>
          Cancel Booking
        </Button>
      </Stack>
    </Card >
  );
}

export default BookingCard