// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 查询使用详情分页列表 GET /flow/cardUsagePageList */
export async function iotFlowCardUsagePageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IOT.FlowCardUsagePageListParams,
  options?: { [key: string]: any },
) {
  return request<IOT.PageResult_List_IotCardUsageMonthDTO_>(`/iot/flow/cardUsagePageList`, {
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

/** 分配物联网卡 PUT /flow/distributeIotCard */
export async function iotFlowDistributeIotCard(
  body: IOT.IotCardDistributeParam,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_string_>(`/iot/flow/distributeIotCard`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询物联网卡分页列表 GET /flow/iotCardFlowPageList */
export async function iotFlowIotCardFlowPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IOT.FlowIotCardFlowPageListParams,
  options?: { [key: string]: any },
) {
  return request<IOT.PageResult_List_IotCardFlowDTO_>(`/iot/flow/iotCardFlowPageList`, {
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

/** 查询租户项目列表 GET /flow/queryTenantProjectList */
export async function iotFlowQueryTenantProjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IOT.FlowQueryTenantProjectListParams,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_List_TenantProjectDTO_>(`/iot/flow/queryTenantProjectList`, {
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
