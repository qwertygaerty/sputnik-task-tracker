import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePanel from "../components/HomePanel.vue";
import TaskBoard from "@/components/TaskBoard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePanel,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
