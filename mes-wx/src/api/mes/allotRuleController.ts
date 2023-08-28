// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 查询预警配置分页列表 GET /allotRule/selectAllotRulePageList */
export async function mesAllotRuleSelectAllotRulePageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.AllotRuleSelectAllotRulePageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_AllotRuleDTO_>(`/mes/allotRule/selectAllotRulePageList`, {
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

/** 修改预警配置 PUT /allotRule/updateAllotRule */
export async function mesAllotRuleUpdateAllotRule(
  body: MES.AllotRuleInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/allotRule/updateAllotRule`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
