import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePanel from "../pages/HomePanel.vue";
import RegisterWindow from "@/components/Modals/RegisterWindow.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePanel,
  },
  {
    path: "/reg",
    name: "register",
    component: RegisterWindow,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
