// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

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
