import path from "path"
import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/vitest-setup.ts"],
    clearMocks: true,
    coverage: {
      exclude: [...configDefaults.exclude, "src/apiClient/**", "src/tests/**", "src/modules/core/ui/**", "./**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@core": path.resolve(__dirname, "./src/modules/core"),
      "@ui": path.resolve(__dirname, "./src/modules/core/ui"),
    },
  },
})
