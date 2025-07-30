"use client";
import { PhotosApp, ResumeApp, SystemInfoApp } from "@/components/apps";
import DesktopBackground from "@/components/mac/DesktopBackground";
import TopBar from "@/components/mac/TopBar";
import WindowInstances from "@/components/mac/WindowInstances";
import { useWindowManager } from "@/hooks/useWindowManager";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const MacOSDock = dynamic(
  () =>
    import("@/components/ui/shadcn-io/mac-os-dock").then(
      (mod) => mod.MacOSDock,
    ),
  { ssr: false },
);

const apps = [
  { id: "photos", name: "Photo Dumps", icon: "/icons/photos.png" },
  { id: "resume", name: "Resume.pdf", icon: "/icons/file.png" },
  { id: "systemInfo", name: "System Information", icon: "/icons/settings.png" },
  { id: "portfolio", name: "Portfolio", icon: "/icons/notes.png" },
  { id: "contact", name: "Contact", icon: "/icons/finder.png" },
  { id: "folder", name: "Documents", icon: "/icons/weather.png" },
];

const WINDOW_SIZES: Record<string, { width: number; height: number }> = {
  resume: { width: 660, height: 530 },
  systemInfo: { width: 700, height: 380 },
};

export default function MacOSDesktop() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    closeAllWindows,
    bringToFront,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useWindowManager();

  const [windowToolbarContent, setWindowToolbarContent] = useState<{
    [windowId: number]: {
      left?: React.ReactNode;
      right?: React.ReactNode;
    };
  }>({});

  const handleToolbarLeftChange = (
    windowId: number,
    content: React.ReactNode,
  ) => {
    setWindowToolbarContent((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], left: content },
    }));
  };

  const handleToolbarRightChange = (
    windowId: number,
    content: React.ReactNode,
  ) => {
    setWindowToolbarContent((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], right: content },
    }));
  };

  const getWindowContent = (appId: string, windowId: number) => {
    switch (appId) {
      case "photos":
        return <PhotosApp />;
      case "resume":
        return (
          <ResumeApp
            onToolbarLeftChange={(content) =>
              handleToolbarLeftChange(windowId, content)
            }
            onToolbarRightChange={(content) =>
              handleToolbarRightChange(windowId, content)
            }
          />
        );
      case "systemInfo":
        return <SystemInfoApp />;
      default:
        return (
          <div className="p-6 h-full flex items-center justify-center">
            <p className="text-gray-500">Content for {appId}</p>
          </div>
        );
    }
  };

  const openAppIds = windows.map((w) => w.appId);
  const [bouncingApps, setBouncingApps] = useState<string[]>([]);

  const handleAppClick = (appId: string) => {
    const app = apps.find((a) => a.id === appId);
    if (!app) return;
    const isAlreadyOpen = windows.some((w) => w.appId === appId);
    openWindow(app.id, app.name);
    if (!isAlreadyOpen && !bouncingApps.includes(app.id)) {
      setBouncingApps((prev) => [...prev, app.id]);
    }
  };

  const stopBouncing = (appId: string) => {
    setBouncingApps((prev) => prev.filter((id) => id !== appId));
  };

  const handleCloseAllWindows = () => {
    closeAllWindows();
    setBouncingApps([]);
  };

  const minimizeAllWindows = () => {
    windows.forEach((w) => !w.isMinimized && minimizeWindow(w.id));
    setBouncingApps([]);
  };

  return (
    <div
      className="h-screen w-screen bg-gray-50 relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <DesktopBackground
        windows={windows}
        handleCloseAllWindows={handleCloseAllWindows}
        minimizeAllWindows={minimizeAllWindows}
      />

      <WindowInstances
        windows={windows}
        closeWindow={closeWindow}
        minimizeWindow={minimizeWindow}
        handleMouseDown={handleMouseDown}
        bringToFront={bringToFront}
        stopBouncing={stopBouncing}
        getWindowContent={getWindowContent}
        windowToolbarContent={windowToolbarContent}
        WINDOW_SIZES={WINDOW_SIZES}
      />

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex justify-center">
          <MacOSDock
            apps={apps}
            onAppClick={handleAppClick}
            openApps={openAppIds}
            bouncingApps={bouncingApps}
            stopBounce={stopBouncing}
          />
        </div>
      </div>

      <TopBar />
    </div>
  );
}
