"use client";
import React, { useContext, useState } from "react";
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

  const { setSubCategoryData } = useContext(SidebarContext);

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

    if (!openMenus[menu]) {
      dispatch(fetchSubCategoryListByIdThunkAction(categoryId));
    }
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
      {categories?.map((cat) => (
        <div key={cat.c_id}>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={() => toggleSubMenu(cat.name, cat.c_id)}
          >
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
              {SubCategoryByIdList?.map((subCat) => (
                <h1
                  key={subCat.sc_id}
                  onClick={() =>
                    setSubCategoryData({
                      subCategoryId: subCat.sc_id,
                      categoryName: cat.name,
                      subCategoryName: subCat.name
                    })
                  }
                  className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
                >
                  <div className="flex gap-2">
                    <i className="bi bi-chevron-right" />
                    <div>{subCat.name}</div>
                  </div>
                </h1>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
