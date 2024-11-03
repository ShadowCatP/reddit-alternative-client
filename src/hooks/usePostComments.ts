import { useState, useEffect } from "react";
import { fetchPostComments } from "../services/api";
import { CommentData, RedditChild } from "../types";

export const usePostComments = (postId: string, subreddit: string) => {
  const [comments, setComments] = useState<RedditChild<CommentData>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const commentsData = await fetchPostComments(postId, subreddit);
        setComments(commentsData);
      } catch (err) {
        console.error("Error fetching comments: " + err);
        setError("Failed to fetch comments.");
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId, subreddit]);

  return { comments, loading, error };
};
