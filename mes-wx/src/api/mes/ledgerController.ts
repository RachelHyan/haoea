// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加台账清单 POST /ledger/addLedger */
export async function mesLedgerAddLedger(
  body: MES.LedgerFlowInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/ledger/addLedger`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除台账清单 POST /ledger/deleteLedger */
export async function mesLedgerDeleteLedger(
  body: MES.DelLedgerFlowInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/ledger/deleteLedger`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 车辆台账-删除车辆台账 DELETE /ledger/deleteLedgerCar */
export async function mesLedgerDeleteLedgerCar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LedgerDeleteLedgerCarParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/ledger/deleteLedgerCar`, {
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

/** 车辆台账-导出车辆台账列表excel POST /ledger/exportLedgerCarExcel */
export async function mesLedgerExportLedgerCarExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LedgerExportLedgerCarExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/ledger/exportLedgerCarExcel`, {
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

/** 导出台账清单列表excel POST /ledger/exportLedgerExcel */
export async function mesLedgerExportLedgerExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LedgerExportLedgerExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/ledger/exportLedgerExcel`, {
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

/** 车辆台账-导入车辆台账清单 POST /ledger/importLedgerCar */
export async function mesLedgerImportLedgerCar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LedgerImportLedgerCarParams,
  body: string,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<MES.ResultVo_string_>(`/mes/ledger/importLedgerCar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    data: formData,
    ...(options || {}),
  });
}

/** 查询台账清单详情 GET /ledger/ledgerInfo */
export async function mesLedgerLedgerInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LedgerLedgerInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_LedgerFlowInfo_>(`/mes/ledger/ledgerInfo`, {
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

/** 查询台账清单分页列表 GET /ledger/ledgerPageList */
export async function mesLedgerLedgerPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LedgerLedgerPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_LedgerFlowDTO_>(`/mes/ledger/ledgerPageList`, {
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

/** 车辆台账-查询车辆台账分页列表 DELETE /ledger/queryLedgerCarPageList */
export async function mesLedgerQueryLedgerCarPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LedgerQueryLedgerCarPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_LedgerCarDTO_>(`/mes/ledger/queryLedgerCarPageList`, {
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

/** 更新台账清单 POST /ledger/updateLedger */
export async function mesLedgerUpdateLedger(
  body: MES.LedgerFlowInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/ledger/updateLedger`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
