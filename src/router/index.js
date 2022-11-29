import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    name: "mainpage",
    component: () => import("@/views/MainPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    component: () => import("@/views/ProductDetails.vue"),
    props: true,
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/Auth.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/UserDetails.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/Order.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
