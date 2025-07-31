"use client";

import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function SystemInfoApp() {
  const version = useMemo(() => {
    const birthDate = new Date(2007, 5, 18);
    const today = new Date();

    const year = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    const day = today.getDate() - birthDate.getDate();

    const calcMonth = month < 0 ? 12 + month : month;
    const calcDay = day < 0 ? 30 + day : day;

    return `${year}.${String(calcMonth).padStart(2, "0")}.${String(calcDay).padStart(2, "0")}`;
  }, []);

  return (
    <div className="bg-white w-full h-full flex flex-col">
      <div className="grid grid-cols-3 p-12">
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-xs rounded-full flex items-center justify-center  overflow-hidden border-6 border-gray-400">
            <video
              src={"/photos/video-3.mp4"}
              className="w-full h-full scale-120 right-0 object-cover rounded-full"
              playsInline
              autoPlay
              loop
              muted
            />
          </div>
        </div>

        <div className="col-span-2 space-y-4 pl-14">
          <div>
            <h1 className="text-4xl font-medium text-gray-900">
              Achmad Zhafran Alysyam
            </h1>
            <p className="text-sm">
              Version{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span>{version}</span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="px-2 py-1 bg-gray-800 text-white text-xs rounded"
                  >
                    day. old.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{" "}
              Centennials
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoRow label="MacBook Pro" value="(M1 Pro, 14-inch)" />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="px-2 py-1 bg-gray-800 text-white text-xs rounded"
                >
                  MAMAA MAU INII!
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <InfoRow label="Work Experience" value="10+ months, more or less" />
            <InfoRow
              label="Expertise"
              value="So Far Most Likely in Frontend Development"
            />
            <InfoRow
              label="Collage"
              value="Politeknik Perkapalan Negeri Surabaya"
            />
            <InfoRow label="Major" value="Automation Engineering" />
            <InfoRow label="Cohort" value="2025" />
            <InfoRow label="Location" value="Surabaya, Indonesia" />
            <InfoRow
              label="Contact"
              value={
                <span>
                  <span
                    onClick={() =>
                      window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=zaazhafrnn@gmail.com&su=Hai! From your portfolio!`,
                        "_blank",
                      )
                    }
                    className="select-text cursor-pointer hover:text-blue-500 hover:underline transition-colors"
                  >
                    zaazhafrnn@gmail.com
                  </span>
                  <span className="select-none"> or DM </span>
                  <span
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/zaazhafrnn",
                        "_blank",
                      )
                    }
                    className="select-text cursor-pointer hover:text-blue-500 hover:underline transition-colors"
                  >
                    @zaazhafrnn
                  </span>
                </span>
              }
            />
          </div>

          <div className="space-x-4 pt-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="px-2 h-6 bg-neutral-50 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors border border-gray-300 cursor-pointer"
                    onClick={() => window.open("/folder/Resume.pdf", "_blank")}
                  >
                    View Resume...
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="px-2 py-1 bg-gray-800 text-white text-xs rounded"
                >
                  Open resume in new tab
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="px-2 h-6 bg-neutral-50 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors border border-gray-300 cursor-pointer"
                    onClick={() =>
                      window.open("https://github.com/zaazhafrnn", "_blank")
                    }
                  >
                    Simply Lovely...
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="px-2 py-1 bg-gray-800 text-white text-xs rounded"
                >
                  View GitHub profile
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">
        ™ and © 2025 Achmad Zhafran Alysyam. All Rights Reserved. Portfolio
        License Agreement
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <span className="text-gray-900 font-medium w-36">{label}</span>
      <span className="pl-2 text-gray-600">{value}</span>
    </div>
  );
}
