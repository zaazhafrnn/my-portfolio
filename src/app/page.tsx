"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Window from "@/components/ui/Window";
import { useWindowManager } from "@/hooks/useWindowManager";
import dynamic from "next/dynamic";
import {
  PhotosApp,
  ResumeApp,
} from "@/components/apps";

const MacOSDock = dynamic(
  () =>
    import("@/components/ui/shadcn-io/mac-os-dock").then(
      (mod) => mod.MacOSDock,
    ),
  { ssr: false },
);

const apps = [
  {
    id: "photos",
    name: "Photo Dumps",
    icon: "/icons/photos.png",
  },
  {
    id: "resume",
    name: "Resume",
    icon: "/icons/file.png",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    icon: "/icons/notes.png",
  },
  {
    id: "contact",
    name: "Contact",
    icon: "/icons/finder.png",
  },
  {
    id: "folder",
    name: "Documents",
    icon: "/icons/weather.png",
  },
];

const MacOSDesktop = () => {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    bringToFront,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useWindowManager();

  const getWindowContent = (appId: string) => {
    switch (appId) {
      case "photos":
        return <PhotosApp />;
      case "resume":
        return <ResumeApp />;
      default:
        return (
          <div className="p-6 h-full flex items-center justify-center">
            <p className="text-gray-500">Content for {appId}</p>
          </div>
        );
    }
  };

  const openAppIds = windows.map((window) => window.appId);

  const handleAppClick = (appId: string) => {
    const app = apps.find((a) => a.id === appId);
    if (app) {
      openWindow(app.id, app.name);
    }
  };

  return (
    <div
      className="h-screen w-screen bg-gray-50 relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: "rgb(248, 249, 250)",
            backgroundImage: `
                  linear-gradient(rgb(226, 232, 240) 1px, transparent 2px),
                  linear-gradient(90deg, rgb(226, 232, 240) 1px, transparent 2px),
                  linear-gradient(rgb(226, 232, 240) 1px, transparent 2px),
                  linear-gradient(90deg, rgb(226, 232, 240) 1px, transparent 2px)
                `,
            backgroundSize: "150px 150px, 150px 150px, 25px 25px, 25px 25px",
          }}
        ></div>
      </div>

      {windows.map(
        (window) =>
          !window.isMinimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              position={window.position}
              zIndex={window.zIndex}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMouseDown={handleMouseDown}
              onBringToFront={bringToFront}
            >
              <Suspense
                fallback={
                  <div className="p-6 h-full flex items-center justify-center">
                    <p className="text-gray-500">Loading...</p>
                  </div>
                }
              >
                {getWindowContent(window.appId)}
              </Suspense>
            </Window>
          ),
      )}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[999]">
        <div className="flex justify-center">
          <MacOSDock
            apps={apps}
            onAppClick={handleAppClick}
            openApps={openAppIds}
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-8.5 bg-black/2 backdrop-blur-sm border-b border-black/20">
        <div className="flex items-center justify-between h-full px-4 text-black text-base">
          <div className="flex items-center gap-4">
            <Image
              src={"/icons/apple-logo-black.svg"}
              alt="My Icon"
              width={18}
              height={18}
            />
            <span className="font-semibold">Portfolio</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              {new Date()
                .toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
                .replace(",", "")}
            </span>
            <span>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacOSDesktop;
