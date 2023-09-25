import type { SetupWorker } from "msw";

declare global {
  interface Window {
    __ladle_msw: SetupWorker;
  }
}
