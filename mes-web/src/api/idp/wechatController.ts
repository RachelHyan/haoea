// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 获取小程序登录用户信息 GET /wechat/getUserInfo */
export async function idpWechatGetUserInfo(options?: { [key: string]: any }) {
  return request<IDP.ResultVo_SysUserInfo_>(`/idp/wechat/getUserInfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}
