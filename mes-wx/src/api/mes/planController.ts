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

/** 查询计划绑定信息 GET /plan/queryPlanBindingInfo */
export async function mesPlanQueryPlanBindingInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PlanQueryPlanBindingInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_PlanBindInfo_>(`/mes/plan/queryPlanBindingInfo`, {
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

/** 查询地图指定网格下的对象列表 GET /plan/queryPlanViewMapObjectList */
export async function mesPlanQueryPlanViewMapObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PlanQueryPlanViewMapObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_PlanViewMapObjectDTO_>(`/mes/plan/queryPlanViewMapObjectList`, {
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

/** 查询班次下的作业车辆 GET /plan/queryPlanViewShiftCar */
export async function mesPlanQueryPlanViewShiftCar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PlanQueryPlanViewShiftCarParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_PlanCarDTO_>(`/mes/plan/queryPlanViewShiftCar`, {
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

/** 解绑 POST /plan/unbind */
export async function mesPlanUnbind(body: MES.UnbindInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/plan/unbind`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 修改计划绑定信息 POST /plan/updatePlanBindingInfo */
export async function mesPlanUpdatePlanBindingInfo(
  body: MES.UpdatePlanPointInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/plan/updatePlanBindingInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
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
