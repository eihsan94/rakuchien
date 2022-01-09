import {
  Box,
  BoxProps,
  Flex,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import Logo from '../images/logo';


export default function NavBar(props: BoxProps) {
  return (
    <>
      <Box  
        backdropFilter="saturate(180%) blur(15px)" 
        px={4} 
        {...props}
        top="30px" 
        bg='linear-gradient(90deg, #7558F3 1%, rgba(255, 0, 0, .1) 80%)'
        width={{base:"100%",md:"50%" }}
        borderRadius={"full"}
         >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box as="a" href="/">
            <Logo h="36px" />
          </Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
sadf
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}


// TODO: Add avatarMenu component here later
