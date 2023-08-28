import { defineStore } from "pinia";
import { UserInfo } from "./interface";


export const useUserInfo = defineStore("userInfo",{
  state: ():UserInfo => ({
    userName: "",
    headUrl: undefined,
    roleIds: [],
    token: undefined,
    siderMenu: [],
  }),
  actions: {
    dataFill(state: UserInfo) {
      this.$state = state
    },
  },
  persist: {
    key: "userInfo",
  },
})
