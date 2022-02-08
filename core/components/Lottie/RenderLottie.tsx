import LottieReact, { LottieComponentProps } from "lottie-react";
import { CSSProperties } from "react";


interface Props extends LottieComponentProps {
    animationData: any
    noLoop?: boolean
}

function RenderLottie(props: Props) {
    return (
        <LottieReact {...props} loop={!props.noLoop} />
    )
}

export default RenderLottie
