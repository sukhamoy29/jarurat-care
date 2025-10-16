// components/Loader.jsx
import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white/70 flex flex-col items-center justify-center">
      <div className="loader border-4 border-t-4 border-teal-400 border-t-transparent rounded-full w-12 h-12 animate-spin mb-2"></div>
      <span className="text-teal-700 font-medium">{message}</span>

      <style>
        {`
          .loader {
            border-width: 4px;
            border-style: solid;
            border-radius: 9999px;
            border-top-color: transparent;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
