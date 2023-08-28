import { request } from "./http";

/** 导入车辆信息 POST /car/importCarExcel */
export async function importCarExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.CarImportCarExcelParams,
  body: File
) {
  const formData = new FormData();
  formData.append("file", body);
  return request<MES.ResultVo_string_>("/mes/car/importCarExcel", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    headers:{
      "Content-Type": "multipart/form-data",
    },
  });
}

/** 导入人员基本信息 POST /user/importUserBaseInfo */
export async function importUserBaseInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.UserImportUserBaseInfoParams,
  body: File
) {
  const formData = new FormData();
  formData.append("file", body);

  return request<MES.ResultVo_string_>("/mes/user/importUserBaseInfo", {
    method: "POST",
    params: {
      ...params,
    },
    data: formData,
    headers:{
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function importUserPicture(
  body: File
) {
  const formData = new FormData();
  formData.append("file", body);

  return request<MES.ResultVo_string_>("/mes/user/importUserPicture", {
    method: "POST",
    data: formData,
    headers:{
      "Content-Type": "multipart/form-data",
    },
  });
}

/** 导入用户 POST /user/importUserExcel */
export async function importUserExcel(body: File) {
	 const formData = new FormData();
	 formData.append("file", body);
 
	 return request<MES.ResultVo_string_>("/idp/user/importUserExcel", {
		 method: "POST",
		 data: formData,
		 headers:{
			 "Content-Type": "multipart/form-data",
		 },
	 });
}

/** 导入Excel批量换绑作业人员 POST /objectAllot/importJayaPlanBindingExcel */
export async function importJayaPlanBindingExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.ObjectAllotImportJayaPlanBindingExcelParams,
  body: File
) {
  const formData = new FormData();
  formData.append("file", body);

  return request<MES.ResultVo_string_>("/mes/objectAllot/importJayaPlanBindingExcel", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      ...params,
    },
    data: formData,
  });
}

/** 车辆台账-导入车辆台账清单 POST /ledger/importLedgerCar */
export async function importLedgerCar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.LedgerImportLedgerCarParams,
  body: File
) {
  const formData = new FormData();
  formData.append("file", body);

  return request<MES.ResultVo_string_>("/mes/ledger/importLedgerCar", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      ...params,
    },
    data: formData,
  });
}
