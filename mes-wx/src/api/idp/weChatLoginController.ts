// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 微信小程序授权登录 POST /weChatLogin */
export async function idpWeChatLogin(body: IDP.WeChatLoginParam, options?: { [key: string]: any }) {
  return request<IDP.ResultVo_string_>(`/idp/weChatLogin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
