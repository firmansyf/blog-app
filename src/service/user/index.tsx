import axios from "../axios";

export function getUser(params: any) {
  return axios({
    method: "get",
    url: "/users",
    params,
  });
}

export function getUserById(id: number) {
  return axios({
    method: "get",
    url: `/users/${id}`,
  });
}
