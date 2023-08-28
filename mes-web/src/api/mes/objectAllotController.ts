// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 导出未排班的对象编排数据Excel POST /objectAllot/exportJayaObjectExcel */
export async function mesObjectAllotExportJayaObjectExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotExportJayaObjectExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/objectAllot/exportJayaObjectExcel`, {
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

/** 导出已排班的对象计划编排数据Excel POST /objectAllot/exportJayaPlanBindingExcel */
export async function mesObjectAllotExportJayaPlanBindingExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotExportJayaPlanBindingExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/objectAllot/exportJayaPlanBindingExcel`, {
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

/** 导入Excel批量换绑作业人员 POST /objectAllot/importJayaPlanBindingExcel */
export async function mesObjectAllotImportJayaPlanBindingExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotImportJayaPlanBindingExcelParams,
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

  return request<MES.ResultVo_string_>(`/mes/objectAllot/importJayaPlanBindingExcel`, {
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

/** 查询作业车辆下拉框列表(洁亚-定制版) GET /objectAllot/queryJayaMapCarSwitchList */
export async function mesObjectAllotQueryJayaMapCarSwitchList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotQueryJayaMapCarSwitchListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_JayaMapCarSwitchDTO_>(
    `/mes/objectAllot/queryJayaMapCarSwitchList`,
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

/** 查询地图对象分配详情(洁亚-定制版) GET /objectAllot/queryJayaMapObjectAllotInfo */
export async function mesObjectAllotQueryJayaMapObjectAllotInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotQueryJayaMapObjectAllotInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_JayaMapObjectInfo_>(`/mes/objectAllot/queryJayaMapObjectAllotInfo`, {
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

/** 查询地图对象分配列表(洁亚-定制版) GET /objectAllot/queryJayaMapObjectAllotList */
export async function mesObjectAllotQueryJayaMapObjectAllotList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotQueryJayaMapObjectAllotListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_JayaMapObjectDTO_>(
    `/mes/objectAllot/queryJayaMapObjectAllotList`,
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

/** 查询排班情况地图右侧对象分页列表(洁亚-定制版) GET /objectAllot/queryJayaMapObjectPlanPageList */
export async function mesObjectAllotQueryJayaMapObjectPlanPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotQueryJayaMapObjectPlanPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_JayaMapObjectPlanDTO_>(
    `/mes/objectAllot/queryJayaMapObjectPlanPageList`,
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

/** 查询作业人员预警信息(洁亚-定制版) GET /objectAllot/queryJayaMapUserEarlyWarningInfo */
export async function mesObjectAllotQueryJayaMapUserEarlyWarningInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotQueryJayaMapUserEarlyWarningInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_JayaMapUserEarlyWarningDTO_>(
    `/mes/objectAllot/queryJayaMapUserEarlyWarningInfo`,
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

/** 查询作业人员下拉框列表(洁亚-定制版) GET /objectAllot/queryJayaMapUserSwitchList */
export async function mesObjectAllotQueryJayaMapUserSwitchList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotQueryJayaMapUserSwitchListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_JayaMapUserSwitchDTO_>(
    `/mes/objectAllot/queryJayaMapUserSwitchList`,
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

/** 查询排班情况页面是否切换编辑态(洁亚-定制版) GET /objectAllot/queryObjectAllotCutFlag */
export async function mesObjectAllotQueryObjectAllotCutFlag(options?: { [key: string]: any }) {
  return request<MES.ResultVo_boolean_>(`/mes/objectAllot/queryObjectAllotCutFlag`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 保存对象分配计划(洁亚-定制版) POST /objectAllot/saveObjectAllot */
export async function mesObjectAllotSaveObjectAllot(
  body: MES.ObjectAllotInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/objectAllot/saveObjectAllot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 同步更新任务(洁亚-定制版) POST /objectAllot/syncTask */
export async function mesObjectAllotSyncTask(
  body: MES.ObjectAllotInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/objectAllot/syncTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 解绑(洁亚-定制版) POST /objectAllot/unbind */
export async function mesObjectAllotUnbind(
  body: MES.ObjectAllotInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/objectAllot/unbind`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 编辑对象分配计划(洁亚-定制版) POST /objectAllot/updateObjectAllot */
export async function mesObjectAllotUpdateObjectAllot(
  body: MES.ObjectAllotInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/objectAllot/updateObjectAllot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
