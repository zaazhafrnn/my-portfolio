"use client";

import React from "react";

const PhotosApp = () => {
  return (
    <div className="p-6 h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="aspect-square bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg hover:scale-105 transition-transform cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotosApp;
