import { Avatar, Box, BoxProps, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Lesson } from '../../types'

import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import LessonBookingModal from '../modals/lessonBookingModal';
interface Props extends BoxProps {
    lesson:Lesson;
}

export default function LessonBookingCard(props: Props) {
    const {lesson} = props
    const {image, name, description, teacher, duration, categoriesCollection} = lesson
    const {isOpen, onClose, onOpen} = useDisclosure()

    return (
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="20px"
          w={{ sm: '100%', md: '540px' }}
          direction={{ base: 'column', md: 'row' }}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          p={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image
                objectFit="cover"
                boxSize="100%"
                src={image.url}
                fallbackSrc={image.url}
                alt={image.url}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            >
            <Stack align={'center'} justify={'flex-s'} direction={'row'}>
                {categoriesCollection.items.map((c, i) => 
                    <Badge
                        key={i}
                        px={2}
                        py={1}
                        bg={"gray.500"}
                        color="white"
                        borderRadius={"5px"}
                        fontWeight={'400'}
                    >
                        #{c.name}
                    </Badge>
                )}
            </Stack>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {name}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} size="sm" >
              {duration}
            </Text>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              >
              {description}
            </Text>
            <Stack direction={'row'} spacing={4} align={'center'} justifyContent={"flex-start"}>
                <Avatar
                    src={teacher.image.url}
                    alt={teacher.name}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{teacher.name}</Text>
                </Stack>
            </Stack>

            <Stack
              width={'100%'}
              mt={'2rem'}
              direction={'row'}
              padding={4}
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
                    onOpen()
                }}
                >
                Book now!
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <LessonBookingModal isOpen={isOpen} onClose={onClose} lesson={lesson}/>
      </Center>
    );
  }