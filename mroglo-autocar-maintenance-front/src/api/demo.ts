// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/http';

/** 测试 GET /api/demo/test */
export async function testUsingGET(options?: { [key: string]: any }) {
  return request<API.ResultVostring>('/api/demo/test', {
    method: 'GET',
    ...(options || {}),
  });
}
