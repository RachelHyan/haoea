// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 计划绑定 POST /planBinding/addPlanOrTask */
export async function mesPlanBindingAddPlanOrTask(
  body: MES.PlanInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/planBinding/addPlanOrTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
