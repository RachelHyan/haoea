declare namespace IOT {
  type FlowCardUsagePageListParams = {
    /** 当前页 */
    current: number;
    /** ICCIC号 */
    iccid: string;
    /** 分页大小 */
    pageSize: number;
    /** 年份 */
    year: string;
  };

  type FlowIotCardFlowPageListParams = {
    /** 当前页 */
    current: number;
    /** ICCIC号 */
    iccid?: string;
    /** 批次号 */
    orderNumber?: string;
    /** 分页大小 */
    pageSize: number;
    /** 项目名称 */
    projectName?: string;
    /** 状态 */
    status?: string;
    /** 租户名称 */
    tenantName?: string;
  };

  type FlowQueryTenantProjectListParams = {
    /** 租户名称 */
    tenantName?: string;
  };

  type IotCardDistributeParam = {
    /** 物联网卡id */
    id: number;
    /** 项目id */
    projectId: number;
    /** 租户id */
    tenantId: number;
  };

  type IotCardFlowDTO = {
    /** 首次激活日期 */
    firstActivateDate?: string;
    /** 历史用量 */
    historyUsage?: number;
    /** ICCIC号 */
    iccid?: string;
    /** 物联网卡id */
    id?: number;
    /** IMSI号 */
    imsi?: string;
    /** 入库日期 */
    inboundDate?: string;
    /** 批次号 */
    orderNumber?: string;
    /** 出库日期 */
    outboundDate?: string;
    /** 项目名称 */
    projectName?: string;
    /** 是否实名(0-否，1-是) */
    realName?: string;
    /** 最近激活日期 */
    recentlyActivateDate?: string;
    /** 本月是否清零(0-否，1-是) */
    reset?: string;
    /** 是否报废(0-否，1-是) */
    scrap?: string;
    /** 套餐名称 */
    setmealName?: string;
    /** 状态 */
    status?: string;
    /** 租户名称 */
    tenantName?: string;
    /** 剩余用量 */
    thisMonthSurplusUsage?: number;
    /** 本月用量 */
    thisMonthUsage?: number;
  };

  type IotCardUsageMonthDTO = {
    /** ICCID号 */
    iccid?: string;
    /** 用量 */
    monthUsage?: number;
    /** 日期 */
    statisticTime?: string;
  };

  type PageResult_List_IotCardFlowDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: IotCardFlowDTO[];
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

  type PageResult_List_IotCardUsageMonthDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: IotCardUsageMonthDTO[];
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

  type PageResult_List_SupplierDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: SupplierDTO[];
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

  type PageResult_List_SupplierOrderDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: SupplierOrderDTO[];
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

  type PageResult_List_TenantDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: TenantDTO[];
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

  type ProjectVo = {
    /** 项目id */
    projectId?: number;
    /** 项目名称 */
    projectName?: string;
    tenantId?: number;
  };

  type ResultVo_List_TenantProjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: TenantProjectDTO[];
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

  type ResultVo_SupplierInfo_ = {
    /** 状态码 */
    code: number;
    data: SupplierInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_TenantInfo_ = {
    /** 状态码 */
    code: number;
    data: TenantInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type SupplierDelParam = {
    /** 供应商id集合 */
    supplierIds?: number[];
  };

  type SupplierDTO = {
    /** 联系人 */
    contactPerson?: string;
    /** 联系方式 */
    contactPhone?: string;
    /** 添加时间 */
    createTime?: string;
    /** 主键id */
    id?: number;
    /** 供应商名称 */
    supplierName?: string;
  };

  type SupplierInfo = {
    /** 营业执照 */
    businessLicense?: string;
    /** 联系人 */
    contactPerson?: string;
    /** 联系方式 */
    contactPhone?: string;
    /** 社会信用代码 */
    enterpriseCode?: string;
    /** 供应商id */
    id?: number;
    /** 供应商名称 */
    supplierName?: string;
  };

  type SupplierInParam = {
    /** 营业执照 */
    businessLicense?: string;
    /** 联系人 */
    contactPerson?: string;
    /** 联系方式 */
    contactPhone?: string;
    /** 社会信用代码 */
    enterpriseCode?: string;
    /** 供应商id，编辑时传 */
    id?: number;
    /** 供应商名称 */
    supplierName?: string;
  };

  type SupplierOrderDTO = {
    /** 卡数量 */
    cardNumber?: number;
    /** 主键id */
    id?: number;
    /** 订单号 */
    orderNumber?: string;
    /** 出库日期 */
    outboundDate?: string;
  };

  type SupplierSupplierInfoParams = {
    /** 供应商id */
    id: number;
  };

  type SupplierSupplierOrderPageListParams = {
    /** 当前页 */
    current: number;
    /** 批次号 */
    orderNumber?: string;
    /** 分页大小 */
    pageSize: number;
    /** 供应商id */
    supplierId: number;
  };

  type SupplierSupplierPageListParams = {
    /** 负责人 */
    contactPerson?: string;
    /** 联系方式 */
    contactPhone?: string;
    /** 当前页 */
    current: number;
    /** 分页大小 */
    pageSize: number;
    /** 供应商 */
    supplierName?: string;
  };

  type SysUserInParam = {
    /** 手机号 */
    mobile: string;
    /** 姓名 */
    userName: string;
  };

  type TenantDelParam = {
    /** 租户id集合 */
    tenantIds?: number[];
  };

  type TenantDTO = {
    /** 联系人 */
    contactPerson?: string;
    /** 联系人方式 */
    contactPhone?: string;
    /** 创建时间 */
    createTime?: string;
    /** 状态(0-已启用，1-已禁用) */
    enableStatus?: number;
    /** 社会信用代码 */
    enterpriseCode?: string;
    /** 主键id */
    id?: number;
    /** 租户名称 */
    name?: string;
  };

  type TenantEnableStatusChageParam = {
    /** 状态(0-已启用，1-已禁用) */
    enableStatus: number;
    /** 租户id */
    id: number;
  };

  type TenantExportTenantExcelParams = {
    /** 负责人 */
    createTime?: string;
    /** 所属网格 */
    enableStatus?: number;
    /** 名称 */
    name?: string;
    /** 租户id集合,多个英文逗号拼接 */
    tenantIds?: string;
  };

  type TenantInfo = {
    /** 项目编制员列表 */
    assignmentSuperviseList?: UserVo[];
    /** 集团管理员列表 */
    blocAdminList?: UserVo[];
    /** 营业执照 */
    businessLicense?: string;
    /** 联系人 */
    contactPerson?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 信用代码 */
    enterpriseCode?: string;
    /** 租户id */
    id?: number;
    /** logo */
    logo?: string;
    /** 租户名称 */
    name?: string;
  };

  type TenantInParam = {
    /** 项目编制员账号集合 */
    assignmentSuperviseList?: SysUserInParam[];
    /** 集团管理员账号集合 */
    blocAdminList?: SysUserInParam[];
    /** 营业执照 */
    businessLicense: string;
    /** 负责人 */
    contactPerson: string;
    /** 联系电话 */
    contactPhone: string;
    /** 信用代码 */
    enterpriseCode: string;
    /** 租户id，编辑时传 */
    id?: number;
    /** logo */
    logo?: string;
    /** 租户名称 */
    name: string;
    /** 租户类型 */
    type?: number;
  };

  type TenantProjectDTO = {
    /** 项目列表 */
    projectList?: ProjectVo[];
    /** 租户id */
    tenantId?: number;
    /** 租户名称 */
    tenantName?: string;
  };

  type TenantTenantInfoParams = {
    /** 设施id */
    id: number;
  };

  type TenantTenantPageListParams = {
    /** 负责人 */
    createTime?: string;
    /** 当前页 */
    current: number;
    /** 所属网格 */
    enableStatus?: number;
    /** 名称 */
    name?: string;
    /** 分页大小 */
    pageSize: number;
  };

  type UserVo = {
    id?: number;
    /** 手机号 */
    mobile?: string;
    roleId?: number;
    /** 姓名 */
    userName?: string;
  };
}
