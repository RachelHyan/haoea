import { mesDictQueryPublicDictData } from "@/api/mes/dictController";
import { underscoreToCamelCase } from "@/utils/lang";
import { defineStore } from "pinia";
import { DICT_ENUM } from "./constants";
import { Dict } from "./interface";

export const useDict = defineStore("dict",{
  state: ():Dict => ({
    userType: [],
    userSex: [],
    facilityType: [],
    workingState: [],
    carType: [],
    ruleType: [],
    ruleGroupType: [],
    pointType: [],
    jobType: [],
    sceneType: [],
    clientAdhibition:[],
    projectType:[],
    inspectionType:[],
    enableStatus:[],
    roleType:[],
  }),
  actions: {
    async fetch(){
      try {
        const { data, } = await mesDictQueryPublicDictData({dictType: DICT_ENUM.join(","),})
        Object.keys(data).forEach((key) => {
          // @ts-ignore
          this.$state[underscoreToCamelCase(key)] = Object.keys(data[key]).map((value) => {
            return {
              value: !isNaN(Number(value))?parseInt(value):value,
              label: data[key][value],
            }
          })
        })
      } catch (error) {
        console.error(error)
      }
    },
    get: (state: Dict,name: string | string[]) => {
      if (Array.isArray(name)) {
        return name.map((item) => {
          // @ts-ignore
          return state[item]
        })
      } else {
        // @ts-ignore
        return $state[name]
      }
    },
  },
  persist: {
    key: "dict",
  },
})
