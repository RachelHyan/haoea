/** requestFn.abort()  中止请求 */
let requestFn: any;
const API_BASE_URL = import.meta.env.VITE_APP_PROXY_URL;

/** 拦截器 */
uni.addInterceptor("request", {
  /** 请求拦截 */
  invoke(args) {
    const token = uni.getStorageSync("token");
    (!args.url.includes("http")) && (args.url = API_BASE_URL + args.url);
    args.header = { "Authorization": token, };
  },
  /** 响应拦截 */
  success(args) {
    if (args.statusCode === 503) {
      uni.showToast({ title: "系统繁忙，请稍后再试", icon: "none", })
    } else if (args.data.code === 401) {
      uni.redirectTo({ url: "/pages/login/index", })
    } else if (args.data.code === 50005) {
      uni.showToast({ title: args.data.msg, icon: "none", })
    }
  },
})

const request = <T>(url: string, options?: { [key: string]: any }) => {
  const { data, params, method, } = options || {};
  let paramsData: any;
  if (params || data) {
    paramsData = {
      data: {
        ...params,
        ...data,
      },
    };
    for (const key in paramsData.data) {
      if (paramsData.data[key] === null || paramsData.data[key] === undefined) {
        delete paramsData.data[key];
      }
    }
  }

  return new Promise<T>((resolve, reject) => {
    requestFn = uni.request({
      url,
      method: method,
      ...paramsData,
      timeout: 10000,
      success({ data, }: any) {
        if (data.code === 500 && url !== "/mes/wechat/grid/mapGridInfo") {
          uni.showToast({ title: "系统繁忙，请稍后再试", icon: "none", })
        }
        resolve(data)
      },
      fail(error: any) {
        uni.hideLoading()
        uni.hideToast()
        if (error.errMsg == "request:fail timeout" || error.errMsg === "request:fail fail:time out") {
          uni.showToast({ title: "请求超时，请重试！", icon: "none", });
        } else if (error.errMsg == "request:fail") {
          uni.showToast({ title: "无网络！", icon: "none", });
        } else {
          uni.showToast({ title: "服务器繁忙", icon: "none", });
        }
        reject(error);
      },
    });
  });
};

export { request, requestFn };

