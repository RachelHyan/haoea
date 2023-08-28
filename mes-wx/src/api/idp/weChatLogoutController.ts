// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 退出登录 POST /weChatLogout */
export async function idpWeChatLogout(options?: { [key: string]: any }) {
  return request<IDP.ResultVo_string_>(`/idp/weChatLogout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}
