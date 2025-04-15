import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";

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
import UserManagement from "../components/UserMangement.vue";

import PaReel from "../components/PaReel.vue";

const routes = [
  {path: '/modal', component:ModalP},
  {path:'/position' , component:PositionS , meta:{showNavbar:true}},

{path:'/bases' , component:BaseS , meta:{showNavbar:true}},
 {path: "/actnature" , component:ActNature , meta:{showNavbar:true}},
 {path: "/actpnc" , component:ActPnc , meta:{showNavbar:true}},
 {path: "/actsim" , component:ActSim , meta:{showNavbar:true}},
 {path: "/actpnt" , component:ActPnt , meta:{showNavbar:true}},
 {path: "/actpn" , component:ActPn , meta:{showNavbar:true}},
 {path: "/actnumvol" , component:ActNumvol , meta:{showNavbar:true}},
 {path: "/actavion" , component:ActAvion , meta:{showNavbar:true}},
  { path: "/", component: LoginForm, meta: { showNavbar: false } }, // Ajout ici
  { path: "/users", name: "UserManagement", component: UserManagement,meta:{showNavbar:true} },
  { path: "/agent-dashboard", component: AgentDashboard, meta: { showNavbar: true } },
  { path: "/pn-manager", component: PnManager, meta: { showNavbar: true } },
  { path: "/vols-reel", component: VolReel, meta: { showNavbar: true } },
  { path: "/equipage", component: FormEquipage, meta: { showNavbar: true } },
  { path: "/voltable", component: VolTable, meta: { showNavbar: true } },
  { path: "/simulation", component: SimulationForm, meta: { showNavbar: true } },
  { path: "/formparticipationsimulation", component: FormParticipationSimulation, meta: { showNavbar: true } },
  { path: "/tablesimu", component: Tablesimu, meta: { showNavbar: true } },
  { path: "/pareel", component: PaReel, meta: { showNavbar: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
