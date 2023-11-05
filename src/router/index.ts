import { createRouter, createWebHistory } from "vue-router";
import EoPoView from "../views/EoPoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: EoPoView,
    },
  ],
});

export default router;
