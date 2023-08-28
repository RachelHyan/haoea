export interface UserInfo {
	/** 姓名 */
	userName?: string
	/** 头像 */
	headUrl?: string
	/** 所属角色 */ 
	roleIds?: string[]
	/** 用户token */
	token?: string
	/** 项目ID */
	projectId?: number,
	/** 项目名称 */
	projectName?: string,
	/** 菜单列表 */
	siderMenu?: AUTH.RouterDTO[]
}
