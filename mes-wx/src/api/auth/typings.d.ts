declare namespace AUTH {
  type AuthToken = {
    /** 用户身份令牌 */
    accessToken: string;
    /** 过期时间 */
    expiresIn: number;
    /** jwt令牌 */
    jwt: string;
    /** 刷新令牌 */
    refreshToken: string;
    /** 令牌类型 */
    tokenType: string;
  };

  type LoginInParam = {
    /** 客户端id */
    clientId?: string;
    /** 微信登录时获取的code */
    code?: string;
    /** 授权模式(authorization_code 授权码模式,password 密码模式,sms_code 短信验证码模式, wechat 微信授权模式) */
    grantType?: string;
    /** 密码 */
    password?: string;
    /** 微信手机号获取凭证 */
    phoneCode?: string;
    /** 验证码 */
    smsCode?: string;
    /** 微信小程序唯一标签(自定义后不可改变)，区分用户在不同小程序的openid */
    tag?: string;
    /** 租户id */
    tenantId?: number;
    /** 账号 */
    username?: string;
  };

  type ResourceDeleteResourceParams = {
    /** 菜单id */
    resourceId: number;
  };

  type ResourceDTO = {
    /** 项目金额 */
    contractAmount: string;
    /** 电子围栏 */
    electronicFence: string;
    /** 电子围栏 */
    electronicFenceList: number[][];
    /** 人员组id(腾讯云使用) */
    groupId: string;
    /** 项目中心点纬度 */
    latitude: string;
    /** 项目中心点经度 */
    longitude: string;
    /** 人员组id */
    personGroupId: number;
    /** 当type为project是项目编码，为bloc是租户编码 */
    projectCode: string;
    /** 当type为project是项目id，为bloc是租户id */
    projectId: number;
    /** 当type为project是项目名称，为bloc是租户名称 */
    projectName: string;
    /** 项目人数 */
    projectPersonTotal: number;
    /** 项目类型(standard:标准版，jaya:洁亚版) */
    projectType: string;
    /** 资源数据 */
    resources: RouterDTO[];
    /** 角色编码 */
    roleCode: string[];
    /** 角色名称 */
    roleName: string;
    /** project:项目端,bloc:集团端 */
    type: string;
    /** 工作台资源数据 */
    workbenchs: WorkbenchDTO[];
  };

  type ResourceGetRoutersParams = {
    /** 项目id */
    projectId?: number;
  };

  type ResourceInfo = {
    /** 应用id */
    clientId?: string;
    /** 路由地址 */
    component?: string;
    /** 菜单图标 */
    icon?: string;
    /** 菜单类型（0目录, 1菜单, 2按钮） */
    menuType?: number;
    /** 排序 */
    orderNum?: number;
    /** 父级id */
    parentId?: number;
    /** 路由名称 */
    path?: string;
    /** 菜单id */
    resourceId?: number;
    /** 菜单名称 */
    resourceName?: string;
  };

  type ResourceInParam = {
    /** 应用id */
    clientId?: string;
    /** 路由地址 */
    component?: string;
    /** 菜单图标 */
    icon?: string;
    /** 菜单类型（0目录, 1菜单, 2按钮） */
    menuType?: number;
    /** 排序 */
    orderNum?: number;
    /** 父级id，当menuType为0时，传-1 */
    parentId?: number;
    /** 路由名称 */
    path?: string;
    /** 权限标识，当menuType为2时传 */
    perms?: string;
    /** 菜单id，编辑时传 */
    resourceId?: number;
    /** 菜单名称 */
    resourceName?: string;
  };

  type ResourceQueryResourceInfoParams = {
    /** 菜单id */
    resourceId: number;
  };

  type ResourceQueryResourceTreeParams = {
    /** 应用id */
    clientId?: string;
  };

  type ResourceTree = {
    /** 应用id */
    clientId: string;
    /** 菜单类型（0目录, 1菜单, 2按钮） */
    menuType: number;
    /** 排序 */
    orderNum: number;
    /** 菜单名称 */
    resourceName: string;
  };

  type ResultVo_AuthToken_ = {
    /** 状态码 */
    code: number;
    data: AuthToken;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_boolean_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: boolean;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_ResourceDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: ResourceDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_ResourceTree_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: ResourceTree[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_RouterDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: RouterDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_ResourceInfo_ = {
    /** 状态码 */
    code: number;
    data: ResourceInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_string_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: string;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_UserInfoDTO_ = {
    /** 状态码 */
    code: number;
    data: UserInfoDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type RouterDTO = {
    /** 子路由 */
    children: RouterDTO[];
    /** 设置该路由的图标 */
    icon: string;
    /** 路由id */
    id: number;
    /** 路由层级 */
    level: number;
    /** 路由名字 */
    name: string;
    /** 路由地址 */
    path: string;
    /** 设置该路由在侧边栏和面包屑中展示的名字 */
    title: string;
  };

  type TokenInParam = {
    /** token */
    token?: string;
    /** token类型(web: web端, wxapp: 微信小程序端) */
    tokenType?: string;
  };

  type UserGetUserInfoParams = {
    /** 项目id */
    projectId?: number;
  };

  type UserInfoDTO = {
    /** 头像 */
    headUrl: string;
    /** 租户logo */
    logo: string;
    /** 手机号 */
    mobile: string;
    /** 系统角色标识组 */
    roleIds: string[];
    /** 系统角色标识组 */
    roleNames: string;
    /** 用户id */
    sysUserId: number;
    /** 租户名称 */
    tenantName: string;
    /** 姓名 */
    userName: string;
  };

  type WeChatLoginParam = {
    /** 微信登录时获取的code */
    code?: string;
    /** 微信手机号获取凭证 */
    phoneCode?: string;
    /** 微信小程序唯一标签(自定义后不可改变)，区分用户在不同小程序的openid */
    tag?: string;
  };

  type WorkbenchDTO = {
    /** 图标 */
    icon: string;
    /** 入口是否开发(true:是，false:否) */
    isOpen: boolean;
    /** 入口名称 */
    name: string;
    /** 入口地址 */
    path: string;
    /** 提示语 */
    prompt: string;
  };
}
