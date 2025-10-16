import React from "react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-5 h-5 border-2 border-gray-300 border-t-2 border-t-gray-600 rounded-full animate-spin"></div>
      <span className="ml-2 text-gray-600">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
