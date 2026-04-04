import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ FIX import
import {
  Calendar,
  ChartColumnIncreasing,
  Clock,
  Settings,
  User,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import { sidebarMenu } from "../utils/sidebarConfig";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ NEW

  const { user, logout } = useAuth();

  if (!user) return null;

  const filteredMenu = sidebarMenu.filter((item) =>
    item.roles.includes(user.role)
  );

  const handleClick = (path) => {
    navigate(path); // ❌ removed setActive
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="p-5">
      <h2 className="px-3 text-2xl font-bold">Book Appointments</h2>
      <span className="text-gray-500 px-3">User Portal</span>

      <div className="flex flex-col text-sm border border-gray-300 rounded-xl p-5 mb-5">
        <span className="font-bold">{user.name}</span>
        <span className="text-gray-500">{user.email}</span>
        <span className="bg-black text-white w-fit px-2 py-1 mt-3 rounded-lg">
          {user.role}
        </span>
      </div>

      <div>
        {filteredMenu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              className={` w-full cursor-pointer flex p-3 rounded-xl gap-3 ${
                location.pathname === item.path
                  ? "bg-black text-white"
                  : ""
              }`}
              onClick={() => handleClick(item.path)}
            >
              <Icon size={18} /> {/* ✅ FIX icons */}
              {item.label}
            </button>
          );
        })}

        

        

        
      </div>

      <button
        onClick={handleLogout}
        className="fixed bottom-5 left-5 border border-gray-300 rounded-lg w-[17%] px-3 py-1"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;