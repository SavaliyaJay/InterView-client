"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import store from "../redux/store"; // Correct store import path

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
