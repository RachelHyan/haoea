// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 查询级联类型树(公共方法) GET /bizCascadeType/queryPubilcCascadeTypeTree */
export async function mesBizCascadeTypeQueryPubilcCascadeTypeTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.BizCascadeTypeQueryPubilcCascadeTypeTreeParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_CascadeTypeTree_>(
    `/mes/bizCascadeType/queryPubilcCascadeTypeTree`,
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
