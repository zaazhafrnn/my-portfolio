"use client";

import React, { FC, Suspense, lazy } from "react";

const AppComponents = {
  photos: lazy(() => import("./PhotosApp")),
  resume: lazy(() => import("./ResumeApp")),
};

interface AppLoaderProps {
  appId: keyof typeof AppComponents;
}

const AppLoader: FC<AppLoaderProps> = ({ appId }) => {
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
