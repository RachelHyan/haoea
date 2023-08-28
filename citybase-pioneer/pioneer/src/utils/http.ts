import router from '@/router';
import { useUserInfo } from '@/stores/userInfo';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import COS from 'cos-js-sdk-v5';
import { ElMessage, ElMessageBox } from 'element-plus';
const cos = new COS({
  SecretId: 'AKIDwqjT7XlprDRdjeP9j9NXaPzUpAU1Slw4',
  SecretKey: '4yeKvOtOrFZjliV9h8QYSLCzmX5Q9j8M',
});

const clientId = 'zcwy'
const tokenType = 'bearer'

let modal: any = null

const dataProcess = (data: any) => {
  if (data instanceof FormData) {
    return data
  }
  const obj: Record<string, any> = {}
  Object.keys(data).forEach(key => {
    obj[key] = data[key]
  })
  return obj
}

// 请求拦截
axios.interceptors.request.use((config: any) => {
  const userInfo = useUserInfo()
  if (userInfo.$state && userInfo.$state.token) {
    config.headers['Authorization'] = tokenType + ' ' + userInfo.$state.token
  }
  config.params && (config.params = dataProcess(config.params))
  config.data && (config.data = dataProcess(config.data))

  return config
}, (error) => {
  return error
})

// 响应拦截
axios.interceptors.response.use((config: any) => {
	 return config
},(error) => {
  console.error(error);
  if (error.response.status === 401) {
    if(modal === null) {
      modal = ElMessageBox({
        title: '提示',
        message: '登录过期，请重新登录',
        type: 'info',
        callback: () => {
          router.replace('/login')
        },	
      })
    }
  } else {
    ElMessage.error('请求失败')
  }
  return error
})

const request = <T>(url: string, options?: { [key: string]: any }) => {
  return new Promise<T>((resolve, reject) => {
    const option = {
      url,
      ...options,
      baseURL: '/api',
    }
    axios(option).then((res: AxiosResponse<T & { success: boolean, data: any, msg?: string, token?: string,  }>) => {
      const { success, msg, } = res.data
      if (success) {
        resolve(res.data)
      } else {
        ElMessage.error(<string>msg)
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

const upload = (file:File) => {
  return new Promise<{code:number,data:string}>((resolve, reject) => {
    cos.putObject({
      Bucket: 'zcwy-1314423366', /* 填入您自己的存储桶，必须字段 */
      Region: 'ap-guangzhou',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      Key: 'pioneer/'+file.name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
    }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          code: data.statusCode??200,
          data: '/pioneer/'+file.name,
        })
      }
    });
  })
}

export {
  clientId, request,
  upload
};

