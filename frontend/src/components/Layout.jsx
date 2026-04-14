import { Outlet } from "react-router";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <MobileNavbar setIsSidebarOpen={setIsSidebarOpen} />

      <div className=" flex md:mt-0">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar wrapper */}
        <div
          className={`fixed md:w-1/5 bg-sky-50 md:border-r md:border-gray-300 h-screen md:left-0 md:top-0  z-50 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>

        {/* Content */}
        <div className="w-full md:w-4/5 md:ml-[20%] mt-22 md:mt-0 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
