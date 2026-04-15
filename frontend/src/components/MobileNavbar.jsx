import React from "react";
import useAuth from "../hooks/useAuth";
import { Menu, CalendarClock } from "lucide-react";

const MobileNavbar = ({ setIsSidebarOpen }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex md:hidden justify-between z-10 py-5 px-5 w-full bg-white/70 backdrop-blur-md shadow-sm fixed top-0 left-0">
      <div className="flex gap-2 items-center">
        <Menu
          className="w-10 h-10 rounded-full bg-sky-100 p-2 mx-3 cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        />

        <h1 className="text-2xl font-bold text-gray-700 flex items-center">
            <CalendarClock className="w-10 h-10"/>
          <span className="text-sky-700 ml-3">Book</span>
          <span className="text-teal-700">Ease</span>
        </h1>
      </div>

      <div className="flex gap-5">
        <button
          onClick={handleLogout}
          className="bg-white-700 text-red-700 border border-red-700 rounded-lg px-3 py-1 hover:bg-red-50 cursor-pointer transition-all duration-150"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;