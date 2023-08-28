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
        },
        {
          path: "product-pilotless",
          name: "product-pilotless",
          component: () => import("@/views/product/product-pilotless/index.vue"),
        },
        {
          path: "product-scheme",
          name: "product-scheme",
          component: () => import("@/views/product/product-scheme/index.vue"),
        },
        {
          path: "core-technology",
          name: "core-technology",
          component: () => import("@/views/core-technology/index.vue"),
        },
        {
          path: "news-information",
          name: "news-information",
          component: () => import("@/views/news-information/index.vue"),
        },
        {
          path: "about-us",
          name: "about-us",
          component: () => import("@/views/about-us/index.vue"),
        }
      ],
    }
  ],
  scrollBehavior () {
    return { top: 0, };
  },
})

export default router
