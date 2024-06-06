"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "@material-tailwind/react";
import { selectCategoryList } from "@/redux/sidebarList/selectors";
import { fetchUserCategoryListThunkAction } from "@/redux/sidebarList/action";

export const SidebarContext = createContext();

const SidebarPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoryList);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [content, setContent] = useState(null);

  console.log(content);

  useEffect(() => {
    dispatch(fetchUserCategoryListThunkAction());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ setContent }}>
      <div className="flex">
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
            categories={categories}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>

        <div className="flex flex-col ml-0 lg:ml-[300px] mt-[2.5rem] lg:mt-0 p-4 w-full h-screen justify-between">
          <div className="flex justify-between">
            <Button color="blue">{"< Previous"}</Button>
            <Button color="blue">{"Next >"}</Button>
          </div>
          <div className="flex-grow flex mt-3 ml-1 mb-3">
            <div>{!content ? "No data found." : content}</div>
          </div>
          <div className="flex justify-between pb-2">
            <Button color="blue">{"< Previous"}</Button>
            <Button color="blue">{"Next >"}</Button>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default SidebarPage;
