import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottiePlayer2 = ({ src, width = "200px", height = "200px" }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <DotLottieReact
                src={src}
                loop
                autoplay
                width={width}
                height={height}
                preserveAspectRatio="xMidYMid meet"
            />
        </div>
    );
};

export default LottiePlayer2;