"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import store from "../redux/store"; // Correct store import path
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider>
            <Toaster position="top-center" gutter={10} />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
