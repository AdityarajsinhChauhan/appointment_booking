import React from "react";

const Spinner = ({ size = 20 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: "3px solid #e5e5e5",
        borderTop: "3px solid black",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
};

export default Spinner;