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

/** web端-导出请假记录 GET /wechat/captain/exportLeaveRecord */
export async function mesWechatCaptainExportLeaveRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainExportLeaveRecordParams,
  options?: { [key: string]: any },
) {
  return request<any>(`/mes/wechat/captain/exportLeaveRecord`, {
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

/** 查询问题项列表 GET /wechat/captain/getInspectionProblemList */
export async function mesWechatCaptainGetInspectionProblemList(options?: { [key: string]: any }) {
  return request<MES.ResultVo_List_WechatInspectionProblemDTO_>(
    `/mes/wechat/captain/getInspectionProblemList`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...(options || {}),
    },
  );
}

/** 查询车辆列表 GET /wechat/captain/selectCarList */
export async function mesWechatCaptainSelectCarList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectCarListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatCarDTO_>(`/mes/wechat/captain/selectCarList`, {
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

/** 加班-查询网格列表 GET /wechat/captain/selectGridListByPhone */
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

/** 作业督查-查询对象列表 GET /wechat/captain/selectInspectionObjectList */
export async function mesWechatCaptainSelectInspectionObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectInspectionObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatObjectDTO_>(
    `/mes/wechat/captain/selectInspectionObjectList`,
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

/** 作业督查-查询督查点位列表 GET /wechat/captain/selectInspectionPointList */
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

/** 排班详情-查询排班详情 GET /wechat/captain/selectJobTaskInfo */
export async function mesWechatCaptainSelectJobTaskInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectJobTaskInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatJobTaskInfo_>(`/mes/wechat/captain/selectJobTaskInfo`, {
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

/** 排班详情-查询地图信息 GET /wechat/captain/selectJobTaskMapInfo */
export async function mesWechatCaptainSelectJobTaskMapInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectJobTaskMapInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatJobTaskMapInfo_>(`/mes/wechat/captain/selectJobTaskMapInfo`, {
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

/** web端-查询请假记录分页列表 GET /wechat/captain/selectLeaveRecordPageList */
export async function mesWechatCaptainSelectLeaveRecordPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectLeaveRecordPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_LeaveRecordDTO_>(
    `/mes/wechat/captain/selectLeaveRecordPageList`,
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

/** 加班/排班-查询对象列表 GET /wechat/captain/selectObjectList */
export async function mesWechatCaptainSelectObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatObjectDTO_>(`/mes/wechat/captain/selectObjectList`, {
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

/** 加班/排班-查询督查点列表 GET /wechat/captain/selectPointList */
export async function mesWechatCaptainSelectPointList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSelectPointListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatInspectionPointDTO_>(
    `/mes/wechat/captain/selectPointList`,
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

/** 发生sos预警消息 POST /wechat/captain/sendSOS */
export async function mesWechatCaptainSendSOS(
  body: MES.SimpleWechatSOSParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/sendSOS`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 极简模式督察员-上传督查结果信息 POST /wechat/captain/simpleAddInspectionRecord */
export async function mesWechatCaptainSimpleAddInspectionRecord(
  body: MES.SimpleWechatInspectionResultUploadParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/simpleAddInspectionRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 极简模式队长-请假 PUT /wechat/captain/simpleGetLeave */
export async function mesWechatCaptainSimpleGetLeave(
  body: MES.SimpleWechatLeaveParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/simpleGetLeave`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 极简模式队长-获取对象列表 GET /wechat/captain/simpleSelectCaptainObjectList */
export async function mesWechatCaptainSimpleSelectCaptainObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectCaptainObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_SimpleWechatObjectDTO_>(
    `/mes/wechat/captain/simpleSelectCaptainObjectList`,
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

/** 极简模式队长-查询对象分页列表 GET /wechat/captain/simpleSelectCaptainObjectPageList */
export async function mesWechatCaptainSimpleSelectCaptainObjectPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectCaptainObjectPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_WechatObjectDTO_>(
    `/mes/wechat/captain/simpleSelectCaptainObjectPageList`,
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

/** 极简模式督察员-查询对象地图信息列表 GET /wechat/captain/simpleSelectInspectionObjectList */
export async function mesWechatCaptainSimpleSelectInspectionObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectInspectionObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_SimpleWechatObjectDTO_>(
    `/mes/wechat/captain/simpleSelectInspectionObjectList`,
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

/** 极简模式督察员-查询对象分页列表 GET /wechat/captain/simpleSelectInspectionObjectPageList */
export async function mesWechatCaptainSimpleSelectInspectionObjectPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectInspectionObjectPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_WechatObjectDTO_>(
    `/mes/wechat/captain/simpleSelectInspectionObjectPageList`,
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

/** 极简模式督察员-查询督查记录详情 GET /wechat/captain/simpleSelectInspectionRecordInfoById */
export async function mesWechatCaptainSimpleSelectInspectionRecordInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectInspectionRecordInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_SimpleWechatInspectionRecordInfo_>(
    `/mes/wechat/captain/simpleSelectInspectionRecordInfoById`,
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

/** 极简模式督察员-查询督查记录列表 GET /wechat/captain/simpleSelectInspectionRecordList */
export async function mesWechatCaptainSimpleSelectInspectionRecordList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectInspectionRecordListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_SimpleWechatInspectionRecordDTO_>(
    `/mes/wechat/captain/simpleSelectInspectionRecordList`,
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

/** 极简模式督察员-查询问题项列表 GET /wechat/captain/simpleSelectProblemList */
export async function mesWechatCaptainSimpleSelectProblemList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectProblemListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_SimpleWechatProblemDTO_>(
    `/mes/wechat/captain/simpleSelectProblemList`,
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

/** 极简模式整改员-查询对象地图信息列表 GET /wechat/captain/simpleSelectRectificationObjectList */
export async function mesWechatCaptainSimpleSelectRectificationObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectRectificationObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_SimpleWechatObjectDTO_>(
    `/mes/wechat/captain/simpleSelectRectificationObjectList`,
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

/** 极简模式整改员-查询对象分页列表 GET /wechat/captain/simpleSelectRectificationObjectPageList */
export async function mesWechatCaptainSimpleSelectRectificationObjectPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectRectificationObjectPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_WechatObjectDTO_>(
    `/mes/wechat/captain/simpleSelectRectificationObjectPageList`,
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

/** 极简模式整改员-查询整改列表 GET /wechat/captain/simpleSelectRectificationProblemList */
export async function mesWechatCaptainSimpleSelectRectificationProblemList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectRectificationProblemListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_SimpleWechatRectificationRecordDTO_>(
    `/mes/wechat/captain/simpleSelectRectificationProblemList`,
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

/** 极简模式整改员-查询整改详情 GET /wechat/captain/simpleSelectRectificationRecordInfo */
export async function mesWechatCaptainSimpleSelectRectificationRecordInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectRectificationRecordInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatRectificationRecordInfo_>(
    `/mes/wechat/captain/simpleSelectRectificationRecordInfo`,
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

/** 极简模式整改员-查询整改列表 GET /wechat/captain/simpleSelectRectificationRecordList */
export async function mesWechatCaptainSimpleSelectRectificationRecordList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectRectificationRecordListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatRectificationRecordDTO_>(
    `/mes/wechat/captain/simpleSelectRectificationRecordList`,
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

/** 极简模式队长-查询作业人员列表 GET /wechat/captain/simpleSelectUserList */
export async function mesWechatCaptainSimpleSelectUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatCaptainSimpleSelectUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatInspectionUserDTO_>(
    `/mes/wechat/captain/simpleSelectUserList`,
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

/** 极简模式整改员-上传整改结果信息 POST /wechat/captain/simpleUploadRectificationResult */
export async function mesWechatCaptainSimpleUploadRectificationResult(
  body: MES.SimpleWechatRectificationResultUploadParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/simpleUploadRectificationResult`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
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

/** 提交换车 PUT /wechat/captain/submitShiftCar */
export async function mesWechatCaptainSubmitShiftCar(
  body: MES.WechatCarShiftSubmitParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/captain/submitShiftCar`, {
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

/** 作业看板-查询基础台账 GET /wechat/index/queryBaseBoard */
export async function mesWechatIndexQueryBaseBoard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexQueryBaseBoardParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatBaseBoardDTO_>(`/mes/wechat/index/queryBaseBoard`, {
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

/** 作业看板-督察员查询作业对象列表 GET /wechat/index/selectInspectionObjectList */
export async function mesWechatIndexSelectInspectionObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectInspectionObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatJobObjectDTO_>(
    `/mes/wechat/index/selectInspectionObjectList`,
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

/** 作业看板-查询督查人员列表 GET /wechat/index/selectInspectionUserList */
export async function mesWechatIndexSelectInspectionUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectInspectionUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatUserInspectionDTO_>(
    `/mes/wechat/index/selectInspectionUserList`,
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

/** 作业看板-查询督查人员统计 GET /wechat/index/selectInspectionUserStatistic */
export async function mesWechatIndexSelectInspectionUserStatistic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectInspectionUserStatisticParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatInspectionUserStatisticDTO_>(
    `/mes/wechat/index/selectInspectionUserStatistic`,
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

/** 作业看板-查询作业对象详情 GET /wechat/index/selectJobObjectInfo */
export async function mesWechatIndexSelectJobObjectInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectJobObjectInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatJobObjectInfo_>(`/mes/wechat/index/selectJobObjectInfo`, {
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

/** 作业看板-查询作业对象列表 GET /wechat/index/selectJobObjectList */
export async function mesWechatIndexSelectJobObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectJobObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatJobObjectDTO_>(`/mes/wechat/index/selectJobObjectList`, {
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

/** 作业看板-查询作业对象统计 GET /wechat/index/selectJobObjectStatistic */
export async function mesWechatIndexSelectJobObjectStatistic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectJobObjectStatisticParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatJobObjectStatisticDTO_>(
    `/mes/wechat/index/selectJobObjectStatistic`,
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

/** 作业看板-查询作业人员列表 GET /wechat/index/selectJobUserList */
export async function mesWechatIndexSelectJobUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectJobUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatUserShiftDTO_>(`/mes/wechat/index/selectJobUserList`, {
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

/** 作业看板-查询作业人员统计 GET /wechat/index/selectJobUserStatistic */
export async function mesWechatIndexSelectJobUserStatistic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectJobUserStatisticParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatJobUserStatisticDTO_>(
    `/mes/wechat/index/selectJobUserStatistic`,
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

/** 作业看板-查询督查人员详情 GET /wechat/index/selectUserInspectionInfo */
export async function mesWechatIndexSelectUserInspectionInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectUserInspectionInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatUserInspectionInfo_>(
    `/mes/wechat/index/selectUserInspectionInfo`,
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

/** 作业看板-查询作业人员详情 GET /wechat/index/selectUserShiftInfo */
export async function mesWechatIndexSelectUserShiftInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatIndexSelectUserShiftInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatUserShiftInfo_>(`/mes/wechat/index/selectUserShiftInfo`, {
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

/** 查询班次列表 GET /wechat/jobStatus/selectClockingListByUserId */
export async function mesWechatJobStatusSelectClockingListByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatJobStatusSelectClockingListByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatClockingRecordDTO_>(
    `/mes/wechat/jobStatus/selectClockingListByUserId`,
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

/** 查询任务详情列表 GET /wechat/jobStatus/selectJobTaskInfo */
export async function mesWechatJobStatusSelectJobTaskInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatJobStatusSelectJobTaskInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatUserCarMapInfo_>(
    `/mes/wechat/jobStatus/selectJobTaskInfo`,
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

/** 查询班次列表 GET /wechat/jobStatus/selectShiftListByUserId */
export async function mesWechatJobStatusSelectShiftListByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatJobStatusSelectShiftListByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatJobTaskShiftDTO_>(
    `/mes/wechat/jobStatus/selectShiftListByUserId`,
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

/** 查询轨迹 GET /wechat/jobStatus/selectTrackByTaskId */
export async function mesWechatJobStatusSelectTrackByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatJobStatusSelectTrackByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_List_double_>(`/mes/wechat/jobStatus/selectTrackByTaskId`, {
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

/** 查询地图信息列表 GET /wechat/jobStatus/selectUserMapList */
export async function mesWechatJobStatusSelectUserMapList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatJobStatusSelectUserMapListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatUserCarMapDTO_>(
    `/mes/wechat/jobStatus/selectUserMapList`,
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

/** 删除点位 GET /wechat/projectManager/deletePoint */
export async function mesWechatProjectManagerDeletePoint(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerDeletePointParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/projectManager/deletePoint`, {
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

/** 极简模式项目经理-查询网格列表 GET /wechat/projectManager/selectGridListByProject */
export async function mesWechatProjectManagerSelectGridListByProject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectGridListByProjectParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatGridUserDTO_>(
    `/mes/wechat/projectManager/selectGridListByProject`,
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

/** 极简模式整改员-查询对象详情 GET /wechat/projectManager/selectObjectPlanInfo */
export async function mesWechatProjectManagerSelectObjectPlanInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectObjectPlanInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatObjectPlanInfo_>(
    `/mes/wechat/projectManager/selectObjectPlanInfo`,
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

/** 查询班次列表 GET /wechat/projectManager/selectShiftList */
export async function mesWechatProjectManagerSelectShiftList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectShiftListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatDefaultShiftDTO_>(
    `/mes/wechat/projectManager/selectShiftList`,
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

/** 获取督查点列表 GET /wechat/projectManager/selectUserListByProject */
export async function mesWechatProjectManagerSelectUserListByProject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSelectUserListByProjectParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatUserDTO_>(
    `/mes/wechat/projectManager/selectUserListByProject`,
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

/** 发布消息公告 POST /wechat/projectManager/sendMsgNotice */
export async function mesWechatProjectManagerSendMsgNotice(
  body: MES.MsgNoticeInParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/projectManager/sendMsgNotice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 极简模式-添加对象 POST /wechat/projectManager/simpleAddObject */
export async function mesWechatProjectManagerSimpleAddObject(
  body: MES.WechatInspectionPointSaveParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/projectManager/simpleAddObject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}

/** 极简模式队长-查询作业人员列表 GET /wechat/projectManager/simpleSelectAllUserList */
export async function mesWechatProjectManagerSimpleSelectAllUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSimpleSelectAllUserListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatInspectionUserDTO_>(
    `/mes/wechat/projectManager/simpleSelectAllUserList`,
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

/** 极简模式-获取对象列表 GET /wechat/projectManager/simpleSelectObjectList */
export async function mesWechatProjectManagerSimpleSelectObjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSimpleSelectObjectListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_SimpleWechatObjectDTO_>(
    `/mes/wechat/projectManager/simpleSelectObjectList`,
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

/** 极简模式项目经理-查询对象分页列表 GET /wechat/projectManager/simpleSelectObjectPageList */
export async function mesWechatProjectManagerSimpleSelectObjectPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatProjectManagerSimpleSelectObjectPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_WechatObjectDTO_>(
    `/mes/wechat/projectManager/simpleSelectObjectPageList`,
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

/** 极简模式-修改对象 POST /wechat/projectManager/simpleUpdateObject */
export async function mesWechatProjectManagerSimpleUpdateObject(
  body: MES.WechatInspectionPointSaveParam,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/projectManager/simpleUpdateObject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
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

/** 查询人员人脸采集列表 GET /wechat/tencentPersonFace/queryPersonFaceInfo */
export async function mesWechatTencentPersonFaceQueryPersonFaceInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatTencentPersonFaceQueryPersonFaceInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatUserFaceInfo_>(
    `/mes/wechat/tencentPersonFace/queryPersonFaceInfo`,
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

/** 查询人员人脸采集列表 GET /wechat/tencentPersonFace/queryPersonFaceList */
export async function mesWechatTencentPersonFaceQueryPersonFaceList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatTencentPersonFaceQueryPersonFaceListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_WechatUserFaceDTO_>(
    `/mes/wechat/tencentPersonFace/queryPersonFaceList`,
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

/** 查询部门列表 GET /wechat/tencentPersonFace/selectDepartmentByPhone */
export async function mesWechatTencentPersonFaceSelectDepartmentByPhone(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatTencentPersonFaceSelectDepartmentByPhoneParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatDepartmentDTO_>(
    `/mes/wechat/tencentPersonFace/selectDepartmentByPhone`,
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

/** 查询人员人脸采集列表 GET /wechat/tencentPersonFace/selectPersonFaceInfo */
export async function mesWechatTencentPersonFaceSelectPersonFaceInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatTencentPersonFaceSelectPersonFaceInfoParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_string_>(`/mes/wechat/tencentPersonFace/selectPersonFaceInfo`, {
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

/** 查询人员人脸采集列表 GET /wechat/tencentPersonFace/selectPersonFaceList */
export async function mesWechatTencentPersonFaceSelectPersonFaceList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatTencentPersonFaceSelectPersonFaceListParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_WechatUserFaceDTO_>(
    `/mes/wechat/tencentPersonFace/selectPersonFaceList`,
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

/** 查询消息中心概览 GET /wechat/user/queryAllotRecordOverview */
export async function mesWechatUserQueryAllotRecordOverview(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatUserQueryAllotRecordOverviewParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_WechatAllotRecordOverviewDTO_>(
    `/mes/wechat/user/queryAllotRecordOverview`,
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

/** 查询消息中心分页列表 GET /wechat/user/queryAllotRecordPageList */
export async function mesWechatUserQueryAllotRecordPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatUserQueryAllotRecordPageListParams,
  options?: { [key: string]: any },
) {
  return request<MES.PageResult_List_WechatAllotRecordDTO_>(
    `/mes/wechat/user/queryAllotRecordPageList`,
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

/** 查询消息中心分页列表 GET /wechat/user/readMessage */
export async function mesWechatUserReadMessage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatUserReadMessageParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_string_>(`/mes/wechat/user/readMessage`, {
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
export async function mesWechatUserSelectUserRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MES.WechatUserSelectUserRolesParams,
  options?: { [key: string]: any },
) {
  return request<MES.ResultVo_List_string_>(`/mes/wechat/user/selectUserRoles`, {
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
