"use client";
import React, { useContext, useState } from "react";
import { SidebarContext } from "@/app/myDashboard/page";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({ categories, isSidebarOpen, toggleSidebar }) => {
  const { subCategory, setSubCategory, category, setCategory, sidebar, setSidebar } =
    useContext(SidebarContext);

  const [openMenus, setOpenMenus] = useState({});

  const toggleSubMenu = (menu) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [menu]: !prevOpenMenus[menu]
    }));
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubCategory = (e) => {
    setSubCategory(e.target.value);
  };

  const handleSidebar = (e) => {
    setSidebar(e.target.value);
  };

  return (
    <>
      <div>
        <div className="p-2 w-full text-center bg-[#111827]">
          <div className="p-2.5 mt-3 flex items-center justify-between px-4 duration-300 cursor-pointer font-bold hover:text-[#78716c] text-white">
            <span className="text-[15px] ml-4 ">InterView.AI</span>
            {isSidebarOpen && (
              <button onClick={toggleSidebar}>
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            )}
          </div>
          <div className="my-4 bg-gray-600 h-[1px]" />
          {categories.map((cat, index) => (
            <div key={index}>
              <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                onClick={() => toggleSubMenu(cat.name)}
              >
                <i className="bi bi-chat-left-text-fill" />
                <div className="flex justify-between w-full items-center">
                  <span className="text-[15px] ml-4 text-gray-200 font-bold">{cat.name}</span>
                  <span
                    className={`text-sm ${openMenus[cat.name] ? "duration-300 rotate-0" : "duration-300 rotate-180"}`}
                    id="arrow"
                  >
                    <i className="bi bi-chevron-down" />
                  </span>
                </div>
              </div>
              {openMenus[cat.name] && (
                <div
                  className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
                  id="submenu"
                >
                  {cat.subCategories.map((subCat, subIndex) => (
                    <h1
                      key={subIndex}
                      className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
                    >
                      {subCat}
                    </h1>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
