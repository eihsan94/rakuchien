import {
    Icon,
    IconProps,
    Text,
    Flex,
    useColorMode,
  } from '@chakra-ui/react';

const Logo = (props: IconProps) => {
    return (
        <Flex alignItems="center">
            <Icon
                width="70px"
                viewBox="0 0 1102.000000 900.000000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}>
                <g transform="translate(0.000000,900.000000) scale(0.100000,-0.100000)"
                fill={props.color as string || "white"} stroke="none">
                <path d="M3355 6170 c-70 -14 -124 -41 -199 -99 -125 -96 -199 -193 -230 -301
                -52 -176 -72 -486 -42 -655 28 -157 86 -346 136 -445 49 -95 190 -246 300
                -319 88 -59 122 -71 207 -74 68 -2 85 2 135 26 162 79 294 268 355 505 34 132
                35 143 35 317 -1 199 -16 321 -62 500 -80 307 -204 460 -439 540 -46 16 -130
                18 -196 5z"/>
                <path d="M7166 6068 c-31 -100 -97 -269 -129 -328 -50 -94 -132 -212 -214
                -311 -69 -84 -258 -269 -337 -330 -28 -22 -94 -73 -146 -115 -52 -41 -133
                -101 -180 -133 -266 -180 -270 -185 -209 -217 153 -78 427 -147 662 -165 221
                -16 511 -7 621 21 107 26 283 117 264 135 -4 4 -49 0 -100 -9 -163 -27 -334
                -39 -472 -31 -243 12 -546 85 -546 131 0 7 19 26 43 41 78 49 281 220 368 309
                167 172 344 490 404 724 22 86 11 290 -16 290 -5 0 -11 -6 -13 -12z"/>
                <path d="M5842 2603 c-5 -10 -15 -43 -22 -73 -27 -122 -145 -310 -250 -398
                -150 -126 -264 -170 -467 -179 -184 -9 -276 16 -478 128 -149 82 -252 189
                -375 389 -24 40 -46 51 -56 27 -7 -20 64 -225 103 -297 45 -80 110 -172 160
                -225 89 -93 166 -139 333 -197 89 -30 106 -33 251 -36 222 -5 305 19 498 149
                173 115 276 272 320 488 28 136 28 241 0 241 -4 0 -12 -8 -17 -17z"/>
                </g>

            </Icon>
            <Text ml="-10px" textTransform="uppercase" letterSpacing={{base:"2px", md:"5px"}} color={props.color || "white"} fontWeight="bold" fontSize={{base:"18px",md:"20px"}}>
                rakuchien
            </Text>
        </Flex>
    )
}

export default Logo
