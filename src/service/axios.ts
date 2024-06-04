import ax from "axios";

export const axios = ax.create({
  baseURL: "https://gorest.co.in/public/v2",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 6d0169911311999b4b11acdb9b81a7f507f4eda4a56b290f4ce68e2bfe4bf3d4",
  },
});

export default axios;
