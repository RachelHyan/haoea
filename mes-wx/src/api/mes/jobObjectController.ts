// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 新增作业对象 POST /jobObject/addJobObject */
export async function mesJobObjectAddJobObject(
  body: MES.JobObjectInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/jobObject/addJobObject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除作业对象 DELETE /jobObject/deleteJobObject */
export async function mesJobObjectDeleteJobObject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectDeleteJobObjectParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/jobObject/deleteJobObject`, {
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

/** 查询对象分页列表 GET /jobObject/objectPageList */
export async function mesJobObjectObjectPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectObjectPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_JobObjectDTO_>(`/mes/jobObject/objectPageList`, {
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

/** 查询责任人下拉框列表(洁亚-定制版) GET /jobObject/queryJayaChargeSwitchList */
export async function mesJobObjectQueryJayaChargeSwitchList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectQueryJayaChargeSwitchListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_JayaChargeSwitchDTO_>(
    `/mes/jobObject/queryJayaChargeSwitchList`,
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

/** 查询责任区域下拉框列表(洁亚-定制版) GET /jobObject/queryJayaGridSwitchList */
export async function mesJobObjectQueryJayaGridSwitchList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectQueryJayaGridSwitchListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_JayaGridSwitchDTO_>(`/mes/jobObject/queryJayaGridSwitchList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      // type has a default value: Manual_cleaning
      type: 'Manual_cleaning',
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询地图网格列表(洁亚-定制版) GET /jobObject/queryJayaMapGridList */
export async function mesJobObjectQueryJayaMapGridList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectQueryJayaMapGridListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_PlanViewGridDTO_>(`/mes/jobObject/queryJayaMapGridList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      // type has a default value: Manual_cleaning
      type: 'Manual_cleaning',
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询地图左侧网格分页列表(洁亚-定制版) GET /jobObject/queryJayaMapGridPageList */
export async function mesJobObjectQueryJayaMapGridPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectQueryJayaMapGridPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_PlanViewGridDTO_>(`/mes/jobObject/queryJayaMapGridPageList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      // type has a default value: Manual_cleaning
      type: 'Manual_cleaning',
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询地图对象列表(洁亚-定制版) GET /jobObject/queryJayaMapObjectList */
export async function mesJobObjectQueryJayaMapObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectQueryJayaMapObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_JobObjectDTO_>(`/mes/jobObject/queryJayaMapObjectList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      // type has a default value: Manual_cleaning
      type: 'Manual_cleaning',
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询项目/对象下所属班次选项列表(洁亚-定制版) GET /jobObject/queryJayaObjectShiftSwitchList */
export async function mesJobObjectQueryJayaObjectShiftSwitchList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectQueryJayaObjectShiftSwitchListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_JayaObjectShiftSwitchDTO_>(
    `/mes/jobObject/queryJayaObjectShiftSwitchList`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        // type has a default value: Manual_cleaning
        type: 'Manual_cleaning',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询对象详情 GET /jobObject/queryObjectInfo */
export async function mesJobObjectQueryObjectInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectQueryObjectInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_JobObjectInfo_>(`/mes/jobObject/queryObjectInfo`, {
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

/** 更新作业对象 POST /jobObject/updateJobObject */
export async function mesJobObjectUpdateJobObject(
  body: MES.JobObjectInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/jobObject/updateJobObject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
