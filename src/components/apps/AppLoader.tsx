"use client";

import React, { Suspense, lazy } from "react";

// Lazy load app components
const AppComponents = {
  // about: lazy(() => import("./AboutApp")),
  // projects: lazy(() => import("./ProjectsApp")),
  // contact: lazy(() => import("./ContactApp")),
  photos: lazy(() => import("./PhotosApp")),
  // portfolio: lazy(() => import("./PortfolioApp")),
  // folder: lazy(() => import("./DocumentsApp")),
};

interface AppLoaderProps {
  appId: keyof typeof AppComponents;
}

const AppLoader: React.FC<AppLoaderProps> = ({ appId }) => {
  const AppComponent = AppComponents[appId];

  if (!AppComponent) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <p className="text-gray-500">App not found: {appId}</p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="p-6 h-full flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <AppComponent />
    </Suspense>
  );
};

export default AppLoader;
