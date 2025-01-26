import React from "react";

function EventCardSkeleton({ events, minDisplay = 0, maxDisplay }) {
  const totalSkeletons = Math.max(
    minDisplay,
    maxDisplay !== undefined ? Math.min(maxDisplay, events.length) : events.length
  );

  const skeletonArray = new Array(totalSkeletons).fill(null);

  return skeletonArray.map((_, index) => (
    <div
      className="w-full h-full bg-card rounded-t-lg border border-border/40 shadow-lg flex flex-col animate-pulse"
      key={index}
    >
      <div className="h-64 bg-gray-300 rounded-t-lg"></div>
      <div className="p-3 flex flex-col flex-grow">
        <div className="mb-3">
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
        </div>
        <div className="h-3 bg-gray-300 rounded w-3/4 mb-8"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  ));
}

export default EventCardSkeleton;
