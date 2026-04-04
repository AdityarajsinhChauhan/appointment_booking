import React from "react";

const CardWithIcon = ({ title, number, Icon }) => {
  return (
    <div className="flex justify-between w-[32%] border border-gray-300 rounded-xl py-14 px-5">
      <div className="flex flex-col">
        <span>{title}</span>
        <span className="text-3xl font-bold">{number}</span>
      </div>
      <div className="bg-gray-200 w-fit h-fit p-3 rounded-xl">
        <Icon />
      </div>
    </div>
  );
};

export default CardWithIcon;
