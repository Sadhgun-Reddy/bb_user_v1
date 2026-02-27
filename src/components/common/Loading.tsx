import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full bg-transparent">
      <div className="relative flex items-center justify-center h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-stone-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-[#ef9d2a] border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
