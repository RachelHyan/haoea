// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加车辆 POST /api/car/addCar */
export async function addCarUsingPOST(body: API.tianjiacheliang, options?: { [key: string]: any }) {
  return request<API.ResultVocheliangxinxibiao>('/api/car/addCar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加操作员 POST /api/car/addOprator */
export async function addOpratorUsingPOST(
  body: API.fenpeicheliangduixiang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/car/addOprator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上电与下电操作 POST /api/car/electrifyOperate */
export async function electrifyOperateUsingPOST(
  body: API.shangdianyuxiadianduixiang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/car/electrifyOperate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询管理员车库列表 GET /api/car/queryAdminCarPageList */
export async function queryAdminCarPageListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryAdminCarPageListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageResultListguanliyuancheliangliebiaoduixiang>(
    '/api/car/queryAdminCarPageList',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询车辆详情(车辆状态、运行状态、电池状态) GET /api/car/queryCarInfo */
export async function queryCarInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCarInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVocheliangzhuangtaiyunxingzhuangtaidianchizhuangtaiduixiang>(
    '/api/car/queryCarInfo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询车辆域控制器版本信息 GET /api/car/queryCarVersionInfo */
export async function queryCarVersionInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCarVersionInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVobanbenxinxiduixiang>('/api/car/queryCarVersionInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询上下电状态 GET /api/car/queryElectrifyStatus */
export async function queryElectrifyStatusUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryElectrifyStatusUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVostring>('/api/car/queryElectrifyStatus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询车辆信息 GET /api/car/queryInfoById */
export async function queryInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoCarInfo>('/api/car/queryInfoById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询操作员列表 GET /api/car/queryOpratorUserList */
export async function queryOpratorUserListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryOpratorUserListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoListcaozuoyuanliebiaoduixiang>('/api/car/queryOpratorUserList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询用户车库列表 GET /api/car/queryUserCarPageList */
export async function queryUserCarPageListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUserCarPageListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageResultListyonghucheliangliebiaoduixiang>('/api/car/queryUserCarPageList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑车辆 PUT /api/car/updateCar */
export async function updateCarUsingPUT(
  body: API.tianjiacheliang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/car/updateCar', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新操作员 POST /api/car/updateOprator */
export async function updateOpratorUsingPOST(
  body: API.gengxincaozuoyuanduixiang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/car/updateOprator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 版本升级 POST /api/car/upgrade */
export async function upgradeUsingPOST(
  body: API.banbenshengjiduixiang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/car/upgrade', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
