"use client";
import { Safari } from "@/components/ui/safari";
import React from "react";
import ProjectA from "./projects/ProjectA";
// import ProjectB from "./projects/ProjectB";

export type SafariProjectKey = "projectA" | "projectB";

interface SafariAppProps {
  project: SafariProjectKey;
}

const SafariApp: React.FC<SafariAppProps> = ({ project }) => {
  const renderProject = () => {
    switch (project) {
      case "projectA":
        return <ProjectA />;
      case "projectB":
        // return <ProjectB />;
      default:
        return <div className="p-4">Project not found.</div>;
    }
  };

  return (
    <div className="w-full h-full">
      <Safari url={project} className="size-full" >
        {renderProject()}
      </Safari>
    </div>
  );
};

export default SafariApp;
