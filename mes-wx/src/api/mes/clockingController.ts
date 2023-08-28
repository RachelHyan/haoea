// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 保存打卡记录 POST /clocking/addClockingRecord */
export async function mesClockingAddClockingRecord(
  body: MES.ClockingInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/clocking/addClockingRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 导出考勤打卡记录列表 POST /clocking/exportClockingRecordExcel */
export async function mesClockingExportClockingRecordExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ClockingExportClockingRecordExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/clocking/exportClockingRecordExcel`, {
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

/** 根据当前登录用户查询打卡记录 GET /clocking/queryClockingRecordBySysUserId */
export async function mesClockingQueryClockingRecordBySysUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ClockingQueryClockingRecordBySysUserIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_ClockingInfo_>(`/mes/clocking/queryClockingRecordBySysUserId`, {
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

/** 查询打卡记录详情 GET /clocking/queryClockingRecordInfo */
export async function mesClockingQueryClockingRecordInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ClockingQueryClockingRecordInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_ClockingRecordInfo_>(`/mes/clocking/queryClockingRecordInfo`, {
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

/** 查看打卡记录分页列表 GET /clocking/queryClockingRecordPageList */
export async function mesClockingQueryClockingRecordPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ClockingQueryClockingRecordPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_ClockingRecordDTO_>(
    `/mes/clocking/queryClockingRecordPageList`,
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

/** 查询未打卡情况 GET /clocking/selectNoClockingUser */
export async function mesClockingSelectNoClockingUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ClockingSelectNoClockingUserParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_ClockingCountDTO_>(`/mes/clocking/selectNoClockingUser`, {
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
