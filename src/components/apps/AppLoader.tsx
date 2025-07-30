"use client";
import { FC } from "react";
import PhotosApp from "./PhotosApp";
import ResumeApp from "./ResumeApp";
import SystemInfoApp from "./SystemInfoApp";

const AppComponents = {
  photos: PhotosApp,
  resume: ResumeApp,
  systemInfo: SystemInfoApp,
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
  
  return <AppComponent />;
};

export default AppLoader;