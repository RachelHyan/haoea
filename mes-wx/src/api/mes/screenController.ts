// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 车辆配备-统计车辆类型数量 GET /screen/queryCarTypeCount */
export async function mesScreenQueryCarTypeCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ScreenQueryCarTypeCountParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_CarTypeCountDTO_>(`/mes/screen/queryCarTypeCount`, {
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

/** 地图-查询对象 GET /screen/queryMapObject */
export async function mesScreenQueryMapObject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ScreenQueryMapObjectParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_MapObjectDTO_>(`/mes/screen/queryMapObject`, {
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

/** 地图-查询视频流 GET /screen/queryMapVideoCamera */
export async function mesScreenQueryMapVideoCamera(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ScreenQueryMapVideoCameraParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_MapVideoCameraDTO_>(`/mes/screen/queryMapVideoCamera`, {
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

/** 地图-查询场地监控 GET /screen/queryMapVideoDevice */
export async function mesScreenQueryMapVideoDevice(options?: { [key: string]: any }) {
  return request<MES.ResultVo_List_MapVideoDeviceDTO_>(`/mes/screen/queryMapVideoDevice`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 人员配备-统计人员性别数量 GET /screen/queryUserGenderCount */
export async function mesScreenQueryUserGenderCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ScreenQueryUserGenderCountParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_UserGenderCountDTO_>(`/mes/screen/queryUserGenderCount`, {
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

/** 人员配备-统计人员类型数量 GET /screen/queryUserTypeCount */
export async function mesScreenQueryUserTypeCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ScreenQueryUserTypeCountParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_UserTypeCountDTO_>(`/mes/screen/queryUserTypeCount`, {
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

/** 人员配备-统计人员年龄阶层数量 GET /screen/UserTypeCountDTO */
export async function mesScreenUserTypeCountDTO(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ScreenUserTypeCountDTOParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_UserAgeInfo_>(`/mes/screen/UserTypeCountDTO`, {
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
