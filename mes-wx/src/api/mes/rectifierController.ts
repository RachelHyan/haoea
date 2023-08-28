// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 删除整改记录 DELETE /rectifier/deleteRectifierRecord */
export async function mesRectifierDeleteRectifierRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.RectifierDeleteRectifierRecordParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/rectifier/deleteRectifierRecord`, {
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

/** 导出整改记录列表excel POST /rectifier/exportRectifierRecordExcel */
export async function mesRectifierExportRectifierRecordExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.RectifierExportRectifierRecordExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/rectifier/exportRectifierRecordExcel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询整改记录详情 GET /rectifier/queryRectifierRecordInfo */
export async function mesRectifierQueryRectifierRecordInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.RectifierQueryRectifierRecordInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_RectifierRecordInfo_>(`/mes/rectifier/queryRectifierRecordInfo`, {
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

/** 查询整改记录分页列表 GET /rectifier/queryRectifierRecordPageList */
export async function mesRectifierQueryRectifierRecordPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.RectifierQueryRectifierRecordPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_RectifierRecordDTO_>(
    `/mes/rectifier/queryRectifierRecordPageList`,
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

/** 修改整改记录 DELETE /rectifier/updateRectifierRecord */
export async function mesRectifierUpdateRectifierRecord(
  body: MES.UpdateRectifierInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/rectifier/updateRectifierRecord`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
