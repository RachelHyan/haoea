// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 保存路线录制 POST /objectGather/addJobObject */
export async function mesObjectGatherAddJobObject(
  body: MES.JobObjectInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/objectGather/addJobObject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除路线 DELETE /objectGather/deleteJobObject */
export async function mesObjectGatherDeleteJobObject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectGatherDeleteJobObjectParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/objectGather/deleteJobObject`, {
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

/** 查询路线详情 GET /objectGather/queryAppJobObjectInfo */
export async function mesObjectGatherQueryAppJobObjectInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectGatherQueryAppJobObjectInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_AppJobObjectInfo_>(`/mes/objectGather/queryAppJobObjectInfo`, {
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

/** 查询当前登录账号下路线分页列表 GET /objectGather/queryAppJobObjectPageList */
export async function mesObjectGatherQueryAppJobObjectPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectGatherQueryAppJobObjectPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_AppJobObjectDTO_>(
    `/mes/objectGather/queryAppJobObjectPageList`,
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

/** 查询当前登录账号下所属项目切换列表 GET /objectGather/queryAppUserProjectSwitchList */
export async function mesObjectGatherQueryAppUserProjectSwitchList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectGatherQueryAppUserProjectSwitchListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_UserProjectSwitchDTO_>(
    `/mes/objectGather/queryAppUserProjectSwitchList`,
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
