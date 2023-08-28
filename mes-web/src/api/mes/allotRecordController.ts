// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 导出预警记录列表excel POST /allotRecord/exportAllotRecordExcel */
export async function mesAllotRecordExportAllotRecordExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.AllotRecordExportAllotRecordExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/allotRecord/exportAllotRecordExcel`, {
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

/** 查询消息中心分页列表 GET /allotRecord/selectAllotRecordPageList */
export async function mesAllotRecordSelectAllotRecordPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.AllotRecordSelectAllotRecordPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_AllotRecordDTO_>(
    `/mes/allotRecord/selectAllotRecordPageList`,
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
