/**
 * @desc 订阅消息
 * @param cb cb(res)回调函数,处理其他逻辑;res type:boolean 返回的事订阅开关的状态 true:开启。false: 关闭
 */
export const subscribeMsg = (cb?: (res?: boolean) => any) => {
  const tmplIds = [
    "RaVLGQzgj_QvaIO2els7ck0J1QYdPpr_OB_q1y1osjI",
    "o4oWV5vlAPsAn4aQaeEZ4TrAp95LR8exESaQqi7JlaI",
    "qqjDAMCkYSd0XlYyB-_dvfZErrbhuZg7OeM6bohzSno"
  ]

  uni.requestSubscribeMessage({
    tmplIds,
    complete: (res) => {
      // @ts-ignore
      if (tmplIds.some((item) => res[item] === "reject") || res.errCode === 20004) {
        uni.showModal({
          title: "您关闭了订阅通知",
          content: "需要打开设置进行手动设置吗？",
          success: function (res) {
            if (res.confirm) {
              uni.openSetting()
            } else if (res.cancel) {
              uni.showToast({
                icon: "error",
                title: "您取消了订阅",
                duration: 2000,
              })
            }
          },
        })
        // @ts-ignore
      } else if (!tmplIds.some(item => res[item] === "reject")) {
        // uni.showToast({
        //   icon: "none",
        //   title: "您已经订阅了该消息",
        //   duration: 1500,
        // })
        // @ts-ignore
      } else if (res.errCode === 10002 || res.errCode === 10003) {
        uni.showToast({
          title: "网络问题订阅失败，请重新订阅",
          duration: 1500,
        })
      } else {
        // 其他的逻辑 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html
      }
      // @ts-ignore
      cb && cb(!(tmplIds.some((item) => res[item] === "reject") || res.errCode === 20004))
    },
  })
}
