"use client";

import { getDataPostBlog } from "@/service/blog";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import { RootState } from "../store";
import { BlogPost } from "./../../lib/Type";

export const fetchBlogPosts = createAsyncThunk<BlogPost[]>(
  "postsBlog/fetchPostsBlog",
  async () => {
    const response = await getDataPostBlog();
    const data = await response;
    return data.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as BlogPost[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state: any): void => {
        state.status = "loading";
      })
      .addCase(fetchBlogPosts.fulfilled, (state: any, action: any): void => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state: any, action: any): void => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default postsSlice.reducer;
