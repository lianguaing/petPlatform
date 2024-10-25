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
          path: "/home",
          name: "petHome",
          component: () => import("../views/Home/index.vue"),
        },
        {
          path: "/publish",
          name: "userPublish",
          component: () => import("../views/Publish/index.vue"),
          meta: { requiresAuth: true }, // 需要登录
        },
        {
          path: "/adopt",
          name: "userAdopt",
          component: () => import("../views/Adopt/index.vue"),
          meta: { requiresAuth: true }, // 需要登录
        },
        {
          path: "/my",
          name: "userCenter",
          component: () => import("../views/Home/userCenter.vue"),
          meta: { requiresAuth: true }, // 需要登录
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

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否登录
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.userInfo);

  // 检查目标路由是否需要登录
  if (to.meta.requiresAuth && !user?.userInfo) {
    next({ name: "login" }); // 重定向到登录页面
  } else {
    next(); // 继续导航
  }
});
export default router;
