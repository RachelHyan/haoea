// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加部门 POST /sysDept/addSysDept */
export async function mesSysDeptAddSysDept(body: MES.Pinyin__, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/sysDept/addSysDept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除部门 DELETE /sysDept/deleteSysDept */
export async function mesSysDeptDeleteSysDept(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.SysDeptDeleteSysDeptParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/sysDept/deleteSysDept`, {
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

/** 查询部门列表 GET /sysDept/selectDeptList */
export async function mesSysDeptSelectDeptList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.SysDeptSelectDeptListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_SysDeptDTO_>(`/mes/sysDept/selectDeptList`, {
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

/** 查询部门树 GET /sysDept/selectDeptTree */
export async function mesSysDeptSelectDeptTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.SysDeptSelectDeptTreeParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_SysDeptDTO_>(`/mes/sysDept/selectDeptTree`, {
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

/** 编辑部门 PUT /sysDept/updateSysDept */
export async function mesSysDeptUpdateSysDept(
  body: MES.Pinyin__,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/sysDept/updateSysDept`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
