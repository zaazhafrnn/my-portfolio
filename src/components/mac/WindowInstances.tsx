"use client";
import Window from "@/components/ui/Window";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Download } from "lucide-react";
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
          <ContextMenu
            key={window.id}
            onOpenChange={(open) => {
              if (open) stopBouncing(window.appId);
            }}
          >
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
              <ContextMenuLabel className="text-xs text-center -mt-1 h-6 text-muted-foreground">
                {window.title}
              </ContextMenuLabel>
              <ContextMenuSeparator />
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
              {window.appId === "systemInfo" && (
                <>
                  <ContextMenuItem>
                    Hire This Guy!
                    <ContextMenuShortcut>🙇🏽‍♂️</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem asChild>
                    <a
                      href="/folder/Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                      <ContextMenuShortcut>↗</ContextMenuShortcut>
                    </a>
                  </ContextMenuItem>
                </>
              )}
              {window.appId === "resume" && (
                <>
                  <ContextMenuItem asChild>
                    <a
                      href="/folder/Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in New Tab
                      <ContextMenuShortcut>↗</ContextMenuShortcut>
                    </a>
                  </ContextMenuItem>
                </>
              )}
              <ContextMenuItem disabled>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              {window.appId === "resume" && (
                <>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      Export file as
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-42">
                      <ContextMenuItem asChild className="group">
                        <a
                          href="/folder/Resume.pdf"
                          download="Achmad Zhafran's Resume.pdf"
                          className="flex w-full items-center justify-between"
                        >
                          Download as PDF
                          <ContextMenuShortcut className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download />
                          </ContextMenuShortcut>
                        </a>
                      </ContextMenuItem>
                      <ContextMenuItem asChild className="group">
                        <a
                          href="/folder/resume@3x.jpg"
                          download="Achmad Zhafran's Resume.jpg"
                          className="flex w-full items-center justify-between"
                        >
                          Download as JPG
                          <ContextMenuShortcut className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download />
                          </ContextMenuShortcut>
                        </a>
                      </ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                </>
              )}
              {window.appId === "photos" && (
                <>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>Send To</ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                      <ContextMenuItem className="group" disabled>
                        WhatsApp
                      </ContextMenuItem>
                      <ContextMenuItem className="group" disabled>
                        Instagram
                      </ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  <ContextMenuItem disabled>Download Zip</ContextMenuItem>
                </>
              )}
              {window.appId === "systemInfo" && (
                <>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      Get Template Website
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-42">
                      <ContextMenuItem asChild className="group">
                        <a>
                          No!
                          <ContextMenuShortcut className="opacity-0 group-hover:opacity-100 transition-opacity">
                            👀
                          </ContextMenuShortcut>
                        </a>
                      </ContextMenuItem>
                      <ContextMenuItem asChild className="group">
                        <a>
                          YOU
                          <ContextMenuShortcut className="opacity-0 group-hover:opacity-100 transition-opacity">
                            😤
                          </ContextMenuShortcut>
                        </a>
                      </ContextMenuItem>
                      <ContextMenuItem asChild className="group">
                        <a>
                          CAN
                          <ContextMenuShortcut className="opacity-0 group-hover:opacity-100 transition-opacity">
                            😈
                          </ContextMenuShortcut>
                        </a>
                      </ContextMenuItem>
                      <ContextMenuItem asChild className="group">
                        <a>
                          NOT!!
                          <ContextMenuShortcut className="opacity-0 group-hover:opacity-100 transition-opacity">
                            🙅🏽‍♂️
                          </ContextMenuShortcut>
                        </a>
                      </ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                </>
              )}
              <ContextMenuItem>
                Reload Window
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              {/* <ContextMenuItem disabled>
                Rename
                <ContextMenuShortcut>F2</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>Always on Top</ContextMenuItem> */}
            </ContextMenuContent>
          </ContextMenu>
        ) : null,
      )}
    </>
  );
}
