// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 查询操作日志详情(洁亚-定制版) GET /operLog/selectJayaOperLogInfo */
export async function mesOperLogSelectJayaOperLogInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.OperLogSelectJayaOperLogInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_OperLogInfo_>(`/mes/operLog/selectJayaOperLogInfo`, {
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

/** 查询操作日志列表(洁亚-定制版) GET /operLog/selectJayaOperLogPageList */
export async function mesOperLogSelectJayaOperLogPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.OperLogSelectJayaOperLogPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_OperLogDTO_>(`/mes/operLog/selectJayaOperLogPageList`, {
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
