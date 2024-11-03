import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";
import { PostData } from "../types";

export const usePosts = (subreddit: string) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedPosts = sessionStorage.getItem(`posts-${subreddit}`);
    if (storedPosts) {
      setError(null);
      setPosts(JSON.parse(storedPosts));
      setLoading(false);
    } else {
      const loadPosts = async () => {
        try {
          setError(null);
          if (subreddit) {
            const data = await fetchPosts(subreddit);
            setPosts(data);
            sessionStorage.setItem(`posts-${subreddit}`, JSON.stringify(data));
          }
        } catch (err) {
          if (err instanceof Error) {
            console.error("Error fetching posts: " + err);
            setError(err.message || "An error occured");
          } else {
            console.error("Unknown error fetching posts: " + err);
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };

      loadPosts();
    }
  }, [subreddit]);

  const loadMorePosts = async () => {
    const afterToken = posts[posts.length - 1]?.name;
    if (subreddit && !loadingMore) {
      try {
        setLoadingMore(true);
        const data = await fetchPosts(subreddit, afterToken);
        const newPosts = data.filter(
          (newPost) => !posts.some((post) => post.id === newPost.id),
        );
        const updatedPosts = [...posts, ...newPosts];
        setPosts(updatedPosts);
        sessionStorage.setItem(
          `posts-${subreddit}`,
          JSON.stringify(updatedPosts),
        );
        setLoadingMore(false);
      } catch (err) {
        console.error("Error fetching more posts: " + err);
        setLoadingMore(false);
      }
    }
  };

  return { posts, loading, loadingMore, loadMorePosts, error };
};
