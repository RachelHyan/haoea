// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加规则组 POST /rule/addRuleGroup */
export async function mesRuleAddRuleGroup(
  body: MES.RuleGroupInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/rule/addRuleGroup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除规则组 DELETE /rule/deleteRuleGroup */
export async function mesRuleDeleteRuleGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.RuleDeleteRuleGroupParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/rule/deleteRuleGroup`, {
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

/** 查询考勤、质量规则组列表 GET /rule/queryRuleGroupListByType */
export async function mesRuleQueryRuleGroupListByType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.RuleQueryRuleGroupListByTypeParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_ShiftRuleGroupDTO_>(`/mes/rule/queryRuleGroupListByType`, {
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

/** 查询规则组详情 GET /rule/ruleGroupInfo */
export async function mesRuleRuleGroupInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.RuleRuleGroupInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_RuleGroupInfo_>(`/mes/rule/ruleGroupInfo`, {
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

/** 查询规则组分页列表 GET /rule/ruleGroupPageList */
export async function mesRuleRuleGroupPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.RuleRuleGroupPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_RuleGroupDTO_>(`/mes/rule/ruleGroupPageList`, {
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

/** 修改默认状态 POST /rule/updateDefaultStatus */
export async function mesRuleUpdateDefaultStatus(
  body: MES.UpdateRuleGroupInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/rule/updateDefaultStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 更新规则组 POST /rule/updateRuleGroup */
export async function mesRuleUpdateRuleGroup(
  body: MES.RuleGroupInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/rule/updateRuleGroup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
