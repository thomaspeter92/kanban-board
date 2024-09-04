import React from "react";

const LoadingCard = ({ className }: { className: string }) => {
  return (
    <div
      className={`rounded animate-pulse bg-gray-medium dark:bg-black-light p-3 ${className}`}
    ></div>
  );
};

export default LoadingCard;
