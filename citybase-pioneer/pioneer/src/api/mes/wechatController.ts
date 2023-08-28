// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 添加任务 POST /wechat/captain/addJobTask */
export async function mesWechatCaptainAddJobTask(
  body: MES.WechatJobTaskAddParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/addJobTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 添加人员 POST /wechat/captain/addShiftUser */
export async function mesWechatCaptainAddShiftUser(
  body: MES.WechatShiftUserAddParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/addShiftUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 取消排班 GET /wechat/captain/cancelTask */
export async function mesWechatCaptainCancelTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainCancelTaskParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/cancelTask`, {
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

/** 查询网格列表 GET /wechat/captain/selectGridList */
export async function mesWechatCaptainSelectGridList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectGridListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatGridUserDTO_>(`/mes/wechat/captain/selectGridList`, {
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

/** 查询网格列表 GET /wechat/captain/selectGridListByPhone */
export async function mesWechatCaptainSelectGridListByPhone(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectGridListByPhoneParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatGridPageDTO_>(
    `/mes/wechat/captain/selectGridListByPhone`,
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

/** 查询督查点位列表 GET /wechat/captain/selectInspectionPointList */
export async function mesWechatCaptainSelectInspectionPointList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectInspectionPointListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatInspectionPointTaskDTO_>(
    `/mes/wechat/captain/selectInspectionPointList`,
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

/** 查询班次列表 GET /wechat/captain/selectInspectionShiftList */
export async function mesWechatCaptainSelectInspectionShiftList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectInspectionShiftListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatShiftPageDTO_>(
    `/mes/wechat/captain/selectInspectionShiftList`,
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

/** 查询督查任务详情 GET /wechat/captain/selectInspectionTaskInfoById */
export async function mesWechatCaptainSelectInspectionTaskInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectInspectionTaskInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatInspectionTaskInfo_>(
    `/mes/wechat/captain/selectInspectionTaskInfoById`,
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

/** 查询督查任务列表 GET /wechat/captain/selectInspectionTaskList */
export async function mesWechatCaptainSelectInspectionTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectInspectionTaskListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatInspectionTaskDTO_>(
    `/mes/wechat/captain/selectInspectionTaskList`,
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

/** 查询作业督查任务列表 GET /wechat/captain/selectJobInspectionTaskList */
export async function mesWechatCaptainSelectJobInspectionTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectJobInspectionTaskListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatJobInspectionTaskDTO_>(
    `/mes/wechat/captain/selectJobInspectionTaskList`,
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

/** 查询任务列表 GET /wechat/captain/selectJobTaskUserList */
export async function mesWechatCaptainSelectJobTaskUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectJobTaskUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatJobTaskUserDTO_>(
    `/mes/wechat/captain/selectJobTaskUserList`,
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

/** 查询已排班人员和未排班人员 GET /wechat/captain/selectShiftUserList */
export async function mesWechatCaptainSelectShiftUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectShiftUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatShiftUserDTO_>(`/mes/wechat/captain/selectShiftUserList`, {
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

/** 查询人员列表 GET /wechat/captain/selectUserList */
export async function mesWechatCaptainSelectUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatUserDTO_>(`/mes/wechat/captain/selectUserList`, {
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

/** 提交请假 GET /wechat/captain/submitLeave */
export async function mesWechatCaptainSubmitLeave(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSubmitLeaveParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/submitLeave`, {
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

/** 提交换班 PUT /wechat/captain/submitShift */
export async function mesWechatCaptainSubmitShift(
  body: MES.WechatShiftSubmitParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/submitShift`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 上传督查结果信息 POST /wechat/captain/uploadInspectionResult */
export async function mesWechatCaptainUploadInspectionResult(
  body: MES.WechatInspectionResultUploadParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/uploadInspectionResult`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询数据看板 GET /wechat/index/queryDataBoard */
export async function mesWechatIndexQueryDataBoard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexQueryDataBoardParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_DataBoardDTO_>(`/mes/wechat/index/queryDataBoard`, {
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

/** 查询考勤督查列表 GET /wechat/index/selectBoardAttendanceInspectionTaskList */
export async function mesWechatIndexSelectBoardAttendanceInspectionTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectBoardAttendanceInspectionTaskListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatBoardInspectionTaskDTO_>(
    `/mes/wechat/index/selectBoardAttendanceInspectionTaskList`,
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

/** 查询作业督查列表 GET /wechat/index/selectBoardInspectionTaskInfo */
export async function mesWechatIndexSelectBoardInspectionTaskInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectBoardInspectionTaskInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatBoardInspectionTaskInfo_>(
    `/mes/wechat/index/selectBoardInspectionTaskInfo`,
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

/** 查询作业督查列表 GET /wechat/index/selectBoardJobInspectionTaskList */
export async function mesWechatIndexSelectBoardJobInspectionTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectBoardJobInspectionTaskListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatBoardInspectionTaskDTO_>(
    `/mes/wechat/index/selectBoardJobInspectionTaskList`,
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

/** 添加督查点 POST /wechat/projectManager/addInspectionPoint */
export async function mesWechatProjectManagerAddInspectionPoint(
  body: MES.WechatInspectionPointSaveParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/projectManager/addInspectionPoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询考勤督查详情 GET /wechat/projectManager/selectAttendanceInspectionPlanInfo */
export async function mesWechatProjectManagerSelectAttendanceInspectionPlanInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectAttendanceInspectionPlanInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatAttendanceInspectionInfo_>(
    `/mes/wechat/projectManager/selectAttendanceInspectionPlanInfo`,
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

/** 查询网格列表 GET /wechat/projectManager/selectGridList */
export async function mesWechatProjectManagerSelectGridList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectGridListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatGridUserDTO_>(
    `/mes/wechat/projectManager/selectGridList`,
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

/** 获取督查点详情 GET /wechat/projectManager/selectInspectionPointInfo */
export async function mesWechatProjectManagerSelectInspectionPointInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectInspectionPointInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatInspectionPointInfo_>(
    `/mes/wechat/projectManager/selectInspectionPointInfo`,
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

/** 获取督查点列表 GET /wechat/projectManager/selectInspectionPointsByGridId */
export async function mesWechatProjectManagerSelectInspectionPointsByGridId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectInspectionPointsByGridIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatInspectionPointDTO_>(
    `/mes/wechat/projectManager/selectInspectionPointsByGridId`,
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

/** 查询督察员列表 GET /wechat/projectManager/selectInspectionUserList */
export async function mesWechatProjectManagerSelectInspectionUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectInspectionUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatInspectionUserDTO_>(
    `/mes/wechat/projectManager/selectInspectionUserList`,
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

/** 查询作业督查计划详情 GET /wechat/projectManager/selectJobInspectionPlanInfo */
export async function mesWechatProjectManagerSelectJobInspectionPlanInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectJobInspectionPlanInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatAttendanceInspectionInfo_>(
    `/mes/wechat/projectManager/selectJobInspectionPlanInfo`,
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

/** 查询作业督查计划人员列表 GET /wechat/projectManager/selectJobInspectionPlanList */
export async function mesWechatProjectManagerSelectJobInspectionPlanList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectJobInspectionPlanListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatJobPlanInspectionDTO_>(
    `/mes/wechat/projectManager/selectJobInspectionPlanList`,
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

/** 查询计划视图的所选班次作业人员列表 GET /wechat/projectManager/selectJobPlanInspectionList */
export async function mesWechatProjectManagerSelectJobPlanInspectionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectJobPlanInspectionListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatJobPlanInspectionDTO_>(
    `/mes/wechat/projectManager/selectJobPlanInspectionList`,
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

/** 查询班次列表 GET /wechat/projectManager/selectJobPlanShiftList */
export async function mesWechatProjectManagerSelectJobPlanShiftList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectJobPlanShiftListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatShiftPageDTO_>(
    `/mes/wechat/projectManager/selectJobPlanShiftList`,
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

/** 管理督查点-获取督查点列表 GET /wechat/projectManager/selectPointList */
export async function mesWechatProjectManagerSelectPointList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectPointListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatInspectionPointDTO_>(
    `/mes/wechat/projectManager/selectPointList`,
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

/** 修改考勤督查计划 POST /wechat/projectManager/updateAttendanceInspectionPlan */
export async function mesWechatProjectManagerUpdateAttendanceInspectionPlan(
  body: MES.WechatJobPlanUpdateParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(
    `/mes/wechat/projectManager/updateAttendanceInspectionPlan`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      data: body,
      ...(options || {}),
    },
  );
}

/** 修改督查点 POST /wechat/projectManager/updateInspectionPoint */
export async function mesWechatProjectManagerUpdateInspectionPoint(
  body: MES.WechatInspectionPointSaveParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/projectManager/updateInspectionPoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 修改作业督查计划 POST /wechat/projectManager/updateJobInspectionPlan */
export async function mesWechatProjectManagerUpdateJobInspectionPlan(
  body: MES.WechatJobInspectionPlanUpdateParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/projectManager/updateJobInspectionPlan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 查询项目列表 GET /wechat/user/selectUserProjects */
export async function mesWechatUserSelectUserProjects(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatUserSelectUserProjectsParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatProjectDTO_>(`/mes/wechat/user/selectUserProjects`, {
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

/** 查询角色 GET /wechat/user/selectUserRoles */
export async function mesWechatUserSelectUserRoles(options?: { [key: string]: any }) {
  return request<MES.ResultVo_List_string_>(`/mes/wechat/user/selectUserRoles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}
