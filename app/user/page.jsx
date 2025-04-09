"use client";
import React, { useEffect, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { selectCategoryList } from "@/redux/category/selectors";
import MainContent from "./MainContent";
import { fetchCategoryListThunkAction } from "@/redux/category/actions";
import { Toaster } from "react-hot-toast";

export const SidebarContext = createContext({
  setSubCategoryData: () => {},
  activeCategory: null,
  setActiveCategory: () => {},
  darkMode: true
});

const SidebarPage = () => {
  const dispatch = useDispatch();
  const { CategoryList } = useSelector(selectCategoryList);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    dispatch(fetchCategoryListThunkAction());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        setSubCategoryData,
        activeCategory,
        setActiveCategory,
        darkMode
      }}
    >
      <div
        className={`relative flex min-h-screen ${darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-gray-100 via-white to-gray-100"}`}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.1),_transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.1),_transparent_50%)]"></div>
        </div>

        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={toggleSidebar}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-lg backdrop-blur-md`}
          >
            <i className={`bi ${isSidebarOpen ? "bi-x-lg" : "bi-list"} text-xl`}></i>
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 bottom-0 lg:left-0 w-[300px] overflow-y-auto z-40 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar
            categories={CategoryList}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            darkMode={darkMode}
          />
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-grow lg:ml-[300px] p-6 relative z-10 w-full">
          <Toaster position="top-right" />

          {!subCategoryData ? (
            <div
              className={`flex flex-col items-center justify-center h-full ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                <i className="bi bi-arrow-left text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Select a category to begin</h3>
              <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Choose a topic from the sidebar to start your interview preparation
              </p>
            </div>
          ) : (
            <MainContent subCategoryData={subCategoryData} darkMode={darkMode} />
          )}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default SidebarPage;
