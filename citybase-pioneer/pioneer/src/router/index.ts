import { useUserInfo } from '@/stores/userInfo';
import BootLoad from '@/views/boot-load/boot-load.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: BootLoad,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/layout/default-layout.vue'),
      redirect: '/dashboard/tenant-management',
      children: [
        {
          path: 'tenant-management',
          name: 'tenant-management',
          meta: {
            title: '租户管理',
            authLevel: 1,
          },
          component: () => import('@/views/tenant-management/tenant-management.vue'),
        },
        {
          path: 'supplier-management',
          name: 'supplier-management',
          meta: {
            title: '供应商管理',
            authLevel: 1,
          },
          component: () => import('@/views/supplier-management/supplier-management.vue'),
        },
        {
          path: 'flow-pool-management',
          name: 'flow-pool-management',
          meta: {
            title: '流量池管理',
            authLevel: 1,
          },
          component: () => import('@/views/flow-pool-management/flow-pool-management.vue'),
        },
        {
          path: 'user-management',
          name: 'user-management',
          meta: {
            title: '用户管理',
            authLevel: 1,
          },
          component: () => import('@/views/user-management/user-management.vue'),
        }
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue'),
      meta: {
        title: '登录',
        authLevel: 0,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/404/index.vue'),
      meta: {
        title: '404',
        authLevel: 0,
      },
    }
  ],
  scrollBehavior() {
    return { top: 0, };
  },
})

// 路由加载前 鉴权
router.beforeEach((to, from, next) => {
  if (to.meta.authLevel === 0) {
    next()
  } else {
    useUserInfo().$state.token?next():next('/login')
  }
})

// 路由加载后
router.afterEach(() => {
  NProgress.done()
})

export default router
