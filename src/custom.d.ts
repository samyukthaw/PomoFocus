declare module "*.mp3" {
  const src: string;
  export default src;
  declare global {
  interface Window {
    electronAPI?: {
      closeApp: () => void;
    };
  }
}

export {};
}

