"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { Mail, Code } from "lucide-react";
import Window from "@/components/ui/Window";
import { useWindowManager } from "@/hooks/useWindowManager";
import {
  // AboutApp,
  // ProjectsApp,
  // ContactApp,
  PhotosApp,
  // PortfolioApp,
  // DocumentsApp,
} from "@/components/apps";

const apps = [
  {
    id: "photos",
    name: "Dump Photos",
    icon: "/icons/photos.png",
  },
  // {
  //   id: "projects",
  //   name: "Projects",
  //   icon: "/icons/safari.png",
  // },
  // {
  //   id: "portfolio",
  //   name: "Portfolio",
  //   icon: "/icons/notes.png",
  // },
  // {
  //   id: "contact",
  //   name: "Contact",
  //   icon: "/icons/finder.png",
  // },
  // {
  //   id: "folder",
  //   name: "Documents",
  //   icon: "/icons/weather.png",
  // },
] as const;

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
      // case "about":
      //   return <AboutApp />;
      // case "projects":
      //   return <ProjectsApp />;
      // case "contact":
      //   return <ContactApp />;
      case "photos":
        return <PhotosApp />;
      // case "portfolio":
      //   return <PortfolioApp />;
      // case "folder":
      //   return <DocumentsApp />;
      default:
        return (
          <div className="p-6 h-full flex items-center justify-center">
            <p className="text-gray-500">Content for {appId}</p>
          </div>
        );
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

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-999">
        <div className="bg-black/20 backdrop-blur-lg rounded-3xl px-1 py-1 shadow-lg border border-white/30">
          <div className="flex items-center gap-2">
            {apps.map((app) => {
              const isOpen = windows.some((window) => window.appId === app.id);

              return (
                <div key={app.id} className="flex flex-col items-center">
                  <button
                    onClick={() => openWindow(app.id, app.name)}
                    className="hover:scale-110 transition-transform duration-200"
                    title={app.name}
                  >
                    <Image
                      src={app.icon}
                      alt={app.name}
                      width={48}
                      height={48}
                    />
                  </button>
                  {isOpen && (
                    <div className="w-1 h-1 rounded-full bg-black -mt-1 translate-y-0.5"></div>
                  )}
                </div>
              );
            })}
          </div>
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
