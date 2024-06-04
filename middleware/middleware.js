"use client";

import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function middleware(Component) {
  return function (props) {
    const role = window.localStorage.getItem("role");
    useLayoutEffect(() => {
      if (!role || role !== 1 || role !== 0) {
        redirect("/auth/login");
      }
    }, []);

    if (!role) {
      return null;
    }

    return <Component {...props} />;
  };
}
