// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加设施 POST /facilityPoint/addFacilityPoint */
export async function mesFacilityPointAddFacilityPoint(
  body: MES.FacilityPointInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/facilityPoint/addFacilityPoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除设施 DELETE /facilityPoint/deleteFacilityPoint */
export async function mesFacilityPointDeleteFacilityPoint(
  body: MES.FacilityPointDelParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/facilityPoint/deleteFacilityPoint`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询设施详情 GET /facilityPoint/facilityPointInfo */
export async function mesFacilityPointFacilityPointInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.FacilityPointFacilityPointInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_FacilityPointInfo_>(`/mes/facilityPoint/facilityPointInfo`, {
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

/** 查询设施分页列表 GET /facilityPoint/facilityPointPageList */
export async function mesFacilityPointFacilityPointPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.FacilityPointFacilityPointPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_FacilityPointDTO_>(
    `/mes/facilityPoint/facilityPointPageList`,
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

/** 查询网格列表 GET /facilityPoint/queryGridListByProjectId */
export async function mesFacilityPointQueryGridListByProjectId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.FacilityPointQueryGridListByProjectIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_FacilityGridDTO_>(
    `/mes/facilityPoint/queryGridListByProjectId`,
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

/** 查询设施台账统计 GET /facilityPoint/selectFacilityPointCount */
export async function mesFacilityPointSelectFacilityPointCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.FacilityPointSelectFacilityPointCountParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_Map_string_int_>(`/mes/facilityPoint/selectFacilityPointCount`, {
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

/** 修改设施 PUT /facilityPoint/updateFacilityPoint */
export async function mesFacilityPointUpdateFacilityPoint(
  body: MES.FacilityPointInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/facilityPoint/updateFacilityPoint`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
