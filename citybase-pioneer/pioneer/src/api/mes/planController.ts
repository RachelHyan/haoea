// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加计划绑定 POST /plan/addJobPlan */
export async function mesPlanAddJobPlan(
  body: MES.JobPlanInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/plan/addJobPlan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 补班操作 POST /plan/fillShift */
export async function mesPlanFillShift(
  body: MES.FillShiftInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/plan/fillShift`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询项目下督察员列表 GET /plan/queryPlanInspectorUserList */
export async function mesPlanQueryPlanInspectorUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PlanQueryPlanInspectorUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_PlanInspectorUserDTO_>(`/mes/plan/queryPlanInspectorUserList`, {
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

/** 查询点位绑定信息 GET /plan/queryPlanPointBindingInfo */
export async function mesPlanQueryPlanPointBindingInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PlanQueryPlanPointBindingInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_PlanPointInfo_>(`/mes/plan/queryPlanPointBindingInfo`, {
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

/** 查询网格信息下的班次 GET /plan/queryPlanViewGridInfoShift */
export async function mesPlanQueryPlanViewGridInfoShift(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PlanQueryPlanViewGridInfoShiftParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_PlanViewGridInfo_>(`/mes/plan/queryPlanViewGridInfoShift`, {
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

/** 查询左侧网格分页列表 GET /plan/queryPlanViewGridPageList */
export async function mesPlanQueryPlanViewGridPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PlanQueryPlanViewGridPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_PlanViewGridDTO_>(`/mes/plan/queryPlanViewGridPageList`, {
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

/** 查询地图网格列表 GET /plan/queryPlanViewMapGridList */
export async function mesPlanQueryPlanViewMapGridList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PlanQueryPlanViewMapGridListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_PlanViewMapGridDTO_>(`/mes/plan/queryPlanViewMapGridList`, {
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

/** 查询班次下的作业人员 GET /plan/queryPlanViewShiftUser */
export async function mesPlanQueryPlanViewShiftUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PlanQueryPlanViewShiftUserParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_PlanUserDTO_>(`/mes/plan/queryPlanViewShiftUser`, {
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

/** 修改督察计划绑定信息 POST /plan/updatePlanInspectorBindingInfo */
export async function mesPlanUpdatePlanInspectorBindingInfo(
  body: MES.PlanInspectionInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/plan/updatePlanInspectorBindingInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 修改点位绑定信息 POST /plan/updatePlanPointBindingInfo */
export async function mesPlanUpdatePlanPointBindingInfo(
  body: MES.UpdatePlanPointInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/plan/updatePlanPointBindingInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
