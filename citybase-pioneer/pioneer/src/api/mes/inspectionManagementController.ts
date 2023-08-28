// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 导出基础信息表excel POST /inspectionManagement/exportBaseInfoExcel */
export async function mesInspectionManagementExportBaseInfoExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionManagementExportBaseInfoExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/inspectionManagement/exportBaseInfoExcel`, {
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

/** 导出详细信息表excel POST /inspectionManagement/exportDetailInfoExcel */
export async function mesInspectionManagementExportDetailInfoExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionManagementExportDetailInfoExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/inspectionManagement/exportDetailInfoExcel`, {
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

/** 处理考勤督查结果 PUT /inspectionManagement/handleInspectionTask */
export async function mesInspectionManagementHandleInspectionTask(
  body: MES.InspectionTaskHandleParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/inspectionManagement/handleInspectionTask`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询考勤督查任务详情 GET /inspectionManagement/selectAttendanceInspectionTaskInfoById */
export async function mesInspectionManagementSelectAttendanceInspectionTaskInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionManagementSelectAttendanceInspectionTaskInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_AttendanceInspectionTaskInfo_>(
    `/mes/inspectionManagement/selectAttendanceInspectionTaskInfoById`,
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

/** 查询考勤督查任务列表 GET /inspectionManagement/selectInspectionTaskListByUserId */
export async function mesInspectionManagementSelectInspectionTaskListByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionManagementSelectInspectionTaskListByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_UserInspectionTaskDTO_>(
    `/mes/inspectionManagement/selectInspectionTaskListByUserId`,
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

/** 查询督查情况 GET /inspectionManagement/selectJobInspectionDetailsList */
export async function mesInspectionManagementSelectJobInspectionDetailsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionManagementSelectJobInspectionDetailsListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_JobInspectionDetailsDTO_>(
    `/mes/inspectionManagement/selectJobInspectionDetailsList`,
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

/** 查询作业督查任务详情 GET /inspectionManagement/selectJobInspectionTaskInfo */
export async function mesInspectionManagementSelectJobInspectionTaskInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionManagementSelectJobInspectionTaskInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_JobInspectionTaskInfo_>(
    `/mes/inspectionManagement/selectJobInspectionTaskInfo`,
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

/** 查询作业督查任务列表 GET /inspectionManagement/selectJobInspectionTaskListByUserId */
export async function mesInspectionManagementSelectJobInspectionTaskListByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionManagementSelectJobInspectionTaskListByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_UserJobInspectionTaskDTO_>(
    `/mes/inspectionManagement/selectJobInspectionTaskListByUserId`,
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

/** 文员考勤管理列表 GET /inspectionManagement/selectUserDateDetails */
export async function mesInspectionManagementSelectUserDateDetails(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.InspectionManagementSelectUserDateDetailsParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_JobInspectionDetailsDTO_>(
    `/mes/inspectionManagement/selectUserDateDetails`,
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
