// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加班组班次 POST /team/addTeam */
export async function mesTeamAddTeam(body: MES.TeamInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/team/addTeam`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除班组班次 PUT /team/deleteTeam */
export async function mesTeamDeleteTeam(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.TeamDeleteTeamParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/team/deleteTeam`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询班组列表 PUT /team/queryTeamList */
export async function mesTeamQueryTeamList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.TeamQueryTeamListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_TeamDTO_>(`/mes/team/queryTeamList`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询班组班次详情 PUT /team/queryTeamShiftInfo */
export async function mesTeamQueryTeamShiftInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.TeamQueryTeamShiftInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_TeamShiftInfo_>(`/mes/team/queryTeamShiftInfo`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询班组班次分页列表 GET /team/teamPageList */
export async function mesTeamTeamPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.TeamTeamPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_TeamShiftDTO_>(`/mes/team/teamPageList`, {
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

/** 编辑班组班次 PUT /team/updateTeam */
export async function mesTeamUpdateTeam(body: MES.TeamInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/team/updateTeam`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
