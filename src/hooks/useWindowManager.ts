"use client";

import type { DragState, MouseEventHandler, WindowData } from "@/types";
import { useCallback, useState } from "react";

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [nextWindowId, setNextWindowId] = useState<number>(1);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    offset: { x: 0, y: 0 },
  });

  const reindexWindows = (winList: WindowData[]) => {
    return winList.map((w, i) => ({ ...w, zIndex: i + 1 }));
  };

  const bringToFront = useCallback(
    (windowId: number) => {
      const target = windows.find((w) => w.id === windowId);
      if (!target) return;

      const others = windows.filter((w) => w.id !== windowId);
      const reordered = [...others, target];
      setWindows(reindexWindows(reordered));
    },
    [windows],
  );

  const minimizeWindow = useCallback((windowId: number) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w,
      ),
    );
  }, []);

  const openWindow = useCallback(
    (appId: string, title: string) => {
      const isWindowOpen = windows.some((window) => window.appId === appId);

      if (isWindowOpen) {
        const existingWindow = windows.find((w) => w.appId === appId);
        if (existingWindow) {
          bringToFront(existingWindow.id);
          if (existingWindow.isMinimized) {
            minimizeWindow(existingWindow.id);
          }
        }
        return;
      }

      const newWindow: WindowData = {
        id: nextWindowId,
        appId,
        title,
        position: {
          x: 100 + windows.length * 30,
          y: 100 + windows.length * 30,
        },
        size: { width: 600, height: 400 },
        isMinimized: false,
        zIndex: 0,
      };

      const updated = [...windows, newWindow];
      setWindows(reindexWindows(updated));
      setNextWindowId((prev) => prev + 1);
    },
    [windows, nextWindowId, bringToFront, minimizeWindow],
  );

  const closeWindow = useCallback(
    (windowId: number) => {
      const updated = windows.filter((w) => w.id !== windowId);
      setWindows(reindexWindows(updated));
    },
    [windows],
  );

  const handleMouseDown: MouseEventHandler = useCallback(
    (e, windowId) => {
      const window = windows.find((w) => w.id === windowId);
      if (!window) return;

      setDragState({
        isDragging: windowId,
        offset: {
          x: e.clientX - window.position.x,
          y: e.clientY - window.position.y,
        },
      });
      bringToFront(windowId);
    },
    [windows, bringToFront],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<Element>) => {
      if (dragState.isDragging === false) return;

      const window = windows.find((w) => w.id === dragState.isDragging);
      if (!window) return;

      const newX = Math.max(0, e.clientX - dragState.offset.x);
      const newY = Math.max(0, e.clientY - dragState.offset.y);

      setWindows((prev) =>
        prev.map((w) =>
          w.id === dragState.isDragging
            ? { ...w, position: { x: newX, y: newY } }
            : w,
        ),
      );
    },
    [dragState, windows],
  );

  const handleMouseUp = useCallback(() => {
    setDragState({ isDragging: false, offset: { x: 0, y: 0 } });
  }, []);

  const closeAllWindows = () => {
    setWindows([]);
  };

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    closeAllWindows,
    bringToFront,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
