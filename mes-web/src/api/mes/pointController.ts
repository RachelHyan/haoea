// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加点位 POST /point/addPoint */
export async function mesPointAddPoint(
  body: MES.InspectionPointInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/point/addPoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除点位 DELETE /point/deletePoint */
export async function mesPointDeletePoint(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PointDeletePointParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/point/deletePoint`, {
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

/** 查询点位详情 GET /point/pointInfo */
export async function mesPointPointInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PointPointInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_InspectionPointInfo_>(`/mes/point/pointInfo`, {
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

/** 查询点位分页列表 GET /point/pointPageList */
export async function mesPointPointPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PointPointPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_InspectionPointDTO_>(`/mes/point/pointPageList`, {
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

/** 查询网格下的点位列表 GET /point/queryPlanGridPointList */
export async function mesPointQueryPlanGridPointList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PointQueryPlanGridPointListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_PlanGridPointDTO_>(`/mes/point/queryPlanGridPointList`, {
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

/** 更新点位 POST /point/updatePoint */
export async function mesPointUpdatePoint(
  body: MES.InspectionPointInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/point/updatePoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
