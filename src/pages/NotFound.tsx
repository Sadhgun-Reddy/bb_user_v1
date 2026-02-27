import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] text-stone-900 px-4">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ef9d2a]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg mx-auto flex flex-col items-center">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#ef9d2a] rounded-full blur-xl opacity-20 animate-pulse" />
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-stone-100 relative">
            <ChefHat className="w-12 h-12 text-[#ef9d2a]" strokeWidth={2} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-7xl md:text-9xl font-black text-[#1b160d] tracking-tighter mb-4 animate-fade-in-up delay-75">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4 animate-fade-in-up delay-100">
          Oops! Recipe Not Found
        </h2>
        <p className="text-stone-500 font-medium mb-10 animate-fade-in-up delay-[150ms] text-lg">
          Looks like you've wandered into an empty kitchen. Let's get you back to the main menu
          where all the good stuff is.
        </p>

        {/* Call to Action */}
        <div className="animate-fade-in-up delay-200">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-1 active:translate-y-0 group"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
