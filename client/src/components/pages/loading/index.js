import React from "react";
import { DotLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "200px",
        height: "100%",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <DotLoader sizeUnit={"px"} size={120} color={"white"} />
    </div>
  );
};

export default Loading;
