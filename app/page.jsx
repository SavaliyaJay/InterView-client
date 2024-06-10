"use client";
import Link from "next/link";
import { Button } from "@material-tailwind/react";

export default function Home() {
  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <div className="flex gap-2">
        <Link href="auth/login">
          <Button color="blue">Login</Button>
        </Link>
        <Link href="auth/register">
          <Button color="blue">Register</Button>
        </Link>
        <Link href="user">
          <Button color="blue">User</Button>
        </Link>
        <Link href="/user/myDashboard">
          <Button color="blue">My Dashboard</Button>
        </Link>
      </div>
    </>
  );
}
