import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Events from "events";

export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env": {}, // Replace `process.env` with an empty object
    EE: JSON.stringify(Events),
  },
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["iife"], // Wraps everything into an immediately invoked function expression
      name: "initApp", // Global variable name for the library
      fileName: "main",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // Inline all dynamic imports into a single file
      },
    },
    cssCodeSplit: false, // Bundle all CSS into the single JS file
    outDir: "dist/js",
  },
});
