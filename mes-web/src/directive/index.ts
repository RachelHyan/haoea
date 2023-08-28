import { useProject } from "@/stores/project";
import type { Directive } from "vue";


// 按钮权限
const permission: Directive = {

  mounted(el, binding) {
    const project = useProject();
    const { value, } = binding
    const permissionBtn = project.$state.roleCode as string[]
    if (value && value instanceof Array && value.length > 0) {
      const permissionFunc = value
      const hasPermission = permissionBtn?.some((role: any) => {
        return permissionFunc.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error("请设置按钮权限标签值")
    }
  },
}

export {
  permission
};

