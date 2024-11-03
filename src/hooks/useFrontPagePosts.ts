import { useEffect, useState } from "react";
import { fetchFrontPagePosts } from "../services/api";
import { PostData } from "../types";

export const useFrontPagePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    const storedPosts = sessionStorage.getItem(`frontPagePosts`);
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
      setLoading(false);
    } else {
      const loadPosts = async () => {
        try {
          const data = await fetchFrontPagePosts();
          setPosts(data);
          sessionStorage.setItem(`frontPagePosts`, JSON.stringify(data));
        } catch (err) {
          console.log("Error fetching front page posts: " + err);
        } finally {
          setLoading(false);
        }
      };

      loadPosts();
    }
  }, []);

  const loadMorePosts = async () => {
    const afterToken = posts[posts.length - 1]?.name;
    if (!loadingMore) {
      setLoadingMore(true);
      try {
        const data = await fetchFrontPagePosts(afterToken);
        const newPosts = data.filter(
          (newPost) => !posts.some((post) => post.id === newPost.id),
        );
        const updatedPosts = [...posts, ...newPosts];
        setPosts(updatedPosts);
        sessionStorage.setItem(`frontPagePosts`, JSON.stringify(updatedPosts));
      } catch (err) {
        console.log("Error loading more front page posts: " + err);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  return { posts, loading, loadingMore, loadMorePosts };
};
