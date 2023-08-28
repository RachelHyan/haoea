// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 新增人员 POST /person/addPerson */
export async function mesPersonAddPerson(
  body: MES.PersonInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/person/addPerson`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 新增人脸 POST /person/addPersonFace */
export async function mesPersonAddPersonFace(
  body: MES.PersonFaceInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/person/addPersonFace`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除人脸 POST /person/deletePersonFace */
export async function mesPersonDeletePersonFace(
  body: MES.PersonDelFaceInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/person/deletePersonFace`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除人员组下的人员 DELETE /person/deletePersonFromGroup */
export async function mesPersonDeletePersonFromGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.PersonDeletePersonFromGroupParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/person/deletePersonFromGroup`, {
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

/** 人脸识别 POST /person/verifyFace */
export async function mesPersonVerifyFace(
  body: MES.VerifyFaceInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_boolean_>(`/mes/person/verifyFace`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
