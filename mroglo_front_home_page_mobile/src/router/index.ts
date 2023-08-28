import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layout/default-layout.vue"),
      redirect:"home",
      children:[
        {
          path: "home",
          name: "home",
          component: () => import("@/views/home/index.vue"),
        }
      ],
    }
  ],
  scrollBehavior () {
    return { top: 0, };
  },
})

export default router
