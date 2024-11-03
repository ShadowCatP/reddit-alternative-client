import React, { useEffect } from "react";
import { PostSummaryCard } from "../../components/PostSummaryCard/PostSummaryCard";
import { useParams } from "react-router-dom";
import { debounce } from "../../utils/debounce";
import { usePosts } from "../../hooks/usePosts";
import { PostSummaryCardSkeleton } from "../../components/PostSummaryCardSkeleton/PostSummaryCardSkeleton.tsx";
import { ErrorPage } from "../ErrorPage/ErrorPage.tsx";

export const SubredditPage: React.FC = () => {
  const { subreddit } = useParams();
  const { posts, loading, loadingMore, loadMorePosts, error } = usePosts(
    subreddit!,
  );

  const handleScroll = debounce(() => {
    if (
      document.body.scrollHeight - 300 < window.scrollY + window.innerHeight &&
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

  if (error) return <ErrorPage message={error} />;

  return (
    <div className="subreddit-wrapper">
      <div className="subreddit-page">
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <PostSummaryCardSkeleton key={index} />
            ))}
          </>
        ) : (
          posts.map((post) => (
            <PostSummaryCard key={post.id} post={post} subreddit={subreddit!} />
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
