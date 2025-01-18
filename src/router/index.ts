import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/customer",
      name: "customer",
      component: () => import("../views/CreateCustomers.vue"),
    },
    {
      path: "/customer/:id",
      name: "view",
      component: () => import("../views/CustomerView.vue"),
    },
    {
      path: "/customer/edit/:id",
      name: "edit",
      component: () => import("../views/EditCustomer.vue"),
    },
  ],
});

export default router;
