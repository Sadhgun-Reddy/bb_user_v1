import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] p-6 selection:bg-red-500/30">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-stone-200/50 border border-stone-100 text-center relative overflow-hidden flex flex-col items-center">
        {/* Danger Background Blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50/50">
          <AlertOctagon className="w-10 h-10 text-red-500" strokeWidth={2} />
        </div>

        <h2 className="text-3xl font-black text-[#1b160d] tracking-tight mb-3">
          Something went wrong
        </h2>
        <p className="text-stone-500 font-medium mb-8">
          The application encountered an unexpected error. Don't worry, these things happen. You can
          try refreshing the page or navigating back.
        </p>

        <div className="w-full bg-stone-50 rounded-2xl p-4 border border-stone-200 mb-8 max-h-48 overflow-y-auto text-left">
          <code className="text-sm font-mono text-red-600 block whitespace-pre-wrap word-break">
            {(error as Error)?.message || String(error)}
          </code>
        </div>

        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-black text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg transition-transform transform hover:-translate-y-0.5 active:translate-y-0 group"
        >
          <RotateCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
