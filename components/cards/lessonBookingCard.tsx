import React from 'react'
import {
  Avatar, BoxProps, useDisclosure,
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { Lesson } from '../../types'
import LessonBookingModal from '../modals/lessonBookingModal';
import { title } from 'process';
interface Props extends BoxProps {
    lesson:Lesson;
}

export default function LessonBookingCard(props: Props) {
    const {lesson} = props
    const {image, name, description, teacher, duration, categoriesCollection} = lesson
    // const {image, name, description, teacher, duration} = lesson
    const {isOpen, onClose, onOpen} = useDisclosure()

    return (
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${image.url})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={image.url}
              alt={image.url}
              fallbackSrc={image.url}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            {/* BADGE */}
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
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              {duration}
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {name}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text color={'gray.600'}>
                {description}
              </Text>
            </Stack>
            {/* AVATAR */}
            <Stack direction={'row'} spacing={4} align={'center'} justifyContent={"flex-start"}>
                <Avatar
                    src={teacher.image.url}
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
                    onOpen()
                }}
                >
                Book now!
              </Button>
            </Stack>
        </Box>
        <LessonBookingModal isOpen={isOpen} onClose={onClose} lesson={lesson}/>
      </Center>
    );
  }
