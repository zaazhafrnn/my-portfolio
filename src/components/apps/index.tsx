export { default as PhotosApp } from "./PhotosApp";
export { default as ResumeApp } from "./ResumeApp";
export { default as SystemInfoApp } from "./SystemInfoApp";

export const APP_COMPONENTS = {
  photos: () => import("./PhotosApp").then((m) => m.default),
  resume: () => import("./ResumeApp").then((m) => m.default),
  systemInformation: () => import("./SystemInfoApp").then((m) => m.default),
} as const;
