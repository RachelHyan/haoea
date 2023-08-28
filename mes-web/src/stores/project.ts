import { defineStore } from "pinia";
import { ProjectInfo } from "./interface";


export const useProject = defineStore("project",{
  state: ():ProjectInfo => ({
    resources: [],
    workbenchs:[],
    projectId: undefined,
    projectName: undefined,
    projectCode: undefined,
    electronicFenceList: [],
    latitude: undefined,
    longitude: undefined,
    personGroupId: undefined,
    groupId: undefined,
    roleCode:[],
    roleName:"",
  }),
  actions: {
    dataFill(state: ProjectInfo) {
      this.$state = state
    },
  },
  persist: {
    key: "project",
  },
})
