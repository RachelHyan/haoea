import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: {name:"tool",},
    },
    {
      path:"/tool",
      name:"tool",
      redirect: {name:"algorithm-tool",},
      component: () => import("@/layout/default-layout.vue"),
      meta:{
        title:"MapTools",
      },
      children:[
        {
          path: "algorithm-tool",
          name: "algorithm-tool",
          component: () => import("@/views/algorithm/index.vue"),
          meta:{
            title:"算法工具",
          },
        },
        {
          path: "board-tool",
          name: "board-tool",
          component: () => import("@/views/board/index.vue"),
          meta:{
            title:"视图工具",
          },
        },
        {
          path: "coordtransform-tool",
          name: "coordtransform-tool",
          component: () => import("@/views/coordtransform/index.vue"),
          meta:{
            title:"转换工具",
          },
        },
        {
          path: "undo-redo",
          name: "undo-redo",
          component: () => import("@/views/undo-redo/undo-redo.vue"),
          meta:{
            title:"撤销/重做",
          },
        }
      ],
    }
  ],
  scrollBehavior () {
    return { top: 0, };
  },
})

export default router
