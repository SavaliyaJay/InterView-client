"use client";
import Navbar from "@/components/Navbar";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function Home() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = window.localStorage.getItem("role");
      setRole(userRole);
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="flex flex-wrap items-center">
          <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
            <Typography
              variant="h1"
              className="mb-6 font-black bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent"
            >
              AI Interview Preparation engine
            </Typography>
            <Typography variant="lead">
              Admin provides questions, users submit answers, and AI offers tailored feedback and
              suggestions, helping users improve and excel in interview performance.
            </Typography>
            <Typography variant="lead" className="mt-2">
              <Link
                href={`${role === "0" ? "/admin" : "/user"}`}
                className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding 
                text-transparent bg-opacity-50 text-white font-bold p-3 px-6 rounded-xl 
                hover:from-blue-700 hover:to-purple-600"
              >
                {"Get Start"}
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
