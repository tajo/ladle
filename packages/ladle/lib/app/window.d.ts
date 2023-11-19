import type { SetupWorker } from "msw/browser";

declare global {
  interface Window {
    __ladle_msw: SetupWorker;
  }
}
