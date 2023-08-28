// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加设备 POST /device/addIotCarRelation */
export async function mesDeviceAddIotCarRelation(
  body: MES.IotCarRelationInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/device/addIotCarRelation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除设备 DELETE /device/deleteIotCarRelation */
export async function mesDeviceDeleteIotCarRelation(
  body: MES.IotCarRelationDelParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/device/deleteIotCarRelation`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询物联网卡分页列表 GET /device/iotCardPageList */
export async function mesDeviceIotCardPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DeviceIotCardPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_IotCardDTO_>(`/mes/device/iotCardPageList`, {
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

/** 查询设备详情 GET /device/iotCarRelationInfo */
export async function mesDeviceIotCarRelationInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DeviceIotCarRelationInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_IotCarRelationInfo_>(`/mes/device/iotCarRelationInfo`, {
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

/** 查询设备分页列表 GET /device/iotCarRelationPageList */
export async function mesDeviceIotCarRelationPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DeviceIotCarRelationPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_IotCarRelationDTO_>(`/mes/device/iotCarRelationPageList`, {
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

/** 查询车辆列表 GET /device/queryCarListByProjectId */
export async function mesDeviceQueryCarListByProjectId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DeviceQueryCarListByProjectIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_DeviceCarDTO_>(`/mes/device/queryCarListByProjectId`, {
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

/** 查询物联网卡列表 GET /device/queryIotCardListByProjectId */
export async function mesDeviceQueryIotCardListByProjectId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DeviceQueryIotCardListByProjectIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_DeviceIotCardDTO_>(`/mes/device/queryIotCardListByProjectId`, {
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

/** 修改设备 PUT /device/updateIotCarRelation */
export async function mesDeviceUpdateIotCarRelation(
  body: MES.IotCarRelationInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/device/updateIotCarRelation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
