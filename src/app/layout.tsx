"use client";
import { store as Store } from "@/redux/store";
import { Provider as ProviderRedux } from "react-redux";

// import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";

// export const metadata: Metadata = {
//   title: "Synapsis - Blog",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Blog apps</title>
      </head>
      <body
        className={cn("min-h-screen bg-background antialiased font-roboto")}
      >
        <ProviderRedux store={Store}>{children}</ProviderRedux>
        <ToastContainer />
      </body>
    </html>
  );
}
