import { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  // webServer: {
  //   command: "http-server -p 8080 build",
  //   url: "http://localhost:8080/",
  //   timeout: 120 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // },
  use: {
    baseURL: "http://localhost:61000/",
  },
};
export default config;
