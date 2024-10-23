import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Layout/home.vue"),
      //二级路由
      children: [
        {
          path: "",
          name: "petHome",
          component: () => import("../views/Home/index.vue"),
        },
        {
          path: "/publish",
          name: "userPublish",
          component: () => import("../views/Publish/index.vue"),
        },
        {
          path: "/adopt",
          name: "userAdopt",
          component: () => import("../views/Adopt/index.vue"),
        },
        {
          path: "/my",
          name: "userCenter",
          component: () => import("../views/Home/userCenter.vue"),
        },
        {
          path: "/petDetail",
          name: "petDetail",
          component: () => import("../views/Pet/petDetails.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login/index.vue"),
    },
  ],
});

export default router;
