"use client";
import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import { SidebarContext } from "@/app/user/page";
import Link from "next/link";
import { selectSubCategoryList } from "@/redux/subcategory/selectors";
import { fetchSubCategoryListByIdThunkAction } from "@/redux/subcategory/actions";

const Sidebar = ({ categories, isSidebarOpen, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});
  const dispatch = useDispatch();
  const { SubCategoryByIdList } = useSelector(selectSubCategoryList);
  const { setSubCategoryData, activeCategory, setActiveCategory, darkMode } =
    useContext(SidebarContext);

  const toggleSubMenu = (menu, categoryId) => {
    setOpenMenus((prevOpenMenus) => {
      const newOpenMenus = Object.keys(prevOpenMenus).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return {
        ...newOpenMenus,
        [menu]: !prevOpenMenus[menu]
      };
    });

    setActiveCategory(activeCategory === categoryId ? null : categoryId);

    if (!openMenus[menu]) {
      dispatch(fetchSubCategoryListByIdThunkAction(categoryId));
    }
  };

  return (
    <div
      className={`p-0 w-full h-full flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-black/70 backdrop-blur-xl backdrop-filter border-r border-gray-800"
          : "bg-white/70 backdrop-blur-xl backdrop-filter border-r border-gray-200"
      }`}
    >
      {/* Header Section */}
      <div className="p-2.5 flex items-center justify-between px-4 duration-300 cursor-pointer">
        <span className="text-[15px] ml-4 mt-4">
          <Link href="/" className="flex lg:ml-4 text-3xl font-bold">
            <span className="text-white">Interview</span>
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              .AI
            </div>
          </Link>
        </span>
        {isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className={`text-gray-400 hover:text-${darkMode ? "white" : "gray-800"} transition-colors duration-300`}
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        )}
      </div>

      <div className="my-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-[2px] opacity-70 rounded-full mx-2" />

      {/* Categories Section - Scrollable */}
      <div className="flex-grow overflow-y-auto px-2 pb-28">
        {" "}
        {/* Added padding bottom to ensure last items are visible above the help box */}
        <div className="space-y-3 mt-2">
          {categories?.map((cat) => (
            <div key={cat.c_id} className="transition-all duration-300">
              <div
                className={`p-3 flex items-center rounded-xl px-4 duration-300 cursor-pointer ${
                  openMenus[cat.name]
                    ? darkMode
                      ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30"
                      : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-300/30"
                    : darkMode
                      ? "hover:bg-gray-800/50 border border-transparent"
                      : "hover:bg-gray-100 border border-transparent"
                } backdrop-blur-md`}
                onClick={() => toggleSubMenu(cat.name, cat.c_id)}
              >
                <div className="flex justify-between w-full items-center">
                  <span
                    className={`text-[16px] ml-2 font-medium ${darkMode ? "text-white" : "text-gray-800"}`}
                  >
                    {cat.name}
                  </span>
                  <span
                    className={`text-sm transition-transform duration-500 ease-in-out ${
                      openMenus[cat.name] ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <i
                      className={`bi bi-chevron-down ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                    />
                  </span>
                </div>
              </div>

              {openMenus[cat.name] && (
                <div
                  className={`text-left text-sm mt-2 w-4/5 mx-auto font-medium overflow-hidden animate-fadeIn`}
                  id="submenu"
                >
                  {SubCategoryByIdList?.map((subCat) => (
                    <div
                      key={subCat.sc_id}
                      onClick={() =>
                        setSubCategoryData({
                          subCategoryId: subCat.sc_id,
                          categoryName: cat.name,
                          subCategoryName: subCat.name
                        })
                      }
                      className={`cursor-pointer p-2.5 ${
                        darkMode
                          ? "hover:bg-gray-800/70 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      } rounded-lg mt-1.5 transition-all duration-300 group`}
                    >
                      <div className="flex items-center gap-3">
                        <i
                          className={`bi bi-arrow-right-short ${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          } transform group-hover:translate-x-1 transition-transform duration-300`}
                        />
                        <div
                          className={`group-hover:${darkMode ? "text-blue-300" : "text-blue-600"} transition-colors duration-300`}
                        >
                          {subCat.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
