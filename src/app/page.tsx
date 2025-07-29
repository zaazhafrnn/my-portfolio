"use client";
import { PhotosApp, ResumeApp } from "@/components/apps";
import { WelcomeText } from "@/components/ui/AnimatedText";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import Window from "@/components/ui/Window";
import { useWindowManager } from "@/hooks/useWindowManager";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { Suspense, useState } from "react";

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
    name: "Resume.pdf",
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

const WINDOW_SIZES: Record<string, { width: number; height: number }> = {
  resume: { width: 660, height: 530 },
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
      [windowId]: {
        ...prev[windowId],
        left: content,
      },
    }));
  };

  const handleToolbarRightChange = (
    windowId: number,
    content: React.ReactNode,
  ) => {
    setWindowToolbarContent((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        right: content,
      },
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
      default:
        return (
          <div className="p-6 h-full flex items-center justify-center">
            <p className="text-gray-500">Content for {appId}</p>
          </div>
        );
    }
  };

  const openAppIds = windows.map((window) => window.appId);

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
    windows.forEach((w) => {
      if (!w.isMinimized) {
        minimizeWindow(w.id);
      }
    });

    setBouncingApps([]);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
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
                  backgroundSize:
                    "150px 150px, 150px 150px, 25px 25px, 25px 25px",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <WelcomeText />
                </div>
              </div>
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
                    onMinimize={() => {
                      minimizeWindow(window.id);
                      stopBouncing(window.appId);
                    }}
                    onMouseDown={(e) => {
                      handleMouseDown(e, window.id);
                      stopBouncing(window.appId);
                    }}
                    onBringToFront={() => {
                      bringToFront(window.id);
                      stopBouncing(window.appId);
                    }}
                    customToolbarLeft={windowToolbarContent[window.id]?.left}
                    customToolbarRight={windowToolbarContent[window.id]?.right}
                    width={WINDOW_SIZES[window.appId]?.width}
                    height={WINDOW_SIZES[window.appId]?.height}
                  >
                    <Suspense
                      fallback={
                        <div className="p-6 h-full flex items-center justify-center">
                          <p className="text-gray-500">
                            <Spinner />
                          </p>
                        </div>
                      }
                    >
                      {getWindowContent(window.appId, window.id)}
                    </Suspense>
                  </Window>
                ),
            )}

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
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuItem
            inset
            onSelect={handleCloseAllWindows}
            disabled={windows.length === 0}
          >
            Close All Window
            <ContextMenuShortcut>⌘⇧W</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            inset
            onSelect={minimizeAllWindows}
            disabled={
              windows.length === 0 || windows.every((w) => w.isMinimized)
            }
          >
            Minimize All Window
            <ContextMenuShortcut>⌘M</ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuSeparator />
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset onSelect={() => window.location.reload()}>
            Reload Page
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuItem>Save Page...</ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
