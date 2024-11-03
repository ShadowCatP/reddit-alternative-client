import React from "react";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";

export const PostDetailsSkeleton: React.FC = () => {
  return (
    <div className="post-details-skeleton">
      <div className="post-header">
        <SkeletonLoader width="32px" height="32px" borderRadius="50%" />
        <div className="post-header-text">
          <SkeletonLoader width="150px" height="16px" />
        </div>
      </div>
      <SkeletonLoader width="80%" height="24px" style={{ marginTop: "16px" }} />
      <SkeletonLoader
        width="100%"
        height="200px"
        style={{ marginTop: "16px" }}
      />
    </div>
  );
};
