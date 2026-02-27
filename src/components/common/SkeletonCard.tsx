import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-transparent relative flex flex-col h-full min-h-[360px] animate-pulse">
      {/* Top Absolute Badge */}
      <div className="absolute top-6 right-6 z-10 w-16 h-5 bg-stone-200 rounded-full"></div>

      {/* Avatar Group (Images) */}
      <div className="flex -space-x-4 mb-6 pt-2 pl-2">
        <div className="w-16 h-16 rounded-full border-4 border-white shadow-sm z-30 bg-stone-200"></div>
        <div className="w-16 h-16 rounded-full border-4 border-white shadow-sm z-20 bg-stone-200"></div>
        <div className="w-16 h-16 rounded-full border-4 border-white shadow-sm z-10 bg-stone-100"></div>
      </div>

      {/* Content Payload */}
      <div className="flex-1 mb-4 flex flex-col">
        {/* Category */}
        <div className="w-20 h-3 bg-stone-200 rounded mb-3"></div>

        {/* Title */}
        <div className="w-3/4 h-6 bg-stone-200 rounded mb-4"></div>

        {/* Description Lines */}
        <div className="w-full h-4 bg-stone-100 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-stone-100 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-stone-100 rounded"></div>
      </div>

      {/* Statistics Row */}
      <div className="flex items-center gap-4 py-4 border-t border-stone-100 mb-4 mt-auto">
        <div className="w-20 h-4 bg-stone-200 rounded"></div>
        <div className="w-1 h-1 rounded-full bg-stone-300"></div>
        <div className="w-24 h-5 bg-stone-200 rounded"></div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between">
        {/* Toggle Logic placeholder */}
        <div className="flex items-center gap-2">
          <div className="w-11 h-6 bg-stone-200 rounded-full"></div>
          <div className="w-12 h-3 bg-stone-200 rounded"></div>
        </div>

        {/* Edit Action placeholder */}
        <div className="w-8 h-8 rounded-full bg-stone-200"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
