"use client";
import React, { useEffect, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { selectCategoryList } from "@/redux/category/selectors";
import MainContent from "./MainContent";
import { fetchCategoryListThunkAction } from "@/redux/category/actions";

export const SidebarContext = createContext();

const SidebarPage = () => {
  const dispatch = useDispatch();
  const { CategoryList } = useSelector(selectCategoryList);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState(null);

  useEffect(() => {
    dispatch(fetchCategoryListThunkAction());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ setSubCategoryData }}>
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
          <Sidebar
            categories={CategoryList}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="flex flex-col flex-grow w-10 lg:ml-[300px] mt-[2.5rem] lg:mt-0 p-4 justify-between">
          {!subCategoryData ? "No data found." : <MainContent subCategoryData={subCategoryData} />}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default SidebarPage;
