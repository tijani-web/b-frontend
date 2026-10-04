import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "./static",
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
