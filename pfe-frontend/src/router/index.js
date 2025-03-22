import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import AdminDashboard from "../components/UserManagement.vue";
import AgentDashboard from "../components/AgentDashboard.vue";
import PnManager from '@/components/PnManager.vue'
const routes = [
  { path: "/", component: LoginForm },
  { path: "/admin-dashboard", component: AdminDashboard },
  { path: "/agent-dashboard", component: AgentDashboard },
  {path: '/pn-manager', name: 'PnManager', component: PnManager},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
