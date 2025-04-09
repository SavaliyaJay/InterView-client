"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  Typography,
  Button,
  Card,
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList
} from "@material-tailwind/react";
import {
  ChevronDown,
  User,
  LogOut,
  Moon,
  Sun,
  Settings,
  Search,
  Rocket,
  Bell,
  BookOpen,
  Code,
  MessageSquare
} from "lucide-react";
import { fetchCategoryListThunkAction } from "@/redux/category/actions";
import { selectCategoryList } from "@/redux/category/selectors";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { CategoryList } = useSelector(selectCategoryList);
  const [role, setRole] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Animation refs
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategoryListThunkAction());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = window.localStorage.getItem("role");
      const isDark = window.localStorage.getItem("darkMode") === "true";
      setRole(userRole);
      setDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }

      // Trigger animations
      setTimeout(() => {
        setIsLoaded(true);

        if (headingRef.current) {
          headingRef.current.classList.remove("opacity-0", "translate-y-10");
          headingRef.current.classList.add("opacity-100", "translate-y-0");
        }

        setTimeout(() => {
          if (subheadingRef.current) {
            subheadingRef.current.classList.remove("opacity-0", "translate-y-10");
            subheadingRef.current.classList.add("opacity-100", "translate-y-0");
          }
        }, 300);

        setTimeout(() => {
          if (buttonRef.current) {
            buttonRef.current.classList.remove("opacity-0", "scale-95");
            buttonRef.current.classList.add("opacity-100", "scale-100");
          }
        }, 600);

        // Animate categories section
        setTimeout(() => {
          if (categoriesRef.current) {
            categoriesRef.current.classList.remove("opacity-0", "translate-y-10");
            categoriesRef.current.classList.add("opacity-100", "translate-y-0");
          }
        }, 900);
      }, 500);
    }
  }, []);

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-24 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 dark:from-black/40 to-transparent"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
          <div
            ref={headingRef}
            className="opacity-0 translate-y-10 transition-all duration-700 mb-6"
          >
            <Typography
              variant="h1"
              className="text-5xl md:text-7xl font-black mb-4 drop-shadow-sm"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Master Your Next Interview
              </span>
            </Typography>
            <Typography variant="h2" className="text-xl md:text-3xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Powered by Advanced AI
              </span>
            </Typography>
          </div>

          <div
            ref={subheadingRef}
            className="opacity-0 translate-y-10 transition-all duration-700 delay-300 max-w-xl mb-10"
          >
            <Typography variant="lead" className="text-gray-700 dark:text-gray-300">
              Practice with AI interviewers, receive real-time feedback, and analyze your
              performance with data-driven insights to land your dream job.
            </Typography>
          </div>

          <div ref={buttonRef} className="opacity-0 scale-95 transition-all duration-500 delay-500">
            {!role ? (
              <Link
                href="/auth/login"
                className="flex items-center gap-2 py-3 px-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-105"
              >
                <Rocket className="h-5 w-5" />
                <span>Get Started Now</span>
              </Link>
            ) : (
              <Link
                href={`${role === "0" ? "/admin" : "/user"}`}
                className="flex items-center gap-2 py-3 px-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-105"
              >
                <Rocket className="h-5 w-5" />
                <span>Get Started Now</span>
              </Link>
            )}
          </div>

          {/* Categories Section */}
          <div
            ref={categoriesRef}
            className="w-full max-w-6xl mt-32 opacity-0 translate-y-10 transition-all duration-700 delay-700"
          >
            <Typography variant="h3" className="text-center mb-8 text-3xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Popular Interview Categories
              </span>
            </Typography>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {CategoryList &&
                CategoryList.map((category) => (
                  <Link href={`/user`} key={category.c_id} className="group">
                    <div className="aspect-square flex flex-col items-center justify-center p-4 bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                      <div className="mb-3 p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
                        <Code className="h-6 w-6 text-blue-500" />
                      </div>
                      <Typography className="font-medium text-center text-gray-800 dark:text-gray-200">
                        {category.name}
                      </Typography>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl">
            {[
              {
                title: "AI-Powered Practice",
                description:
                  "Train with intelligent AI interviewers customized for your industry and role",
                icon: <MessageSquare className="h-8 w-8 text-blue-500" />
              },
              {
                title: "Real-time Feedback",
                description: "Get instant analysis on your responses, body language, and delivery",
                icon: <Code className="h-8 w-8 text-purple-500" />
              },
              {
                title: "Progress Tracking",
                description: "Track your improvement over time with detailed performance metrics",
                icon: <BookOpen className="h-8 w-8 text-blue-500" />
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-2xl hover:shadow-xl transition-all hover:scale-105 hover:border-blue-500/30"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-gray-100/20 dark:bg-gray-800/50">
                    {feature.icon}
                  </div>
                  <Typography variant="h5" className="mb-2 font-bold">
                    {feature.title}
                  </Typography>
                  <Typography className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-8 border-t border-white/10 dark:border-gray-800/50">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 left-1/3 w-64 h-32 bg-blue-500/10 rounded-full filter blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-blue-500" />
              <Typography className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Interview.AI
              </Typography>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-4">
                © {new Date().getFullYear()} All rights reserved
              </span>
            </div>

            {/* Quick Links */}
            <div className="flex gap-6">
              {["About", "Features", "Pricing", "Support", "Contact"].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
        }

        /* Add these at root level */
        :root {
          --blue-glow: 0 0 15px rgba(59, 130, 246, 0.5);
          --purple-glow: 0 0 15px rgba(168, 85, 247, 0.5);
        }

        .dark {
          --tw-bg-opacity: 1;
          background-color: rgb(17 24 39 / var(--tw-bg-opacity));
          color: white;
        }
      `}</style>
    </div>
  );
}
