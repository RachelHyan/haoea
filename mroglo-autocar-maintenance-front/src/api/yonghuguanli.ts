// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加用户 POST /api/user/addUser */
export async function addUserUsingPOST(body: API.tianjiayonghu, options?: { [key: string]: any }) {
  return request<API.ResultVoint>('/api/user/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分配车辆 POST /api/user/allotUserCar */
export async function allotUserCarUsingPOST(
  body: API.fenpeicheliangduixiang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/user/allotUserCar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /api/user/delUser */
export async function delUserUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delUserUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/user/delUser', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询用户信息 GET /api/user/queryUserInfo */
export async function queryUserInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUserInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoyonghuliebiaoduixiang>('/api/user/queryUserInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询用户列表 GET /api/user/queryUserPageList */
export async function queryUserPageListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUserPageListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageResultListyonghuliebiaoduixiang>('/api/user/queryUserPageList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改密码 PUT /api/user/updatePassword */
export async function updatePasswordUsingPUT(
  body: API.xiugaimimaduixiang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/user/updatePassword', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
