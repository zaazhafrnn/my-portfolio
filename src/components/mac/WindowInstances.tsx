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
import { Spinner } from "@/components/ui/spinner";
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
      {windows.map((win: any) =>
        !win.isMinimized ? (
          <ContextMenu
            key={win.id}
            onOpenChange={(open) => {
              if (open) stopBouncing(win.appId);
            }}
          >
            <ContextMenuTrigger>
              <Window
                id={win.id}
                title={win.title}
                position={win.position}
                zIndex={win.zIndex}
                onClose={closeWindow}
                onMinimize={() => {
                  minimizeWindow(win.id);
                  stopBouncing(win.appId);
                }}
                onMouseDown={(e) => {
                  handleMouseDown(e, win.id);
                  stopBouncing(win.appId);
                }}
                onBringToFront={() => {
                  bringToFront(win.id);
                  stopBouncing(win.appId);
                }}
                customToolbarLeft={windowToolbarContent[win.id]?.left}
                customToolbarRight={windowToolbarContent[win.id]?.right}
                width={WINDOW_SIZES[win.appId]?.width}
                height={WINDOW_SIZES[win.appId]?.height}
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
                  {getWindowContent(win.appId, win.id)}
                </Suspense>
              </Window>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-44">
              <ContextMenuLabel className="text-xs text-center -mt-1 h-6 text-muted-foreground">
                {win.title}
              </ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem
                onSelect={() => {
                  bringToFront(win.id);
                  stopBouncing(win.appId);
                }}
              >
                Bring to Front
              </ContextMenuItem>
              <ContextMenuItem
                onSelect={() => {
                  minimizeWindow(win.id);
                  stopBouncing(win.appId);
                }}
              >
                Minimize Window
                <ContextMenuShortcut>⌘M</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem
                onSelect={() => {
                  closeWindow(win.id);
                  stopBouncing(win.appId);
                }}
                className="text-red-600"
              >
                Close Window
                <ContextMenuShortcut>⌘W</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              {win.appId === "systemInfo" && (
                <>
                  <ContextMenuItem asChild>
                    <span
                      onClick={() =>
                        window.open("https://github.com/zaazhafrnn", "_blank")
                      }
                    >
                      Open GitHub
                      <ContextMenuShortcut>↗</ContextMenuShortcut>
                    </span>
                  </ContextMenuItem>
                  <ContextMenuItem asChild>
                    <span
                      onClick={() =>
                        window.open(
                          `https://mail.google.com/mail/?view=cm&fs=1&to=zaazhafrnn@gmail.com&su=Hai! I'm interested to hire you!"`,
                          "_blank",
                        )
                      }
                    >
                      Hire This Guy!
                      <ContextMenuShortcut>🙇🏽‍♂️</ContextMenuShortcut>
                    </span>
                  </ContextMenuItem>
                  <ContextMenuItem asChild>
                    <span
                      onClick={() =>
                        window.open("/folder/Resume.pdf", "_blank")
                      }
                    >
                      View Resume
                      <ContextMenuShortcut>↗</ContextMenuShortcut>
                    </span>
                  </ContextMenuItem>
                </>
              )}
              {win.appId === "resume" && (
                <>
                  <ContextMenuItem asChild>
                    <span
                      onClick={() =>
                        window.open("/folder/Resume.pdf", "_blank")
                      }
                    >
                      Open in New Tab
                      <ContextMenuShortcut>↗</ContextMenuShortcut>
                    </span>
                  </ContextMenuItem>
                </>
              )}
              <ContextMenuItem disabled>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              {win.appId === "resume" && (
                <>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      Export file as
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-42">
                      <ContextMenuItem asChild className="group">
                        <span
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = "/folder/Resume.pdf";
                            link.download = "Achmad Zhafran's Resume.pdf";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          Download as PDF
                          <ContextMenuShortcut className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download />
                          </ContextMenuShortcut>
                        </span>
                      </ContextMenuItem>
                      <ContextMenuItem asChild className="group">
                        <span
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = "/folder/resume@3x.jpg";
                            link.download = "Achmad Zhafran's Resume.jpg";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          Download as JPG
                          <ContextMenuShortcut className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download />
                          </ContextMenuShortcut>
                        </span>
                      </ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                </>
              )}
              {win.appId === "photos" && (
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
              {win.appId === "systemInfo" && (
                <>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      Get Website Template
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-42">
                      <ContextMenuItem asChild className="group">
                        <a>
                          No!
                          <ContextMenuShortcut className="opacity-0 group-hover:opacity-100 transition-opacity">
                            🙅🏽‍♂️
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
                            💀💀💀
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
