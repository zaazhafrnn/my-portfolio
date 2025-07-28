"use client";

import React, { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, Download, FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Spinner } from "../ui/shadcn-io/spinner";
import Image from "next/image";

interface ResumeAppProps {
  className?: string;
  onToolbarLeftChange?: (content: React.ReactNode) => void;
  onToolbarRightChange?: (content: React.ReactNode) => void;
}

export default function ResumeApp({
  className = "",
  onToolbarLeftChange,
  onToolbarRightChange,
}: ResumeAppProps) {
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string>("");
  const [lastModified, setLastModified] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const resumePath = "/folder/Resume.pdf";
  const disabled = !!error || isLoading;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 25));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetZoom = () => {
    setZoom(100);
  };

  const toolbarLeft = (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleZoomOut}
              disabled={disabled || zoom <= 25}
              className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-default transition-colors cursor-pointer disabled:pointer-events-none"
            >
              <ZoomOut size={12} strokeWidth={1.7} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="px-2 py-1 bg-gray-800 text-white text-xs rounded cursor-pointer"
          >
            Zoom Out
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={resetZoom}
              disabled={disabled}
              className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded transition-colors min-w-[40px] cursor-pointer disabled:pointer-events-none"
            >
              {zoom}%
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="px-2 py-1 bg-gray-800 text-white text-xs rounded cursor-pointer"
          >
            Reset Zoom
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleZoomIn}
              disabled={disabled || zoom >= 300}
              className="p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer disabled:pointer-events-none"
            >
              <ZoomIn size={12} strokeWidth={1.7} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="px-2 py-1 bg-gray-800 text-white text-xs rounded cursor-pointer"
          >
            Zoom In
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const toolbarRight = (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleDownload}
              disabled={disabled}
              className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-default transition-colors cursor-pointer disabled:pointer-events-none"
            >
              <Download size={12} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="px-2 py-1 bg-gray-800 text-white text-xs rounded"
          >
            Download PDF
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  useEffect(() => {
    onToolbarLeftChange?.(toolbarLeft);
    onToolbarRightChange?.(toolbarRight);
  }, [zoom, error, isLoading]);

  useEffect(() => {
    return () => {
      onToolbarLeftChange?.(null);
      onToolbarRightChange?.(null);
    };
  }, []);

  useEffect(() => {
    const checkPdfFile = async () => {
      try {
        const response = await fetch(resumePath, { method: "HEAD" });
        if (response.ok) {
          setPdfUrl(resumePath);

          const contentLength = response.headers.get("content-length");
          if (contentLength) {
            const sizeInBytes = parseInt(contentLength);
            const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(1);
            setFileSize(`${sizeInMB} MB`);
          }

          const lastMod = response.headers.get("last-modified");
          if (lastMod) {
            const date = new Date(lastMod);
            const now = new Date();
            const isCurrentYear = date.getFullYear() === now.getFullYear();

            setLastModified(
              date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                ...(isCurrentYear ? {} : { year: "numeric" }),
              }),
            );
          } else {
            // fallback to today
            const today = new Date();
            setLastModified(
              today.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
            );
          }

          setIsLoading(false);
        } else {
          throw new Error("PDF not found");
        }
      } catch (err) {
        setError(
          "Resume not found. Please add resume.pdf to the public folder.",
        );
        setIsLoading(false);
      }
    };

    checkPdfFile();
  }, []);
  return (
    <div
      className={`h-full flex flex-col bg-white ${className}`}
      ref={containerRef}
    >
      <div className="flex-1 relative overflow-hidden bg-gray-100">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Oops! Sorry, Resume Not Found
              </h3>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <div className="w-max h-max p-8">
              <div
                style={{
                  transform: `scale(${zoom / 98})`,
                  transformOrigin: "top left",
                  transition: "transform 0.2s ease-out",
                }}
              >
                <Image
                  src="/folder/resume@3x.jpg"
                  alt="Resume"
                  width={2000}
                  height={2000}
                  className="shadow-2xl rounded-lg w-[600px] h-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span>Page 1 of 1</span>
          <span>{fileSize}</span>
        </div>

        <div className="flex items-center gap-4">
          <span>
            {lastModified
              ? `Last Modified on ${lastModified}`
              : "No file loaded"}
          </span>
          <span>{zoom}%</span>
        </div>
      </div>
    </div>
  );
}
