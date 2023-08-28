import RootView from "@/views/root-view/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: RootView,
    },
    {
      path: "/project-selection",
      name: "project-selection",
      meta: {
        title: "项目选择",
        authLevel: 1,
      },
      component: () => import("@/views/project-selection/project-selection.vue"),
    },
    {
      path: "/workbench",
      name: "workbench",
      meta: {
        title: "工作台",
        authLevel: 1,
      },
      component: () => import("@/views/workbench/workbench.vue"),
    },
    {
      path: "/operation-analysis",
      name: "operation-analysis",
      meta: {
        title: "运营分析",
        authLevel: 1,
      },
      component: () => import("@/views/operation-analysis/operation-analysis.vue"),
    },
    {
      path: "/data-dashboard",
      name: "data-dashboard",
      meta: {
        title: "项目看板",
        authLevel: 1,
      },
      component: () => import("@/views/data-dashboard/data-dashboard.vue"),
    },
    {
      path: "/data-overview",
      name: "data-overview",
      meta: {
        title: "运营情况",
        authLevel: 1,
      },
      component: () => import("@/views/data-overview/data-overview.vue"),
    },
    {
      path: "/video-monitor",
      name: "video-monitor",
      meta: {
        title: "视频监控",
        authLevel: 1,
      },
      component: () => import("@/views/video-monitor/video-monitor.vue"),
    },
    {
      path: "/leave-management",
      name: "leave-management",
      meta: {
        title: "请假管理",
        authLevel: 1,
      },
      component: () => import("@/views/leave-management/leave-management.vue"),
    },
    {
      path: "/personnel-management",
      name: "personnel-management",
      meta: {
        title: "人员管理",
        authLevel: 1,
      },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "personnel-info",
          name: "personnel-info",
          component: () => import("@/views/personnel-management/personnel-info/personnel-info.vue"),
          meta: {
            title: "人员信息",
            authLevel: 1,
          },
        },
        {
          path: "face-info",
          name: "face-info",
          component: () => import("@/views/personnel-management/face-info/face-info.vue"),
          meta: {
            title: "人脸信息",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/car-management",
      name: "car-management",
      meta: {
        title: "车辆管理",
        authLevel: 1,
      },
      redirect: { name: "car-information", },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "car-information",
          name: "car-information",
          component: () => import("@/views/car-management/car-information/car-information.vue"),
          meta: {
            title: "车辆信息",
            authLevel: 1,
          },
        },
        {
          path: "car-facility",
          name: "car-facility",
          component: () => import("@/views/car-management/car-facility/car-facility.vue"),
          meta: {
            title: "车辆设备",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/object-management",
      name: "object-management",
      meta: {
        title: "对象管理",
        authLevel: 1,
      },
      redirect: { name: "object-partitioning-manual", },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "object-partitioning-manual",
          name: "object-partitioning-manual",
          component: () => import("@/views/object-management/object-partitioning-manual/object-partitioning.vue"),
          meta: {
            title: "对象划分（人工）",
            authLevel: 1,
          },
        },
        {
          path: "object-partitioning-vehicle",
          name: "object-partitioning-vehicle",
          component: () => import("@/views/object-management/object-partitioning-vehicle/object-partitioning.vue"),
          meta: {
            title: "对象划分（车辆）",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/shift-management",
      name: "shift-management",
      meta: {
        title: "排班管理",
        authLevel: 1,
      },
      redirect: { name: "object-allocation-manual", },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "object-allocation-manual",
          name: "object-allocation-manual",
          component: () => import("@/views/shift-management/object-allocation-manual/object-allocation.vue"),
          meta: {
            title: "排班情况（人工）",
            authLevel: 1,
          },
        },
        {
          path: "object-allocation-vehicle",
          name: "object-allocation-vehicle",
          component: () => import("@/views/shift-management/object-allocation-vehicle/object-allocation.vue"),
          meta: {
            title: "排班情况（车辆）",
            authLevel: 1,
          },
        },
        {
          path: "scheduling-configuration",
          name: "scheduling-configuration",
          component: () => import("@/views/shift-management/scheduling-configuration/scheduling-configuration.vue"),
          meta: {
            title: "排班配置",
            authLevel: 1,
          },
          children: [
            {
              path: "add",
              name: "scheduling-configuration-add",
              component: () => import("@/views/shift-management/scheduling-configuration/add/index.vue"),
              meta: {
                title: "新增配置",
                authLevel: 1,
              },
            },
            {
              path: "edit",
              name: "scheduling-configuration-edit",
              component: () => import("@/views/shift-management/scheduling-configuration/edit/index.vue"),
              meta: {
                title: "编辑配置",
                authLevel: 1,
              },
            }
          ],
        }
      ],
    },
    {
      path: "/attendance-management",
      name: "attendance-management",
      meta: {
        title: "考勤管理",
        authLevel: 1,
      },
      redirect: { name: "attendance-record", },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "attendance-record",
          name: "attendance-record",
          component: () => import("@/views/attendance-management/attendance-record/attendance-record.vue"),
          meta: {
            title: "打卡记录",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/grid-management",
      name: "grid-management",
      meta: {
        title: "网格管理",
        authLevel: 1,
      },
      component: () => import("@/views/grid-management/grid-management.vue"),
      children: [
        {
          path: "add",
          name: "grid-management-add",
          component: () => import("@/views/grid-management/add/index.vue"),
          meta: {
            title: "新增网格",
            authLevel: 1,
          },
        },
        {
          path: "edit",
          name: "grid-management-edit",
          component: () => import("@/views/grid-management/edit/index.vue"),
          meta: {
            title: "编辑网格",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/supervision-management",
      name: "supervision-management",
      meta: {
        title: "督查管理",
        authLevel: 1,
      },
      redirect: { name: "supervision-dashboard", },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "supervision-dashboard",
          name: "supervision-dashboard",
          component: () => import("@/views/supervision-management/supervision-dashboard/supervision-dashboard.vue"),
          meta: {
            title: "督查看板",
            authLevel: 1,
          },
        },
        {
          path: "system-management",
          name: "system-management",
          meta: {
            title: "系统管理",
            authLevel: 1,
          },
          redirect: { name: "user-management", },
          // component: () => import("@/layout/default-layout.vue"),
          children: [
            {
              path: "user-management",
              name: "user-management",
              component: () => import("@/views/supervision-management/system-management/user-management/user-management.vue"),
              meta: {
                title: "用户管理",
                authLevel: 1,
              },
            },
            {
              path: "role-management",
              name: "role-management",
              component: () => import("@/views/supervision-management/system-management/role-management/role-management.vue"),
              meta: {
                title: "角色管理",
                authLevel: 1,
              },
            },
            {
              path: "department-management",
              name: "department-management",
              component: () => import("@/views/supervision-management/system-management/department-management/department-management.vue"),
              meta: {
                title: "部门管理",
                authLevel: 1,
              },
            },
            {
              path: "dictionary-management",
              name: "dictionary-management",
              component: () => import("@/views/supervision-management/system-management/dictionary-management/dictionary-management.vue"),
              meta: {
                title: "字典管理",
                authLevel: 1,
              },
              children: [
                {
                  path: "type",
                  name: "dictionary-management-type",
                  component: () => import("@/views/supervision-management/system-management/dictionary-management/components/type-list.vue"),
                  meta: {
                    title: "字典类型",
                    authLevel: 1,
                  },
                }
              ],
            },
            {
              path: "log-management",
              name: "log-management",
              meta: {
                title: "日志管理",
                authLevel: 1,
              },
              redirect: { name: "operation-log", },
              children: [
                {
                  path: "operation-log",
                  name: "operation-log",
                  component: () => import("@/views/supervision-management/system-management/log-management/operation-log/operation-log.vue"),
                  meta: {
                    title: "操作日志",
                    authLevel: 1,
                  },
                },
                {
                  path: "login-log",
                  name: "login-log",
                  component: () => import("@/views/supervision-management/system-management/log-management/login-log/login-log.vue"),
                  meta: {
                    title: "登录日志",
                    authLevel: 1,
                  },
                }
              ],
            }
          ],
        },
        {
          path: "system-monitoring",
          name: "system-monitoring",
          meta: {
            title: "系统监控",
            authLevel: 1,
          },
          redirect: { name: "online-users", },
          children: [
            {
              path: "online-users",
              name: "online-users",
              component: () => import("@/views/supervision-management/system-monitoring/online-users/online-users.vue"),
              meta: {
                title: "在线用户",
                authLevel: 1,
              },
            }
          ],
        },
        {
          path: "data-management",
          name: "data-management",
          meta: {
            title: "数据管理",
            authLevel: 1,
          },
          redirect: { name: "component-management", },
          children: [
            {
              path: "component-management",
              name: "component-management",
              component: () => import("@/views/supervision-management/data-management/component-management/component-management.vue"),
              meta: {
                title: "部件管理",
                authLevel: 1,
              },
            },
            {
              path: "responsibility-area",
              name: "responsibility-area",
              component: () => import("@/views/supervision-management/data-management/responsibility-area/responsibility-area.vue"),
              meta: {
                title: "队别",
                authLevel: 1,
              },
            },
            {
              path: "issue-configuration",
              name: "issue-configuration",
              component: () => import("@/views/supervision-management/data-management/issue-configuration/issue-configuration.vue"),
              meta: {
                title: "问题配置",
                authLevel: 1,
              },
              children: [
                {
                  path: "items",
                  name: "issue-configuration-items",
                  component: () => import("@/views/supervision-management/data-management/issue-configuration/components/items.vue"),
                  meta: {
                    title: "问题项",
                    authLevel: 1,
                  },
                }
              ],
            }
          ],
        },
        {
          path: "supervision-situation",
          name: "supervision-situation",
          meta: {
            title: "督查情况",
            authLevel: 1,
          },
          redirect: { name: "supervision-record", },
          children: [
            {
              path: "supervision-record",
              name: "supervision-record",
              component: () => import("@/views/supervision-management/supervision-situation/supervision-record/supervision-record.vue"),
              meta: {
                title: "督查情况记录",
                authLevel: 1,
              },
            },
            {
              path: "issue-rectification-record",
              name: "issue-rectification-record",
              component: () => import("@/views/supervision-management/supervision-situation/issue-rectification-record/issue-rectification-record.vue"),
              meta: {
                title: "问题整改记录",
                authLevel: 1,
              },
            }
          ],
        }
      ],
    },
    {
      path: "/scheduling-management",
      name: "scheduling-management",
      meta: {
        title: "排班管理",
        authLevel: 1,
      },
      redirect: { name: "scheduling-plan", },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "scheduling-plan",
          name:"scheduling-plan",
          component: () => import("@/views/scheduling-management/scheduling-plan/scheduling-plan.vue"),
          meta: {
            title: "排班计划",
            authLevel: 1,
          },
        },
        {
          path: "team-management",
          name: "team-management",
          component: () => import("@/views/scheduling-management/team-management/team-management.vue"),
          meta: {
            title: "班组管理",
            authLevel: 1,
          },
          children: [
            {
              path: "add",
              name: "team-management-add",
              component: () => import("@/views/scheduling-management/team-management/add/index.vue"),
              meta: {
                title: "新增班组",
                authLevel: 1,
              },
            },
            {
              path: "edit",
              name: "team-management-edit",
              component: () => import("@/views/scheduling-management/team-management/edit/index.vue"),
              meta: {
                title: "编辑班组",
                authLevel: 1,
              },
            }
          ],
        },
        {
          path: "rule-group-management",
          name: "rule-group-management",
          component: () => import("@/views/scheduling-management/rule-group-management/rule-group-management.vue"),
          meta: {
            title: "规则组管理",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/ledger-management",
      name: "ledger-management",
      meta: {
        title: "台账管理",
        authLevel: 1,
      },
      redirect: { name: "ledger-list", },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "ledger-list",
          name: "ledger-list",
          component: () => import("@/views/ledger-management/ledger-list/ledger-list.vue"),
          meta: {
            title: "台账清单",
            authLevel: 1,
          },
        },
        {
          path: "vehicle-ledger",
          name: "vehicle-ledger",
          component: () => import("@/views/ledger-management/vehicle-ledger/vehicle-ledger.vue"),
          meta: {
            title: "车辆台账",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/basic-data-management",
      name: "basic-data-management",
      meta: {
        title: "基础数据管理",
        authLevel: 1,
      },
      redirect: { name: "facility-ledger", },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "facility-ledger",
          name: "facility-ledger",
          component: () => import("@/views/basic-data-management/facility-ledger/facility-ledger.vue"),
          meta: {
            title: "设施台账",
            authLevel: 1,
          },
        },
        {
          path: "facility-information",
          name: "facility-information",
          component: () => import("@/views/basic-data-management/facility-information/facility-information.vue"),
          meta: {
            title: "设施信息",
            authLevel: 1,
          },
        },
        {
          path: "iot-card",
          name: "iot-card",
          component: () => import("@/views/basic-data-management/iot-card/iot-card.vue"),
          meta: {
            title: "物联网卡",
            authLevel: 1,
          },
        },
        {
          path: "point-config",
          name: "point-config",
          component: () => import("@/views/basic-data-management/point-config/point-config.vue"),
          meta: {
            title: "点位配置",
            authLevel: 1,
          },
        },
        {
          path: "organizational-structure",
          name: "organizational-structure",
          component: () => import("@/views/basic-data-management/organizational-structure/organizational-structure.vue"),
          meta: {
            title: "组织架构",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/job-management",
      name: "job-management",
      meta: {
        title: "作业管理",
        authLevel: 1,
      },
      redirect: { name: "early-warning-records", },
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "early-warning-records",
          name: "early-warning-records",
          component: () => import("@/views/job-management/early-warning-records/early-warning-records.vue"),
          meta: {
            title: "预警记录",
            authLevel: 1,
          },
        },
        {
          path: "alert-configuration",
          name: "alert-configuration",
          component: () => import("@/views/job-management/alert-configuration/alert-configuration.vue"),
          meta: {
            title: "预警配置",
            authLevel: 1,
          },
        },
        {
          path: "job-board",
          name: "job-board",
          component: () => import("@/views/job-management/job-board/job-board.vue"),
          meta: {
            title: "作业看板",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/user-management",
      name: "global-user-management",
      component: () => import("@/views/user-management/user-management.vue"),
      meta: {
        title: "用户管理",
        authLevel: 1,
      },
    },
    {
      path: "/role-management",
      name: "global-role-management",
      component: () => import("@/views/role-management/role-management.vue"),
      meta: {
        title: "角色管理",
        authLevel: 1,
      },
    },
    {
      path: "/user-center",
      component: () => import("@/layout/default-layout.vue"),
      children: [
        {
          path: "/user-center",
          component: () => import("@/views/user-center/index.vue"),
          meta: {
            title: "个人中心",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/project-management",
      name: "project-management",
      component: () => import("@/views/project-management/project-management.vue"),
      meta: {
        title: "项目管理",
        authLevel: 1,
      },
      children: [
        {
          path: "edit-project",
          name: "edit-project",
          component: () => import("@/views/project-management/edit-project/edit-project.vue"),
          meta: {
            title: "编辑项目",
            authLevel: 1,
          },
        },
        {
          path: "add-project",
          name: "add-project",
          component: () => import("@/views/project-management/add-project/add-project.vue"),
          meta: {
            title: "新增项目",
            authLevel: 1,
          },
        }
      ],
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("@/views/unauthorized/unauthorized.vue"),
      meta: {
        title: "暂无权限",
        authLevel: 1,
      },
    },
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
      meta: {
        title: "登录",
        authLevel: 0,
      },
    },
    {
      path: "/unauthorized",
      component: () => import("@/views/unauthorized/unauthorized.vue"),
      meta: {
        title: "暂无权限",
        authLevel: 0,
      },
    },
    {
      path: "/404", // 此处需特别注意置于最底部
      component: () => import("@/views/404/index.vue"),
      meta: {
        title: "404",
        authLevel: 0,
      },
    },
    {
      path: "/:pathMatch(.*)", // 此处需特别注意置于最底部
      redirect: "/404",
    }
  ],
  scrollBehavior() {
    return { top: 0, };
  },
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.authLevel === 0) {
    next()
  } else {
    next()
    // useUserInfo().$state.token?next():next("/login")
  }
})
// 路由加载后
router.afterEach(() => {
  NProgress.done()
})

export default router
