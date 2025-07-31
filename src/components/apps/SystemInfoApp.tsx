"use client";

import { useMemo } from "react";

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
            <p className="text-sm">Version {version} Centennials</p>
          </div>

          <div className="space-y-1 text-sm">
            <InfoRow label="MacBook Pro" value="(M1 Pro, 14-inch); hopefully" />
            <InfoRow label="Work Experience" value="10+ months" />
            <InfoRow label="Expertise" value="So Far Mostly in Frontend Development" />
            <InfoRow
              label="Collage"
              value="Politeknik Perkapalan Negeri Surabaya"
            />
            <InfoRow label="Field" value="Automation Engineering" />
            <InfoRow label="Academic Year" value="First Year (2025)" />
            <InfoRow label="Location" value="Surabaya, Indonesia" />
            <InfoRow
              label="Contact"
              value="zaazhafrnn@gmail.com or DM @zaazhafrnn"
            />
          </div>

          <div className="space-x-4 pt-0">
            <button
              className="px-2 h-6 bg-neutral-50 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors border border-gray-300 cursor-pointer"
              onClick={() => window.open("/folder/Resume.pdf", "_blank")}
            >
              View Resume...
            </button>
            <button className="px-2 h-6 bg-neutral-50 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors border border-gray-300 cursor-pointer">
              Simply Lovely...
            </button>
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
