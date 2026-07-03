import { defineConfig } from "@playwright/test";

/**
 * Runs against the production build:
 *   npm run build && npx playwright test
 * The webServer starts `next start` on :3200 (reuses one if already running).
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  fullyParallel: true,
  /* Full parallelism can starve the single next-start server locally. */
  workers: 2,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3200",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npm run start -- --port 3200",
    port: 3200,
    reuseExistingServer: true,
    timeout: 60_000
  }
});
