import axios from "../axios";

export function getDataPostBlog(params: any) {
  return axios({
    method: "get",
    url: "/posts",
    params,
  });
}

export function getDataPostBlogById(id: number) {
  return axios({
    method: "get",
    url: `/posts/${id}`,
  });
}
