// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 强退(洁亚-定制版) DELETE /loginLog/forceLogout */
export async function mesLoginLogForceLogout(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LoginLogForceLogoutParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/loginLog/forceLogout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询登录日志列表(洁亚-定制版) GET /loginLog/selectJayaLoginLogPageList */
export async function mesLoginLogSelectJayaLoginLogPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LoginLogSelectJayaLoginLogPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_LoginLogDTO_>(`/mes/loginLog/selectJayaLoginLogPageList`, {
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

/** 查询在线用户列表(洁亚-定制版) GET /loginLog/selectJayaOnlineLoginLogPageList */
export async function mesLoginLogSelectJayaOnlineLoginLogPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LoginLogSelectJayaOnlineLoginLogPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_LoginLogDTO_>(
    `/mes/loginLog/selectJayaOnlineLoginLogPageList`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
