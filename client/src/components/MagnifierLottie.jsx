import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const MagnifierLottie = ({ src, width = "200px", height = "200px" }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <DotLottieReact
                src={src}
                loop
                autoplay
                style={{ width, height }}
            />
        </div>
    );
};

export default MagnifierLottie;
