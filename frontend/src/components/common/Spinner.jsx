import React from "react";

const Spinner = ({ size = 20 }) => {
  return (
    <div className="border border-gray-300 w-fit rounded-lg m-5 p-5 flex justify-center gap-3">
      <div
      className="border-gray-300 border-t-black rounded-full animate-spin"
      style={{
        width: size,
        height: size,
        borderWidth: "3px",
      }}
    />
    <span className="text-gray-600 font-bold">Loading</span>
    </div>
  );
};

export default Spinner;