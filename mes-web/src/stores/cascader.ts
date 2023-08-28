import { mesBizCascadeTypeQueryPubilcCascadeTypeTree } from "@/api/mes/bizCascadeTypeController";
import { defineStore } from "pinia";
import { Cascader } from "./interface";

export const useCascader = defineStore("cascader",{
  state: ():Cascader => ({
    car: [],
  }),
  actions: {
    async fetch(){
      try {
        const { data, } = await mesBizCascadeTypeQueryPubilcCascadeTypeTree({type: "car",})

        this.$state.car = data
				
      } catch (error) {
        console.error(error)
      }
    },
  },
  persist: {
    key: "cascader",
  },
})
