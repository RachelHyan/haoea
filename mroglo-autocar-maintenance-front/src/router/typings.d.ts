import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title: string // 路由显示名称
    showBreadcrumb: boolean // 是否显示面包屑
		isRoot?: boolean 
  }
}
