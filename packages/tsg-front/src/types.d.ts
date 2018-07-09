interface Window {
  initialReduxState: any;
}

declare var App: {
  env: string;
  path: string;
  scriptPath: string;
  vendorPath: string;
  onDev: boolean;
  webEnv: string;
};

declare interface ServiceWorkerConfig {
  onSuccess: (registration: ServiceWorkerRegistration) => void;
  onUpdate: (registration: ServiceWorkerRegistration) => void;
}

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
