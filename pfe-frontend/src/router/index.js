import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import AdminDashboard from "../components/AdminDashboard.vue";
import AgentDashboard from "../components/AgentDashboard.vue";
import PnManager from "@/components/PnManager.vue";
import UserManagement from "../components/UserManagement.vue";
import TypeAvions from "../components/TypeAvions.vue";

const routes = [
  { path: "/", name: "Login", component: LoginForm },
  { path: "/admin-dashboard", name: "AdminDashboard", component: AdminDashboard, meta: { requiresAuth: true } },
  { path: "/agent-dashboard", name: "AgentDashboard", component: AgentDashboard, meta: { requiresAuth: true } },
  { path: "/pn-manager", name: "PnManager", component: PnManager, meta: { requiresAuth: true } },
  { path: "/users", name: "UserManagement", component: UserManagement, meta: { requiresAuth: true } },
  { path: "/typeavions", name: "TypeAvions", component: TypeAvions, meta: { requiresAuth: true } },
  { path: "/:catchAll(.*)", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const role = parseInt(localStorage.getItem("role"));

  if (to.path === "/" && isAuthenticated) {
    if (role === 1) return next("/admin-dashboard");
    if (role === 2) return next("/agent-dashboard");
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/");
  }

  next();
});

export default router;
