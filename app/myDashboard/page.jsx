"use client";
import React, { createContext, useState } from "react";
import Sidebar from "@/components/Sidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "@material-tailwind/react";

export const SidebarContext = createContext();

const SidebarPage = () => {
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [sidebar, setSidebar] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [
    {
      name: "Chatbox 1",
      subCategories: ["Social", "Personal", "Friends"]
    },
    {
      name: "Chatbox 2",
      subCategories: ["Insta", "Facebook", "Whatsapp"]
    },
    {
      name: "Chatbox 3",
      subCategories: ["Insta", "Facebook", "Whatsapp"]
    }
    // Add more categories as needed
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{ subCategory, setSubCategory, category, setCategory, sidebar, setSidebar }}
    >
      <div className="flex">
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button onClick={toggleSidebar}>
            <i className={`bi ${isSidebarOpen ? "" : "bi-list"} text-3xl text-black`}></i>
          </button>
        </div>

        <div
          className={`fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-[#111827] transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar
            categories={categories}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>

        <div class="flex flex-col ml-0 lg:ml-[300px] mt-[2.5rem] lg:mt-0 p-4 w-full">
          <div className="flex justify-between">
            <Button color="green">{"< Previous"}</Button>
            <Button color="green">{"Next >"}</Button>
          </div>
          <div>data</div>
          <div className="flex justify-between">
            <Button color="green">{"< Previous"}</Button>
            <Button color="green">{"Next >"}</Button>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default SidebarPage;
