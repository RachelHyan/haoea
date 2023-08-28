// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 验证完成任务 GET /api/work/finishTask */
export async function finishTaskUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.finishTaskUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoboolean>('/api/work/finishTask', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 下发任务 POST /api/work/issueTask */
export async function issueTaskUsingPOST(
  body: API.xiafarenwuduixiang,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoint>('/api/work/issueTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询车辆历史任务列表 GET /api/work/queryHistoryTaskList */
export async function queryHistoryTaskListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryHistoryTaskListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoListlishirenwuliebiaoduixiang>('/api/work/queryHistoryTaskList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据任务id查询历史轨迹数据 GET /api/work/queryHistoryTrackById */
export async function queryHistoryTrackByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryHistoryTrackByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoListListdouble>('/api/work/queryHistoryTrackById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询车辆实时轨迹数据 GET /api/work/queryRealTimeTrack */
export async function queryRealTimeTrackUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryRealTimeTrackUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoweizhishujuduixiang>('/api/work/queryRealTimeTrack', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询预制任务列表 GET /api/work/queryTaskList */
export async function queryTaskListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryTaskListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoListzuoyerenwuliebiaoduixiang>('/api/work/queryTaskList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询作业任务预设轨迹 GET /api/work/queryTaskTrack */
export async function queryTaskTrackUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryTaskTrackUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoListListdouble>('/api/work/queryTaskTrack', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
