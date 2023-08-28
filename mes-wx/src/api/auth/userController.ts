// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 获取用户当前身份信息 GET /user/getUserInfo */
export async function authUserGetUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.UserGetUserInfoParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResultVo_UserInfoDTO_>(`/auth/user/getUserInfo`, {
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
