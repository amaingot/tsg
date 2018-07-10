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

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
