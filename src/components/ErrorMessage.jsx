import React from "react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center py-8">
      <div className="text-red-600 text-lg mb-4">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
