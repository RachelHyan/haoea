// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 新增菜单资源 POST /resource/addResource */
export async function authResourceAddResource(
  body: AUTH.ResourceInParam,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResultVo_string_>(`/auth/resource/addResource`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除菜单资源 DELETE /resource/deleteResource */
export async function authResourceDeleteResource(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.ResourceDeleteResourceParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResultVo_string_>(`/auth/resource/deleteResource`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取授权资源数据 GET /resource/getResourceJson */
export async function authResourceGetResourceJson(options?: { [key: string]: any }) {
  return request<AUTH.ResultVo_List_ResourceDTO_>(`/auth/resource/getResourceJson`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 获取路由资源信息 GET /resource/getRouters */
export async function authResourceGetRouters(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.ResourceGetRoutersParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResultVo_List_RouterDTO_>(`/auth/resource/getRouters`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询菜单资源详情 GET /resource/queryResourceInfo */
export async function authResourceQueryResourceInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.ResourceQueryResourceInfoParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResultVo_ResourceInfo_>(`/auth/resource/queryResourceInfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询菜单资源树 GET /resource/queryResourceTree */
export async function authResourceQueryResourceTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.ResourceQueryResourceTreeParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResultVo_List_ResourceTree_>(`/auth/resource/queryResourceTree`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新菜单资源 POST /resource/updateResource */
export async function authResourceUpdateResource(
  body: AUTH.ResourceInParam,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResultVo_string_>(`/auth/resource/updateResource`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
