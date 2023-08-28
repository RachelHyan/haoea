import { token } from "@/refs"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      redirect: "/dashboard/home",
      component: () => import("@/layout/default-layout.vue"),
      meta: {
        title: "后台",
        showBreadcrumb: false,
        isRoot: true,
      },
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/views/home/index.vue"),
          meta: {
            title: "首页",
            showBreadcrumb: false,
          },
        },
        {
          path: "garage-admin",
          name: "garage-admin",
          component: () => import("@/views/garage-admin/index.vue"),
          meta: {
            title: "车库",
            showBreadcrumb: true,
          },
          children: [

          ],
        },
        {
          path: "garage-user",
          name: "garage-user",
          component: () => import("@/views/garage-user/index.vue"),
          meta: {
            title: "车库",
            showBreadcrumb: true,
          },
        },
        {
          path: "garage-detail",
          name: "garage-detail",
          component: () => import("@/views/garage-detail/index.vue"),
          meta: {
            title: "车辆详情",
            showBreadcrumb: true,
          },
        },
        {
          path: "user",
          name: "user",
          component: () => import("@/views/user/index.vue"),
          meta: {
            title: "用户",
            showBreadcrumb: true,
          },
        },
        {
          path: "user-center",
          name: "user-center",
          component: () => import("@/views/user-center/index.vue"),
          meta: {
            title: "个人中心",
            showBreadcrumb: true,
          },
        }
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/large-screen",
      component: () => import("@/views/large-screen/index.vue"),
    },
    {
      path: "/large-screen2",
      component: () => import("@/views/large-screen/index2.vue"),
    }
  ],
  scrollBehavior() {
    return { top: 0, }
  },
})

router.beforeEach((to, from, next) => {
  if (to.path === "/login" || token.value !== "undefined") {
    next()
  } else {
    next(`/login?from=${to.fullPath}`)
  }
})

export default router
