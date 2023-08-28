// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 查询角色分页列表 GET /role/pageList */
export async function idpRolePageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.RolePageListParams,
  options?: { [key: string]: any },
) {
  return request<IDP.PageResult_List_RoleDTO_>(`/idp/role/pageList`, {
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

/** 查询角色下权限资源 GET /role/queryResourceRole */
export async function idpRoleQueryResourceRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.RoleQueryResourceRoleParams,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_List_ResourceRoleDTO_>(`/idp/role/queryResourceRole`, {
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

/** 查询用户角色下拉框列表 GET /role/queryUserSelectRoleList */
export async function idpRoleQueryUserSelectRoleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.RoleQueryUserSelectRoleListParams,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_List_RoleDTO_>(`/idp/role/queryUserSelectRoleList`, {
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
