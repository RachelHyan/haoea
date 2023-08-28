// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 人员添加 POST /user/addUser */
export async function mesUserAddUser(body: MES.UserInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/user/addUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 人员删除 POST /user/deleteUser */
export async function mesUserDeleteUser(
  body: MES.DelUserInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/user/deleteUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 导出人员列表excel POST /user/exportUserExcel */
export async function mesUserExportUserExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.UserExportUserExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/user/exportUserExcel`, {
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

/** 导入人员基本信息 POST /user/importUserBaseInfo */
export async function mesUserImportUserBaseInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.UserImportUserBaseInfoParams,
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

  return request<MES.ResultVo_string_>(`/mes/user/importUserBaseInfo`, {
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

/** 导入人员图片 POST /user/importUserPicture */
export async function mesUserImportUserPicture(body: string, options?: { [key: string]: any }) {
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

  return request<MES.ResultVo_string_>(`/mes/user/importUserPicture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

/** 查询全部人员列表 GET /user/queryAllUserList */
export async function mesUserQueryAllUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.UserQueryAllUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_UserDTO_>(`/mes/user/queryAllUserList`, {
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

/** 查询组织和人员组装列表 GET /user/queryOrgAndUserList */
export async function mesUserQueryOrgAndUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.UserQueryOrgAndUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_OrgAndUserDTO_>(`/mes/user/queryOrgAndUserList`, {
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

/** 根据手机号查询基本信息 GET /user/queryUserBaseInfo */
export async function mesUserQueryUserBaseInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.UserQueryUserBaseInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_UserVo_>(`/mes/user/queryUserBaseInfo`, {
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

/** 查询人员详情 GET /user/queryUserInfo */
export async function mesUserQueryUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.UserQueryUserInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_UserDetails_>(`/mes/user/queryUserInfo`, {
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

/** 人员编辑 PUT /user/updateUser */
export async function mesUserUpdateUser(body: MES.UserInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/user/updateUser`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询人员分页列表 GET /user/userPageList */
export async function mesUserUserPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.UserUserPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_UserDTO_>(`/mes/user/userPageList`, {
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
