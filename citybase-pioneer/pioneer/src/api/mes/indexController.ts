// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 运营分析-查询人员作业情况 GET /index/quertPeopleJobReport */
export async function mesIndexQuertPeopleJobReport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQuertPeopleJobReportParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_PeopleJobReportDTO_>(`/mes/index/quertPeopleJobReport`, {
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

/** 运营分析-查询基本情况数据 GET /index/queryBaseInfoReport */
export async function mesIndexQueryBaseInfoReport(options?: { [key: string]: any }) {
  return request<MES.ResultVo_BaseInfoReportDTO_>(`/mes/index/queryBaseInfoReport`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 运营分析-查询队长排名列表 GET /index/queryCaptainRankingReport */
export async function mesIndexQueryCaptainRankingReport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryCaptainRankingReportParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_CaptainRankingReportDTO_>(
    `/mes/index/queryCaptainRankingReport`,
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

/** 运营分析-查询网格筛选列表 GET /index/queryGridFiltrateList */
export async function mesIndexQueryGridFiltrateList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryGridFiltrateListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_GridFiltrateDTO_>(`/mes/index/queryGridFiltrateList`, {
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

/** 运营分析-查询网格作业完成情况 GET /index/queryGridJobReport */
export async function mesIndexQueryGridJobReport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryGridJobReportParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_GridJobReportDTO_>(`/mes/index/queryGridJobReport`, {
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

/** 运营分析-查询人员出勤数据 GET /index/queryPeopleAttendanceReport */
export async function mesIndexQueryPeopleAttendanceReport(options?: { [key: string]: any }) {
  return request<MES.ResultVo_PeopleAttendanceReportDTO_>(
    `/mes/index/queryPeopleAttendanceReport`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...(options || {}),
    },
  );
}

/** 运营分析-查询地图点位数据 GET /index/queryPointMapReport */
export async function mesIndexQueryPointMapReport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryPointMapReportParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_PointMapReportDTO_>(`/mes/index/queryPointMapReport`, {
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

/** 运营分析-查询班次作业排名列表 GET /index/queryShiftJobReport */
export async function mesIndexQueryShiftJobReport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.IndexQueryShiftJobReportParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_ShiftJobReportDTO_>(`/mes/index/queryShiftJobReport`, {
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
