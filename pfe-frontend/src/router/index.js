import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import TypeAvion from "../components/TypeAvion.vue";
import AgentDashboard from "../components/AgentDashboard.vue";
import PnManager from "@/components/PnManager.vue";
import VolReel from "../components/VolReel.vue";
import FormEquipage from "@/components/FormEquipage.vue";
import VolTable from "@/components/VolTable.vue";
import SimulationForm from "../components/SimulationForm.vue";
import FormParticipationSimulation from "../components/FormParticipationSimulation.vue";
import Tablesimu from "../components/TableSimu.vue";
import ActNature from "../components/ActiNature.vue";
import ActNumvol from "../components/ActiNumvol.vue";
import ActAvion from "../components/ActiAvion.vue";
import ActPnc from "../components/ActiPNC.vue";
import ActPnt from "../components/ActiPnt.vue";
import ActPn from "../components/ActiPn.vue";
import ActSim from "../components/ActiSimulation.vue";
import BaseS from "../components/BaseS.vue";
import PositionS from "../components/PositionS.vue";
import ModalP from "../components/ModalP.vue";
import UserManagement from "../components/UserManagement.vue";
import PaReel from "../components/PaReel.vue";
import AdminDashboard from "../components/AdminDashboard.vue";
import grades from "../components/GradesPage.vue";
import contrat from "../components/ContratPage.vue";
import role from "../components/RolePage.vue";
import reseau from "../components/ReseauxPage.vue";
import escale from "../components/EscalePage.vue";
import typesimulation from "../components/TypeSimulation.vue";
import simulateur from "../components/SimulateurPage.vue";
import naturevol from "../components/NatureVol.vue";
import troncon from "../components/TronconsPage.vue";

const routes = [
  { path: "/", component: LoginForm, meta: { showNavbar: false } },
  { path: "/admin-dashboard", name: "AdminDashboard", component: AdminDashboard, meta: { requiresAuth: true } },
  { path: "/agent-dashboard", component: AgentDashboard, meta: { showNavbar: true } },
  { path: "/users", name: "UserManagement", component: UserManagement, meta: { requiresAuth: true, role: 1 } },
  { path: "/TypeAvion", name: "TypeAvion", component: TypeAvion, meta: { requiresAuth: true, role: 1 } },
  { path: "/modal", component: ModalP },
  { path: "/bases", component: BaseS, meta: { showNavbar: true, role: 1 } },
  { path: "/position", component: PositionS, meta: { showNavbar: true, role: 1 } },

  { path: "/pn-manager", component: PnManager, meta: { showNavbar: true } },
  { path: "/vols-reel", component: VolReel, meta: { showNavbar: true } },
  { path: "/equipage", component: FormEquipage, meta: { showNavbar: true } },
  { path: "/voltable", component: VolTable, meta: { showNavbar: true } },
  { path: "/simulation", component: SimulationForm, meta: { showNavbar: true } },
  { path: "/formparticipationsimulation", component: FormParticipationSimulation, meta: { showNavbar: true } },
  { path: "/tablesimu", component: Tablesimu, meta: { showNavbar: true } },
  { path: "/pareel", component: PaReel, meta: { showNavbar: true } },

  // Activity routes
  { path: "/actnature", component: ActNature, meta: { showNavbar: true } },
  { path: "/actpnc", component: ActPnc, meta: { showNavbar: true } },
  { path: "/actsim", component: ActSim, meta: { showNavbar: true } },
  { path: "/actpnt", component: ActPnt, meta: { showNavbar: true } },
  { path: "/actpn", component: ActPn, meta: { showNavbar: true } },
  { path: "/actnumvol", component: ActNumvol, meta: { showNavbar: true } },
  { path: "/actavion", component: ActAvion, meta: { showNavbar: true } },

  // Admin config routes
  { path: "/grade", component: grades, meta: { showNavbar: true } },
  { path: "/contrats", component: contrat, meta: { showNavbar: true } },
  { path: "/role", component: role, meta: { showNavbar: true } },
  { path: "/reseau", component: reseau, meta: { showNavbar: true } },
  { path: "/escale", component: escale, meta: { showNavbar: true } },
  { path: "/typesimulation", component: typesimulation, meta: { showNavbar: true } },
  { path: "/simulateur", component: simulateur, meta: { showNavbar: true } },
  { path: "/naturevol", component: naturevol, meta: { showNavbar: true } },
  { path: "/troncon", component: troncon, meta: { showNavbar: true } },

  { path: "/:catchAll(.*)", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const role = parseInt(localStorage.getItem("role"));

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/");
  }

  next();
});

export default router;
