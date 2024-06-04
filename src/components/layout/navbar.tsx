import Link from "next/link";
import { FC } from "react";

const NavbarComponent: FC = () => {
  return (
    <nav className="w-full flex items-center justify-center backdrop-blur-md px-20 h-14">
      <section className="flex w-11/12 justify-between">
        <h1 className="text-xl font-semibold tracking-wide">Synapsis Blog</h1>
        <div className="flex items-center gap-2">
          <Link href={"/about"} className="">
            About
          </Link>
          <Link href={"/contact"} className="">
            Contact
          </Link>
        </div>
      </section>
    </nav>
  );
};

export default NavbarComponent;
