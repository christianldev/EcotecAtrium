import React from 'react';

export default function ProgressBar({ loading }) {
  // progress bar style based on loading state
  const style = {
    width: `${loading * 100}%`,
  };

  return (
    <div className="relative">
      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-blue-200">
        <div
          style={style}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
        ></div>
      </div>
    </div>
  );
}
