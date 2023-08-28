// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加车辆 POST /car/addCar */
export async function mesCarAddCar(body: MES.CarInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/car/addCar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询车辆详情 GET /car/carInfo */
export async function mesCarCarInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.CarCarInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_CarInfo_>(`/mes/car/carInfo`, {
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

/** 查询车辆分页列表 GET /car/carPageList */
export async function mesCarCarPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.CarCarPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_CarDTO_>(`/mes/car/carPageList`, {
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

/** 删除车辆 POST /car/deleteCar */
export async function mesCarDeleteCar(body: MES.DelCarInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/car/deleteCar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 导出车辆列表excel POST /car/exportCarExcel */
export async function mesCarExportCarExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.CarExportCarExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/car/exportCarExcel`, {
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

/** 导入车辆信息 POST /car/importCarExcel */
export async function mesCarImportCarExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.CarImportCarExcelParams,
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

  return request<MES.ResultVo_string_>(`/mes/car/importCarExcel`, {
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

/** 更新车辆 POST /car/updateCar */
export async function mesCarUpdateCar(body: MES.CarInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/car/updateCar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
