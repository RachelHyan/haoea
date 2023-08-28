// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加问题项 POST /problemItem/addProblemItem */
export async function mesProblemItemAddProblemItem(
  body: MES.ProblemItemInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/problemItem/addProblemItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除问题项 POST /problemItem/deleteProblemItem */
export async function mesProblemItemDeleteProblemItem(
  body: MES.BatchDelInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/problemItem/deleteProblemItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询问题项分页列表 GET /problemItem/problemItemPageList */
export async function mesProblemItemProblemItemPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProblemItemProblemItemPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_ProblemItemDTO_>(`/mes/problemItem/problemItemPageList`, {
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

/** 查询问题项详情 GET /problemItem/queryProblemItemInfo */
export async function mesProblemItemQueryProblemItemInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProblemItemQueryProblemItemInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_ProblemItemInfo_>(`/mes/problemItem/queryProblemItemInfo`, {
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

/** 查询整改员列表 GET /problemItem/queryRectifierUserList */
export async function mesProblemItemQueryRectifierUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ProblemItemQueryRectifierUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_RectifierUserDTO_>(`/mes/problemItem/queryRectifierUserList`, {
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

/** 编辑问题项 POST /problemItem/updateProblemItem */
export async function mesProblemItemUpdateProblemItem(
  body: MES.ProblemItemInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/problemItem/updateProblemItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
