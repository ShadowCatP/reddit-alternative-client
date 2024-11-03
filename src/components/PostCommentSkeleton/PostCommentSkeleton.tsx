import React from "react";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";

export const PostCommentSkeleton: React.FC = () => {
  return (
    <div className="post-comment-skeleton">
      <div className="comment-topbar">
        <SkeletonLoader width="32px" height="32px" borderRadius="50%" />
        <SkeletonLoader
          width="100px"
          height="16px"
          style={{ marginLeft: "8px" }}
        />
      </div>
      <SkeletonLoader width="100%" height="64px" style={{ marginTop: "8px" }} />
    </div>
  );
};
