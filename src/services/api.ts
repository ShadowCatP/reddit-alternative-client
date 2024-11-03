import instance from "./oauth.ts";
import {
  PostData,
  RedditPostResponse,
  RedditListingResponse,
  CommentData,
  RedditChild,
  RedditListing,
} from "../types";
import axios, { AxiosError } from "axios";

export const fetchPosts = async (
  subreddit: string,
  after?: string | null,
): Promise<PostData[]> => {
  try {
    const res = await instance.get<RedditListingResponse>(
      `/r/${subreddit}.json`,
      {
        params: {
          limit: 10,
          after: after || null,
        },
      },
    );
    if (res.data.data.children.length === 0) {
      throw new Error("404 - Page does not exists");
    }
    return res.data.data.children.map((child) => child.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      if (err.response?.status === 429) {
        // Handle rate limit
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchPosts(subreddit, after);
      } else if (err.response?.status === 404) {
        throw new Error("404 - Page does not exists");
      }
    }
    throw error;
  }
};

export const fetchPostDetails = async (
  postId: string,
  subreddit: string,
): Promise<PostData> => {
  const res = await instance.get<RedditPostResponse>(
    `/r/${subreddit}/comments/${postId}.json`,
  );
  return res.data[0].data.children[0].data;
};

export const fetchPostComments = async (
  postId: string,
  subreddit: string,
): Promise<RedditChild<CommentData>[]> => {
  const res = await instance.get<RedditListing<CommentData>[]>(
    `/r/${subreddit}/comments/${postId}.json`,
  );
  const commentData = res.data[1].data.children;
  return commentData;
};

export const fetchUserInfo = async (username: string) => {
  try {
    const url = `/user/${username}/about.json`;
    const res = await instance.get(url);
    if (res.data && res.data.data) {
      return res.data;
    } else {
      throw new Error("User data is unavailable or deleted");
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchFrontPagePosts = async (
  after?: string | null,
): Promise<PostData[]> => {
  try {
    const res = await instance.get<RedditListingResponse>(`/best.json`, {
      params: {
        limit: 10,
        after: after || null,
      },
    });
    return res.data.data.children.map((child) => child.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      console.error("Axios error response:", err.response?.data);
      if (err.response?.status === 429) {
        // Handle rate limit
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchFrontPagePosts(after);
      }
    }
    throw error;
  }
};
