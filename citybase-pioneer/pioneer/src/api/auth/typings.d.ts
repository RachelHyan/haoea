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
    /** 租户id */
    tenantId?: number;
    /** 账号 */
    username?: string;
  };

  type ResourceDTO = {
    /** 当type为project是项目id，为bloc是租户id */
    projectId: number;
    /** 当type为project是项目名称，为bloc是租户名称 */
    projectName: string;
    /** 资源数据 */
    resources: RouterDTO[];
    /** 角色名称 */
    roleName: string;
    /** project:项目端,bloc:集团端 */
    type: string;
  };

  type ResourceGetRoutersParams = {
    /** 项目id */
    projectId?: number;
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
    /** 手机号 */
    mobile: string;
    /** 系统角色标识组 */
    roleIds: string[];
    /** 系统角色标识组 */
    roleNames: string;
    /** 姓名 */
    userName: string;
  };

  type WeChatLoginParam = {
    /** 微信登录时获取的code */
    code?: string;
    /** 微信手机号获取凭证 */
    phoneCode?: string;
  };
}
