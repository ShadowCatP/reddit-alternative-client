// src/pages/HomePage/HomePage.tsx
import React, { useEffect } from "react";
import { PostSummaryCard } from "../../components/PostSummaryCard/PostSummaryCard";
import { debounce } from "../../utils/debounce";
import { useFrontPagePosts } from "../../hooks/useFrontPagePosts";
import { PostSummaryCardSkeleton } from "../../components/PostSummaryCardSkeleton/PostSummaryCardSkeleton.tsx";

export const HomePage: React.FC = () => {
  const { posts, loading, loadingMore, loadMorePosts } = useFrontPagePosts();

  const handleScroll = debounce(() => {
    if (
      document.documentElement.scrollHeight - 300 <
        window.scrollY + window.innerHeight &&
      !loadingMore
    ) {
      loadMorePosts();
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="home-container">
      <div className="home-page">
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <PostSummaryCardSkeleton key={index} />
            ))}
          </>
        ) : (
          posts.map((post) => (
            <PostSummaryCard
              key={post.id}
              subreddit={post.subreddit}
              post={post}
              showSubreddit={true}
            />
          ))
        )}
        {loadingMore && (
          <>
            {[...Array(2)].map((_, index) => (
              <PostSummaryCardSkeleton key={`loading-${index}`} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
