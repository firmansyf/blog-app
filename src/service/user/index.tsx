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

export function postUser(params: any) {
  return axios({
    method: "post",
    url: "/users",
    data: params,
  });
}

export function putUser(id: number, params: any) {
  return axios({
    method: "put",
    url: `/users/${id}`,
    data: params,
  });
}

export function deleteUser(id: number) {
  return axios({
    method: "delete",
    url: `/users/${id}`,
  });
}
