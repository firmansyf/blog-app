/* eslint-disable @next/next/no-img-element */
"use client";

import FooterComponent from "@/components/layout/footer";
import NavbarComponent from "@/components/layout/navbar";
import { Separator } from "@/components/ui/separator";

import { getDataPostBlogById } from "@/service/blog";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchBlogPosts } from "@/redux/reducer/postsBlogReducer";
import { BlogPost } from "@/lib/Type";
import { getUser } from "@/service/user";
import { getCommentData } from "@/service/comments";

const DetailPosts: FC = () => {
  const dispatch: any = useDispatch();
  const params = useParams();
  const id: any = params.postsId;
  const { posts, page, per_page } = useSelector(
    (state: RootState) => state.posts
  );
  const [data, setData] = useState<BlogPost | any>({});
  const [user, setUser] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  // const [inputComment, setInputComment] = useState<string>("");
  // const [filterUser, setFilterUser] = useState<any>();

  useEffect(() => {
    dispatch(fetchBlogPosts({ page, per_page }));
  }, [dispatch, page, per_page]);

  // Filter data comments by Id
  useEffect(() => {
    getCommentData({ page: 1, per_page: 100 })
      .then(({ data }) => {
        const result = data?.filter((item: any) => {
          return item.post_id === Number(id);
        });
        setComments(result);
      })
      .catch((error) => console.log("err :", error));
  }, [id]);

  // Filter data user by Id
  useEffect(() => {
    getUser({ page: 1, per_page: 100 })
      .then(({ data }) => {
        const result = data?.filter((item: any) => {
          return item.id === data.user_id;
        });

        setUser(result);
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [data]);

  // Fetch detail data
  useEffect(() => {
    getDataPostBlogById(id)
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => "");
  }, [id]);

  // const onSubmit = (e: any) => {
  //   e.preventDefault();

  //   const params = {
  //     body: inputComment,
  //     // name: data.
  //     // email:
  //   };

  //   postComment(id, params)
  //     .then((res) => {
  //       // console.log("res :", res);
  //     })
  //     .catch((err) => console.log("err :", err));
  // };

  return (
    <>
      <NavbarComponent />
      <section className="py-24 w-full flex justify-center items-center flex-col gap-5">
        <div className="lg:w-[63%] xl:w-[63%] sm:w-fullflex flex-col xl:gap-5 sm:gap-3 max-sm:p-3 max-md:p-5 max-lg:p-5">
          <h1 className="text-4xl capitalize font-bold w-full">{data.title}</h1>

          <div className="flex justify-start w-full gap-5 max-sm:pt-1">
            <img
              src="https://placehold.co/70x70"
              className="rounded-full mt-5"
              alt="img-profile"
            />

            <div className="flex flex-col w-full justify-center">
              {user?.map((item: any, i: number) => (
                <>
                  <span className="tracking-wide">{item.name || "-"}</span>
                  <span className="tracking-wide">{item.email || "-"}</span>
                </>
              ))}
            </div>
          </div>
          <Separator className="mt-10" />
        </div>

        <div className="flex xl:w-[63%] sm:w-full flex-col mt-10 gap-7 max-sm:p-5 max-md:p-5 max-lg:p-5">
          <img src="https://placehold.co/800x400" alt="" className="" />

          <p className="">{data.body}</p>
        </div>

        <div className="flex max-sm:w-full max-md:w-[63%] lg:w-[63%] max-xl:w-2/3 flex-col mt-10 gap-3 max-sm:p-5 max-md:p-5 max-lg:p-5">
          <span>Comments</span>

          <Separator />
          <div className="comment-data h-80 flex flex-col bg-gray-100 relative rounded-lg overflow-auto w-full">
            <div className="p-3 flex flex-col gap-3">
              {comments?.map((item: any, i: number) => {
                return (
                  <>
                    <section className="flex flex-col gap-1">
                      <span className="text-gray-500 text-xs pb-0">
                        {item.email}
                      </span>
                      <div
                        key={i}
                        className="comment-section bg-white p-2 gap-1 mt-0 rounded-md xl:w-1/2 sm:w-full flex flex-wrap"
                      >
                        <span className="text-gray-500 text-sm">
                          {item.body}
                        </span>
                      </div>
                    </section>
                  </>
                );
              })}
            </div>

            {/* <form
              onSubmit={onSubmit}
              className="absolute bottom-0 flex w-full gap-2"
            >
              <Input
                className=""
                name="inputComment"
                placeholder="Type your commnent"
                onChange={(e) => setInputComment(e.target.value)}
              />
              <Button type="submit" className="mr-3">
                Send
              </Button>
            </form> */}
          </div>
        </div>
      </section>
      <FooterComponent data={posts} />

      <style>
        {`.comment-section {
          -webkit-border-radius: 100px;
          -webkit-border-top-left-radius: 0;
          -moz-border-radius: 100px;
          -moz-border-radius-topleft: 0;
          border-radius: 100px;
          border-top-left-radius: 0;
        }
      `}
      </style>
    </>
  );
};

export default DetailPosts;
