import { token } from "@/refs"
import router from "@/router"
import { Message, Modal, ModalReturn } from "@arco-design/web-vue"
import type { AxiosResponse } from "axios"
import axios from "axios"

let modal:null | ModalReturn = null

// 请求拦截
axios.interceptors.request.use( (config: any) =>  {
  if (token.value !== "undefined") {
    config.headers["X-Token"] = token.value
  }
  return config
}, (error) => {
  return error
})

const request = <T>(url: string, options?: { [key: string]: any }) => {
  return new Promise<T>((resolve, reject) => {
    const option = {
      url,
      ...options,
    }
    axios(option).then((res: AxiosResponse<T & { success: boolean, data: any, msg?: string, token?: string, code: number }>) => {
      const { success, code, msg, } = res.data
      if (success) {

        resolve(res.data)
      } else {
        if (code === 401 && modal === null) {
          modal = Modal.info({
            title: "提示",
            content: "登录过期，请重新登录",
            onOk: () => {
              router.replace("/login")
            },
          })
        } else if(code !== 401) {
          Message.error(<string>msg)
        }
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export {
  request
}

