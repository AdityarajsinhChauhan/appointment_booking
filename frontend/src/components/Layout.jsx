import { Outlet } from "react-router";
import React from "react";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-1/5 bg-gray-50 border-r border-gray-300 h-screen fixed left-0 top-0">
        <Sidebar />
      </div>
      <div className="w-4/5 ml-[20%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
