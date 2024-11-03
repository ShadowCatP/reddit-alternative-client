import React from "react";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";

export const PostSummaryCardSkeleton: React.FC = () => {
  return (
    <div className="post-summary-card-skeleton">
      <div className="post-header">
        <SkeletonLoader width="32px" height="32px" borderRadius="50%" />
        <div className="post-header-text">
          <SkeletonLoader width="150px" height="16px" />
        </div>
      </div>
      <SkeletonLoader
        width="100%"
        height="36px"
        style={{ marginTop: "16px" }}
      />
      <div className="post-stats-skeleton">
        <SkeletonLoader width="50px" height="16px" />
      </div>
    </div>
  );
};
