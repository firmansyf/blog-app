import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataPostBlog } from "@/service/blog";
import { BlogPost } from "@/lib/Type";

interface BlogState {
  posts: BlogPost[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  per_page: number;
  total_pages: number;
}

interface PropsBlog {
  page: number;
  per_page: number;
}

export const fetchBlogPosts = createAsyncThunk(
  "postsBlog/fetchPostsBlog",
  async ({ page, per_page }: PropsBlog) => {
    const response = await getDataPostBlog({ page, per_page });
    return response.data;
  }
);

const initialState: BlogState = {
  posts: [],
  status: "idle",
  error: null,
  page: 1,
  per_page: 10,
  total_pages: 1,
};

const postsSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPerPage(state, action) {
      state.per_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.page === 1 ? action.payload : [...action.payload];
        // state.page === 1
        //   ? action.payload
        //   : [...state.posts, ...action.payload];
        state.total_pages = Math.ceil(action.payload.length / state.per_page);
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { setPage, setPerPage } = postsSlice.actions;
export default postsSlice.reducer;
