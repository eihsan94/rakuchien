import {
  Box,
  BoxProps,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { LogoWithName } from '../images/logo';


export default function NavBar(props: BoxProps) {
  return (
    <>
      <Box
        backdropFilter="saturate(180%) blur(15px)"
        px={4}
        {...props}
        top="30px"
        bg='linear-gradient(90deg, #7558F3 1%, rgba(255, 0, 0, .1) 80%)'
        width={{ base: "80%", md: "50%" }}
        borderRadius={"full"}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box as="a" href="/">
            <LogoWithName h="36px" />
          </Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

