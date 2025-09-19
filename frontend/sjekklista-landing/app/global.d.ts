export {};

declare global {
  interface Window {
    umami?: {
      track: (event: string, options?: Record<string, unknown>) => void;
    };
  }
}
