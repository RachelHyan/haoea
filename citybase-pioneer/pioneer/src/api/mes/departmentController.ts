// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加 POST /department/addOrg */
export async function mesDepartmentAddOrg(body: MES.OrgInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/department/addOrg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /department/delOrg */
export async function mesDepartmentDelOrg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DepartmentDelOrgParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/department/delOrg`, {
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

/** 删除人员组织关系 PUT /department/delUserOrgRelation */
export async function mesDepartmentDelUserOrgRelation(
  body: MES.DelUserOrgRelationInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/department/delUserOrgRelation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询组织详情 POST /department/queryOrgInfo */
export async function mesDepartmentQueryOrgInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DepartmentQueryOrgInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_OrgDTO_>(`/mes/department/queryOrgInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询组织树 POST /department/queryOrgTreeList */
export async function mesDepartmentQueryOrgTreeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DepartmentQueryOrgTreeListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_OrgTree_>(`/mes/department/queryOrgTreeList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑 PUT /department/updateOrg */
export async function mesDepartmentUpdateOrg(
  body: MES.OrgInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/department/updateOrg`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
