import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import LoginForm from "../components/LoginForm.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/login", component: LoginForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
