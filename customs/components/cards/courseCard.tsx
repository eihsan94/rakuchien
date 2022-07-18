import React, { useEffect, useLayoutEffect } from 'react'
import {
  Avatar, BoxProps, useDisclosure,
  Badge,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Box,
  SpaceProps,
  Container,
  Divider,
  HStack,
  Link,
  Tag,
  VStack,
  Wrap,
  WrapItem,
  Flex,
} from '@chakra-ui/react';
import { Course, Teacher } from '../../types'
import CourseBookingModal from '../modals/courseBookingModal';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import CRender from '@components/CRender';
import CourseTags from '../courseTags';
import CourseAuthor from '../courseAurhors';
interface Props extends BoxProps {
  course: Course;
}

export default function CourseBookingCard(props: Props) {
  const { course } = props
  const { imagesCollection, title, description, teacher, categories } = course
  const { status } = useSession()
  const { isOpen, onClose, onOpen } = useDisclosure()
  console.log(course);

  const router = useRouter()
  useLayoutEffect(() => {
    if (router.query.courseId === course.sys.id) {
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // <Box
    //   role={'group'}
    //   p={6}
    //   maxW={'330px'}
    //   w={'full'}
    //   bg={useColorModeValue('white', 'gray.800')}
    //   boxShadow={'2xl'}
    //   rounded={'lg'}
    //   pos={'relative'}
    //   zIndex={1}>

    //   <Stack pt={10} align={'center'}>
    //     {/* BADGE */}
    //     {categories &&
    //       <Stack align={'center'} justify={'flex-s'} direction={'row'}>
    //         {categories.map((c, i) =>
    //           <Badge
    //             key={i}
    //             px={2}
    //             py={1}
    //             bg={"gray.500"}
    //             color="white"
    //             borderRadius={"5px"}
    //             fontWeight={'400'}
    //           >
    //             #{c}
    //           </Badge>
    //         )}
    //       </Stack>}
    //     {/* <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
    //         {duration}
    //       </Text> */}
    //     <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
    //       {title}
    //     </Heading>
    //     {description && <Stack direction={'row'} align={'center'}>
    //       <CRender json={description.json} />
    //     </Stack>}
    //     {/* AVATAR */}
    //     <Stack direction={'row'} spacing={4} align={'center'} justifyContent={"flex-start"}>
    //       <Avatar
    //         src={teacher.image?.url}
    //         alt={teacher.name}
    //       />
    //       <Stack direction={'column'} spacing={0} fontSize={'sm'}>
    //         <Text fontWeight={600}>{teacher.name}</Text>
    //       </Stack>
    //     </Stack>
    //   </Stack>
    //   {/* BOOKING BUTTON */}
    //   <Stack
    //     width={'100%'}
    //     mt={'1.5em'}
    //     direction={'row'}
    //     justifyContent={'space-between'}
    //     alignItems={'center'}>
    //     <Button
    //       flex={1}
    //       variant={"booking"}
    //       onClick={() => {
    //         status === "authenticated"
    //           ? onOpen()
    //           : signIn('google', { callbackUrl: `${window.location.origin}/courses?courseId=${course.sys.id}` })
    //       }}
    //     >
    //       Book now!
    //     </Button>
    //     <Button
    //       flex={1}
    //       variant={"primary"}
    //       as="a"
    //       href={`/courses/${course.sys.id}`}
    //     >
    //       Details
    //     </Button>
    //   </Stack>
    // </Box>
    <>
      <Box
        cursor={"pointer"}
        onClick={() => router.push(`/courses/${course.sys.id}`)}
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={imagesCollection.items[0].url}
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          {categories && <CourseTags tags={categories} />}
          <Heading marginTop="1">
            {title}
          </Heading>
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
          <CourseAuthor {...teacher} />
        </Box>
      </Box>
      <Divider marginTop="5" />


    </>
    //   {/* <CourseBookingModal isOpen={isOpen} onClose={onClose} course={course} /> */}

  );
}
