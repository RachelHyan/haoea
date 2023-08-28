// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 新增人员组 POST /personGroup/addPersonGroup */
export async function mesPersonGroupAddPersonGroup(
  body: MES.PersonGroupInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/personGroup/addPersonGroup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除人员组 DELETE /personGroup/deletePersonGroup */
export async function mesPersonGroupDeletePersonGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PersonGroupDeletePersonGroupParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/personGroup/deletePersonGroup`, {
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

/** 更新人员组 PUT /personGroup/updatePersonGroup */
export async function mesPersonGroupUpdatePersonGroup(
  body: MES.PersonGroupInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/personGroup/updatePersonGroup`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
