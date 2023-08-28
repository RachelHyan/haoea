// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加项目 POST /project/addProject */
export async function mesProjectAddProject(
  body: MES.ProjectInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/project/addProject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除项目 DELETE /project/deleteProject */
export async function mesProjectDeleteProject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProjectDeleteProjectParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/project/deleteProject`, {
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

/** 查询项目详情 GET /project/projectInfo */
export async function mesProjectProjectInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProjectProjectInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_ProjectInfo_>(`/mes/project/projectInfo`, {
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

/** 查询项目分页列表 GET /project/projectPageList */
export async function mesProjectProjectPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProjectProjectPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_ProjectDTO_>(`/mes/project/projectPageList`, {
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

/** 查询租户及所属项目列表信息(洁亚-定制版) GET /project/queryJayaTenantProjectInfo */
export async function mesProjectQueryJayaTenantProjectInfo(options?: { [key: string]: any }) {
  return request<MES.ResultVo_JayaTenantProjectInfo_>(`/mes/project/queryJayaTenantProjectInfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 查询项目选择列表 GET /project/queryProjectSelectList */
export async function mesProjectQueryProjectSelectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProjectQueryProjectSelectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_ProjectSelectDTO_>(`/mes/project/queryProjectSelectList`, {
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

/** 查询角色下系统用户列表 GET /project/querySysUserRoleList */
export async function mesProjectQuerySysUserRoleList(options?: { [key: string]: any }) {
  return request<MES.ResultVo_SysUserRoleInfo_>(`/mes/project/querySysUserRoleList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 查询手机号用户下所属项目切换列表 GET /project/queryUserProjectSwitchList */
export async function mesProjectQueryUserProjectSwitchList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProjectQueryUserProjectSwitchListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_UserProjectSwitchDTO_>(
    `/mes/project/queryUserProjectSwitchList`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 更新项目 POST /project/updateProject */
export async function mesProjectUpdateProject(
  body: MES.ProjectInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/project/updateProject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
