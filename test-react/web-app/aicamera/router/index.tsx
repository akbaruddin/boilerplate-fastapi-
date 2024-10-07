import { Suspense, lazy, useEffect } from "react";
import {
  createRootRoute,
  createHashHistory,
  RouterProvider,
  Outlet,
  createRouter,
  createRoute,
  useMatch,
} from "@tanstack/react-router";
import Home from "./Home";
import About from "./About";
import ProtectedRoute from "../components/ProtectedRoute";

const TanStackRouterDevtools =
  process.env.mode === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
  onEnter: () => {
    document.title = "AI Camera Home Page";
  }
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <ProtectedRoute>
      <About />
    </ProtectedRoute>
  ),
  onEnter: () => {
    document.title = "AI Camera About Page"
  }
});

// Create the router with hash-based routing
const hashHistory = createHashHistory();
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);
const router = createRouter({ routeTree, history: hashHistory });

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
