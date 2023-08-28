// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加供应商 POST /supplier/addSupplier */
export async function iotSupplierAddSupplier(
  body: IOT.SupplierInParam,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_string_>(`/iot/supplier/addSupplier`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除供应商 DELETE /supplier/deleteSupplier */
export async function iotSupplierDeleteSupplier(
  body: IOT.SupplierDelParam,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_string_>(`/iot/supplier/deleteSupplier`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询供应商详情 GET /supplier/supplierInfo */
export async function iotSupplierSupplierInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IOT.SupplierSupplierInfoParams,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_SupplierInfo_>(`/iot/supplier/supplierInfo`, {
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

/** 查询供应商分页列表 GET /supplier/supplierOrderPageList */
export async function iotSupplierSupplierOrderPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IOT.SupplierSupplierOrderPageListParams,
  options?: { [key: string]: any },
) {
  return request<IOT.PageResult_List_SupplierOrderDTO_>(`/iot/supplier/supplierOrderPageList`, {
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

/** 查询供应商分页列表 GET /supplier/supplierPageList */
export async function iotSupplierSupplierPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IOT.SupplierSupplierPageListParams,
  options?: { [key: string]: any },
) {
  return request<IOT.PageResult_List_SupplierDTO_>(`/iot/supplier/supplierPageList`, {
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

/** 修改供应商 PUT /supplier/updateSupplier */
export async function iotSupplierUpdateSupplier(
  body: IOT.SupplierInParam,
  options?: { [key: string]: any },
) {
  return request<IOT.ResultVo_string_>(`/iot/supplier/updateSupplier`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
