import { mesDictQueryPublicDictData } from "@/api/mes/dictController";
import { request } from "@/utils/http";

/** 删除作业对象 DELETE /jobObject/deleteJobObject */
export async function mesJobObjectDeleteJobObject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.JobObjectDeleteJobObjectParams,
  options?: { [key: string]: any }
) {
  return request<MES.ResultVo_string_>(`/mes/jobObject/deleteJobObject?objectId=${params.objectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: {},
    ...(options || {}),
  });
}

/** token效验有效性 POST /auth/effectWeixinToken */
export async function effectWeixinTokenUsingPOST(
  body: AUTH.TokenInParam,
  options?: { [key: string]: any }
) {
  return request<AUTH.ResultVo_boolean_>("/auth/auth/effectWeixinToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新token GET /auth/tokenRenewal */
export async function authAuthTokenRenewal(options?: { [key: string]: any }) {
  return request<AUTH.ResultVo_string_>("/auth/auth/tokenRenewal", {
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...(options || {}),
  });
}

/** 
 * @description 获取字典数据
 * @param {String} dictType 字典类型
 */
export const fetchDictList = async ({dictType,}:{dictType: string}) => {
  const result: Record<string,{ label: string, value: string | number }[]> = {};
  const { data, } = await mesDictQueryPublicDictData({ dictType, })
  Object.keys(data).forEach((key) => {
    const list: { label: string, value: string | number }[] = [];
    Object.keys(data[key]).forEach((value) => {
      list.push({
        value: !isNaN(Number(value)) ? parseInt(value) : value,
        label: data[key][value],
      })
    })
    result[key] = list
  })
  return {data: result,}
}
