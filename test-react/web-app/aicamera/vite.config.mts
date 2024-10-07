import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Events from "events";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      "process.env": {
        mode,
      }, // Replace `process.env` with an empty object
      EE: JSON.stringify(Events),
    },
    build: {
      emptyOutDir: true,
      lib: {
        entry: "main.tsx",
        formats: ["iife"], // Wraps everything into an immediately invoked function expression
        name: "initApp", // Global variable name for the library
        fileName: "main",
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "axios",
          "@tanstack/react-query",
          "react-i18next",
          "i18next",
          "i18next-browser-languagedetector",
          "i18next-http-backend",
          "react-hook-form",
          "zod",
          "pouchdb"
        ],
        output: {
          inlineDynamicImports: true, // Inline all dynamic imports into a single file
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            axios: "axios",
            "@tanstack/react-query": "ReactQuery",
            "react-i18next": "ReactI18next",
            "i18next": "i18next",
            "i18next-browser-languagedetector": "i18nextBrowserLanguageDetector",
            "i18next-http-backend": "i18nextHttpBackend",
            "react-hook-form": "ReactHookForm",
            "zod": "Zod",
            "pouchdb": "PouchDB"
          },
        },
      },
      cssCodeSplit: false, // Bundle all CSS into the single JS file
      outDir: "../../app/static/js/aicamera",
    },
  };
});
