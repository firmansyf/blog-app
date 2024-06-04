import axios from "../axios";

export function getDataPostBlog() {
  return axios({
    method: "get",
    url: "/posts",
  });
}
