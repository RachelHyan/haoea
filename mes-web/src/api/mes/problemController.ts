// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加问题 POST /problem/addProblem */
export async function mesProblemAddProblem(
  body: MES.ProblemInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/problem/addProblem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** deleteProblem POST /problem/deleteProblem */
export async function mesProblemDeleteProblem(
  body: MES.BatchDelInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/problem/deleteProblem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询问题分页列表 GET /problem/problemPageList */
export async function mesProblemProblemPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProblemProblemPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_ProblemDTO_>(`/mes/problem/problemPageList`, {
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

/** 查询问题详情 GET /problem/queryProblemInfo */
export async function mesProblemQueryProblemInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProblemQueryProblemInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_ProblemInfo_>(`/mes/problem/queryProblemInfo`, {
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

/** 查询问题类下拉框列表 GET /problem/queryProblemSwitchList */
export async function mesProblemQueryProblemSwitchList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProblemQueryProblemSwitchListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_string_>(`/mes/problem/queryProblemSwitchList`, {
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

/** 编辑问题 POST /problem/updateProblem */
export async function mesProblemUpdateProblem(
  body: MES.ProblemInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/problem/updateProblem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
