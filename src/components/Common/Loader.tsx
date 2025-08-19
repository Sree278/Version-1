import React from 'react';

const Loader: React.FC = () => (
  <div className="flex items-center justify-center h-32" aria-live="polite" aria-busy="true">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" role="status" aria-label="Loading"></div>
    <span className="ml-4 text-indigo-700 text-sm" aria-hidden="false">Loading, please wait...</span>
    <span className="ml-2 text-xs text-gray-500" aria-hidden="false" title="If loading takes too long, please check your internet connection or try again later.">Need help?</span>
  </div>
);

export default Loader;
