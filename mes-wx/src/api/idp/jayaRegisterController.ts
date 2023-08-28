// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 注册 POST /jayaRegister */
export async function idpJayaRegister(
  body: IDP.UserRegisterParam,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/jayaRegister`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
