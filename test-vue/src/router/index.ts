import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home.vue";
import About from "./About.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/", component: Home },
  {
    path: "/about",
    component: About,
    meta: { requiresAuth: true, title: "About Page" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("./");
  } else {
    next();
  }
});

// Update document title on route change
router.afterEach((to) => {
  document.title = (to.meta.title as string) || "AI Camera";
});

export default router;
