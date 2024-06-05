import axios from "../axios";

export function getDataPostBlog(params: any) {
  return axios({
    method: "get",
    url: "/posts",
    params,
  });
}
  