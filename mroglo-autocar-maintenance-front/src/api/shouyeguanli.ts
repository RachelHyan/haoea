// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 查询地图区域车辆统计数 GET /api/home/queryCarVersionInfo */
export async function queryMapStatiDataUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultVoListdetuquyutongjiduixiang>('/api/home/queryCarVersionInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询地图区域下的在线车辆点位信息 GET /api/home/queryMapCarPoint */
export async function queryMapCarPointUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryMapCarPointUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoListdetuquyucheliangdianweiduixiang>('/api/home/queryMapCarPoint', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
