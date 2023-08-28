// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 刷新项目电子围栏 GET /default/refreshProjectElectronicFence */
export async function mesDefaultRefreshProjectElectronicFence(options?: { [key: string]: any }) {
  return request<MES.ResultVo_boolean_>(`/mes/default/refreshProjectElectronicFence`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 同步萤石平台视频设备 GET /default/syncYsDevice */
export async function mesDefaultSyncYsDevice(options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/default/syncYsDevice`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}
