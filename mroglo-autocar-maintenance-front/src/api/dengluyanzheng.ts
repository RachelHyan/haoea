// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 获取用户信息 GET /api/getInfo */
export async function getInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultVoyonghuxinxi>('/api/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取路由信息 GET /api/getRouters */
export async function getRoutersUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultVoListluyoupeizhixinxi>('/api/getRouters', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录 POST /api/login */
export async function loginUsingPOST(
  body: API.yonghudengluduixiang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVostring>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置密码 PUT /api/resetPassWord */
export async function resetPassWordUsingPUT(
  body: API.zhongzhimimaduixiang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/resetPassWord', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送验证码 GET /api/sendCode */
export async function sendCodeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendCodeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVostring>('/api/sendCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 效验验证码 GET /api/verifyCode */
export async function verifyCodeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.verifyCodeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoboolean>('/api/verifyCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
