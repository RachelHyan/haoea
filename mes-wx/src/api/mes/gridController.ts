// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加网格 POST /grid/addGrid */
export async function mesGridAddGrid(body: MES.GridInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/grid/addGrid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除网格 PUT /grid/deleteGrid */
export async function mesGridDeleteGrid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.GridDeleteGridParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/grid/deleteGrid`, {
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

/** 查询作业网格分页列表 GET /grid/gridPageList */
export async function mesGridGridPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.GridGridPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_GridDTO_>(`/mes/grid/gridPageList`, {
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

/** 查询网格详情 GET /grid/queryGridInfo */
export async function mesGridQueryGridInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.GridQueryGridInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_GridInfo_>(`/mes/grid/queryGridInfo`, {
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

/** 编辑网格 PUT /grid/updateGrid */
export async function mesGridUpdateGrid(body: MES.GridInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/grid/updateGrid`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
