"use client";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Button } from "@material-tailwind/react";
import store from "../redux/store"; // Import the store

export default function Home() {
  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <Provider store={store}>
        <Toaster position="top-center" gutter={10} />
        <div className="flex gap-2">
          <Link href="auth/login">
            <Button color="blue">Login</Button>
          </Link>
          <Link href="auth/register">
            <Button color="blue">Register</Button>
          </Link>
        </div>
      </Provider>
    </>
  );
}
