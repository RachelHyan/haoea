// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 登录 POST /login */
export async function idpLogin(body: IDP.LoginInParam, options?: { [key: string]: any }) {
  return request<IDP.ResultVo_AuthToken_>(`/idp/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
