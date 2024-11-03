import { PostData } from "../../types";
import he from "he";
import { formatDistanceToNow } from "date-fns";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader.tsx";
import React from "react";

interface PostProps {
  post: PostData;
  authorAvatar: string;
  handleReturn: () => void;
}

export const PostDetails: React.FC<PostProps> = ({
  post,
  authorAvatar,
  handleReturn,
}) => {
  const decodedHtml = post.selftext_html
    ? he.decode(post.selftext_html)
    : post.selftext;
  return (
    <div className="post">
      <div className="post-header">
        <button onClick={handleReturn}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        {authorAvatar ? (
          <img src={authorAvatar} alt={`${post.author}'s avatar`} />
        ) : (
          <SkeletonLoader width="32px" height="32px" borderRadius="50%" />
        )}
        <div className="post-header-details">
          <div className="post-subreddit">
            r/{post.subreddit}
            <div className="dot">•</div>
            <div className="post-date">
              {formatDistanceToNow(new Date(post.created_utc * 1000))} ago
            </div>
          </div>
          <div className="post-author">{post.author}</div>
        </div>
      </div>
      <div className="post-content">
        <div className="post-title">{post.title}</div>
        {post.url_overridden_by_dest && (
          <a className="external-link" href={post.url_overridden_by_dest}>
            {post.url_overridden_by_dest}
          </a>
        )}
        <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />
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
