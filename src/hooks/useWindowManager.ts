"use client";

import { useState, useCallback } from "react";
import type {
  Position,
  WindowData,
  DragState,
  MouseEventHandler,
} from "@/types";

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [nextWindowId, setNextWindowId] = useState<number>(1);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    offset: { x: 0, y: 0 },
  });

  const openWindow = useCallback(
    (appId: string, title: string) => {
      const isWindowOpen = windows.some((window) => window.appId === appId);

      if (isWindowOpen) {
        const existingWindow = windows.find((w) => w.appId === appId);
        if (existingWindow) {
          bringToFront(existingWindow.id);
          // Unminimize if it was minimized
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
        zIndex: nextWindowId,
      };

      setWindows((prev) => [...prev, newWindow]);
      setNextWindowId((prev) => prev + 1);
    },
    [windows, nextWindowId],
  );

  const closeWindow = useCallback((windowId: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const minimizeWindow = useCallback((windowId: number) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w,
      ),
    );
  }, []);

  const bringToFront = useCallback(
    (windowId: number) => {
      const maxZ = Math.max(...windows.map((w) => w.zIndex), 0);
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w)),
      );
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

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    bringToFront,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
