"use client";

import NavbarComponent from "@/components/layout/navbar";
import { fetchBlogPosts } from "@/redux/reducer/postsBlogReducer";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BlogPost } from "./../lib/Type";
import { Card } from "@/components/ui/card";

export default function Home() {
  const dispatch: any = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogPosts());
    }
  }, [status, dispatch]);

  return (
    <main className="min-h-screen p-0">
      <NavbarComponent />

      <section className="title flex items-center justify-center gap-3 flex-col py-20">
        <span className="text-3xl tracking-wide font-semibold">
          Synapsis Blog Application
        </span>
        <p className="tracking-wide text-sm">
          A blog about anything, experiences, and recipes.
        </p>
      </section>

      <section className="content w-full flex flex-col justify-center items-center gap-14">
        <div className="for-search w-1/4 flex items-center border-2 gap-2 rounded p-1">
          <input
            placeholder="Search for articles"
            className="w-full border-none bg-opacity-50 border text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <MagnifyingGlassIcon className="w-7 mr-2 text-gray-400" />
        </div>
        <div className="for-data w-full flex flex-wrap justify-center gap-3">
          {posts?.map((item: BlogPost, index: number) => (
            <Card key={index} className="w-1/3">
              {item.title}
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
