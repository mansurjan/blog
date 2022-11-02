import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios, { AxiosResponse } from "axios";
import { Post, PostInitialState } from "../../interface/interface";

const POSTS_URL = "http://localhost:8000/posts";

const initialState: PostInitialState = {
  status: "idle",
  posts: [],
  error: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response: AxiosResponse<Post> = await axios.get(POSTS_URL);
  return response.data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: Post) => {
    const response = await axios.post(POSTS_URL, newPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost: Post) => {
    const { id } = updatedPost;
    const response = await axios.put(`${POSTS_URL}/${id}`, updatedPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return id;
    return `${response?.status}: ${response?.statusText}`;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PostInitialState>) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (!id) {
          console.log("Could not create Post");
          return;
        } else {
          state.posts.push(action.payload);
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (!id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        } else {
          const posts = state.posts.filter((post) => post.id !== id);
          state.posts = [action.payload, ...posts];
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        state.posts = state.posts.filter((post) => post.id !== id);
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (state: RootState, postId: string) => {
  return state.posts.posts.find((post) => post.id === postId)!;
};

export default postSlice.reducer;
