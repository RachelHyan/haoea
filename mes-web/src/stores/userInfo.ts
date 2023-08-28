import { defineStore } from "pinia";
import { UserInfo } from "./interface";


export const useUserInfo = defineStore("userInfo",{
  state: ():UserInfo => ({
    userName: "",
    headUrl: undefined,
    roleIds: [],
    token: undefined,
    mobile: undefined,
    roleNames: undefined,
    logo: "",
    tenantName: undefined,
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
