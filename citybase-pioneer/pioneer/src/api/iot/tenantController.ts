// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加租户 POST /tenant/addTenant */
export async function iotTenantAddTenant(
  body: IOT.TenantInParam,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_string_>(`/iot/tenant/addTenant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 修改租户状态 PUT /tenant/changeStatus */
export async function iotTenantChangeStatus(
  body: IOT.TenantEnableStatusChageParam,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_string_>(`/iot/tenant/changeStatus`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除租户 DELETE /tenant/deleteTenant */
export async function iotTenantDeleteTenant(
  body: IOT.TenantDelParam,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_string_>(`/iot/tenant/deleteTenant`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 导出租户信息 POST /tenant/exportTenantExcel */
export async function iotTenantExportTenantExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IOT.TenantExportTenantExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/iot/tenant/exportTenantExcel`, {
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

/** 查询租户详情 GET /tenant/tenantInfo */
export async function iotTenantTenantInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IOT.TenantTenantInfoParams,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_TenantInfo_>(`/iot/tenant/tenantInfo`, {
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

/** 查询租户分页列表 GET /tenant/tenantPageList */
export async function iotTenantTenantPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IOT.TenantTenantPageListParams,
  options?: { [key: string]: any },
) {
  return request<IOT.PageResult_List_TenantDTO_>(`/iot/tenant/tenantPageList`, {
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

/** 编辑租户 PUT /tenant/updateTenant */
export async function iotTenantUpdateTenant(
  body: IOT.TenantInParam,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_string_>(`/iot/tenant/updateTenant`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
