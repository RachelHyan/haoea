declare namespace IDP {
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
    /** 租户id */
    tenantId?: number;
    /** 账号 */
    username?: string;
  };

  type NewUserInfo = {
    /** 所属部门集合 */
    deptIds: number[];
    /** 性别 */
    gender: string;
    /** 联系方式 */
    mobile: string;
    /** 所属角色集合 */
    roleVoList: number[];
    /** 用户id */
    sysUserId: number;
    /** 姓名 */
    sysUserName: string;
  };

  type PageResult_List_RoleDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: RoleDTO[];
    /** 返回消息 */
    msg: string;
    /** 每页条数 */
    pageSize: number;
    /** 总页数 */
    pages: number;
    /** 是否成功 */
    success: boolean;
    /** 总记录数 */
    total: number;
  };

  type PageResult_List_UserDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: UserDTO[];
    /** 返回消息 */
    msg: string;
    /** 每页条数 */
    pageSize: number;
    /** 总页数 */
    pages: number;
    /** 是否成功 */
    success: boolean;
    /** 总记录数 */
    total: number;
  };

  type ResourceRoleDTO = {
    /** true:选中,false:未选中 */
    pitch: boolean;
    /** 一级菜单名称 */
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

  type ResultVo_List_ResourceRoleDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: ResourceRoleDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_RoleDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: RoleDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_TenantSwitchDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: TenantSwitchDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_NewUserInfo_ = {
    /** 状态码 */
    code: number;
    data: NewUserInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_RoleDTO_ = {
    /** 状态码 */
    code: number;
    data: RoleDTO;
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

  type ResultVo_SysUserInfo_ = {
    /** 状态码 */
    code: number;
    data: SysUserInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_UserInfo_ = {
    /** 状态码 */
    code: number;
    data: UserInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type RoleDTO = {
    /** 创建时间 */
    createTime: string;
    /** 启用状态 */
    enableStatus: number;
    /** 是否默认(0:系统默认，1:自定义) */
    isDefault: number;
    /** 描述 */
    roleDesc: string;
    /** 角色id */
    roleId: number;
    /** 角色标签 */
    roleLabel: string;
    /** 角色名称 */
    roleName: string;
  };

  type RoleInfoParams = {
    /** 角色id */
    roleId: number;
  };

  type RoleInParam = {
    /** 启用状态(0-已启用，1-已禁用) */
    enableStatus?: number;
    /** 角色描述 */
    roleDesc?: string;
    /** 角色id，编辑时传 */
    roleId?: number;
    /** 角色名称 */
    roleName?: string;
  };

  type RolePageListParams = {
    /** 客户端id */
    clientId: string;
    /** 当前页 */
    current: number;
    /** 结束时间 */
    endTime?: string;
    /** 每页条数 */
    pageSize: number;
    /** 角色名称 */
    roleName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 租户id */
    tenantId?: number;
    /** 定制化标签(standard:标准版，customize:定制版) */
    type?: string;
  };

  type RoleQueryResourceRoleParams = {
    /** 角色id */
    roleId: number;
  };

  type RoleQueryUserSelectRoleListParams = {
    /** 定制化标签(standard:标准版，customize:定制版) */
    type?: string;
  };

  type RoleResourceInParam = {
    /** 资源菜单id集合 */
    resourceIds?: number[];
    /** 角色id */
    roleId?: number;
    /** 租户id */
    tenantId?: number;
  };

  type SmsSendCodeParams = {
    /** 手机号 */
    mobile: string;
  };

  type SmsVerifyCodeParams = {
    /** 验证码 */
    code: string;
    /** 手机号 */
    mobile: string;
  };

  type SysUserInfo = {
    admin?: boolean;
    /** 部门id */
    departIds?: string;
    /** 头像 */
    headUrl?: string;
    /** 手机号 */
    mobile?: string;
    /** 密码 */
    password?: string;
    /** 角色ID */
    roleIds?: string;
    /** 系统用户id */
    sysUserId?: number;
    /** 租户id */
    tenantId: number;
    /** 姓名 */
    userName?: string;
  };

  type SysUserInParam = {
    /** 客户端应用id(自动绑定用户角色身份使用) */
    clientId?: string;
    /** 用户头像 */
    headUrl?: string;
    /** 用户手机号 */
    mobile?: string;
    /** 项目id */
    projectId?: number;
    /** 用户角色(自动绑定用户角色身份使用) */
    roleCode?: string;
    /** 用户性别 */
    sex?: string;
    /** 租户id(多租户使用) */
    tenantId?: number;
    /** 用户姓名 */
    userName?: string;
  };

  type TenantSwitchDTO = {
    /** 租户id */
    tenantId: number;
    /** 租户名称 */
    tenantName: string;
  };

  type UserAddParam = {
    /** 所属部门 */
    deptIds?: number[];
    /** 性别(man-男,woman-女) */
    gender?: string;
    /** 联系电话 */
    mobile?: string;
    /** 所属项目id */
    projectId?: number;
    /** 角色编码(运营平台使用) */
    roleCode?: string;
    /** 所属角色 */
    roleIds?: number[];
    /** 姓名 */
    sysUserName?: string;
  };

  type UserCheckOldPasswordParams = {
    /** password */
    password: string;
  };

  type UserDeleteParam = {
    /** 用户id集合 */
    userIds: number[];
  };

  type UserDTO = {
    /** 添加时间 */
    createTime: string;
    /** 所属部门 */
    deptNames: string;
    /** 性别 */
    gender: string;
    /** 联系方式 */
    mobile: string;
    /** 角色名称 */
    roleNames: string;
    /** 用户id */
    sysUserId: number;
    /** 姓名 */
    sysUserName: string;
  };

  type UserExportUserExcelParams = {
    /** 结束时间 */
    endTime?: string;
    /** 手机号 */
    mobile?: string;
    /** 项目id */
    projectId?: number;
    /** 开始时间 */
    startTime?: string;
    /** 姓名 */
    sysUserName?: string;
    /** 用户id,多个英文逗号拼接 */
    userIds?: string;
  };

  type UserImportUserExcelParams = {
    /** 项目id */
    projectId?: number;
  };

  type UserInFeignParam = {
    mobile?: string;
    unionId?: string;
  };

  type UserInfo = {
    /** 应用ID */
    clientId: string;
    /** 系统权限标识组 */
    permissions: string[];
    /** 系统角色标识组 */
    roleIds: string[];
    sysUser: SysUserInfo;
  };

  type UserInfoParams = {
    /** 用户id */
    sysUserId: number;
    /** 定制化标签(standard:标准版，customize:定制版) */
    type?: string;
  };

  type UserPageListParams = {
    /** 当前页 */
    current: number;
    /** 部门id */
    deptIds?: string;
    /** 结束时间 */
    endTime?: string;
    /** 手机号 */
    mobile?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId?: number;
    /** 开始时间 */
    startTime?: string;
    /** 姓名 */
    sysUserName?: string;
  };

  type UserPasswordAndHeadUpdateParam = {
    /** 确认密码 */
    confirmPassword?: string;
    /** 头像链接 */
    headUrl?: string;
    /** 密码 */
    password?: string;
  };

  type UserPasswordUpdateParam = {
    /** 确认密码 */
    confirmPassword: string;
    /** 密码 */
    newPassword: string;
    /** 手机号 */
    phone: string;
  };

  type UserQueryUserDetailsByMobileParams = {
    /** 手机号 */
    mobile?: string;
    /** 微信开放平台的唯一标识符 */
    unionId?: string;
  };

  type UserRegisterParam = {
    /** 营业执照 */
    businessLicense: string;
    /** 确认密码 */
    confirmPassword: string;
    /** 负责人 */
    contactPerson: string;
    /** 信用代码 */
    enterpriseCode: string;
    /** logo */
    logo: string;
    /** 租户名称 */
    name: string;
    /** 密码 */
    password: string;
    /** 手机号 */
    phone: string;
  };

  type UserUpdateParam = {
    /** 所属部门 */
    deptIds?: number[];
    /** 性别(man-男,woman-女) */
    gender?: string;
    /** 联系电话 */
    mobile?: string;
    /** 所属项目id */
    projectId?: number;
    /** 角色编码(运营平台使用) */
    roleCode?: string;
    /** 所属角色 */
    roleIds?: number[];
    /** 用户id */
    sysUserId?: number;
    /** 姓名 */
    sysUserName?: string;
  };

  type WeChatLoginParam = {
    /** 微信登录时获取的code */
    code?: string;
    /** 微信手机号获取凭证 */
    phoneCode?: string;
  };
}
