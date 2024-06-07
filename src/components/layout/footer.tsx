import { FC } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { BlogPost } from "./../../lib/Type";
import { Card } from "../ui/card";

type Props = {
  data: BlogPost | any;
};
const FooterComponent: FC<Props> = ({ data }) => {
  const getYear = new Date().getFullYear();

  return (
    <>
      <section className="flex max-lg:flex-col max-xl:flex-row max-md:flex-col max-sm:flex-col-reverse w-full justify-center gap-10 mt-10 py-12">
        <Card className="p-10 flex flex-col justify-center gap-7 bg-[#283A61] text-white">
          <span className="text-xl font-semibold text-center w-full">
            Subscribe To <br /> Our Newsletter
          </span>
          <p className="text-center">
            Get weekly food news, articles, and <br /> videos delivered to your
            inbox.
          </p>
          <Input placeholder="Type your email" />
          <Button className="w-min">Sign Up</Button>
        </Card>
        <div className="flex flex-col gap-3 px-3 max-sm:p-5">
          <h1 className="uppercase tracking-wide font-semibold">
            Popular Posts
          </h1>
          {data?.slice(0, 3)?.map((item: BlogPost, index: number) => (
            <span className="text-sm capitalize w-4/5" key={index}>
              {item.title}
            </span>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center justify-center p-3 gap-5 bg-[#eee] mt-10">
        <div className="flex items-center text-sm gap-3 mt-4">
          <Link href={"/about"} className="">
            About
          </Link>
          <Link href={"/privacy-policy"} className="">
            Privacy Policy
          </Link>
          <Link href={"/contact"} className="">
            Contact
          </Link>
        </div>

        <span className="text-sm text-slate-600">
          Copyright &copy; {getYear} Synapsis Blog. All Rights Reserved.
        </span>
      </footer>
    </>
  );
};

export default FooterComponent;
