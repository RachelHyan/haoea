// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 删除督查记录 DELETE /inspectionTask/deleteInspectionRecord */
export async function mesInspectionTaskDeleteInspectionRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionTaskDeleteInspectionRecordParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/inspectionTask/deleteInspectionRecord`, {
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

/** 导出督查记录列表excel POST /inspectionTask/exportInspectionRecordExcel */
export async function mesInspectionTaskExportInspectionRecordExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionTaskExportInspectionRecordExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/inspectionTask/exportInspectionRecordExcel`, {
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

/** 查询督查记录详情 GET /inspectionTask/queryInspectionRecordInfo */
export async function mesInspectionTaskQueryInspectionRecordInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionTaskQueryInspectionRecordInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_InspectionRecordInfo_>(
    `/mes/inspectionTask/queryInspectionRecordInfo`,
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

/** 查询督查记录分页列表 GET /inspectionTask/queryInspectionRecordPageList */
export async function mesInspectionTaskQueryInspectionRecordPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionTaskQueryInspectionRecordPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_InspectionRecordDTO_>(
    `/mes/inspectionTask/queryInspectionRecordPageList`,
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

/** 查询督查任务 GET /inspectionTask/selectInspectionTaskList */
export async function mesInspectionTaskSelectInspectionTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionTaskSelectInspectionTaskListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_InspectionTaskDTO_>(
    `/mes/inspectionTask/selectInspectionTaskList`,
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
