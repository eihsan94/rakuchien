import { Button } from '@chakra-ui/button'
import { ArrowBackIcon, ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/layout'
import React, { FC, useEffect, useState } from 'react'
// @ts-ignore
import {Fade} from 'react-reveal'
import ProgressBar from './progressBar'
import { 
    Text,
  } from "@chakra-ui/react"

export interface StepConfigProps  {
    content: JSX.Element | string
    backBtn?: JSX.Element
    nextBtn?: JSX.Element
    // nextHandler: () => void
}


interface Props {
    steps: StepConfigProps[]
    finalStepBtn: JSX.Element // the last button after all steps is finished
}

const Stepper:FC<Props> = ({steps, finalStepBtn}) => {
    const [currStep, setCurrStep]= useState(0)
    const [isNext, setIsNext]= useState(true)
    return (
        <Box>
            <Box textAlign="center" mb="30px">
                <Button variant="outline" px="40px" fontWeight="normal" mb={{base:"0px",md:"20px"}}>
                    {currStep + 1} of {steps.length}
                </Button>
                <ProgressBar display={{base: "none", md:"inherit"}} progressValue={currStep/(steps.length - 1) * 100} color="#EB6860" />
            </Box>

            {steps.map((s,i) => 
                i === currStep && 
                    <Step key={i} isNext={isNext} >
                        <Box borderRadius="10px" pb="100px">
                            {s.content}
                            <Flex position="absolute" bottom="1em"  left ="0px" w="100%" justifyContent={"flex-end"}>
                                {currStep !== 0 && 
                                    <Box mr="10px" onClick={() => {
                                        setCurrStep(currStep-1)
                                        setIsNext(false)
                                    }}>
                                        {s.backBtn
                                            ? s.backBtn
                                            :<Button borderRadius="full" >
                                                <ArrowBackIcon /> Back
                                            </Button>}
                                    </Box>
                                }
                                {currStep !== steps.length -1 &&
                                    <Box ml="auto" onClick={() => {
                                        setCurrStep(currStep+1)
                                        setIsNext(true)
                                    }}>
                                        {s.nextBtn
                                            ? s.nextBtn
                                            :<Button  borderRadius="full" >
                                                Next <ArrowForwardIcon />
                                            </Button>
                                        }
                                    </Box>
                                }
                                {currStep === steps.length -1 &&
                                    finalStepBtn
                                }
                            </Flex>
                        </Box>
                    </Step>
            )}
        </Box>
    )
}

export default Stepper

interface StepProps {
    isNext: boolean
}
  
const Step:FC<StepProps> = ({isNext, children}) => {
    const distance = "600px"
    return (
      isNext 
        ? <Fade right distance={distance} duration={400}>
            {children}
          </Fade>
        : <Fade left distance={distance} duration={400}>
            {children}
          </Fade>
    )
}
  