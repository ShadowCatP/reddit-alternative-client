import React from "react";
import { PostData } from "../../types";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate.ts";
import { useUserAvatar } from "../../hooks/useUserAvatar.ts";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader.tsx";

interface PostCardProps {
  post: PostData;
  subreddit: string;
  showSubreddit?: boolean;
}

export const PostSummaryCard: React.FC<PostCardProps> = ({
  post,
  subreddit,
  showSubreddit = false,
}) => {
  const navigate = useNavigate();
  const authorAvatar = useUserAvatar(post.author);

  const handleClick = () => {
    const targetSubreddit = subreddit || post.subreddit;
    navigate(`/sub/${targetSubreddit}/post/${post.id}`, {
      state: { post, authorAvatar },
    });
  };

  return (
    <div className="post-summary-card" onClick={handleClick}>
      <div className="author">
        {authorAvatar ? (
          <img src={authorAvatar} alt={`${post.author}'s avatar`} />
        ) : (
          <SkeletonLoader width="32px" height="32px" borderRadius="50%" />
        )}
        <p>
          {post.author} • {formatDate(post.created_utc)}
          {showSubreddit && (
            <>
              {" • "}
              <span
                className="subreddit-name"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/sub/${post.subreddit}`);
                }}
              >
                r/{post.subreddit}
              </span>
            </>
          )}
        </p>
      </div>
      <div className="title">
        <h2>{post.title}</h2>
      </div>
      <div className="post-stats">
        <div className="ups">
          <i className="fa-solid fa-caret-up"></i>
          {post.ups}
        </div>
        <div className="awards">
          <i className="fa-solid fa-award"></i>
          {post.total_awards_received}
        </div>
        <div className="comments">
          <i className="fa-regular fa-comment"></i>
          {post.num_comments}
        </div>
      </div>
    </div>
  );
};
