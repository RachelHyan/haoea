import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/zues-home/zues-home.vue"),
    }
  ],
  scrollBehavior() {
    return { top: 0, };
  },
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
// 路由加载后
router.afterEach(() => {
  NProgress.done()
})

export default router
