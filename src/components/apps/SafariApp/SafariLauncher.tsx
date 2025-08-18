"use client";
import React from "react";
import SafariApp, { SafariProjectKey } from "./index";

const SafariLauncher: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    React.useState<SafariProjectKey | null>(null);

  if (selectedProject) {
    return <SafariApp project={selectedProject} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-xl font-semibold mb-4">Safari Homepage</h2>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => setSelectedProject("projectA")}
        >
          Open Project A
        </button>
        <button
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          onClick={() => setSelectedProject("projectB")}
        >
          Open Project B
        </button>
      </div>
    </div>
  );
};

export default SafariLauncher;
