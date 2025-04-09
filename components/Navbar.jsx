"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { User, LogOut, Search, Rocket, Code, MessageSquare } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = window.localStorage.getItem("role");
      const userName = window.localStorage.getItem("user");
      const userToken = window.localStorage.getItem("token");

      setUser(userName);
      setToken(userToken);
      setRole(userRole);

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("user");
      document.cookie =
        "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
        window.location.hostname +
        ";";
      window.location.href = "/auth/login";
    }
  };

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-md bg-black/20 dark:bg-slate-900/60" : "bg-transparent"}`}
    >
      <nav
        className={`relative px-6 py-4 flex justify-between items-center transition-all duration-300 text-gray-900"`}
      >
        <Link className="text-3xl font-bold leading-none flex items-center" href="/">
          <div className="mr-2 text-4xl">
            <Rocket className="h-8 w-8 text-blue-500" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Interview.AI
          </span>
        </Link>

        <div className="lg:hidden flex flex-row gap-4 items-center">
          <button className="flex items-center text-blue-600 p-2" onClick={toggleMenu}>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <svg
                className="h-5 w-5 fill-current text-blue-500"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </div>
          </button>

          {token && (
            <Menu>
              <MenuHandler>
                <div className="cursor-pointer hover:scale-105 transition-all">
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/42.jpg"
                    alt="avatar"
                    size="sm"
                    className="ring-2 ring-blue-500"
                  />
                </div>
              </MenuHandler>
              <MenuList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <MenuItem className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User className="h-4 w-4" />
                  {user}
                </MenuItem>
                <MenuItem
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>

        {!role ? (
          <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-8">
            <li>
              <Link
                className={`text-sm font-medium transition-all flex items-center gap-2 ${!token ? "text-gray-400 cursor-not-allowed" : "hover:text-blue-500"}`}
                href={token ? "/user" : "/auth/login"}
              >
                <Code className="h-4 w-4" />
                <span>Practice</span>
              </Link>
            </li>
            <li>
              <Link
                className={`text-sm font-medium transition-all flex items-center gap-2 ${!token ? "text-gray-400 cursor-not-allowed" : "hover:text-blue-500"}`}
                href={token ? "/user/content" : "/auth/login"}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Custom</span>
              </Link>
            </li>
          </ul>
        ) : (
          ""
        )}
        {role === "1" ? (
          <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-8">
            <li>
              <Link
                className={`text-sm font-medium transition-all flex items-center gap-2 ${!token ? "text-gray-400 cursor-not-allowed" : "hover:text-blue-500"}`}
                href={token ? "/user" : "/auth/login"}
              >
                <Code className="h-4 w-4" />
                <span>Practice</span>
              </Link>
            </li>
            <li>
              <Link
                className={`text-sm font-medium transition-all flex items-center gap-2 ${!token ? "text-gray-400 cursor-not-allowed" : "hover:text-blue-500"}`}
                href={token ? "/user/content" : "/auth/login"}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Custom</span>
              </Link>
            </li>
          </ul>
        ) : (
          ""
        )}

        <div className="hidden lg:flex items-center gap-4">
          {!token ? (
            <>
              <Link
                className="py-2 px-6 bg-white/10 backdrop-blur-md border border-gray-300 dark:border-gray-700 hover:bg-white/20 text-sm font-bold rounded-xl transition-all"
                href="auth/login"
              >
                Sign In
              </Link>
              <Link
                className="py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                href="auth/register"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Menu>
                  <MenuHandler>
                    <div className="cursor-pointer hover:scale-105 transition-all">
                      <Avatar
                        src="https://randomuser.me/api/portraits/women/42.jpg"
                        alt="avatar"
                        size="sm"
                        className="ring-2 ring-blue-500"
                      />
                    </div>
                  </MenuHandler>
                  <MenuList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                    <MenuItem className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4" />
                      {user}
                    </MenuItem>
                    <MenuItem
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </>
          )}
        </div>
      </nav>

      {isOpen && (
        <div className="navbar-menu relative z-50">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleMenu}></div>
          <nav className="fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-l border-gray-200 dark:border-gray-800 overflow-y-auto transition-all transform duration-300">
            <div className="flex items-center mb-8">
              <Link className="flex mr-auto text-3xl font-bold leading-none" href="/">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  Interview.AI
                </span>
              </Link>
              <button className="p-2" onClick={toggleMenu}>
                <svg
                  className="h-6 w-6 text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
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

            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-3 pl-10 pr-4 text-sm bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div>
              <ul>
                <li className="mb-1">
                  <Link
                    className={`flex items-center gap-3 p-4 text-sm font-medium rounded-xl transition-all ${!token ? "text-gray-400 cursor-not-allowed" : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600"}`}
                    href={token ? "/user" : "/auth/login"}
                  >
                    <Code className="h-5 w-5" />
                    <span>Practice</span>
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className={`flex items-center gap-3 p-4 text-sm font-medium rounded-xl transition-all ${!token ? "text-gray-400 cursor-not-allowed" : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600"}`}
                    href={token ? "/user/content" : "/auth/login"}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Custom</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-auto">
              {!token ? (
                <div className="pt-6 space-y-3">
                  <Link
                    className="block py-3 px-4 text-center font-bold bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:bg-white/70 dark:hover:bg-gray-800/70 rounded-xl transition-all"
                    href="auth/login"
                  >
                    Sign in
                  </Link>
                  <Link
                    className="block py-3 px-4 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    href="auth/register"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="pt-6 space-y-3">
                  {/* Dashboard button removed as it was commented out */}
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
