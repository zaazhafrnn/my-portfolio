"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dateStr = now
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .replace(",", "");

  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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
          <span>{dateStr}</span>
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
