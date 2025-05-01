import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: true,
    port: 5173,
  },
  plugins: [react(), tailwindcss()],
  test: {
    include: ["src/**/*.spec.tsx"],
    exclude: ["tests/**/*.e2e.spec.tsx", "**/node_modules/**"],
    setupFiles: "./src/setupTests.ts",
    globals: true,
    environment: "jsdom",
  },
});
