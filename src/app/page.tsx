"use client";

import React, { useState } from "react";
import { Folder, User, Mail, Code, Image } from "lucide-react";
import Window from "@/components/Window/Window";
import { useWindowManager } from "@/hooks/useWindowManager";

const apps = [
  { id: "about", name: "About Me", icon: User, color: "bg-blue-500" },
  { id: "projects", name: "Projects", icon: Code, color: "bg-green-500" },
  { id: "portfolio", name: "Portfolio", icon: Image, color: "bg-purple-500" },
  { id: "contact", name: "Contact", icon: Mail, color: "bg-red-500" },
  { id: "folder", name: "Documents", icon: Folder, color: "bg-yellow-500" },
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
      case "about":
        return (
          <div className="p-6 h-full overflow-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">About Me</h2>
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                JD
              </div>
              <div className="flex-1">
                <p className="text-gray-600 mb-4">
                  Hi! I&apos;m a frontend developer passionate about creating
                  beautiful and interactive web experiences. I specialize in
                  React, Next.js, and modern web technologies.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Skills:</span>
                    <span className="text-gray-600">
                      React, Next.js, TypeScript, Tailwind CSS
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">
                      Experience:
                    </span>
                    <span className="text-gray-600">
                      3+ years in frontend development
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="p-6 h-full overflow-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              My Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded mb-3"></div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Project {i}
                  </h3>
                  <p className="text-sm text-gray-600">
                    A description of this amazing project and the technologies
                    used to build it.
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="p-6 h-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Get In Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">your.email@example.com</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Code className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">github.com/yourusername</span>
              </div>
            </div>
          </div>
        );
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
      className="h-screen w-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Windows - This part changes */}
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
              {getWindowContent(window.appId)}
            </Window>
          ),
      )}

      {/* Keep your existing Dock code */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-lg border border-white/30">
          <div className="flex items-center gap-2">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => openWindow(app.id, app.name)}
                  className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-200 hover:shadow-xl`}
                  title={app.name}
                >
                  <Icon size={24} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Keep your existing Menu Bar code */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-black/20 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between h-full px-4 text-white text-sm">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Portfolio</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
          </div>
          <div className="flex items-center gap-4">
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
