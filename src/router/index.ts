import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import routesLibrary from "@/router/routesLibrary";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: routesLibrary.DASHBOARD.path,
  },
  {
    path: routesLibrary.DASHBOARD.path,
    name: routesLibrary.DASHBOARD.name,
    component: () => import("@/views/ViewDashboard.vue"),
  },
  {
    path: routesLibrary.EDITOR.path,
    name: routesLibrary.EDITOR.name,
    component: () => import("@/views/ViewEditor.vue"),
  },
  {
    path: routesLibrary.SEARCH.path,
    name: routesLibrary.SEARCH.name,
    component: () => import("@/views/ViewSearch.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
