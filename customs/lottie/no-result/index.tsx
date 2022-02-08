import RenderLottie from '@components/Lottie/RenderLottie';
import React from 'react'
import animation from "./no-result-animation.json";

interface Props { }

function NoResultLottie(props: Props) {
    const style = {
        height: 300,
    };
    return (
        <RenderLottie style={style} animationData={animation} noLoop={true} />

    )
}

export default NoResultLottie

