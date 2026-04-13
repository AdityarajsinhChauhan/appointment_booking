import React from "react";

const CardWithIcon = ({ title, text , Icon , darkColor, lightColor }) => {
  return (
    <div className={`${lightColor} transtition-all duration-150 rounded-xl w-64 shadow flex gap-3 px-5 py-10 border border-transparent hover:border-teal-600`}>
      <div className={`${darkColor} p-3 rounded-full w-fit h-fit`}><Icon className="stroke-white h-6 w-6"/></div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold">{title}</span>
      <span>{text}</span>
      </div>

    </div>
  );
};

export default CardWithIcon;
