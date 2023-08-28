// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 查询视频设备监控 GET /video/queryVideoDeviceList */
export async function mesVideoQueryVideoDeviceList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.VideoQueryVideoDeviceListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_VideoDeviceDTO_>(`/mes/video/queryVideoDeviceList`, {
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
