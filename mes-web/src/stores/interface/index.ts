export interface UserInfo {
	/** 姓名 */
	userName?: string
	/** 头像 */
	headUrl?: string
	/** 所属角色 */ 
	roleIds?: string[]
	/** 用户token */
	token?: string
	/** 手机号 */
	mobile?: string,
	/** 角色名称 */
	roleNames?: string,
	/** logo */
	logo?: string,
	tenantName?: string
}

export interface ProjectInfo {
	/** 项目id */
	projectId?: number
	/** 项目名称 */
	projectName?: string
	/** 项目编码 */
	projectCode?: string
	/** 菜单 */
	resources?: AUTH.RouterDTO[]
	/** 工作台 */
	workbenchs?: any[]
	/** 电子围栏 */
	electronicFenceList?: number[][]
	/** 纬度 */
	latitude?: string
	/** 经度 */
	longitude?: string
	personGroupId?: number
	groupId?: string
	roleCode?: string[]
	roleName?: string
}

export interface Cascader {
	car: MES.CascadeTypeTree[]
}

export interface Dict {
	userType: {label:string,value:any}[],
	userSex: {label:string,value:any}[],
	facilityType: {label:string,value:any}[],
	workingState: {label:string,value:any}[],
	carType: {label:string,value:any}[],
	ruleType: {label:string,value:any}[],
	ruleGroupType: {label:string,value:any}[],
	pointType: {label:string,value:any}[],
	jobType: {label:string,value:any}[],
	sceneType: {label:string,value:any}[],
	clientAdhibition:{label:string,value:any}[],
	projectType:{label:string,value:any}[],
	inspectionType:{label:string,value:any}[],
	enableStatus:{label:string,value:any}[],
	roleType:{label:string,value:any}[],
}
