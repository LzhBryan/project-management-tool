/// <reference types="vitest" />

import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@ui": path.resolve(__dirname, "./src/modules/core/ui"),
      "@core": path.resolve(__dirname, "./src/modules/core"),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    // setup files and include tests directory
    clearMocks: true,
  },
}))
