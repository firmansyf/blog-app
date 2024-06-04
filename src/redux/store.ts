"use client";

import { configureStore } from "@reduxjs/toolkit";
import postBlogReduces from "./reducer/postsBlogReducer";

export const store = configureStore({
  reducer: {
    posts: postBlogReduces,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
