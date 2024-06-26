"use client";
import React, { createContext, useState } from "react";
import SidebarAdmin from "@/components/SidebarAdmin";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainContent from "./MainContent";

export const SidebarAdminContext = createContext();

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarData, setSidebarData] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SidebarAdminContext.Provider value={{ setSidebarData }}>
        <div className="flex min-h-screen bg-[#cfd2db]">
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <button onClick={toggleSidebar}>
              <i className={`bi ${isSidebarOpen ? "bi-x-lg" : "bi-list"} text-3xl text-black`}></i>
            </button>
          </div>

          <div
            className={`fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-[#111827] transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <SidebarAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
          <div className="flex flex-col flex-grow lg:ml-[300px] mt-[2.5rem] lg:mt-0 p-4 justify-between">
            {!sidebarData ? "No data found." : <MainContent sidebarData={sidebarData} />}
          </div>
        </div>
      </SidebarAdminContext.Provider>
    </>
  );
};

export default Admin;
