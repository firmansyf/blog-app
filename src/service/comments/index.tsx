import axios from "../axios";

export function getCommentData(params  :any) {
  return axios({
    method: "get",
    url: "/comments",
    params,
  });
}

export function postComment(id: number, params: any) {
  return axios({
    method: "post",
    url: `/posts/${id}/comments`,
    data: params,
  });
}
