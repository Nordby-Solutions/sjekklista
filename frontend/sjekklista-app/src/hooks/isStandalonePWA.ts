export function isStandalonePWA() {
  return (
    window.matchMedia("(display-mode: standalone)").matches || // most browsers
    (window.navigator as any).standalone === true // iOS Safari
  );
}
