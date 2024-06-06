"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { FC } from "react";

const NavbarComponent: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-center backdrop-blur-md px-20 h-14 top-0 fixed">
      <section className="flex w-11/12 justify-between">
        <h1
          className="text-xl font-semibold tracking-wide cursor-pointer"
          onClick={() => router.push("/")}
        >
          Synapsis Blog
        </h1>
        <div className="flex items-center justify-between gap-2 w-1/5">
          <Link href={"/about"} className="">
            About
          </Link>
          <Link href={"/contact"} className="">
            Contact
          </Link>
          <Link
            href={"/user-data"}
            className={`link ${
              pathname === "/user-data" ? "font-semibold" : ""
            }`}
          >
            User Data
          </Link>
        </div>
      </section>
    </nav>
  );
};

export default NavbarComponent;
