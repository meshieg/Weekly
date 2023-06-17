import React from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/animations/calendar1.json";

const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
      }}
    >
      <Lottie animationData={LoadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
