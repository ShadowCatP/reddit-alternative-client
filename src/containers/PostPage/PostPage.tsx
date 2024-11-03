import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { usePostComments } from "../../hooks/usePostComments";
import { PostDetails } from "../../components/PostDetails/PostDetails";
import { PostComment } from "../../components/PostComment/PostComment";
import { PostData } from "../../types";
import { PostDetailsSkeleton } from "../../components/PostDetailsSkeleton/PostDetailsSkeleton.tsx";
import { PostCommentSkeleton } from "../../components/PostCommentSkeleton/PostCommentSkeleton.tsx";
import { ErrorPage } from "../ErrorPage/ErrorPage.tsx";

export const PostPage: React.FC = () => {
  const { id, subreddit } = useParams<{ id: string; subreddit: string }>();
  const location = useLocation() as {
    state: { post: PostData; authorAvatar: string };
  };
  const navigate = useNavigate();
  const post = location.state?.post;
  const authorAvatar = location.state?.authorAvatar;
  const { comments, loading, error } = usePostComments(id!, subreddit!);

  const handleReturn = () => {
    navigate(-1);
  };

  if (error) return <ErrorPage />;

  return (
    <div className="post-page">
      <div className="post-info">
        <div className="post-details">
          {loading ? (
            <PostDetailsSkeleton />
          ) : (
            post && (
              <PostDetails
                post={post}
                authorAvatar={authorAvatar}
                handleReturn={handleReturn}
              />
            )
          )}
        </div>
        <div className="post-comments">
          <h2>Comments</h2>
          {loading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <PostCommentSkeleton key={index} />
              ))}
            </>
          ) : comments.length > 0 ? (
            comments
              .filter((comment) => comment.kind === "t1")
              .map((comment) => (
                <PostComment key={comment.data.id} comment={comment.data} />
              ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
