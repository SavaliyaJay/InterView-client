"use client";
import React, { useContext, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import { SidebarAdminContext } from "@/app/admin/page";

const SidebarAdmin = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const { setSidebarData } = useContext(SidebarAdminContext);

  const toggleSubMenu = (menu) => {
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === menu ? null : menu));
  };

  return (
    <div className="p-2 w-full text-center bg-[#111827]">
      <div className="p-2.5 mt-3 flex items-center justify-between px-4 duration-300 cursor-pointer font-bold hover:text-[#78716c] text-white">
        <span className="text-[15px] ml-4">
          <Link href="/" className="flex lg:ml-4 text-3xl">
            Interview
            <div className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
              .AI
            </div>
          </Link>
        </span>
        {isSidebarOpen && (
          <button onClick={toggleSidebar}>
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        )}
      </div>
      <div className="my-4 bg-gray-600 h-[1px]" />

      <div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() => toggleSubMenu("category")}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Category</span>
            <span
              className={`text-sm ${
                openMenu === "category" ? "duration-300 rotate-0" : "duration-300 rotate-180"
              }`}
              id="arrow"
            >
              <i className="bi bi-chevron-down" />
            </span>
          </div>
        </div>
        {openMenu === "category" && (
          <div
            className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
            id="submenu"
          >
            <h1
              className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
              onClick={() => setSidebarData({ type: "addCategory" })}
            >
              <div className="flex gap-2">
                <i className="bi bi-chevron-right" />
                <div>Add Category</div>
              </div>
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
              onClick={() => setSidebarData({ type: "viewCategory" })}
            >
              <div className="flex gap-2">
                <i className="bi bi-chevron-right" />
                <div>View Category</div>
              </div>
            </h1>
          </div>
        )}
      </div>

      <div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() => toggleSubMenu("subCategory")}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Sub Category</span>
            <span
              className={`text-sm ${
                openMenu === "subCategory" ? "duration-300 rotate-0" : "duration-300 rotate-180"
              }`}
              id="arrow"
            >
              <i className="bi bi-chevron-down" />
            </span>
          </div>
        </div>
        {openMenu === "subCategory" && (
          <div
            className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
            id="submenu"
          >
            <h1
              className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
              onClick={() => setSidebarData({ type: "addSubCategory" })}
            >
              <div className="flex gap-2">
                <i className="bi bi-chevron-right" />
                <div>Add Sub Category</div>
              </div>
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
              onClick={() => setSidebarData({ type: "viewSubCategory" })}
            >
              <div className="flex gap-2">
                <i className="bi bi-chevron-right" />
                <div>View Sub Category</div>
              </div>
            </h1>
          </div>
        )}
      </div>

      <div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() => toggleSubMenu("question")}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Question</span>
            <span
              className={`text-sm ${
                openMenu === "question" ? "duration-300 rotate-0" : "duration-300 rotate-180"
              }`}
              id="arrow"
            >
              <i className="bi bi-chevron-down" />
            </span>
          </div>
        </div>
        {openMenu === "question" && (
          <div
            className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
            id="submenu"
          >
            <h1
              className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
              onClick={() => setSidebarData({ type: "addQuestion" })}
            >
              <div className="flex gap-2">
                <i className="bi bi-chevron-right" />
                <div>Add Question</div>
              </div>
            </h1>
            <h1
              className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
              onClick={() => setSidebarData({ type: "viewQuestion" })}
            >
              <div className="flex gap-2">
                <i className="bi bi-chevron-right" />
                <div>View Question</div>
              </div>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarAdmin;
