import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.js",
  },
  coverage: {
    provider: "v8",
    reporter: ["text", "html"],
    exclude: ["**/*.module.css", "**/mocks/**", "**/tests/**"],
  },
});
