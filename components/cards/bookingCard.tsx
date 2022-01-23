import React from 'react'
import {
  Avatar, BoxProps, Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { Booking } from '../../types'
import Card from './card';

interface Props extends BoxProps {
  booking: Booking;
}

export default function BookingCard(props: Props) {
  const { booking } = props
  const { lesson } = booking
  const { image, name, teacher } = lesson

  return (
    <Card {...props}>
      <Image
        rounded={'lg'}
        height={230}
        width={282}
        objectFit={'cover'}
        src={image}
        alt={image}
        fallbackSrc={image}
      />
      <Stack pt={10} align={'center'}>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          {name}
        </Heading>
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
      {/* BOOKING BUTTON */}
      <Stack
        width={'100%'}
        mt={'1.5em'}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          bg={'blue.400'}
          color={'white'}
          boxShadow={
            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
          }
          _hover={{
            bg: 'blue.500',
          }}
          _focus={{
            bg: 'blue.500',
          }}
          onClick={() => {

          }}
        >
          Book now!
        </Button>
      </Stack>
    </Card>
  );
}
