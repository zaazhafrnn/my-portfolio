import { MouseEvent } from "react";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowData {
  id: number;
  appId: string;
  title: string;
  position: Position;
  size: Size;
  isMinimized: boolean;
  zIndex: number;
}

export interface DragState {
  isDragging: number | false;
  offset: Position;
}

export type MouseEventHandler = (e: MouseEvent<Element>, id: number) => void;
