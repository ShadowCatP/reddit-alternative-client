import React from "react";

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
  style = {},
}) => {
  return (
    <div
      className="skeleton-loader"
      style={{ width, height, borderRadius, ...style }}
    ></div>
  );
};
