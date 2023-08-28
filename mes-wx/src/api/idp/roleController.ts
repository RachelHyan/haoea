// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加角色 POST /role/addRole */
export async function idpRoleAddRole(body: IDP.RoleInParam, options?: { [key: string]: any }) {
  return request<IDP.ResultVo_string_>(`/idp/role/addRole`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 维护角色下的菜单资源 POST /role/addRoleResource */
export async function idpRoleAddRoleResource(
  body: IDP.RoleResourceInParam,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/role/addRoleResource`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询角色详情 GET /role/info */
export async function idpRoleInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.RoleInfoParams,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_RoleDTO_>(`/idp/role/info`, {
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

/** 查询租户下拉框列表 GET /role/queryTenantSwitchList */
export async function idpRoleQueryTenantSwitchList(options?: { [key: string]: any }) {
  return request<IDP.ResultVo_List_TenantSwitchDTO_>(`/idp/role/queryTenantSwitchList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
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

/** 修改启用与禁用 POST /role/updateEnableStatus */
export async function idpRoleUpdateEnableStatus(
  body: IDP.RoleInParam,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/role/updateEnableStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 编辑角色 POST /role/updateRole */
export async function idpRoleUpdateRole(body: IDP.RoleInParam, options?: { [key: string]: any }) {
  return request<IDP.ResultVo_string_>(`/idp/role/updateRole`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
