"use client";
import Window from "@/components/ui/Window";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Suspense } from "react";

export default function WindowInstances({
  windows,
  closeWindow,
  minimizeWindow,
  bringToFront,
  handleMouseDown,
  stopBouncing,
  getWindowContent,
  windowToolbarContent,
  WINDOW_SIZES,
}: any) {
  return (
    <>
      {windows.map((window: any) =>
        !window.isMinimized ? (
          <ContextMenu key={window.id}>
            <ContextMenuTrigger>
              <Window
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
            </ContextMenuTrigger>
            <ContextMenuContent className="w-44">
              <ContextMenuItem
                onSelect={() => {
                  bringToFront(window.id);
                  stopBouncing(window.appId);
                }}
              >
                Bring to Front
              </ContextMenuItem>
              <ContextMenuItem
                onSelect={() => {
                  minimizeWindow(window.id);
                  stopBouncing(window.appId);
                }}
              >
                Minimize Window
                <ContextMenuShortcut>⌘M</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem
                onSelect={() => {
                  closeWindow(window.id);
                  stopBouncing(window.appId);
                }}
                className="text-red-600"
              >
                Close Window
                <ContextMenuShortcut>⌘W</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem disabled>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Reload Window
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                Rename
                <ContextMenuShortcut>F2</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>Always on Top</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ) : null,
      )}
    </>
  );
}
