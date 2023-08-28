// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** token效验有效性 POST /auth/effectWeixinToken */
export async function authAuthEffectWeixinToken(
  body: AUTH.TokenInParam,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResultVo_boolean_>(`/auth/effectWeixinToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 登录 POST /auth/login */
export async function authAuthLogin(body: AUTH.LoginInParam, options?: { [key: string]: any }) {
  return request<AUTH.ResultVo_AuthToken_>(`/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 刷新token GET /auth/tokenRenewal */
export async function authAuthTokenRenewal(options?: { [key: string]: any }) {
  return request<AUTH.ResultVo_string_>(`/auth/tokenRenewal`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 微信小程序授权登录 POST /auth/weChatLogin */
export async function authAuthWeChatLogin(
  body: AUTH.WeChatLoginParam,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResultVo_string_>(`/auth/weChatLogin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
