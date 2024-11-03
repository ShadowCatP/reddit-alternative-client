import { CommentData, RedditChild } from "../../types";
import React, { useState } from "react";
import he from "he";
import { formatDate } from "../../utils/formatDate.ts";
import { useUserAvatar } from "../../hooks/useUserAvatar.ts";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader.tsx";

interface CommentProps {
  comment: CommentData;
}

export const PostComment: React.FC<CommentProps> = ({ comment }) => {
  const authorAvatar = useUserAvatar(comment.author);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const decodedHtml = comment.body_html
    ? he.decode(comment.body_html)
    : comment.body;

  const hasReplies =
    typeof comment.replies === "object" &&
    comment.replies.data.children.some((child) => child.kind === "t1");

  return (
    <div className="comment">
      <div className="comment-topbar">
        <div className="avatar">
          {authorAvatar ? (
            <img src={authorAvatar} alt={`${comment.author}'s avatar`} />
          ) : (
            <SkeletonLoader width="32px" height="32px" borderRadius="50%" />
          )}
        </div>
        <div>
          {comment.author} • {formatDate(comment.created_utc)}
        </div>
      </div>
      <div className="comment-content">
        {hasReplies && (
          <div className="comment-line">
            <div className="line-main"></div>
          </div>
        )}
        <div className="comment-mid-row">
          <div></div>
          <div
            className="comment-text"
            dangerouslySetInnerHTML={{ __html: decodedHtml }}
          ></div>
        </div>
        <div className="comment-bottom-row">
          <div className="collapse-button">
            {hasReplies && (
              <button onClick={toggleCollapsed}>{collapsed ? "+" : "-"}</button>
            )}
          </div>
          <div className="comment-stats">
            <div className="comment-ups">
              <i className="fa-solid fa-caret-up"></i>
              {comment.ups}
            </div>
          </div>
        </div>
      </div>
      {hasReplies && !collapsed && (
        <div className="comment-children">
          {comment.replies.data.children
            .filter(
              (replyChild: RedditChild<CommentData>) =>
                replyChild.kind === "t1",
            )
            .map((replyChild: RedditChild<CommentData>, i: number) => (
              <div key={replyChild.data.id} style={{ display: "contents" }}>
                <div className="threadline">
                  <div className="comment-corner" />
                  {i < comment.replies.data.children.length - 1 && (
                    <div className="comment-branch" />
                  )}
                </div>
                <PostComment comment={replyChild.data as CommentData} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
