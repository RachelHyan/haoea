// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加部件 POST /parts/addParts */
export async function mesPartsAddParts(body: MES.PartsInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/parts/addParts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除部件 DELETE /parts/deleteParts */
export async function mesPartsDeleteParts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PartsDeletePartsParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/parts/deleteParts`, {
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

/** 导出区域 GET /parts/exportPartsList */
export async function mesPartsExportPartsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PartsExportPartsListParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/parts/exportPartsList`, {
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

/** 查询部件分页列表 GET /parts/selectAreaList */
export async function mesPartsSelectAreaList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PartsSelectAreaListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_AreaDTO_>(`/mes/parts/selectAreaList`, {
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

/** 查询部件分页列表 GET /parts/selectPartsPageList */
export async function mesPartsSelectPartsPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PartsSelectPartsPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_PartsDTO_>(`/mes/parts/selectPartsPageList`, {
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

/** 编辑部件 PUT /parts/updateParts */
export async function mesPartsUpdateParts(body: MES._2, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/parts/updateParts`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
