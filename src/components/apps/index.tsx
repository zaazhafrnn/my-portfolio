// App Components
// export { default as ProjectsApp } from './ProjectsApp';
// export { default as ContactApp } from './ContactApp';
export { default as PhotosApp } from "./PhotosApp";
// export { default as PortfolioApp } from './PortfolioApp';
// export { default as DocumentsApp } from './DocumentsApp';

// App Registry - maps app IDs to their components
export const APP_COMPONENTS = {
  // projects: () => import('./ProjectsApp').then(m => m.default),
  // contact: () => import('./ContactApp').then(m => m.default),
  photos: () => import("./PhotosApp").then((m) => m.default),
  // portfolio: () => import('./PortfolioApp').then(m => m.default),
  // folder: () => import('./DocumentsApp').then(m => m.default),
} as const;
