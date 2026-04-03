import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, ChartColumnIncreasing, Clock, Settings } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("/");

  const handleClick = (name) => {
    setActive(name);
    navigate(name);
  };
  return (
    <div className="p-5">
      <h2 className="px-3 text-2xl font-bold">Book Appointments</h2>
      <span className="text-gray-500 px-3">User Portal</span>


      <div className="flex flex-col text-sm border border-gray-300 rounded-xl p-5 mb-5">
        <span className="font-bold">user</span>
        <span className="text-gray-500">user@example.com</span>
        <span className="bg-black text-white w-fit px-2 py-1 mt-3 rounded-lg">user</span>
      </div>

      <div>
        <button
          className={` w-full cursor-pointer flex p-3 rounded-xl gap-3  ${active == "/" ? "bg-black text-white" : ""}`}
          onClick={() => {
            handleClick("/");
          }}
        >
          <ChartColumnIncreasing />
          Dashboard
        </button>
        <button
          className={` w-full cursor-pointer flex p-3 rounded-xl gap-3  ${active == "/profile" ? "bg-black text-white" : ""}`}
          onClick={() => {
            handleClick("/profile");
          }}
        >
          <Settings />
          Profile
        </button>
        <button
          className={` w-full cursor-pointer flex p-3 rounded-xl gap-3  ${active == "/booking" ? "bg-black text-white" : ""}`}
          onClick={() => {
            handleClick("/booking");
          }}
        >
          <Calendar />
          Book Appointments
        </button>
        <button
          className={` w-full cursor-pointer flex p-3 rounded-xl gap-3  ${active == "/appointment" ? "bg-black text-white" : ""}`}
          onClick={() => {
            handleClick("/appointment");
          }}
        >
          <Clock />
          My Appointments
        </button>
      </div>

      <button className="fixed bottom-5 left-5 border border-gray-300 rounded-lg w-[17%] px-3 py-1">Logout</button>
    </div>
  );
};

export default Sidebar;
