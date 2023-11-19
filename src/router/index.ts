import { createRouter, createWebHistory } from "vue-router";
import EoPoView from "../views/TheChemView.vue";

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
