import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title: string, // 路由显示名称
		authLevel: number
  }
}
