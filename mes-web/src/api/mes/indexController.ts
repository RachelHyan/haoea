// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 作业看板-导出车辆今日作业状态列表Excel POST /index/exportCarJobStatusTodayExcelList */
export async function mesIndexExportCarJobStatusTodayExcelList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexExportCarJobStatusTodayExcelListParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/index/exportCarJobStatusTodayExcelList`, {
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

/** 作业看板-导出人员今日考勤列表Excel POST /index/exportUserAttendanceTodayExcel */
export async function mesIndexExportUserAttendanceTodayExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexExportUserAttendanceTodayExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/index/exportUserAttendanceTodayExcel`, {
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

/** 作业看板-导出人员今日作业状态列表Excel POST /index/exportUserJobStatusTodayExcelList */
export async function mesIndexExportUserJobStatusTodayExcelList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexExportUserJobStatusTodayExcelListParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/index/exportUserJobStatusTodayExcelList`, {
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

/** 作业看板-查看车辆今日作业状态列表 GET /index/queryCarJobStatusTodayList */
export async function mesIndexQueryCarJobStatusTodayList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryCarJobStatusTodayListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_CarJobStatusTodayDTO_>(
    `/mes/index/queryCarJobStatusTodayList`,
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

/** 查询项目概况 GET /index/queryIndexDataBoard */
export async function mesIndexQueryIndexDataBoard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryIndexDataBoardParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_IndexDataBoardDTO_>(`/mes/index/queryIndexDataBoard`, {
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

/** 督查看板-查询督查记录统计 GET /index/queryInspectionRecordStatisticData */
export async function mesIndexQueryInspectionRecordStatisticData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryInspectionRecordStatisticDataParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_InspectionRecordStatisticDTO_>(
    `/mes/index/queryInspectionRecordStatisticData`,
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

/** 督查看板-查询今日督查情况 GET /index/queryInspectionStatisticData */
export async function mesIndexQueryInspectionStatisticData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryInspectionStatisticDataParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_InspectionStatisticDTO_>(
    `/mes/index/queryInspectionStatisticData`,
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

/** 作业看板-查询人员或车辆统计数据 GET /index/queryJobBoard */
export async function mesIndexQueryJobBoard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryJobBoardParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_JobBoardDTO_>(`/mes/index/queryJobBoard`, {
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

/** 作业看板-查询人员或车辆信息 GET /index/queryJobBoardMapUserOrCarInfo */
export async function mesIndexQueryJobBoardMapUserOrCarInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryJobBoardMapUserOrCarInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_JobBoardMapUserOrCarInfo_>(
    `/mes/index/queryJobBoardMapUserOrCarInfo`,
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

/** 作业看板-查询人员或车辆地图位置 GET /index/queryJobBoardMapUserOrCarStatus */
export async function mesIndexQueryJobBoardMapUserOrCarStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryJobBoardMapUserOrCarStatusParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_JobBoardMapUserOrCarStatusDTO_>(
    `/mes/index/queryJobBoardMapUserOrCarStatus`,
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

/** 作业看板-查询近7、30天作业完成情况 GET /index/queryJobTaskFinishRate */
export async function mesIndexQueryJobTaskFinishRate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryJobTaskFinishRateParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_JobTaskFinishRateDTO_>(`/mes/index/queryJobTaskFinishRate`, {
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

/** 督查看板-查询督查点及其个数统计 GET /index/queryPointStatisticData */
export async function mesIndexQueryPointStatisticData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryPointStatisticDataParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_PointStatisticDTO_>(`/mes/index/queryPointStatisticData`, {
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

/** 作业看板-查询人员今日考勤列表 GET /index/queryUserAttendanceTodayList */
export async function mesIndexQueryUserAttendanceTodayList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryUserAttendanceTodayListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_UserAttendanceTodayDTO_>(
    `/mes/index/queryUserAttendanceTodayList`,
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

/** 作业看板-查看人员今日作业状态列表 GET /index/queryUserJobStatusTodayList */
export async function mesIndexQueryUserJobStatusTodayList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryUserJobStatusTodayListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_UserJobStatusTodayDTO_>(
    `/mes/index/queryUserJobStatusTodayList`,
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

/** 作业看板-查询人员或车辆的当班信息 GET /index/queryUserOrCarCurrentShiftInfo */
export async function mesIndexQueryUserOrCarCurrentShiftInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryUserOrCarCurrentShiftInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_UserOrCarCurrentShiftInfo_>(
    `/mes/index/queryUserOrCarCurrentShiftInfo`,
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

/** 作业看板-查询人员或车辆的作业轨迹 GET /index/queryUserOrCarJobTrackList */
export async function mesIndexQueryUserOrCarJobTrackList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryUserOrCarJobTrackListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_UserOrCarJobTrackDTO_>(`/mes/index/queryUserOrCarJobTrackList`, {
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

/** 按日期查询 GET /index/selectDayExpense */
export async function mesIndexSelectDayExpense(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexSelectDayExpenseParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_ProjectDayExpenseDTO_>(`/mes/index/selectDayExpense`, {
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

/** 按月查询 GET /index/selectMonthExpense */
export async function mesIndexSelectMonthExpense(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexSelectMonthExpenseParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_Map_string_List_double_>(`/mes/index/selectMonthExpense`, {
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
