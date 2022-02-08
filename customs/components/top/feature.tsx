import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from 'react-icons/io5';
import { ReactElement } from 'react';
import FunPlatform from '../images/funPlatform';
import { BiBook } from 'react-icons/bi';
import { MdAdsClick, MdGroup } from 'react-icons/md';
import { primaryColorHex } from 'customs/theme/styles';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function FeatureOffering() {
  return (
    <Container maxW={'5xl'} pt={{ base: "0px", md: "250px" }} pb={{ base: "0px", md: "150px" }} px={"30px"} color={useColorModeValue('gray.700', primaryColorHex)}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text>
          <Heading>A fun learning platform</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Rakuchien is a place where we connect you with your people
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
            <Feature
              icon={
                <Icon as={BiBook} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Book Your Classes'}
            />
            <Feature
              icon={<Icon as={MdAdsClick} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Join the classes'}
            />
            <Feature
              icon={
                <Icon as={MdGroup} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Meet People like you'}
            />
          </Stack>
        </Stack>
        <Flex>
          <FunPlatform />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}