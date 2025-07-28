"use client";

import React, { FC } from "react";
import { Position } from "@/types";
import { X, Minus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WindowProps {
  id: number;
  title: string;
  position: Position;
  zIndex: number;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  onMouseDown: (e: React.MouseEvent<Element>, id: number) => void;
  onBringToFront: (id: number) => void;
  children: React.ReactNode;
}

const Window: FC<WindowProps> = ({
  id,
  title,
  position,
  zIndex,
  onClose,
  onMinimize,
  onMouseDown,
  onBringToFront,
  children,
}) => {
  return (
    <div
      className="absolute bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: 600,
        height: 400,
        zIndex: zIndex,
      }}
      onClick={() => onBringToFront(id)}
    >
      <div
        className="h-8 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 cursor-move"
        onMouseDown={(e) => onMouseDown(e, id)}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose(id);
                    }}
                    className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center group cursor-pointer"
                  >
                    <X 
                      className="text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" 
                      size={8} 
                      strokeWidth={4} 
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
                  Close
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMinimize(id);
                    }}
                    className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors flex items-center justify-center group cursor-pointer"
                  >
                    <Minus 
                      className="text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" 
                      size={8} 
                      strokeWidth={4} 
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
                  Minimize
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" /> */}
            <button className="w-3 h-3 bg-gray-300 rounded-full" />
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700 absolute left-1/2 transform -translate-x-1/2">
          {title}
        </span>
      </div>

      <div className="h-[calc(100%-2rem)] overflow-auto">{children}</div>
    </div>
  );
};

export default Window;