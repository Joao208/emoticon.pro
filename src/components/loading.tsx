import React from "react";

interface Props {
  className?: string;
}

const LoadingSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 w-40 h-48 rounded-md ${className}`}
    />
  );
};

export default LoadingSkeleton;
