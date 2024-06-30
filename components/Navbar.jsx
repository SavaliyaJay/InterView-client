import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userName = window.localStorage.getItem("user");
      setUser(userName);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = window.localStorage.getItem("token");
      setToken(userToken);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("user");
      deleteCookie("role");
      window.location.href = "/auth/login";
    }
  };

  return (
    <div className="bg-blue-500 sticky top-0 z-50">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-[#fff8f8]">
        <Link className="text-3xl font-bold leading-none flex" href="/">
          Interview
          <div className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
            .AI
          </div>
        </Link>
        <div className="lg:hidden flex flex-row gap-2">
          <button
            className="navbar-burger flex items-center text-blue-600 p-3"
            onClick={toggleMenu}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
          <Menu>
            <MenuHandler>
              <div className="cursor-pointer">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  size="sm"
                />
              </div>
            </MenuHandler>
            <MenuList>
              <MenuItem>{user}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <ul
          className={`${
            isOpen ? "" : "hidden"
          } absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6`}
        >
          <li>
            <Link className="text-sm text-gray-700 hover:text-gray-900" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-sm text-gray-700 hover:text-gray-900 font-bold" href="/">
              About Us
            </Link>
          </li>
          <li>
            <Link className="text-sm text-gray-700 hover:text-gray-900" href="/">
              Services
            </Link>
          </li>
          <li>
            <Link className="text-sm text-gray-700 hover:text-gray-900" href="/">
              Pricing
            </Link>
          </li>
          <li>
            <Link className="text-sm text-gray-700 hover:text-gray-900" href="/">
              Contact
            </Link>
          </li>
        </ul>
        {!token ? (
          <>
            <Link
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 p-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
              href="auth/login"
            >
              Sign In
            </Link>
            <Link
              className="hidden lg:inline-block bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding 
                text-transparent font-bold bg-opacity-50 text-white p-2 px-6 rounded-xl 
                hover:from-blue-700 hover:to-purple-600"
              href="auth/register"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            <div className=" gap-2 hidden lg:flex ">
              <Link
                className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding 
            text-transparent font-bold bg-opacity-50 text-white p-2 px-6 rounded-xl 
            hover:from-blue-700 hover:to-purple-600"
                href="/user"
              >
                My Dashboard
              </Link>
              <Menu>
                <MenuHandler>
                  <div className="cursor-pointer">
                    <Avatar
                      src="https://docs.material-tailwind.com/img/face-2.jpg"
                      alt="avatar"
                      size="sm"
                    />
                  </div>
                </MenuHandler>
                <MenuList>
                  <MenuItem disabled>{user}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </>
        )}
      </nav>
      {isOpen && (
        <div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <Link className="flex mr-auto text-3xl font-bold leading-none" href="/">
                Interview
                <div className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
                  .AI
                </div>
              </Link>
              <button className="navbar-close" onClick={toggleMenu}>
                <svg
                  className="h-6 w-6 text-gray-700 cursor-pointer h9ver:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm font-bold text-gray-700 hover:bg-blue-509hover:text-blue-600 rounded"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm font-bold text-gray-700 hover:bg-blue-509hover:text-blue-600 rounded"
                    href="/"
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm font-bold text-gray-700 hover:bg-blue-509hover:text-blue-600 rounded"
                    href="/"
                  >
                    Services
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm font-bold text-gray-700 hover:bg-blue-509hover:text-blue-600 rounded"
                    href="/"
                  >
                    Pricing
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm font-bold text-gray-700 hover:bg-blue-509hover:text-blue-600 rounded"
                    href="/"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              {!token ? (
                <div className="pt-6">
                  <a
                    className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-bold bg-gray-50 hover:bg-gray-100 rounded-xl"
                    href="auth/login"
                  >
                    Sign in
                  </a>
                  <a
                    className="block px-4 py-3 mb-2 leading-loose text-xs text-center bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding 
                      text-transparent font-bold bg-opacity-50 text-white rounded-xl 
                      hover:from-blue-700 hover:to-purple-600"
                    href="auth/register"
                  >
                    Sign up
                  </a>
                </div>
              ) : (
                <div className="pt-6">
                  <a
                    className="block px-4 py-3 mb-3 leading-loose text-xs text-center bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding 
                      text-transparent font-bold bg-opacity-50 text-white rounded-xl 
                      hover:from-blue-700 hover:to-purple-600"
                    href="/user"
                  >
                    My Dashboard
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
