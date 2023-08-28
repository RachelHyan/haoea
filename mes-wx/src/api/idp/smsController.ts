// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 发送验证码 GET /sms/sendCode */
export async function idpSmsSendCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.SmsSendCodeParams,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/sms/sendCode`, {
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

/** 效验验证码 GET /sms/verifyCode */
export async function idpSmsVerifyCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.SmsVerifyCodeParams,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_boolean_>(`/idp/sms/verifyCode`, {
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
