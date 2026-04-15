import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ FIX import
import {
  Calendar,
  ChartColumnIncreasing,
  Clock,
  Settings,
  User,
  X,
  CalendarClock
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import { sidebarMenu } from "../utils/sidebarConfig";
import ImageWithLoader from "./common/ImageWithLoader";
import { LogOut } from "lucide-react";

const Sidebar = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const { user, logout } = useAuth();

  if (!user) return null;

  const filteredMenu = sidebarMenu.filter((item) =>
    item.roles.includes(user.role),
  );

  const handleClick = (path) => {
    setIsSidebarOpen(false);
    if (path === "/dashboard") {
    if (user.role === "ADMIN") {
      navigate("/adminDashboard");
      return;
    }

    if (user.role === "PROVIDER") {
      navigate("/providerDashboard");
      return;
    }
  }
    navigate(path);

  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className=" p-5">
      <div className="flex justify-between items-center px-2">
        <h2 className="px-3 text-2xl font-bold flex items-center">
        <CalendarClock className="w-10 h-10"/>
        <span className="text-sky-700 ml-3">Book</span>{" "}
        <span className="text-teal-700">Ease</span>
      </h2>
      <X onClick={() => setIsSidebarOpen(false)} className="bg-red-100 stroke-red-700 rounded-full p-1 border md:hidden border-red-700"/>
      </div>

      <div className="flex gap-3 my-7">
        <ImageWithLoader
          src={user.img_url}
          alt="user image"
          className="rounded-full overflow-hidden w-14 h-14 border border-black"
        />
        <div className="flex flex-col gap-1">
          <span className="font-bold">{user.name}</span>
          <span className="text-xs bg-sky-700 text-white rounded-full px-3 py-1 w-fit">
            {user.role}
          </span>
        </div>
      </div>

      <div>
        {filteredMenu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              className={` w-full cursor-pointer  flex p-3 rounded-xl gap-3 ${
                location.pathname === item.path
                  ? "bg-teal-700 text-white"
                  : "hover:bg-sky-100"
              }`}
              onClick={() => handleClick(item.path)}
            >
              <Icon size={18} /> {/* ✅ FIX icons */}
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="bottom-0 fixed left-0 w-full px-5 md:pb-5 pb-16">
        <button
        onClick={handleLogout}
        className=" flex justify-center items-center gap-3 transtiion-all duration-150  border bg-white font-bold text-red-700 cursor-pointer hover:bg-red-100 border-gray-300 hover:border-red-700 rounded-lg w-full py-1"
      >
        <LogOut className="w-4 h-4"/>
        <span>Logout</span>
      </button>
      </div>
    </div>
  );
};

export default Sidebar;
