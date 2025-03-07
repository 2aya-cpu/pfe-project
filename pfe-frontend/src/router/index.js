import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import AdminDashboard from "../components/AdminDashboard.vue";
import AgentDashboard from "../components/AgentDashboard.vue";

const routes = [
  { path: "/", component: LoginForm },
  { path: "/admin-dashboard", component: AdminDashboard },
  { path: "/agent-dashboard", component: AgentDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
