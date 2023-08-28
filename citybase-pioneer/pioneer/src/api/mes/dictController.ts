// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 新增字典数据 POST /dict/addDictData */
export async function mesDictAddDictData(
  body: MES.DictDataInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/dict/addDictData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 新增字典类型 POST /dict/addDictType */
export async function mesDictAddDictType(
  body: MES.DictTypeInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/dict/addDictType`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 删除字典数据 DELETE /dict/deleteDictData */
export async function mesDictDeleteDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DictDeleteDictDataParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/dict/deleteDictData`, {
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

/** 查询字典数据分页列表 GET /dict/dictDataPageList */
export async function mesDictDictDataPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DictDictDataPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_DictDataDTO_>(`/mes/dict/dictDataPageList`, {
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

/** 查询字典管理分页列表 GET /dict/dictTypePageList */
export async function mesDictDictTypePageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DictDictTypePageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_DictTypeDTO_>(`/mes/dict/dictTypePageList`, {
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

/** 查询字典数据详情 GET /dict/queryDictDataInfo */
export async function mesDictQueryDictDataInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DictQueryDictDataInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_DictDataInfo_>(`/mes/dict/queryDictDataInfo`, {
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

/** 查询字典类型详情 GET /dict/queryDictTypeInfo */
export async function mesDictQueryDictTypeInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DictQueryDictTypeInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_DictTypeInfo_>(`/mes/dict/queryDictTypeInfo`, {
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

/** 根据字典类型获取字典数据(公共方法) GET /dict/queryPublicDictData */
export async function mesDictQueryPublicDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.DictQueryPublicDictDataParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_Map_string_string_>(`/mes/dict/queryPublicDictData`, {
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

/** 更新字典数据 POST /dict/updateDictData */
export async function mesDictUpdateDictData(
  body: MES.DictDataInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/dict/updateDictData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 更新字典类型 POST /dict/updateDictType */
export async function mesDictUpdateDictType(
  body: MES.DictTypeInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/dict/updateDictType`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
