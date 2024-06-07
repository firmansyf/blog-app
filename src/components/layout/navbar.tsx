"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { FC } from "react";

const NavbarComponent: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="z-10 w-full flex items-center justify-center backdrop-blur-md px-20 md:h-14 sm:h-auto xl:h-14 top-0 fixed max-sm:p-3">
      <section className="flex lg:w-11/12 sm:w-full md:w-full sm:justify-center md:justify-between lg:justify-between sm:items-center max-sm:flex-col max-md:flex-col max-lg:flex-row">
        <h1
          className="text-xl font-semibold tracking-wide cursor-pointer"
          onClick={() => router.push("/")}
        >
          Synapsis Blog
        </h1>
        <div className="flex items-center sm:justify-center lg:justify-end gap-2 lg:w-1/5 xl:w-1/5 md:w-1/3 sm:w-full">
          {/* <Link href={"/about"} className="">
            About
          </Link>
          <Link href={"/contact"} className="">
            Contact
          </Link> */}
          <Link
            href={"/user-data"}
            className={`link ${
              pathname === "/user-data" ? "font-semibold underline underline-offset-8" : ""
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
