// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 保存轨迹数据 POST /track/addTrack */
export async function mesTrackAddTrack(body: MES.TrackInParam, options?: { [key: string]: any }) {
  return request<MES.ResultVo_string_>(`/mes/track/addTrack`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    data: body,
    ...(options || {}),
  });
}
