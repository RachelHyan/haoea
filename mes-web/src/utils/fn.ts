
// 防抖
let deboTimeout: any = null;
/** 防抖 */
const debounce = (fn: any, wait = 300) => {
  if (deboTimeout !== null) clearTimeout(deboTimeout);
  deboTimeout = setTimeout(fn, wait);
}


const currentMenu = (data:any,projectId:number) => {
  const tenantMenu = [
    {
      icon: "operation-analysis",
      name: "operation-analysis",
      path: "/operation-analysis",
      title: "运营分析",
      children: null,
    },
    {
      name: "basic-data-management",
      path: "/basic-data-management",
      title: "基础数据管理",
      icon: "basic-data-management",
      children: [
        {
          name: "organizational-structure",
          path: "/basic-data-management/organizational-structure",
          title: "组织架构",
          icon: null,
          children: null,
        }
      ],
    },
    
    {
      icon: "user-management",
      name: "user-management",
      path: "/user-management",
      title: "用户管理",
      children: null,
    },
    {
      icon: "role-management",
      name: "role-management",
      path: "/role-management",
      title: "角色管理",
      children: null,
    }
  ]

  const publicMenu = [
    {
      icon: "data-dashboard",
      name: "data-dashboard",
      path: "/data-dashboard",
      title: "运营情况",
      children: null,
    },
    {
      name: "basic-data-management",
      path: "/basic-data-management",
      title: "基础数据管理",
      icon: "basic-data-management",
      children: [
        {
          name: "organizational-structure",
          path: "/basic-data-management/organizational-structure",
          title: "组织架构",
          children: null,
        }
      ],
    }
  ]

  if (data.length === 0) {
    return []
  }
	
  if (projectId) {
    const result = data?.map((item: any) => {
      const pIndex = publicMenu.findIndex((menu: any) => menu.path === item.path)
      if (pIndex !== -1) {
        return item
      }

      const index = tenantMenu.findIndex((menu: any) => menu.path === item.path)
      if (index === -1) {
        return item
      }
      if (index !== -1) {
        if (tenantMenu[index].children) {
					
          item.children = item.children.filter((child: any) => {
            return !tenantMenu[index].children?.some((menu: any) => menu.path === child.path)
          })
        } else {
          item.children = []
        }
      }
      if (index !== -1 && item.children?.length === 0) {
        return null
      }
      return item
      
    })
    return result?.filter((item: any) => item !== null)
  } else {
    const result = data?.map((item: any) => {
      const pIndex = publicMenu.findIndex((menu: any) => menu.path === item.path)
      if (pIndex !== -1) {
        if (publicMenu[pIndex].children) {
          item.children = item.children.filter((child: any) => {
            return publicMenu[pIndex].children?.some((menu: any) => menu.path === child.path)
          })
        }else {
          return item
        }
				
        return item.children?.length > 0 ? item : null
      }
      const index = tenantMenu.findIndex((menu: any) => menu.path === item.path)
      if (index === -1) {
        return null
      }
      if (index !== -1) {
        if (tenantMenu[index].children) {
          item.children = item.children.filter((child: any) => {
            return tenantMenu[index].children?.some((menu: any) => menu.path === child.path)
          })
        }
      }
      if (index !== -1 && item.children?.length === 0) {
        return null
      }
      return item
    })
    return result?.filter((item: any) => item !== null)
  }
} 


/**
 * 构造树型结构数据(扁平结构转化为属性结构)
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
const coverTreeData = (data: Record<string,any>[], id?: string, parentId?:string, children?: string) => {
  const config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children",
  };

  const childrenListMap: Record<string,any> = {};
  const nodeIds: Record<string,any> = {};
  const tree: Record<string,any>[] = [];

  for (const d of data) {
    const parentId: string = d[config.parentId];
    if (childrenListMap[parentId] == undefined) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == undefined) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o:any) {
    if (childrenListMap[o[config.id]] !== undefined) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}


/**
 * 将时长转化为时分秒
 * @param seconds 秒数
 * @returns 
 */
const formatSeconds = (seconds:number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    remainingSeconds.toString().padStart(2, "0")
  ].join(":");

  return formattedTime;
}



export { coverTreeData, currentMenu, debounce, formatSeconds };

