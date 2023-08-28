// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

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
