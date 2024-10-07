import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { Toaster } from "sonner";
import AppRouter from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const ReactQueryDevtoolsProduction =
  process.env.mode === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
          (d) => ({
            default: d.ReactQueryDevtools,
          })
        )
      );

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/static/aicamera/locales/{{lng}}/{{ns}}.json", // Path to load translations
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ["en"],
  });

ReactDOM.createRoot(document.getElementById("main")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster richColors />
      <Suspense fallback={null}>
        <ReactQueryDevtoolsProduction
          position="bottom-left"
          initialIsOpen={false}
        />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
