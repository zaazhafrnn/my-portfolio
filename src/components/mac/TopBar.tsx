"use client";
import Image from "next/image";

export default function TopBar() {
  return (
    <div className="absolute top-0 left-0 right-0 h-8.5 bg-black/2 backdrop-blur-sm border-b border-black/20">
      <div className="flex items-center justify-between h-full px-4 text-black text-base">
        <div className="flex items-center gap-4">
          <Image
            src="/icons/apple-logo-black.svg"
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
  );
}
