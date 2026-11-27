import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@backend": fileURLToPath(new URL("./backend", import.meta.url)),
      "@": fileURLToPath(new URL("./frontend/src", import.meta.url)),
    },
  },
  base: "./",
});
