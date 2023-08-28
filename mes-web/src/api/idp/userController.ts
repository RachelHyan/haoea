// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加用户 POST /user/add */
export async function idpUserAdd(body: IDP.UserAddParam, options?: { [key: string]: any }) {
  return request<IDP.ResultVo_string_>(`/idp/user/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 维护用户及用户角色身份绑定关系 POST /user/addOrUpdateUser */
export async function idpUserAddOrUpdateUser(
  body: IDP.SysUserInParam,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/user/addOrUpdateUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 用户微信授权绑定 POST /user/bindUserUnionId */
export async function idpUserBindUserUnionId(
  body: IDP.UserInFeignParam,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/user/bindUserUnionId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 验证原密码 POST /user/checkOldPassword */
export async function idpUserCheckOldPassword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.UserCheckOldPasswordParams,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/user/checkOldPassword`, {
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

/** 删除用户 PUT /user/delete */
export async function idpUserDelete(body: IDP.UserDeleteParam, options?: { [key: string]: any }) {
  return request<IDP.ResultVo_string_>(`/idp/user/delete`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除用户及用户角色身份绑定关系 POST /user/deleteUser */
export async function idpUserDeleteUser(
  body: IDP.SysUserInParam,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/user/deleteUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 导出excel POST /user/exportUserExcel */
export async function idpUserExportUserExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.UserExportUserExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/idp/user/exportUserExcel`, {
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

/** 导入用户 POST /user/importUserExcel */
export async function idpUserImportUserExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.UserImportUserExcelParams,
  body: string,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<IDP.ResultVo_string_>(`/idp/user/importUserExcel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    data: formData,
    ...(options || {}),
  });
}

/** 查询用户详情 GET /user/info */
export async function idpUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.UserInfoParams,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_NewUserInfo_>(`/idp/user/info`, {
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

/** 查询用户分页列表 GET /user/pageList */
export async function idpUserPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.UserPageListParams,
  options?: { [key: string]: any },
) {
  return request<IDP.PageResult_List_UserDTO_>(`/idp/user/pageList`, {
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

/** 根据手机号查询信息 GET /user/queryUserDetailsByMobile */
export async function idpUserQueryUserDetailsByMobile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: IDP.UserQueryUserDetailsByMobileParams,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_SysUserInfo_>(`/idp/user/queryUserDetailsByMobile`, {
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

/** 获取当前登录用户信息 GET /user/queryUserInfo */
export async function idpUserQueryUserInfo(options?: { [key: string]: any }) {
  return request<IDP.ResultVo_UserInfo_>(`/idp/user/queryUserInfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 解绑微信 PUT /user/unbindUnionId */
export async function idpUserUnbindUnionId(options?: { [key: string]: any }) {
  return request<IDP.ResultVo_string_>(`/idp/user/unbindUnionId`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 更新用户 PUT /user/update */
export async function idpUserUpdate(body: IDP.UserUpdateParam, options?: { [key: string]: any }) {
  return request<IDP.ResultVo_string_>(`/idp/user/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 忘记密码修改密码接口 PUT /user/updatePasswordByPhone */
export async function idpUserUpdatePasswordByPhone(
  body: IDP.UserPasswordUpdateParam,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/user/updatePasswordByPhone`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 修改用户密码和头像 PUT /user/updateUserPasswordAndHead */
export async function idpUserUpdateUserPasswordAndHead(
  body: IDP.UserPasswordAndHeadUpdateParam,
  options?: { [key: string]: any },
) {
  return request<IDP.ResultVo_string_>(`/idp/user/updateUserPasswordAndHead`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
