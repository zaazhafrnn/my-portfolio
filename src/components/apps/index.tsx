export { default as ATMApp } from "./ATMApp";
export { default as Browser } from "./Browser";
export { default as PhotosApp } from "./PhotosApp";
export { default as ResumeApp } from "./ResumeApp";
export { default as SafariLauncher } from "./SafariApp/SafariLauncher";
export { default as SystemInfoApp } from "./SystemInfoApp";

export const APP_COMPONENTS = {
  browser: () => import("./Browser").then((m) => m.default),
  photos: () => import("./PhotosApp").then((m) => m.default),
  resume: () => import("./ResumeApp").then((m) => m.default),
  atmProject: () => import("./ATMApp").then((m) => m.default),
  systemInformation: () => import("./SystemInfoApp").then((m) => m.default),
  safariLauncher: () =>
    import("./SafariApp/SafariLauncher").then((m) => m.default),
} as const;
