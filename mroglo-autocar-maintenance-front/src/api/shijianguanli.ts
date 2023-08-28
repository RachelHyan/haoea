// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 查看消息 POST /api/incident/checkMsg */
export async function checkMsgUsingPOST(
  body: API.CheckIncidentParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/incident/checkMsg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询车辆故障统计信息 GET /api/incident/queryCarFarultStatiInfo */
export async function queryCarFarultStatiInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCarFarultStatiInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVocheliangguzhangtongjiliebiaoduixiang>(
    '/api/incident/queryCarFarultStatiInfo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询车辆事件列表 GET /api/incident/queryIncidentPageList */
export async function queryIncidentPageListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryIncidentPageListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageResultListshijianliebiaoduixiang>('/api/incident/queryIncidentPageList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
