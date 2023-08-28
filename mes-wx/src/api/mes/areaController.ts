// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加区域 POST /area/addArea */
export async function mesAreaAddArea(body: MES.AreaInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/area/addArea`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除区域 DELETE /area/deleteArea */
export async function mesAreaDeleteArea(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.AreaDeleteAreaParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/area/deleteArea`, {
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

/** 导出区域 GET /area/exportAreaExcel */
export async function mesAreaExportAreaExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.AreaExportAreaExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/area/exportAreaExcel`, {
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

/** 查询区域分页列表 GET /area/selectAreaPageList */
export async function mesAreaSelectAreaPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.AreaSelectAreaPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_AreaExcelDTO_>(`/mes/area/selectAreaPageList`, {
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

/** 编辑区域 PUT /area/updateArea */
export async function mesAreaUpdateArea(body: MES.AreaInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/area/updateArea`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
