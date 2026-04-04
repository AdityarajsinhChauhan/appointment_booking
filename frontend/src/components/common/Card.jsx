import React from "react";

const Card = ({ title, number}) => {
  return (
    <div className="flex justify-between w-[32%] border border-gray-300 rounded-xl py-10 px-5">
      <div className="flex flex-col">
        <span>Upcoming</span>
        <span className="text-3xl font-bold">2</span>
      </div>
    </div>
  );
};

export default Card;
