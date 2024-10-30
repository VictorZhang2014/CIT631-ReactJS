import '../App.css';
import React from "react";

function NotFoundFn() { 
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          未找到任何页面
        </h2>
      </div>
    </div>
  );
}

export default NotFoundFn;
