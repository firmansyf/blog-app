/* eslint-disable @next/next/no-img-element */
"use client";

import NavbarComponent from "@/components/layout/navbar";
import { fetchBlogPosts } from "@/redux/reducer/postsBlogReducer";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/Type";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import FooterComponent from "@/components/layout/footer";
import PaginationComponent from "@/components/pagination";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { posts, status, page, per_page, total_pages } = useSelector(
    (state: RootState) => state.posts
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedBlog, setSearchedBlog] = useState<BlogPost[]>([]);

  useEffect(() => {
    dispatch(fetchBlogPosts({ page, per_page }));
  }, [dispatch, page, per_page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    searchPosts(e.target.value);
  };

  const searchPosts = (keyword: string) => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchedBlog(filteredPosts);
  };

  return (
    <main className="min-h-screen w-full p-0">
      <NavbarComponent />

      <section className="title flex items-center justify-center gap-3 flex-col py-[7rem] w-full">
        <span className="max-sm:text-lg max-md:text-3xl max-lg:text-3xl xl:text-3xl tracking-wide font-semibold">
          Synapsis Blog Application
        </span>
        <p className="tracking-wide text-sm">
          A blog about anything, experiences, and recipes.
        </p>
      </section>

      <section className="content w-full flex flex-col justify-center items-center gap-14">
        <div className="for-search xl:w-1/4 sm:w-11/12 md:w-1/3 flex items-center border-2 gap-2 rounded p-1">
          <input
            placeholder="Search for articles"
            className="w-full border-none bg-opacity-50 border text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <MagnifyingGlassIcon className="w-7 mr-2 text-gray-400" />
        </div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <>
            {searchedBlog?.length > 0 ? (
              <div className="for-data w-full flex flex-wrap justify-center gap-7">
                {searchedBlog?.map((item: BlogPost, index: number) => (
                  <Card
                    key={index}
                    className="sm:w-full lg:w-1/3 border-none cursor-pointer hover:bg-gray-200 transition-all max-xl:p-1 max-md:p-5 max-lg:p-6 max-sm:p-7"
                    onClick={() => router.push(`/detail/${item.id}`)}
                  >
                    <CardHeader className="p-0">
                      <div className="flex items-center shadow-md rounded-lg justify-center w-[500px] h-[250px]">
                        <h1 className="text-lg w-2/3 tracking-wide capitalize">
                          {item.title}
                        </h1>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <section className="pt-2 flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-gray-500 tracking-wide">
                            Juni 21, 2021 . 11 min read
                          </span>
                        </div>

                        <p className="text-sm tracking-wide text-gray-500">
                          {item.body}
                        </p>
                      </section>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="for-data flex flex-wrap justify-center gap-7 max-md:flex-col max-sm:flex-col max-xl:flex-row max-lg:flex-lg w-full">
                {posts.map((item: BlogPost, index: number) => (
                  <>
                    <Card
                      key={index}
                      className="sm:w-full lg:w-1/3 border-none cursor-pointer hover:bg-gray-200 transition-all max-xl:p-1 max-md:p-5 max-lg:p-6 max-sm:p-7"
                      onClick={() => router.push(`/detail/${item.id}`)}
                    >
                      <CardHeader className="p-0">
                        <div className="flex items-center shadow-md rounded-lg justify-center sm:w-full md:w-auto lg:w-auto lg:h-[250px]">
                          <h1 className="text-lg w-2/3 tracking-wide capitalize">
                            {item.title}
                          </h1>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 w-full">
                        <section className="pt-2 flex flex-col gap-3 w-full">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500 tracking-wide">
                              Juni 21, 2021 . 11 min read
                            </span>
                          </div>

                          <p className="text-sm tracking-wide text-gray-500">
                            {item.body}
                          </p>
                        </section>
                      </CardContent>
                    </Card>
                  </>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <section className="w-full mt-10">
        <PaginationComponent page={page} totalPages={total_pages} />
      </section>

      <FooterComponent data={posts} />
    </main>
  );
}
