declare namespace MES {
  type _2 = {
    /** 责任区域id */
    areaId?: number;
    /** 创建人 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    delete?: boolean;
    /** 描述 */
    description?: string;
    /** 详细地址 */
    fullAddress?: string;
    /** 主键id */
    id?: number;
    /** 督察类型(must:必查点，census:普查点，other:其它) */
    inspectionType?: string;
    /** 督察员id */
    inspectionUserId?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 部件编码 */
    partsCode?: string;
    /** 部件名称 */
    partsName?: string;
    /** 场所 */
    partsType?: number;
    /** 项目id */
    projectId?: number;
    /** 租户id */
    tenantId?: number;
    /** 更新人 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type AllotRecordDTO = {
    /** 预警详情 */
    allotMessage?: string;
    /** 预警类型 */
    allotRule?: string;
    /** 预警时间 */
    createTime?: string;
    /** id */
    id?: number;
    /** 所属组织 */
    organizations?: string;
    /** 联系方式 */
    phone?: string;
    /** 状态 */
    status?: string;
    userId?: number;
    /** 人员名称 */
    userName?: string;
    /** 人员类型 */
    userType?: string;
  };

  type AllotRecordExportAllotRecordExcelParams = {
    /** 预警类型 */
    allotRule?: string;
    /** 部门id */
    departmentIds?: string;
    /** 结束时间 */
    endTime?: string;
    /** 人员类型 */
    ids?: string;
    /** 项目id */
    projectId: number;
    /** 开始时间 */
    startTime?: string;
    /** 状态 */
    status?: number;
    /** 人员姓名 */
    userName?: string;
    /** 人员类型 */
    userType?: string;
  };

  type AllotRecordSelectAllotRecordPageListParams = {
    /** 预警类型 */
    allotRule?: string;
    /** 当前页 */
    current: number;
    /** 部门id */
    departmentIds?: string;
    /** 结束时间 */
    endTime?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 开始时间 */
    startTime?: string;
    /** 状态 */
    status?: number;
    /** 人员姓名 */
    userName?: string;
    /** 人员类型 */
    userType?: string;
  };

  type AllotRuleDTO = {
    /** 预警规则 */
    allotRule?: string;
    /** 预警类型 */
    allotType?: string;
    /** 是否通知直属负责人(0-否,1-是) */
    chargeUserAllot?: number;
    /** 主键id */
    id?: number;
    /** 是否通知预警产生人(0-否,1-是) */
    personAllot?: number;
    /** 是否通知项目经理(0-否,1-是) */
    projectManagerAllot?: number;
    /** 场景类型 */
    sceneType?: string;
    /** 状态(0-启用,1-停用) */
    status?: number;
    /** 预警值 */
    valueStr?: string;
  };

  type AllotRuleInParam = {
    /** 是否通知直属负责人(0-否,1-是) */
    chargeUserAllot?: number;
    /** 主键id */
    id?: number;
    /** 是否通知预警产生人(0-否,1-是) */
    personAllot?: number;
    /** 是否通知项目经理(0-否,1-是) */
    projectManagerAllot?: number;
    /** 状态(0-启用,1-停用) */
    status?: number;
    /** 预警值 */
    valueStr?: string;
  };

  type AllotRuleSelectAllotRulePageListParams = {
    /** 预警类型 */
    allotType?: string;
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 作业类型 */
    sceneType?: string;
    /** 是否启用 */
    status?: number;
  };

  type AppJobObjectDTO = {
    /** 对象id */
    objectId: number;
    /** 对象名称 */
    objectName: string;
    /** 快照图片url */
    snapshotPicture: string;
  };

  type AppJobObjectInfo = {
    /** 创建时间 */
    createTime: string;
    /** 网格名称 */
    gridName: string;
    /** 里程 */
    mileage: number;
    /** 对象id */
    objectId: number;
    /** 对象名称 */
    objectName: string;
    /** 对象坐标 */
    routePoint: string;
    /** 对象坐标系集合 */
    routePointList: number[][];
    /** 场景类型 */
    sceneType: string;
    /** 类型 */
    type: string;
  };

  type AreaDeleteAreaParams = {
    /** id */
    ids: string;
  };

  type AreaDTO = {
    areaId?: number;
    areaName?: string;
  };

  type AreaExcelDTO = {
    areaName?: string;
    id?: number;
    remarks?: string;
  };

  type AreaExportAreaExcelParams = {
    /** 区域id */
    areaIds?: string;
    /** 区域名 */
    areaName?: string;
    /** 项目id */
    projectId: number;
  };

  type AreaInParam = {
    areaName?: string;
    id?: number;
    projectId?: number;
    remarks?: string;
  };

  type AreaSelectAreaPageListParams = {
    /** 区域名 */
    areaName?: string;
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type AttendanceInspectionTaskInfo = {
    endTime?: string;
    excutorUserName?: string;
    gridColor?: string;
    gridName?: string;
    gridPoint?: string;
    gridPointList?: number[][];
    inspectionRecordList?: InspectionRecordVo[];
    inspectionStatus?: string;
    inspectionUserName?: string;
    objectColor?: string;
    pointId?: number;
    pointName?: string;
    routePoint?: string;
    routePointList?: number[][];
    shiftName?: string;
    startTime?: string;
    strokeWidth?: number;
    taskId?: number;
    taskInspectionTime?: string;
  };

  type BatchDelInParam = {
    /** id集合 */
    objectIds?: number[];
  };

  type BizCascadeTypeQueryPubilcCascadeTypeTreeParams = {
    /** 类型，多个英文逗号隔开 */
    type: string;
  };

  type CarCarInfoParams = {
    /** 车辆id */
    carId: number;
  };

  type CarCarPageListParams = {
    /** 车牌号 */
    carNumber?: string;
    /** 车辆类型(sweep-清扫车，garbageIn-垃圾收运，garbageOut-垃圾转运，other-其它) */
    carType?: string;
    /** 车辆负责人 */
    carUserName?: string;
    /** 当前页 */
    current: number;
    /** 购入结束日期 */
    endTime?: string;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 购入开始日期 */
    startTime?: string;
  };

  type CarDTO = {
    /** 购入金额 */
    amount: string;
    /** 车辆id */
    carId: number;
    /** 车牌号 */
    carNumber: string;
    /** 车辆类型 */
    carType: string;
    /** 车辆负责人 */
    carUserName: string;
    /** 折扣年限 */
    depreciationLife: number;
    /** 组织名称 */
    orgName: string;
    /** 购入日期 */
    purchaseTime: string;
  };

  type CarExportCarExcelParams = {
    /** 车辆id集合,多个英文逗号拼接 */
    carIds?: string;
    /** 车牌号 */
    carNumber?: string;
    /** 车辆类型(sweep-清扫车，garbageIn-垃圾收运，garbageOut-垃圾转运，other-其它) */
    carType?: string;
    /** 车辆负责人 */
    carUserName?: string;
    /** 购入结束日期 */
    endTime?: string;
    /** 项目id */
    projectId: number;
    /** 购入开始日期 */
    startTime?: string;
  };

  type CarImportCarExcelParams = {
    /** 项目id */
    projectId: number;
  };

  type CarInfo = {
    /** 购入金额 */
    amount: string;
    /** 车辆id */
    carId: number;
    /** 车牌号 */
    carNumber: string;
    /** 车辆所属组织 */
    carOrgDTOList: UserOrgDTO[];
    /** 车辆类型 */
    carType: string;
    /** 车辆负责人id */
    carUserId: number;
    /** 折扣年限 */
    depreciationLife: number;
    /** 购入日期 */
    purchaseTime: string;
  };

  type CarInParam = {
    /** 购入金额 */
    amount?: string;
    /** 车辆id，编辑时传 */
    carId?: number;
    /** 车牌号 */
    carNumber?: string;
    /** 车辆类型 */
    carType?: string;
    /** 负责人id */
    carUserId?: number;
    /** 折旧年限 */
    depreciationLife?: number;
    /** 组织id集合 */
    orgIds?: number[];
    /** 项目id */
    projectId?: number;
    /** 购入日期 */
    purchaseTime?: string;
  };

  type CarJobStatusTodayDTO = {
    /** 实际作业时长 */
    actualJobDuration: number;
    /** 预警次数 */
    allotCount: number;
    /** 车辆id */
    carId: number;
    /** 车牌号 */
    carNumber: string;
    /** 车辆类型 */
    carType: string;
    /** 应作业时长 */
    jobDuration: number;
    /** 作业状态 */
    jobStatus: string;
    /** 所属组织 */
    ordNames: string;
  };

  type CarTypeCountDTO = {
    /** 车辆类型 */
    carType: string;
    /** 数量 */
    total: number;
  };

  type CascadeTypeTree = {
    /** 级联 */
    level: number;
    /** 排序 */
    sort: number;
    /** 类型名称 */
    typeName: string;
    /** 类型值 */
    typeValue: string;
  };

  type ClockingCountDTO = {
    count?: number;
    orgId?: number;
    orgName?: string;
    users?: string;
  };

  type ClockingExportClockingRecordExcelParams = {
    /** 打卡状态(done:已打卡，undone:未打卡) */
    clockingStatus?: string;
    /** 结束日期 */
    endClockingDate?: string;
    /** 联系方式 */
    mobile?: string;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 项目id */
    projectId: number;
    /** 开始日期 */
    startClockingDate?: string;
    /** 作业人员id,多个英文逗号拼接 */
    userIds?: string;
    /** 作业人员 */
    userName?: string;
    /** 作业人员类型 */
    userType?: string;
  };

  type ClockingInfo = {
    /** 人脸是否已激活：0-未激活,1-已激活 */
    isFace: number;
    /** 打卡记录 */
    list: ClockingRecordVo[];
    /** 所属组织 */
    orgNames: string;
    /** 作业人员id */
    userId: number;
    /** 作业人员 */
    userName: string;
    /** 作业人员类型 */
    userType: string;
  };

  type ClockingInParam = {
    /** 打卡地点 */
    clockingAddr?: string;
    /** 出勤照片集合 */
    clockingPhotographlist?: FileInParam[];
    /** 人脸图片 */
    faceUrl?: string;
    /** 是否是队长身份(true:是，false:否) */
    isCaptain?: boolean;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 项目id */
    projectId?: number;
    /** 批量打卡作业人员id集合 */
    userIds?: number[];
  };

  type ClockingQueryClockingRecordBySysUserIdParams = {
    /** 是否是队长身份(true:是，false:否) */
    isCaptain: boolean;
    /** 项目id */
    projectId: number;
    /** 作业人员 */
    userName?: string;
  };

  type ClockingQueryClockingRecordInfoParams = {
    /** 打卡日期 */
    clockingDate: string;
    /** 项目id */
    projectId: number;
    /** 作业人员id */
    userId: number;
  };

  type ClockingQueryClockingRecordPageListParams = {
    /** 打卡状态(done:已打卡，undone:未打卡) */
    clockingStatus?: string;
    /** 当前页 */
    current: number;
    /** 结束日期 */
    endClockingDate?: string;
    /** 联系方式 */
    mobile?: string;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 开始日期 */
    startClockingDate?: string;
    /** 作业人员 */
    userName?: string;
    /** 作业人员类型 */
    userType?: string;
  };

  type ClockingRecordDTO = {
    /** 打卡日期 */
    clockingDate: string;
    /** 打卡状态 */
    clockingStatus: string;
    /** 打卡时间 */
    clockingTimes: string;
    /** 打卡人员 */
    clockingUserName: string;
    /** 手机号 */
    mobile: string;
    /** 所属组织 */
    orgNames: string;
    /** 作业人员id */
    userId: number;
    /** 作业人员 */
    userName: string;
    /** 作业人员类型 */
    userType: string;
  };

  type ClockingRecordInfo = {
    /** 队长 */
    captainUserName: string;
    /** 打卡记录 */
    list: ClockingRecordVo[];
    /** 所属组织 */
    orgNames: string;
    /** 作业人员 */
    userName: string;
    /** 作业人员类型 */
    userType: string;
  };

  type ClockingRecordVo = {
    /** 打卡地点 */
    clockingAddr: string;
    /** 出勤图片集合 */
    clockingPhotoUrls: string[];
    /** 打卡记录id */
    clockingRecordId: number;
    /** 打卡时间 */
    clockingTime: string;
    /** 打卡人员 */
    clockingUserName: string;
    /** 人脸图片 */
    faceUrl: string;
    /** 考勤用户id */
    userId: number;
  };

  type ClockingSelectNoClockingUserParams = {
    /** 日期 */
    date: string;
    /** 已打卡-1,未打卡-2 */
    mark: number;
    /** 项目id */
    projectId: number;
  };

  type DataBoardDTO = {
    /** 出勤率 */
    attendanceRate: number;
    /** 出勤人数 */
    attendanceTotal: number;
    /** 考勤完成率 */
    clockingFinishRate: number;
    /** 考勤督察率 */
    clockingInspectionRate: number;
    /** 网格总人数 */
    gridTotal: number;
    /** 督察点总数量 */
    pointTotal: number;
    /** 问题率 */
    problemRate: number;
    /** 项目总人数 */
    projectPeopleTotal: number;
    /** 作业完成率 */
    qualityFinishRate: number;
    /** 作业督察率 */
    qualityInspectionRate: number;
    /** 排班人数 */
    schedulTotal: number;
  };

  type DelCarInParam = {
    /** 车辆id集合 */
    carIds?: number[];
    /** 项目id */
    projectId?: number;
  };

  type DelLedgerFlowInParam = {
    /** 台账id集合 */
    ledgerIds?: number[];
  };

  type DelUserInParam = {
    /** 项目id */
    projectId?: number;
    /** 删除人员集合 */
    userIds?: number[];
  };

  type DepartmentDelOrgParams = {
    /** 组织id */
    orgId: number;
  };

  type DepartmentQueryOrgInfoParams = {
    /** 组织id */
    orgId: number;
  };

  type DepartmentQueryOrgListParams = {
    /** 项目id */
    projectId: number;
    /** 组织名称或人员姓名或手机号 */
    searchVal?: string;
  };

  type DepartmentQueryOrgTreeListParams = {
    /** 项目id */
    projectId: number;
  };

  type DeviceCarDTO = {
    /** 车辆id */
    carId?: number;
    /** 车牌号 */
    carNumber?: string;
  };

  type DeviceIotCardDTO = {
    iccid?: string;
  };

  type DeviceIotCardPageListParams = {
    /** 当前页 */
    current: number;
    /** ICCIC号 */
    iccid?: string;
    /** IEMI号 */
    imei?: string;
    /** 分页大小 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type DeviceIotCarRelationInfoParams = {
    /** 设备id */
    id: number;
  };

  type DeviceIotCarRelationPageListParams = {
    /** 车辆 */
    carNumber?: string;
    /** 当前页 */
    current: number;
    /** 物联网卡号 */
    iccid?: string;
    /** 分页大小 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type DeviceQueryCarListByProjectIdParams = {
    /** 网格名称 */
    carNumber?: string;
    /** 项目id */
    projectId: number;
  };

  type DeviceQueryIotCardListByProjectIdParams = {
    /** 网格名称 */
    iccid?: string;
    /** 项目id */
    projectId: number;
  };

  type DictDataDTO = {
    /** 添加时间 */
    createTime: string;
    /** 字典数据id */
    dictDataId: number;
    /** 字典标签 */
    dictLabel: string;
    /** 字典排序 */
    dictSort: number;
    /** 字典键值 */
    dictValue: string;
  };

  type DictDataInfo = {
    /** 字典数据id */
    dictDataId: number;
    /** 字典标签 */
    dictLabel: string;
    /** 字典排序 */
    dictSort: number;
    /** 字典类型 */
    dictType: string;
    /** 字典键值 */
    dictValue: string;
  };

  type DictDataInParam = {
    /** 字典数据id,编辑时传 */
    dictDataId?: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典排序 */
    dictSort?: number;
    /** 字典类型 */
    dictType?: string;
    /** 字典键值 */
    dictValue?: string;
  };

  type DictDeleteDictDataParams = {
    /** 字典数据id */
    dictDataId: number;
  };

  type DictDictDataPageListParams = {
    /** 当前页 */
    current: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典类型 */
    dictType?: string;
    /** 每页条数 */
    pageSize: number;
  };

  type DictDictTypePageListParams = {
    /** 当前页 */
    current: number;
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 每页条数 */
    pageSize: number;
  };

  type DictQueryDictDataInfoParams = {
    /** 字典数据id */
    dictDataId: number;
  };

  type DictQueryDictTypeInfoParams = {
    /** 字典类型id */
    dictTypeId: number;
  };

  type DictQueryPublicDictDataParams = {
    /** 字典类型(多个逗号隔开) */
    dictType: string;
  };

  type DictTypeDTO = {
    /** 添加时间 */
    createTime: string;
    /** 字典名称 */
    dictName: string;
    /** 字典类型 */
    dictType: string;
    /** 字典类型id */
    dictTypeId: number;
  };

  type DictTypeInfo = {
    /** 字典名称 */
    dictName: string;
    /** 字典类型 */
    dictType: string;
    /** 字典类型id */
    dictTypeId: number;
    /** 备注 */
    remark: string;
  };

  type DictTypeInParam = {
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 字典类型id,编辑时传 */
    dictTypeId?: number;
    /** 备注 */
    remark?: string;
  };

  type FacilityGridDTO = {
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
  };

  type FacilityPointDelParam = {
    /** 设施id集合 */
    facilityPointIds?: number[];
  };

  type FacilityPointDTO = {
    /** 联系人 */
    contactPerson?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 设施名称 */
    facilityName?: string;
    /** 设施类型 */
    facilityType?: string;
    /** 详细地址 */
    fullAddress?: string;
    /** 所属网格 */
    gridName?: string;
    /** 设施id */
    id?: number;
    /** 物联设备 */
    iotDevices?: string;
  };

  type FacilityPointFacilityPointInfoParams = {
    /** 设施id */
    id: number;
  };

  type FacilityPointFacilityPointPageListParams = {
    /** 负责人 */
    contactPerson?: string;
    /** 当前页 */
    current: number;
    /** 名称 */
    facilityName?: string;
    /** 类型 */
    facilityType?: string;
    /** 所属网格 */
    gridName?: string;
    /** 分页大小 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type FacilityPointInfo = {
    /** 联系人 */
    contactPerson?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 详情 */
    details?: string;
    /** 设施名称 */
    facilityName?: string;
    /** 设施类型 */
    facilityType?: number;
    /** 详细地址 */
    fullAddress?: string;
    /** 所属网格id */
    gridId?: number;
    /** 设施id */
    id?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
  };

  type FacilityPointInParam = {
    /** 联系人 */
    contactPerson?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 详情 */
    details?: string;
    /** 设施名称 */
    facilityName?: string;
    /** 设施类型 */
    facilityType?: string;
    /** 详细地址 */
    fullAddress?: string;
    /** 所属网格 */
    gridId?: number;
    /** 设施id，编辑时传 */
    id?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 项目id */
    projectId?: number;
  };

  type FacilityPointQueryGridListByProjectIdParams = {
    /** 网格名称 */
    gridName?: string;
    /** 项目id */
    projectId: number;
  };

  type FacilityPointSelectFacilityPointCountParams = {
    /** 项目id */
    projectId: number;
  };

  type FileInParam = {
    /** 编辑时使用 */
    fileId?: number;
    /** 纬度(图片水印) */
    latitude?: string;
    /** 经度(图片水印) */
    longitude?: string;
    /** 关联对象表主键id */
    objectId?: number;
    /** 关联对象表名 */
    objectTable?: string;
    /** 拍照时间(图片水印)格式yyyy-MM-dd HH:mm:ss */
    photographTime?: string;
    /** 文件类型：1-图片，2-视频 */
    type?: string;
    /** 路径 */
    url?: string;
  };

  type FillShiftInParam = {
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
    /** 项目id */
    projectId?: number;
    /** 班次id */
    shiftId?: number;
    /** 班次名称 */
    shiftName?: string;
  };

  type GridDeleteGridParams = {
    /** 网格id,多个英文逗号拼接 */
    gridIds: string;
    /** 项目id */
    projectId: number;
  };

  type GridDTO = {
    /** 添加时间 */
    createTime: string;
    /** 网格id */
    gridId: number;
    /** 网格名称 */
    gridName: string;
    /** 所属班组 */
    teamName: string;
  };

  type GridGridPageListParams = {
    /** 当前页 */
    current: number;
    /** 网格名称 */
    gridName?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 班组id */
    teamId?: number;
  };

  type GridInfo = {
    /** 面积 */
    area: string;
    /** 绑定状态(true:已绑定班组，false:未绑定班组) */
    bindStatus: boolean;
    /** 负责人id */
    chargeUserIds: number[];
    /** 颜色 */
    color: string;
    /** 片区 */
    district: string;
    /** 网格id */
    gridId: number;
    /** 网格名称 */
    gridName: string;
    /** 网格坐标系集合 */
    gridPointList: number[][];
    /** 网格所属班组 */
    teamId: number;
    /** 所属班组 */
    teamName: string;
  };

  type GridInParam = {
    /** 面积 */
    area?: string;
    /** 绑定状态(true:已绑定班组，false:未绑定班组) */
    bindStatus?: boolean;
    /** 负责人id */
    chargeUserIds?: number[];
    /** 颜色 */
    color?: string;
    /** 片区 */
    district?: string;
    /** 网格id,编辑时传 */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
    /** 网格坐标系集合 */
    gridPointList?: number[][];
    /** 项目id */
    projectId?: number;
    /** 所属班组id */
    teamId?: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type GridQueryGridInfoParams = {
    /** 网格id */
    gridId: number;
  };

  type IndexDataBoardDTO = {
    /** 项目出勤率 */
    projectAttendanceRate: number;
    /** 项目总成本 */
    projectCostTotal: number;
    /** 项目作业完成率 */
    projectFinishRate: number;
    /** 项目总人数 */
    projectPeopleTotal: number;
    /** 项目总数 */
    projectTotal: number;
  };

  type IndexExportCarJobStatusTodayExcelListParams = {
    /** 车辆id集合,多个英文逗号拼接 */
    carIds?: string;
    /** 车牌号 */
    carNumber?: string;
    /** 状态(onJob:在岗，offJob:脱岗，offline:离线) */
    jobStatus?: string;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type IndexExportUserAttendanceTodayExcelParams = {
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 项目id */
    projectId: number;
    /** 状态(attendance:出勤，absence:缺勤) */
    status?: string;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
    /** 人员id集合,多个英文逗号拼接 */
    userIds?: string;
    /** 人员姓名 */
    userName?: string;
  };

  type IndexExportUserJobStatusTodayExcelListParams = {
    /** 状态(onJob:在岗，offJob:脱岗，offline:离线) */
    jobStatus?: string;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
    /** 人员id集合,多个英文逗号拼接 */
    userIds?: string;
    /** 人员姓名 */
    userName?: string;
  };

  type IndexQueryCarJobStatusTodayListParams = {
    /** 车牌号 */
    carNumber?: string;
    /** 当前页 */
    current: number;
    /** 状态(onJob:在岗，offJob:脱岗，offline:离线) */
    jobStatus?: string;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type IndexQueryIndexDataBoardParams = {
    /** 项目id(不传，则传全部项目) */
    projectId?: number;
  };

  type IndexQueryInspectionRecordStatisticDataParams = {
    /** 结束时间 */
    endDate?: string;
    /** 项目id */
    projectId: number;
    /** 开始时间 */
    startDate?: string;
  };

  type IndexQueryInspectionStatisticDataParams = {
    /** 项目id */
    projectId: number;
  };

  type IndexQueryJobBoardMapUserOrCarInfoParams = {
    /** 人员id/车辆id */
    objectId: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type IndexQueryJobBoardMapUserOrCarStatusParams = {
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type IndexQueryJobBoardParams = {
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type IndexQueryJobTaskFinishRateParams = {
    /** 0:近7天，1:近30天 */
    condition: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type IndexQueryPointStatisticDataParams = {
    /** 项目id */
    projectId: number;
  };

  type IndexQueryUserAttendanceTodayListParams = {
    /** 当前页 */
    current: number;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 状态(attendance:出勤，absence:缺勤) */
    status?: string;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
    /** 人员姓名 */
    userName?: string;
  };

  type IndexQueryUserJobStatusTodayListParams = {
    /** 当前页 */
    current: number;
    /** 状态(onJob:在岗，offJob:脱岗，offline:离线) */
    jobStatus?: string;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
    /** 人员姓名 */
    userName?: string;
  };

  type IndexQueryUserOrCarCurrentShiftInfoParams = {
    /** 人员id/车辆id */
    objectId: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type IndexQueryUserOrCarJobTrackListParams = {
    /** 作业日期 */
    jobDate?: string;
    /** 人员id/车辆id */
    objectId: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type IndexSelectDayExpenseParams = {
    /** 结束时间 */
    endDate: string;
    /** 开始时间 */
    startDate: string;
  };

  type IndexSelectMonthExpenseParams = {
    /** 月份 */
    month: string;
    /** 项目id */
    projectId: number;
  };

  type InspectionManagementExportBaseInfoExcelParams = {
    /** 结束日期 */
    endTime?: string;
    /** 项目id */
    projectId: number;
    /** 开始日期 */
    startTime?: string;
    /** 人员id集合,多个英文逗号拼接 */
    userIds?: string;
  };

  type InspectionManagementExportDetailInfoExcelParams = {
    /** 结束日期 */
    endTime?: string;
    /** 项目id */
    projectId: number;
    /** 开始日期 */
    startTime?: string;
    /** 人员id集合,多个英文逗号拼接 */
    userIds?: string;
  };

  type InspectionManagementSelectAttendanceInspectionTaskInfoByIdParams = {
    /** 督查任务id */
    taskId: number;
  };

  type InspectionManagementSelectInspectionTaskListByUserIdParams = {
    /** 日期 */
    date: string;
    /** 用户id */
    userId: number;
  };

  type InspectionManagementSelectJobInspectionDetailsListParams = {
    /** 当前页 */
    current: number;
    /** 结束时间 */
    endDate?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 开始时间 */
    startDate?: string;
    /** 人员姓名 */
    userName?: string;
    /** 人员类型 */
    userType?: string;
  };

  type InspectionManagementSelectJobInspectionTaskInfoParams = {
    /** 任务id */
    taskIds: string;
  };

  type InspectionManagementSelectJobInspectionTaskListByUserIdParams = {
    /** 日期 */
    date: string;
    /** 用户id */
    userId: number;
  };

  type InspectionManagementSelectUserDateDetailsParams = {
    /** 当前页 */
    current: number;
    /** 结束时间 */
    endDate?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 开始时间 */
    startDate?: string;
    /** 人员姓名 */
    userName?: string;
    /** 人员类型 */
    userType?: string;
  };

  type InspectionPointDTO = {
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 点位编号 */
    pointCode: string;
    /** 点位id */
    pointId: number;
    /** 点位名称 */
    pointName: string;
    /** 点位类型 */
    pointType: number;
  };

  type InspectionPointInfo = {
    /** 详细地址 */
    fullAddress: string;
    /** 网格id */
    gridId: number;
    /** 网格名称 */
    gridName: string;
    /** 督察类型 */
    inspectionType: string;
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 点位编号 */
    pointCode: string;
    /** 点位id */
    pointId: number;
    /** 点位名称 */
    pointName: string;
    /** 点位类型 */
    pointType: number;
  };

  type InspectionPointInParam = {
    /** 详细地址 */
    fullAddress?: string;
    /** 网格id */
    gridId?: number;
    /** 督察类型(must:必查点，census:普查点，other:其它) */
    inspectionType?: string;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 点位id,编辑时传 */
    pointId?: number;
    /** 点位名称 */
    pointName?: string;
    /** 点位类型 */
    pointType?: number;
    /** 项目编码 */
    projectCode?: string;
    /** 项目id */
    projectId?: number;
  };

  type InspectionPointVo = {
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 点位名称 */
    pointName?: string;
  };

  type InspectionRecordDTO = {
    /** 督查情况(0-正常，1-存在问题) */
    inspection: number;
    /** 督查时间 */
    inspectionTime: string;
    /** 督查员 */
    inspectionUserName: string;
    /** 督查点 */
    pointName: string;
    /** 督查记录id */
    recordId: number;
    /** 整改情况 */
    rectifier: string;
    /** 整改后图片 */
    rectifierAfterPictureList: string[];
    /** 整改前图片 */
    rectifierBeforePictureList: string[];
    /** 整改人 */
    rectifierUserNames: string;
  };

  type InspectionRecordInfo = {
    /** 督查情况(0-正常，1-存在问题) */
    inspection: number;
    /** 督查时间 */
    inspectionTime: string;
    /** 督查员 */
    inspectionUserName: string;
    /** 督查纬度 */
    latitude: string;
    /** 督查经度 */
    longitude: string;
    /** 督查点 */
    pointName: string;
    /** 督查拍照 */
    rectifierBeforePictureList: string[];
    /** 整改信息列表 */
    rectifierRecordList: RectifierDTO[];
  };

  type InspectionRecordStatisticDTO = {
    /** 督查员姓名 */
    inspectionUserName: string;
    /** 督查情况 */
    list: InspectionStatisticDTO[];
  };

  type InspectionRecordVo = {
    /** 督查时间 */
    createTime?: string;
    /** 文件列表 */
    files?: SysFileVo[];
    /** 督查时间 */
    inspectionTime?: string;
    /** 督察员姓名 */
    inspectionUserName?: string;
    /** 是否超出督察点范围(0-否，1-是) */
    isExceed?: number;
    /** 是否存在问题(0-否，1-是) */
    isProblem?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 督查点名称 */
    pointName?: string;
    /** 督查记录id */
    recordId?: number;
  };

  type InspectionStatisticDTO = {
    /** 已督查数 */
    doInspectionCount: number;
    /** 应督查数 */
    inspectionCount: number;
    /** 督查日期 */
    inspectionDate: string;
    /** 督查员姓名 */
    inspectionUserName: string;
  };

  type InspectionTaskDeleteInspectionRecordParams = {
    /** 督查记录id */
    recordId: number;
  };

  type InspectionTaskDTO = {
    /** 考勤督查数 */
    attendanceInspectionTaskCount?: number;
    /** 完成率 */
    completion?: string;
    /** 部门名称 */
    departmentName?: string;
    /** 督查总数 */
    inspectionTaskCount?: number;
    inspectionTaskList?: InspectionTaskVo[];
    /** 作业督查数 */
    jobInspectionTaskCount?: number;
    /** 作业类型 */
    jobType?: string;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type InspectionTaskExportInspectionRecordExcelParams = {
    /** 督查结束日期 */
    endTime?: string;
    /** 是否存在问题(0-正常，1-存在问题) */
    inspection?: number;
    /** 督察员 */
    inspectionUserId?: number;
    /** 督查点 */
    pointName?: string;
    /** 项目id */
    projectId: number;
    /** 记录id,多个英文逗号拼接 */
    recordIds?: string;
    /** 整改员 */
    rectifierUserId?: number;
    /** 督查开始日期 */
    startTime?: string;
  };

  type InspectionTaskHandleParam = {
    /** 处理结果(cancel-确认取消，confirm-确认出勤，absence-确认缺勤) */
    result: string;
    /** 任务id */
    taskId: number;
  };

  type InspectionTaskQueryInspectionRecordInfoParams = {
    /** 项目id */
    projectId: number;
    /** 督查记录id */
    recordId: number;
  };

  type InspectionTaskQueryInspectionRecordPageListParams = {
    /** 当前页 */
    current: number;
    /** 督查结束日期 */
    endTime?: string;
    /** 是否存在问题(0-正常，1-存在问题) */
    inspection?: number;
    /** 督察员 */
    inspectionUserId?: number;
    /** 每页条数 */
    pageSize: number;
    /** 督查点 */
    pointName?: string;
    /** 项目id */
    projectId: number;
    /** 整改员 */
    rectifierUserId?: number;
    /** 督查开始日期 */
    startTime?: string;
  };

  type InspectionTaskSelectInspectionTaskListParams = {
    /** 当前页 */
    current: number;
    /** 日期 */
    endDate?: string;
    /** 作业类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    jobType: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 日期 */
    startDate?: string;
    /** 人员姓名 */
    userName?: string;
  };

  type InspectionTaskVo = {
    inspectionStatus?: string;
    taskId?: number;
    type?: string;
  };

  type IotCardDTO = {
    /** 首次激活日期 */
    firstActivateDate?: string;
    /** 历史用量 */
    historyUsage?: number;
    /** ICCIC号 */
    iccid?: string;
    /** IMEI号 */
    imei?: string;
    /** 入库日期 */
    inboundDate?: string;
    /** 出库日期 */
    outboundDate?: string;
    /** 是否实名(0-否，1-是) */
    realName?: string;
    /** 最近激活日期 */
    recentlyActivateDate?: string;
    /** 是否报废(0-否，1-是) */
    scrap?: string;
    /** 套餐名称 */
    setmealName?: string;
    /** 状态 */
    status?: string;
    /** 剩余用量 */
    thisMonthSurplusUsage?: number;
    /** 本月用量 */
    thisMonthUsage?: number;
  };

  type IotCarRelationDelParam = {
    /** 设备id集合 */
    iotCarRelationIds?: number[];
  };

  type IotCarRelationDTO = {
    /** 绑定车辆 */
    carNumber?: string;
    /** 车辆类型 */
    carType?: string;
    /** 添加时间 */
    createTime?: string;
    /** 品牌 */
    eqBrand?: string;
    /** 设备名称 */
    eqName?: string;
    /** ICCIC号 */
    iccid?: string;
    /** 设备id */
    id?: number;
  };

  type IotCarRelationInfo = {
    /** 车辆id */
    carId?: number;
    /** 品牌 */
    eqBrand?: string;
    /** 设备名称 */
    eqName?: string;
    /** ICCIC号 */
    iccid?: string;
    /** 设备id */
    id?: number;
  };

  type IotCarRelationInParam = {
    /** 车辆id */
    carId?: number;
    /** 品牌 */
    eqBrand?: string;
    /** 设备名称 */
    eqName?: string;
    /** ICCIC号 */
    iccid?: string;
    /** 物联设备id，编辑时传 */
    id?: number;
    /** 项目id */
    projectId?: number;
  };

  type JayaChargeSwitchDTO = {
    /** 责任人id */
    chargeUserId: number;
    /** 责任人姓名 */
    chargeUserName: string;
  };

  type JayaGridSwitchDTO = {
    /** 网格id */
    gridId: number;
    /** 网格名称 */
    gridName: string;
  };

  type JayaMapCarSwitchDTO = {
    /** 车辆id */
    carId: number;
    /** 车牌号 */
    carNumber: string;
  };

  type JayaMapObjectDTO = {
    /** 责任人 */
    chargeUserNames: string;
    /** 颜色 */
    color: string;
    /** 几何类型(1:点，2:线，3.面) */
    geometryType: number;
    /** 网格id */
    gridIds: number[];
    /** 督查类型 */
    inspectionType: string;
    /** 对象id */
    objectId: number;
    /** 对象名称 */
    objectName: string;
    /** 人员绑定信息 */
    planUserList: JayaMapPlanUserVo[];
    /** 对象坐标 */
    routePoint: string;
    /** 对象坐标系集合 */
    routePointList: number[][];
    /** 描边宽度 */
    strokeWidth: number;
  };

  type JayaMapObjectInfo = {
    /** 绑定状态(0-未绑定，1-已绑定) */
    bindingStatus: number;
    /** 作业车辆id */
    carId: number;
    /** 责任人id */
    chargeUserIdList: number[];
    /** 网格名称 */
    gridName: string;
    /** 督查次数 */
    inspectorCount: number;
    /** 督查员id */
    inspectorUserId: number;
    /** 计划id */
    planId: number;
    /** 班次 */
    shiftList: JayaObjectShiftSwitchDTO[];
    /** 作业人员id */
    userId: number;
  };

  type JayaMapObjectPlanDTO = {
    /** 作业车辆 */
    carNumber: string;
    /** 作业频次 */
    cleaningCount: number;
    /** 网格id */
    gridId: number;
    /** 作业结束时间 */
    jobEndTime: string;
    /** 作业开始时间 */
    jobStartTime: string;
    /** 组织负责人 */
    mapUserList: JayaMapUserVo[];
    /** 对象id */
    objectId: number;
    /** 对象名称 */
    objectName: string;
    /** 计划id */
    planId: number;
    /** 作业人员 */
    userName: string;
  };

  type JayaMapPlanUserVo = {
    /** 绑定状态(0-未绑定，1-已绑定) */
    bindingStatus: number;
    /** 网格id */
    gridId: number;
    /** 督查员id */
    inspectorUserId: number;
    /** 督查员姓名 */
    inspectorUserName: string;
    /** 对象id */
    objectId: number;
    /** 计划id */
    planId: number;
    /** 作业人员id */
    userId: number;
    /** 作业人员姓名 */
    userName: string;
  };

  type JayaMapUserEarlyWarningDTO = {
    /** 负责人 */
    chargeUserName: string;
    /** 组织负责人 */
    mapUserList: JayaMapUserVo[];
    /** 所属组织 */
    orgNames: string;
    /** 作业人员手机号 */
    phone: string;
    /** 作业人员头像 */
    userHeadUrl: string;
    /** 作业人员id */
    userId: number;
    /** 作业人员姓名 */
    userName: string;
    /** 人员类型 */
    userType: string;
  };

  type JayaMapUserSwitchDTO = {
    /** 负责人id */
    chargeUserId: number;
    /** 负责人 */
    chargeUserName: string;
    /** 负责人集合 */
    mapUserList: JayaMapUserVo[];
    /** 作业人员姓名 */
    phone: string;
    /** 作业人员id */
    userId: number;
    /** 作业人员姓名 */
    userName: string;
  };

  type JayaMapUserVo = {
    /** 头像 */
    headUrl: string;
    /** 姓名 */
    name: string;
    /** 手机号 */
    phone: string;
  };

  type JayaObjectShiftSwitchDTO = {
    /** 作业频次 */
    cleaningCount: number;
    /** 作业结束时间 */
    jobEndTime: string;
    /** 作业开始时间 */
    jobStartTime: string;
    /** 班次id */
    shiftId: number;
    /** 班次名称 */
    shiftName: string;
    /** 班组id */
    teamId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type JayaTenantProjectInfo = {
    /** 租户logo */
    logo: string;
    /** 项目列表 */
    projectList: UserProjectSwitchDTO[];
    /** 租户id */
    tenantId: number;
    /** 租户名称 */
    tenantName: string;
  };

  type JobBoardDTO = {
    /** 缺勤数 */
    absenceTotal: number;
    /** 出勤数 */
    attendanceTotal: number;
    /** 完成率 */
    finishRate: number;
    /** 脱岗数 */
    offJobTotal: number;
    /** 离线数 */
    offlineTotal: number;
    /** 在岗数 */
    onJobTotal: number;
    /** 排班数 */
    schedulTotal: number;
  };

  type JobBoardMapUserOrCarInfo = {
    /** 车辆类型 */
    carType: string;
    /** 状态 */
    jobStatus: string;
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 联系方式 */
    mobile: string;
    /** 人员id/车辆id */
    objectId: number;
    /** 人员姓名/车牌号 */
    objectName: string;
    /** 照片 */
    objectUrl: string;
    /** 所属组织 */
    ordNames: string;
    /** 上报时间 */
    reportTime: string;
    /** 人员类型 */
    userType: string;
  };

  type JobBoardMapUserOrCarStatusDTO = {
    /** 方向(东E / 西W) */
    direction: string;
    /** 是否聚岗(0-否，1-是) */
    isGatherJob: number;
    /** 是否脱岗(0-否，1-是) */
    isOffJob: number;
    /** 是否离线(0-否，1-是) */
    isOffline: number;
    /** 是否在岗(0-否，1-是) */
    isOnJob: number;
    /** 是否坐岗(0-否，1-是) */
    isSitJob: number;
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 人员id/车辆id */
    objectId: number;
    /** 人员姓名/车牌号 */
    objectName: string;
  };

  type JobInspectionDetailsDTO = {
    /** 部门名称 */
    departmentName?: string;
    /** 身份证号 */
    idCard?: string;
    jobInspectionDetailsList?: JobInspectionDetailsVo[];
    /** 加班时长 */
    overtimeWorkDuration?: string;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
    /** 人员类型 */
    userType?: string;
    /** 工作时长 */
    workDuration?: string;
  };

  type JobInspectionDetailsVo = {
    /** 日期 */
    date?: string;
    /** 考勤状态 */
    inspectionStatus?: string;
  };

  type JobInspectionTaskInfo = {
    /** 结束时间 */
    endTime?: string;
    /** 作业人员姓名 */
    excutorUserName?: string;
    /** 网格颜色 */
    gridColor?: string;
    /** 网格名称 */
    gridName?: string;
    /** 网格点位 */
    gridPoint?: string;
    /** 网格点位坐标集合 */
    gridPointList?: number[][];
    /** 督查点列表 */
    inspectionPointList?: InspectionPointVo[];
    /** 督查记录列表 */
    inspectionRecordList?: InspectionRecordVo[];
    /** 对象颜色 */
    objectColor?: string;
    /** 对象点位 */
    routePoint?: string;
    /** 对象点位坐标集合 */
    routePointList?: number[][];
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 描边宽度 */
    strokeWidth?: number;
  };

  type JobInspectionVo = {
    actualCount?: number;
    inspectionCount?: number;
    inspectionIsProblem?: number;
    inspectionStatus?: string;
    taskId?: number;
  };

  type JobObjectDeleteJobObjectParams = {
    /** 对象id */
    objectId: number;
  };

  type JobObjectDTO = {
    /** 责任人 */
    chargeUserNames: string;
    /** 颜色 */
    color: string;
    /** 几何类型(1:点，2:线，3.面) */
    geometryType: number;
    /** 网格id */
    gridIds: number[];
    /** 督查类型 */
    inspectionType: string;
    /** 对象编码 */
    objectCode: string;
    /** 对象id */
    objectId: number;
    /** 对象名称 */
    objectName: string;
    /** 对象坐标 */
    routePoint: string;
    /** 对象坐标系集合 */
    routePointList: number[][];
    /** 对象类型 */
    sceneType: string;
    /** 描边宽度 */
    strokeWidth: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type JobObjectInfo = {
    /** 对象详细地址 */
    addr: string;
    /** 负责人id */
    chargeUserIds: number[];
    /** 颜色 */
    color: string;
    /** 几何类型(1:点，2:线，3.面) */
    geometryType: number;
    /** 网格id */
    gridIds: number[];
    /** 督查类型 */
    inspectionType: string;
    /** 对象编码 */
    objectCode: string;
    /** 对象id */
    objectId: number;
    /** 对象名称 */
    objectName: string;
    /** 对象坐标 */
    routePoint: string;
    /** 对象坐标系集合 */
    routePointList: number[][];
    /** 对象类型 */
    sceneType: string;
    /** 作业标准 */
    shiftList?: JayaObjectShiftSwitchDTO[];
    /** 描边宽度 */
    strokeWidth: number;
  };

  type JobObjectInParam = {
    /** 对象详细地址 */
    addr?: string;
    /** 责任人 */
    chargeUserIds?: number[];
    /** 颜色 */
    color?: string;
    /** 几何类型(1:点，2:线，3.面) */
    geometryType?: number;
    /** 网格id(对象采集App使用) */
    gridId?: number;
    /** 网格id */
    gridIds?: number[];
    /** 督察类型(must:必查点，census:普查点，other:其它) */
    inspectionType?: string;
    /** 里程 */
    mileage?: number;
    /** 对象id,编辑时传 */
    objectId?: number;
    /** 对象名称 */
    objectName?: string;
    /** 项目编码 */
    projectCode?: string;
    /** 项目id */
    projectId?: number;
    /** 绘制方式(1:地图绘制，2:实地录制) */
    reportMode?: number;
    /** 对象坐标集合 */
    routePointList?: number[][];
    /** 对象类型 */
    sceneType?: string;
    /** 作业标准 */
    shiftInParams?: JobObjectShiftInParam[];
    /** 快照图片 */
    snapshotPicture?: string;
    /** 宽度 */
    strokeWidth?: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type JobObjectObjectPageListParams = {
    /** 当前页 */
    current: number;
    /** 网格id */
    gridId?: number;
    /** 对象名称 */
    objectName?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 对象类型 */
    sceneType?: string;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type JobObjectQueryJayaChargeSwitchListParams = {
    /** 项目id */
    projectId: number;
  };

  type JobObjectQueryJayaGridSwitchListParams = {
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type JobObjectQueryJayaMapGridListParams = {
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type JobObjectQueryJayaMapGridPageListParams = {
    /** 负责人id */
    chargeUserId?: number;
    /** 当前页 */
    current: number;
    /** 区域 */
    district?: string;
    /** 网格名称 */
    gridName?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type JobObjectQueryJayaMapObjectListParams = {
    /** 网格id */
    gridId?: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type JobObjectQueryJayaObjectShiftSwitchListParams = {
    /** 对象id */
    objectId?: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type JobObjectQueryObjectInfoParams = {
    /** 对象id */
    objectId: number;
  };

  type JobObjectShiftInParam = {
    /** 作业频次 */
    cleaningCount?: number;
    /** 作业结束时间 */
    jobEndTime?: string;
    /** 作业开始时间 */
    jobStartTime?: string;
    /** 班次id */
    shiftId?: number;
    /** 班组id */
    teamId?: number;
  };

  type JobPlanInParam = {
    /** 绑定对象id */
    bindId?: number;
    /** 绑定类型(object:对象，point:督察点) */
    bindType?: string;
    /** 作业车辆id */
    carId?: number;
    /** 考勤督察时间 */
    checkingInspectorTime?: string;
    /** 考勤督察员id */
    checkingInspectorUserId?: number;
    /** 网格id */
    gridId?: number;
    /** 工作时长，单位秒 */
    jobDuration?: number;
    /** 开始时间点 */
    jobStartTime?: string;
    /** 项目id */
    projectId?: number;
    /** 质量督察时间 */
    qualityInspectorTime?: string;
    /** 质量督察员id */
    qualityInspectorUserId?: number;
    /** 班次id */
    shiftId?: number;
    /** 班组排班id */
    teamId?: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
    /** 作业人员id */
    userId?: number;
  };

  type JobTaskFinishRateDTO = {
    /** 实际作业时长 */
    actuaJobDurationTotal: number;
    /** 完成率 */
    finishRate: number;
    /** 日期 */
    jobDate: string;
    /** 应作业时长 */
    jobDurationTotal: number;
  };

  type LeaveRecordDTO = {
    /** 组织 */
    departmentNames?: string;
    jobDuration?: number;
    /** 请假日期 */
    leaveDate?: string;
    /** 请假时长 */
    leaveDuration?: string;
    /** 请假班次 */
    leaveShift?: string;
    /** 请假类型 */
    leaveType?: string;
    /** 手机号 */
    phone?: string;
    /** 提交时间 */
    submitTime?: string;
    /** 提交人 */
    submitUser?: string;
    /** 作业人员 */
    userName?: string;
  };

  type LedgerCarDTO = {
    /** 详细地址 */
    addr?: string;
    /** 金额（元） */
    amount?: string;
    /** 车辆负责人 */
    carChargePerson?: string;
    /** 车牌号 */
    carNumber?: string;
    /** 车辆类型 */
    carType?: string;
    /** 当前里程数（Km） */
    currentMileage?: string;
    /** 加注量（L） */
    fillAmount?: string;
    /** 加注日期 */
    fillDate?: string;
    /** 加注类型 */
    fillType?: string;
    /** 台账id */
    id: number;
    /** 上次里程数（Km） */
    lastMileage?: string;
    /** 操作人 */
    operator?: string;
    /** 备注 */
    remarks?: string;
    /** 站点名称 */
    siteName?: string;
    /** 单价 */
    unitPrice?: string;
  };

  type LedgerDeleteLedgerCarParams = {
    /** 车辆台账id */
    ledgerId: number;
  };

  type LedgerExportLedgerCarExcelParams = {
    /** 车牌号 */
    carNumber?: string;
    /** 结束日期 */
    endDate?: string;
    /** 台账id集合,多个英文逗号拼接 */
    ledgerIds?: string;
    /** 项目id */
    projectId: number;
    /** 开始日期 */
    startDate?: string;
  };

  type LedgerExportLedgerExcelParams = {
    /** 事项 */
    items?: string;
    /** 类别标签 */
    label?: string;
    /** 台账id集合,多个英文逗号拼接 */
    ledgerIds?: string;
    /** 项目id */
    projectId: number;
  };

  type LedgerFlowDTO = {
    /** 金额 */
    amount: string;
    /** 事项 */
    items: string;
    /** 类别标签 */
    label: string;
    /** 账单日期 */
    ledgerDate: string;
    /** 台账id */
    ledgerId: number;
    /** 备注 */
    remarks: string;
  };

  type LedgerFlowInfo = {
    /** 金额 */
    amount: string;
    /** 附件地址 */
    attachmentUrl: string;
    /** 事项 */
    items: string;
    /** 类别标签 */
    label: string;
    /** 账单日期 */
    ledgerDate: string;
    /** 台账id */
    ledgerId: number;
    /** 备注 */
    remarks: string;
  };

  type LedgerFlowInParam = {
    /** 金额 */
    amount?: string;
    /** 附件路径 */
    attachmentUrl?: string;
    /** 事项 */
    items?: string;
    /** 类别标签 */
    label?: string;
    /** 账单日期 */
    ledgerDate?: string;
    /** 台账id，编辑时传 */
    ledgerId?: number;
    /** 项目id */
    projectId?: number;
    /** 备注 */
    remarks?: string;
  };

  type LedgerImportLedgerCarParams = {
    /** 项目id */
    projectId: number;
  };

  type LedgerLedgerInfoParams = {
    /** 台账id */
    ledgerId: number;
  };

  type LedgerLedgerPageListParams = {
    /** 当前页 */
    current: number;
    /** 事项 */
    items?: string;
    /** 类别标签 */
    label?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type LedgerQueryLedgerCarPageListParams = {
    /** 车牌号 */
    carNumber?: string;
    /** 当前页 */
    current: number;
    /** 结束日期 */
    endDate?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 开始日期 */
    startDate?: string;
  };

  type LocalTime = {
    hour?: number;
    minute?: number;
    nano?: number;
    second?: number;
  };

  type LoginLogDTO = {
    /** 浏览器 */
    browser?: string;
    /** 部门 */
    deptNames?: string;
    /** 访问编号 */
    id?: number;
    /** 登录地址 */
    ip?: string;
    /** 登陆地点 */
    location?: string;
    /** 登录状态(0-成功,1-失败) */
    loginStatus?: number;
    /** 登录时间 */
    loginTime?: string;
    /** 用户名称 */
    name?: string;
    /** 操作系统 */
    os?: string;
    /** 用户 */
    userId?: number;
  };

  type LoginLogForceLogoutParams = {
    /** id */
    current: number;
  };

  type LoginLogSelectJayaLoginLogPageListParams = {
    /** 当前页 */
    current: number;
    /** 结束日期 */
    endDate?: string;
    /** 登录地址 */
    ip?: string;
    /** 登录状态 */
    loginStatus?: number;
    /** 用户名称 */
    name?: string;
    /** 每页条数 */
    pageSize: number;
    /** 开始日期 */
    startDate?: string;
  };

  type LoginLogSelectJayaOnlineLoginLogPageListParams = {
    /** 当前页 */
    current: number;
    /** 登录地址 */
    ip?: string;
    /** 用户名称 */
    name?: string;
    /** 每页条数 */
    pageSize: number;
  };

  type MapObjectDTO = {
    /** 几何类型 */
    geometryType: number;
    /** 对象id */
    objectId: number;
    /** 对象名称 */
    objectName: string;
    /** 图层类型 */
    place: string;
    /** 对象坐标系集合 */
    routePointList: number[][];
  };

  type MapVideoCameraDTO = {
    /** 视频token */
    accessToken: string;
    /** 通道号 */
    channelNo: string;
    /** 设备序列号 */
    deviceSerial: string;
    /** 视频流播放地址 */
    liveUrl: string;
    /** 在线状态(0-不在线，1-在线，2-未上报) */
    status: number;
  };

  type MapVideoDeviceDTO = {
    /** 设备id */
    deviceId: number;
    /** 设备名称 */
    deviceName: string;
    /** 设备序列号 */
    deviceSerial: string;
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 项目id */
    projectId: number;
    /** 0-不在线，1-在线 */
    status: number;
  };

  type MsgNoticeInParam = {
    /** 消息公告 */
    msgNotice?: string;
    /** 项目id */
    projectId?: number;
  };

  type ObjectAllotExportJayaObjectExcelParams = {
    /** 网格id,多个英文逗号拼接 */
    gridIds?: string;
    /** 对象名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type ObjectAllotExportJayaPlanBindingExcelParams = {
    /** 网格id,多个英文逗号拼接 */
    gridIds?: string;
    /** 对象名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type ObjectAllotImportJayaPlanBindingExcelParams = {
    /** excel模板：1-批量更换，0-批量排班 */
    excel: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type ObjectAllotInParam = {
    /** 车辆id */
    carId?: number;
    /** 网格id */
    gridId?: number;
    /** 督查次数 */
    inspectorCount?: number;
    /** 督查员id */
    inspectorUserId?: number;
    /** 对象id */
    objectId?: number;
    /** 计划id,编辑时传 */
    planId?: number;
    /** 项目id */
    projectId?: number;
    /** Manual_cleaning:人工清扫,Vehicle_operation:车辆作业 */
    type?: string;
    /** 作业人员id */
    userId?: number;
  };

  type ObjectAllotQueryJayaMapCarSwitchListParams = {
    /** 项目id */
    projectId: number;
  };

  type ObjectAllotQueryJayaMapObjectAllotInfoParams = {
    /** 网格id */
    gridId?: number;
    /** 对象id */
    objectId: number;
    /** 计划id */
    planId?: number;
  };

  type ObjectAllotQueryJayaMapObjectAllotListParams = {
    /** 网格id */
    gridId?: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type ObjectAllotQueryJayaMapObjectPlanPageListParams = {
    /** 当前页 */
    current: number;
    /** 网格id,多个英文逗号拼接 */
    gridIds?: string;
    /** 对象名称 */
    objectName?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type ObjectAllotQueryJayaMapUserEarlyWarningInfoParams = {
    /** 是否是队长身份 */
    captain?: boolean;
    /** 当前页 */
    current: number;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 人员名称 */
    userName?: string;
    /** 人员类型(worker:人工清扫,vehicle:车辆作业) */
    userType?: string;
  };

  type ObjectAllotQueryJayaMapUserSwitchListParams = {
    /** 负责人id,多个逗号拼接 */
    chargeUserIds?: string;
    /** 项目id */
    projectId: number;
  };

  type ObjectGatherDeleteJobObjectParams = {
    /** 对象id */
    objectId: number;
  };

  type ObjectGatherQueryAppJobObjectInfoParams = {
    /** 对象id */
    objectId: number;
  };

  type ObjectGatherQueryAppJobObjectPageListParams = {
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type ObjectGatherQueryAppUserProjectSwitchListParams = {
    /** 登录手机号 */
    mobile: string;
  };

  type OperLogDTO = {
    /** 操作类型 */
    businessType?: number;
    /** 日志编号 */
    operId?: string;
    /** 操作地址 */
    operIp?: string;
    /** 操作人员 */
    operName?: string;
    /** 操作日期 */
    operTime?: string;
    /** 请求方式 */
    requestMethod?: string;
    /** 操作状态 */
    status?: number;
    /** 系统模块 */
    title?: string;
  };

  type OperLogInfo = {
    /** 操作类型 */
    businessType?: string;
    /** 异常信息 */
    errMsg?: string;
    /** 返回参数 */
    jsonResult?: string;
    /** 操作方法 */
    method?: string;
    /** 操作地址 */
    operIp?: string;
    /** 操作人员 */
    operName?: string;
    /** 请求参数 */
    operParam?: string;
    /** 操作日期 */
    operTime?: string;
    /** 请求地址 */
    operUrl?: string;
    /** 请求方式 */
    requestMethod?: string;
    /** 操作状态 */
    status?: string;
    /** 系统模块 */
    title?: string;
  };

  type OperLogSelectJayaOperLogInfoParams = {
    /** 日志id */
    operId: string;
  };

  type OperLogSelectJayaOperLogPageListParams = {
    /** 操作类型 */
    businessType?: number;
    /** 当前页 */
    current: number;
    /** 结束日期 */
    endDate?: string;
    /** 操作人员 */
    operName?: string;
    /** 每页条数 */
    pageSize: number;
    /** 开始日期 */
    startDate?: string;
    /** 操作状态 */
    status?: number;
    /** 系统模块 */
    title?: string;
  };

  type OrgDTO = {
    /** 层级 */
    level: number;
    /** 组织id */
    orgId: number;
    /** 组织名称 */
    orgName: string;
    /** 父级id */
    parentId: number;
    /** 排序 */
    sort: number;
    /** 负责人id */
    userIds: number[];
  };

  type OrgInParam = {
    /** 层级(1-一级，2-二级，3-三级，...) */
    level?: number;
    /** 组织id，编辑时传 */
    orgId?: number;
    /** 组织名称 */
    orgName?: string;
    /** 父级id，一级则传-1或者不传 */
    parentId?: number;
    /** 项目id */
    projectId?: number;
    /** 排序 */
    sort?: number;
    /** 负责人id */
    userIds?: number[];
  };

  type OrgTree = {
    /** 层级 */
    level: number;
    /** 组织名称 */
    orgName: string;
    /** 排序 */
    sort: number;
  };

  type PageResult_List_AllotRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: AllotRecordDTO[];
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

  type PageResult_List_AllotRuleDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: AllotRuleDTO[];
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

  type PageResult_List_AppJobObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: AppJobObjectDTO[];
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

  type PageResult_List_AreaExcelDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: AreaExcelDTO[];
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

  type PageResult_List_CarDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: CarDTO[];
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

  type PageResult_List_CarJobStatusTodayDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: CarJobStatusTodayDTO[];
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

  type PageResult_List_ClockingRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: ClockingRecordDTO[];
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

  type PageResult_List_DictDataDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: DictDataDTO[];
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

  type PageResult_List_DictTypeDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: DictTypeDTO[];
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

  type PageResult_List_FacilityPointDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: FacilityPointDTO[];
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

  type PageResult_List_GridDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: GridDTO[];
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

  type PageResult_List_InspectionPointDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: InspectionPointDTO[];
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

  type PageResult_List_InspectionRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: InspectionRecordDTO[];
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

  type PageResult_List_InspectionTaskDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: InspectionTaskDTO[];
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

  type PageResult_List_IotCardDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: IotCardDTO[];
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

  type PageResult_List_IotCarRelationDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: IotCarRelationDTO[];
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

  type PageResult_List_JayaMapObjectPlanDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: JayaMapObjectPlanDTO[];
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

  type PageResult_List_JayaMapUserEarlyWarningDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: JayaMapUserEarlyWarningDTO[];
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

  type PageResult_List_JobInspectionDetailsDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: JobInspectionDetailsDTO[];
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

  type PageResult_List_JobObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: JobObjectDTO[];
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

  type PageResult_List_LeaveRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: LeaveRecordDTO[];
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

  type PageResult_List_LedgerCarDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: LedgerCarDTO[];
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

  type PageResult_List_LedgerFlowDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: LedgerFlowDTO[];
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

  type PageResult_List_LoginLogDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: LoginLogDTO[];
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

  type PageResult_List_OperLogDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: OperLogDTO[];
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

  type PageResult_List_PartsDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: PartsDTO[];
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

  type PageResult_List_PlanViewGridDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: PlanViewGridDTO[];
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

  type PageResult_List_ProblemDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: ProblemDTO[];
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

  type PageResult_List_ProblemItemDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: ProblemItemDTO[];
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

  type PageResult_List_ProjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: ProjectDTO[];
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

  type PageResult_List_RectifierRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: RectifierRecordDTO[];
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

  type PageResult_List_RuleGroupDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: RuleGroupDTO[];
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

  type PageResult_List_TeamShiftDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: TeamShiftDTO[];
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

  type PageResult_List_UserAttendanceTodayDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: UserAttendanceTodayDTO[];
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

  type PageResult_List_UserJobStatusTodayDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: UserJobStatusTodayDTO[];
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

  type PageResult_List_WechatAllotRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: WechatAllotRecordDTO[];
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

  type PageResult_List_WechatObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: WechatObjectDTO[];
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

  type PageResult_List_WechatUserFaceDTO_ = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: WechatUserFaceDTO[];
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

  type PartsDeletePartsParams = {
    /** id */
    ids: string;
  };

  type PartsDTO = {
    /** 区域名称 */
    areaName?: string;
    /** 描述 */
    description?: string;
    /** 详细地址 */
    fullAddress?: string;
    /** 主键id */
    id?: number;
    /** 督察类型(must:必查点，census:普查点，other:其它) */
    inspectionType?: string;
    /** 督察员 */
    inspectionUser?: string;
    /** 督察员id */
    inspectionUserId?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 部件编码 */
    partsCode?: string;
    /** 部件名称 */
    partsName?: string;
    /** 场所 */
    partsType?: string;
    routePoint?: string;
  };

  type PartsExportPartsListParams = {
    /** 区域id */
    areaId?: number;
    /** 督察员id */
    inspectionUserId?: number;
    /** 部件ids */
    partsIds?: string;
    /** 部件名称 */
    partsName?: string;
    /** 场所 */
    partsType?: number;
    /** 项目id */
    projectId: number;
  };

  type PartsInParam = {
    /** 责任区域id */
    areaId?: number;
    /** 描述 */
    description?: string;
    /** 详细地址 */
    fullAddress?: string;
    /** 督察类型(must:必查点，census:普查点，other:其它) */
    inspectionType?: string;
    /** 督察员id */
    inspectionUserId?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 部件名称 */
    partsName?: string;
    /** 场所 */
    partsType?: number;
    /** 项目编码 */
    projectCode?: string;
    /** 项目id */
    projectId?: number;
  };

  type PartsSelectAreaListParams = {
    /** 项目id */
    projectId: number;
  };

  type PartsSelectPartsPageListParams = {
    /** 区域id */
    areaId?: number;
    /** 当前页 */
    current: number;
    /** 督查类型 */
    inspectionType?: string;
    /** 督察员id */
    inspectionUserId?: number;
    /** 每页条数 */
    pageSize: number;
    /** 部件名称 */
    partsName?: string;
    /** 场所 */
    partsType?: number;
    /** 项目id */
    projectId: number;
  };

  type PersonDeletePersonFromGroupParams = {
    /** 人员库ID(腾讯云使用) */
    groupId: string;
    /** 人员ID(腾讯云使用) */
    personId: string;
  };

  type PersonDelFaceInParam = {
    /** 待删除的人脸ID列表 */
    faceIds?: string[];
    /** 人员ID(腾讯云使用) */
    personId?: string;
    /** 项目id */
    projectId?: number;
  };

  type PersonFaceInParam = {
    /** 人员ID(腾讯云使用) */
    personId?: string;
    /** 项目id */
    projectId?: number;
    /** 人脸图片列表 */
    urls?: string[];
  };

  type PersonGroupDeletePersonGroupParams = {
    /** 人员组主键id */
    personGroupId: number;
  };

  type PersonGroupInParam = {
    /** 人员组名称 */
    groupName?: string;
    /** 人员组主键id,编辑时传 */
    personGroupId?: number;
    /** 项目id */
    projectId?: number;
    /** 备注 */
    tag?: string;
  };

  type PersonInParam = {
    /** 系统人员性别 */
    gender?: number;
    /** 人员组主键id */
    personGroupId?: number;
    /** 项目id */
    projectId?: number;
    /** 系统人员照片 */
    url?: string;
    /** 系统人员id */
    userId?: number;
    /** 系统人员名称 */
    userName?: string;
  };

  type Pinyin__ = {
    /** 负责人 */
    contactPerson?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 创建人 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    delete?: boolean;
    /** 部门编码 */
    deptCode?: string;
    /** 部门名称 */
    deptName?: string;
    /** 邮箱 */
    email?: string;
    /** 主键id */
    id?: number;
    /** 级别(1-一级，2-二级，3-三级...) */
    level?: number;
    /** 父级id(一级默认-1) */
    parentId?: number;
    /** 项目id */
    projectId?: number;
    /** 排序 */
    sort?: number;
    /** 部门状态(0-启用,1-停用) */
    status?: number;
    /** 租户id */
    tenantId?: number;
    /** 更新人 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type PlanBindInfo = {
    /** 绑定id(督察点id/对象id) */
    bindId: number;
    /** 绑定名称(督察点名称/对象名称) */
    bindName: string;
    /** 绑定类型(object:对象，point:督察点) */
    bindType: string;
    /** 车辆id */
    carId: number;
    /** 车牌号 */
    carNumber: string;
    /** 责任人名称 */
    chargeUserName: string;
    /** 计划车辆关联主键id */
    planCarId: number;
    /** 计划id */
    planId: number;
    /** 计划点位关联主键id */
    planPointId: number;
    /** 质量督察时间 */
    qualityInspectorTime: string;
    /** 质量督察员id */
    qualityInspectorUserId: number;
    /** 督察员名称 */
    qualityInspectorUserName: string;
    /** 作业人员id */
    userId: number;
    /** 作业人员名称 */
    userName: string;
  };

  type PlanBindingInParam = {
    /** 车辆id */
    carId?: number;
    /** 网格id */
    gridId?: number;
    /** 督查次数 */
    inspectorCount?: number;
    /** 督查员id */
    inspectorUserId?: number;
    /** 计划id,编辑时传 */
    planIds?: string;
    /** 班次 */
    shiftList?: PlanShifInVo[];
    /** 作业人员id */
    userId?: number;
  };

  type PlanCarDTO = {
    /** 车辆id */
    carId: number;
    /** 车牌号 */
    carNumber: string;
  };

  type PlanGridPointDTO = {
    /** 绑定状态(0-未绑定，1-已绑定) */
    bindingStatus: number;
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 点位id */
    pointId: number;
    /** 点位名称 */
    pointName: string;
  };

  type PlanInParam = {
    /** 督察类型(must:必查点，census:普查点，other:其它) */
    inspectionType?: string;
    /** 是否同步生成任务(true:是，false:否) */
    isCreateTask?: boolean;
    /** 是否编辑对象(true:是，false:否) */
    isEditObject?: boolean;
    /** 对象id */
    objectId?: number;
    /** 对象名称 */
    objectName?: string;
    planBindingInParams?: PlanBindingInParam;
    /** 项目id */
    projectId?: number;
    /** 对象类型 */
    sceneType?: string;
    /** Manual_cleaning:人工清扫,Vehicle_operation:车辆作业 */
    type?: string;
  };

  type PlanInspectionInParam = {
    /** 绑定类型(object:对象，point:督察点) */
    bindType?: string;
    /** 车辆id */
    carId?: number;
    /** 考勤督察时间 */
    checkingInspectorTime?: string;
    /** 考勤督察员id */
    checkingInspectorUserId?: number;
    /** 计划车辆关联主键id */
    planCarId?: number;
    /** 计划id */
    planId?: number;
    /** 计划点位关联主键id */
    planPointId?: number;
    /** 质量督察时间 */
    qualityInspectorTime?: string;
    /** 质量督察员id */
    qualityInspectorUserId?: number;
    /** 人员id */
    userId?: number;
  };

  type PlanInspectorUserDTO = {
    /** 督察员id */
    inspectorUserId: number;
    /** 督察员姓名 */
    inspectorUserName: string;
  };

  type PlanQueryPlanBindingInfoParams = {
    /** 绑定id */
    bindId: number;
    /** 绑定类型(object:对象，point:督察点) */
    bindType: string;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
  };

  type PlanQueryPlanInspectorUserListParams = {
    /** 项目id */
    projectId: number;
    /** 都察员名称或手机号 */
    searchVal?: string;
  };

  type PlanQueryPlanViewGridInfoShiftParams = {
    /** 作业网格id */
    gridId: number;
    /** 项目id */
    projectId: number;
    /** 班组id */
    teamId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type PlanQueryPlanViewGridPageListParams = {
    /** 当前页 */
    current: number;
    /** 网格名称 */
    gridName?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 班组id */
    teamId?: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type PlanQueryPlanViewMapGridListParams = {
    /** 项目id */
    projectId: number;
  };

  type PlanQueryPlanViewMapObjectListParams = {
    /** 作业网格id */
    gridId: number;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type PlanQueryPlanViewShiftCarParams = {
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
  };

  type PlanQueryPlanViewShiftUserParams = {
    /** 作业网格id */
    gridId: number;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
  };

  type PlanShifInVo = {
    /** 作业频次 */
    cleaningCount?: number;
    /** 工作时长 */
    jobDuration?: number;
    /** 作业开始时间 */
    jobStartTime?: string;
    /** 计划id */
    planId?: number;
    /** 班次id */
    shiftId?: number;
    /** 班组id */
    teamId?: number;
  };

  type PlanShiftVo = {
    /** true:今日已排班, false:今日未排班 */
    currentSchedule: boolean;
    /** 工作时长 */
    jobDuration: number;
    /** 作业结束时间 */
    jobEndTime: string;
    /** 作业开始时间 */
    jobStartTime: string;
    /** 班次id */
    shiftId: number;
    /** 班次名称 */
    shiftName: string;
  };

  type PlanUserDTO = {
    /** 点位绑定数量 */
    count?: number;
    /** 作业人员头像 */
    headUrl?: string;
    /** 作业人员id */
    userId?: number;
    /** 作业人员姓名 */
    userName?: string;
    /** 督察计划 */
    userPointList?: PlanUserInspectorVo[];
  };

  type PlanUserInspectorPointVo = {
    /** 绑定id(督察点id/对象id) */
    bindId: number;
    /** 绑定名称(督察点名称/对象名称) */
    bindName: string;
    /** 绑定类型(object:对象，point:督察点) */
    bindType: string;
    /** 车牌号 */
    carNumber: string;
    /** 计划点位关联主键id */
    planPointId: number;
    /** 质量督察时间 */
    qualityInspectorTime: string;
    /** 质量督察员id */
    qualityInspectorUserId: number;
    /** 质量督察员姓名 */
    qualityInspectorUserName: string;
  };

  type PlanUserInspectorVo = {
    /** 绑定名称 */
    bindName: string;
    /** 考勤督察时间 */
    checkingInspectorTime: string;
    /** 考勤督察员id */
    checkingInspectorUserId: number;
    /** 考勤督察员姓名 */
    checkingInspectorUserName: string;
    /** 质量督察列表 */
    inspectorPointList: PlanUserInspectorPointVo[];
    /** 计划id */
    planId: number;
  };

  type PlanViewGridDTO = {
    /** 负责人 */
    chargeUserName: string;
    /** 片区 */
    district: string;
    /** 颜色 */
    gridColor: string;
    /** 网格id */
    gridId: number;
    /** 网格名称 */
    gridName: string;
    /** 网格坐标系集合 */
    gridPointList: number[][];
    /** 班组id */
    teamId: number;
    /** 班组名称 */
    teamName: string;
  };

  type PlanViewGridInfo = {
    /** 网格id */
    gridId: number;
    /** 网格名称 */
    gridName: string;
    /** 班次列表 */
    planShiftList: PlanShiftVo[];
    /** 班组id */
    teamId: number;
  };

  type PlanViewMapGridDTO = {
    /** 颜色 */
    gridColor: string;
    /** 网格id */
    gridId: number;
    /** 网格名称 */
    gridName: string;
    /** 网格坐标系集合 */
    gridPointList: number[][];
    /** 班组id */
    teamId: number;
    /** 班组名称 */
    teamName: string;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type: string;
  };

  type PlanViewMapObjectDTO = {
    /** 绑定状态(0-未绑定，1-已绑定) */
    bindingStatus: number;
    /** 颜色 */
    color: string;
    /** 几何类型(1:点，2:线，3.面) */
    geometryType: number;
    /** 对象id */
    objectId: number;
    /** 对象名称 */
    objectName: string;
    /** 对象坐标 */
    routePoint: string;
    /** 对象坐标系集合 */
    routePointList: number[][];
    /** 描边宽度 */
    strokeWidth: number;
    /** 对象绑定的人员列表 */
    userDTOList: PlanViewObjectUserDTO[];
  };

  type PlanViewObjectUserDTO = {
    /** 作业人员头像 */
    headUrl: string;
    /** 人员手机号 */
    phone: string;
    /** 人员id */
    userId: number;
    /** 人员名称 */
    userName: string;
  };

  type PointDeletePointParams = {
    /** 点位id */
    pointId: number;
  };

  type PointPointInfoParams = {
    /** 点位id */
    pointId: number;
  };

  type PointPointPageListParams = {
    /** 当前页 */
    current: number;
    /** 网格id */
    gridId: number;
    /** 每页条数 */
    pageSize: number;
    /** 点位名称 */
    pointName?: string;
    /** 项目id */
    projectId: number;
  };

  type PointQueryPlanGridPointListParams = {
    /** 网格id */
    gridId: number;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
  };

  type PointStatisticDTO = {
    /** 点位个数 */
    count: number;
    /** 点位类型名称 */
    name: string;
  };

  type ProblemDTO = {
    /** 状态 */
    enableStatus: string;
    /** 场所 */
    place: number;
    /** 问题id */
    problemId: number;
    /** 问题类型 */
    problemType: string;
  };

  type ProblemInfo = {
    /** 状态 */
    enableStatus: number;
    /** 场所 */
    place: number;
    /** 问题id */
    problemId: number;
    /** 问题类型 */
    problemType: string;
    /** 备注 */
    remarks: string;
  };

  type ProblemInParam = {
    /** 状态(0:启用,1:禁用) */
    enableStatus?: number;
    /** 场所 */
    place?: number;
    /** 问题id，编辑时传 */
    problemId?: number;
    /** 问题类型 */
    problemType?: string;
    /** 项目id */
    projectId?: number;
    /** 备注 */
    remarks?: string;
  };

  type ProblemItemDTO = {
    /** 状态 */
    enableStatus: string;
    /** 问题项 */
    problemItem: string;
    /** 问题项id */
    problemItemId: number;
    /** 整改员人数 */
    rectifierCount: number;
  };

  type ProblemItemInfo = {
    /** 状态 */
    enableStatus: number;
    /** 问题项 */
    problemItem: string;
    /** 问题项id */
    problemItemId: number;
    /** 备注 */
    remarks: string;
    /** 整改员 */
    userIds?: number[];
  };

  type ProblemItemInParam = {
    /** 状态(0:启用,1:禁用) */
    enableStatus?: number;
    /** 问题id */
    problemId?: number;
    /** 问题项 */
    problemItem?: string;
    /** 问题项id，编辑时传 */
    problemItemId?: number;
    /** 项目id */
    projectId?: number;
    /** 备注 */
    remarks?: string;
    /** 整改员id集合 */
    userIds?: number[];
  };

  type ProblemItemProblemItemPageListParams = {
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 问题id */
    problemId: number;
    /** 问题项 */
    problemItem?: string;
    /** 项目id */
    projectId: number;
  };

  type ProblemItemQueryProblemItemInfoParams = {
    /** 问题项id */
    problemItemId: number;
  };

  type ProblemItemQueryRectifierUserListParams = {
    /** 项目id */
    projectId: number;
  };

  type ProblemProblemPageListParams = {
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 场所 */
    place?: number;
    /** 项目id */
    projectId: number;
  };

  type ProblemQueryProblemInfoParams = {
    /** 问题id */
    problemId: number;
  };

  type ProblemQueryProblemSwitchListParams = {
    /** 项目id */
    projectId: number;
  };

  type ProjectAmountVo = {
    amount?: number;
  };

  type ProjectDayExpenseDTO = {
    expense?: ProjectDayExpenseVo[];
    /** 金额列表 */
    expenseList?: Record<string, any>;
    /** 项目id */
    projectId?: number;
    /** 项目名称 */
    projectName?: string;
  };

  type ProjectDayExpenseVo = {
    amountList?: ProjectAmountVo[];
    /** 总额 */
    sum?: number;
    /** 类型(manpower-人力，car-车辆，other-其它) */
    type?: string;
  };

  type ProjectDeleteProjectParams = {
    /** 项目id */
    projectId: number;
  };

  type ProjectDTO = {
    /** 甲方名称 */
    firstParty: string;
    /** 数据管理员 */
    projectClerkName: string;
    /** 项目编码 */
    projectCode: string;
    /** 项目id */
    projectId: number;
    /** 项目负责人 */
    projectManagerName: string;
    /** 项目名称 */
    projectName: string;
    /** 人事管理员 */
    projectPersonnelName: string;
    /** 项目类型 */
    projectType: string;
  };

  type ProjectInfo = {
    /** 区域面积 */
    area: string;
    /** 合同金额 */
    contractAmount: string;
    /** 电子围栏 */
    electronicFenceList: number[][];
    /** 甲方名称 */
    firstParty: string;
    /** 数据管理员 */
    projectClerkList: ProjectMemberDTO[];
    /** 项目编码 */
    projectCode: string;
    /** 项目id */
    projectId: number;
    /** 项目负责人 */
    projectManagerList: ProjectMemberDTO[];
    /** 地图标绘员 */
    projectMapMakerList: ProjectMemberDTO[];
    /** 项目名称 */
    projectName: string;
    /** 人事管理员 */
    projectPersonnelList: ProjectMemberDTO[];
    /** 项目类型 */
    projectType: string;
  };

  type ProjectInParam = {
    /** 区域面积 */
    area?: string;
    /** 合同金额 */
    contractAmount?: string;
    /** 电子围栏 */
    electronicFenceList?: number[][];
    /** 甲方名称 */
    firstParty?: string;
    /** 项目中心点纬度 */
    latitude?: string;
    /** 项目中心点经度 */
    longitude?: string;
    /** 数据管理员 */
    projectClerkList?: UserRoleInVo[];
    /** 项目id，编辑时传 */
    projectId?: number;
    /** 项目负责人 */
    projectManagerList?: UserRoleInVo[];
    /** 地图标绘员 */
    projectMapMakerList?: UserRoleInVo[];
    /** 项目名称 */
    projectName?: string;
    /** 人事管理员 */
    projectPersonnelList?: UserRoleInVo[];
    /** 项目类型(standard:标准版，jaya:洁亚版) */
    projectType?: string;
  };

  type ProjectMemberDTO = {
    /** 成员id */
    memberId: number;
    /** 成员手机号 */
    memberMobile: string;
    /** 成员姓名 */
    memberName: string;
  };

  type ProjectProjectInfoParams = {
    /** 项目id */
    projectId: number;
  };

  type ProjectProjectPageListParams = {
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 项目编码 */
    projectCode?: string;
    /** 项目名称 */
    projectName?: string;
    /** 项目类型 */
    projectType?: string;
  };

  type ProjectQueryProjectSelectListParams = {
    /** 项目名称 */
    projectName?: string;
  };

  type ProjectQueryUserProjectSwitchListParams = {
    /** 登录手机号 */
    mobile: string;
  };

  type ProjectSelectDTO = {
    /** 项目金额 */
    contractAmount: string;
    /** 电子围栏 */
    electronicFence: string;
    /** 电子围栏 */
    electronicFenceList: number[][];
    /** 项目中心点纬度 */
    latitude: string;
    /** 项目中心点经度 */
    longitude: string;
    /** 项目编码 */
    projectCode: string;
    /** 项目id */
    projectId: number;
    /** 项目名称 */
    projectName: string;
    /** 项目人数 */
    projectPersonTotal: number;
  };

  type RectifierDeleteRectifierRecordParams = {
    /** 整改记录id */
    recordId: number;
  };

  type RectifierDTO = {
    /** 整改记录 */
    list: RectifierRecordVo[];
    /** 问题类型 */
    problemType: string;
  };

  type RectifierExportRectifierRecordExcelParams = {
    /** 问题结束日期 */
    inspectionEndTime?: string;
    /** 问题开始日期 */
    inspectionStartTime?: string;
    /** 督查点 */
    pointName?: string;
    /** 问题类型 */
    problemType?: string;
    /** 项目id */
    projectId: number;
    /** 记录id,多个英文逗号拼接 */
    recordIds?: string;
    /** 整改结束日期 */
    rectifierEndTime?: string;
    /** 整改开始日期 */
    rectifierStartTime?: string;
    /** 整改状态(0-未整改,1-已整改) */
    rectifierStatus?: number;
    /** 整改员 */
    rectifierUserId?: number;
  };

  type RectifierQueryRectifierRecordInfoParams = {
    /** 整改记录id */
    recordId: number;
  };

  type RectifierQueryRectifierRecordPageListParams = {
    /** 当前页 */
    current: number;
    /** 问题结束日期 */
    inspectionEndTime?: string;
    /** 问题开始日期 */
    inspectionStartTime?: string;
    /** 每页条数 */
    pageSize: number;
    /** 督查点 */
    pointName?: string;
    /** 问题类型 */
    problemType?: string;
    /** 项目id */
    projectId: number;
    /** 整改结束日期 */
    rectifierEndTime?: string;
    /** 整改开始日期 */
    rectifierStartTime?: string;
    /** 整改状态(0-未整改,1-已整改) */
    rectifierStatus?: number;
    /** 整改员 */
    rectifierUserId?: number;
  };

  type RectifierRecordDTO = {
    /** 督查记录id */
    inspectionRecordId: number;
    /** 问题产生时间 */
    inspectionTime: string;
    /** 督查点 */
    pointName: string;
    /** 问题描述 */
    problemDesc: string;
    /** 整改记录id */
    recordId: number;
    /** 整改状态(0-未整改,1-已整改) */
    rectifierStatus: number;
    /** 整改时间 */
    rectifierTime: string;
    /** 整改员 */
    rectifierUserName: string;
    /** 整改描述 */
    remarks: string;
  };

  type RectifierRecordInfo = {
    /** 问题产生时间 */
    inspectionTime: string;
    /** 整改纬度 */
    latitude: string;
    /** 整改经度 */
    longitude: string;
    /** 督查点 */
    pointName: string;
    /** 问题描述 */
    problemDesc: string;
    /** 整改记录id */
    recordId: number;
    /** 整改图片 */
    rectifierAfterPictureList: string[];
    /** 整改时间 */
    rectifierTime: string;
    /** 整改员id */
    rectifierUserId: number;
    /** 整改描述 */
    remarks: string;
  };

  type RectifierRecordVo = {
    /** 问题项 */
    problemItem: string;
    /** 问题类型 */
    problemType: string;
    /** 整改图片 */
    rectifierAfterPictureList: string[];
    /** 整改状态(0-未整改,1-已整改) */
    rectifierStatus: number;
    /** 整改时间 */
    rectifierTime: string;
    /** 整改员 */
    rectifierUserName: string;
  };

  type RectifierUserDTO = {
    /** 整改员id */
    userId: number;
    /** 整改员姓名 */
    userName: string;
  };

  type ResultVo_AppJobObjectInfo_ = {
    /** 状态码 */
    code: number;
    data: AppJobObjectInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_AttendanceInspectionTaskInfo_ = {
    /** 状态码 */
    code: number;
    data: AttendanceInspectionTaskInfo;
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

  type ResultVo_CarInfo_ = {
    /** 状态码 */
    code: number;
    data: CarInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_ClockingRecordInfo_ = {
    /** 状态码 */
    code: number;
    data: ClockingRecordInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_DataBoardDTO_ = {
    /** 状态码 */
    code: number;
    data: DataBoardDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_DictDataInfo_ = {
    /** 状态码 */
    code: number;
    data: DictDataInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_DictTypeInfo_ = {
    /** 状态码 */
    code: number;
    data: DictTypeInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_FacilityPointInfo_ = {
    /** 状态码 */
    code: number;
    data: FacilityPointInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_GridInfo_ = {
    /** 状态码 */
    code: number;
    data: GridInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_IndexDataBoardDTO_ = {
    /** 状态码 */
    code: number;
    data: IndexDataBoardDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_InspectionPointInfo_ = {
    /** 状态码 */
    code: number;
    data: InspectionPointInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_InspectionRecordInfo_ = {
    /** 状态码 */
    code: number;
    data: InspectionRecordInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_IotCarRelationInfo_ = {
    /** 状态码 */
    code: number;
    data: IotCarRelationInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_JayaMapObjectInfo_ = {
    /** 状态码 */
    code: number;
    data: JayaMapObjectInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_JayaTenantProjectInfo_ = {
    /** 状态码 */
    code: number;
    data: JayaTenantProjectInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_JobBoardDTO_ = {
    /** 状态码 */
    code: number;
    data: JobBoardDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_JobBoardMapUserOrCarInfo_ = {
    /** 状态码 */
    code: number;
    data: JobBoardMapUserOrCarInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_JobInspectionTaskInfo_ = {
    /** 状态码 */
    code: number;
    data: JobInspectionTaskInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_JobObjectInfo_ = {
    /** 状态码 */
    code: number;
    data: JobObjectInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_LedgerFlowInfo_ = {
    /** 状态码 */
    code: number;
    data: LedgerFlowInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_AreaDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: AreaDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_CarTypeCountDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: CarTypeCountDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_CascadeTypeTree_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: CascadeTypeTree[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_ClockingCountDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: ClockingCountDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_ClockingInfo_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: ClockingInfo[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_DeviceCarDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: DeviceCarDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_DeviceIotCardDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: DeviceIotCardDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_FacilityGridDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: FacilityGridDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_InspectionRecordStatisticDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: InspectionRecordStatisticDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_InspectionStatisticDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: InspectionStatisticDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_JayaChargeSwitchDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: JayaChargeSwitchDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_JayaGridSwitchDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: JayaGridSwitchDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_JayaMapCarSwitchDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: JayaMapCarSwitchDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_JayaMapObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: JayaMapObjectDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_JayaMapUserSwitchDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: JayaMapUserSwitchDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_JayaObjectShiftSwitchDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: JayaObjectShiftSwitchDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_JobBoardMapUserOrCarStatusDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: JobBoardMapUserOrCarStatusDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_JobObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: JobObjectDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_JobTaskFinishRateDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: JobTaskFinishRateDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_List_double_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: number[][];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_MapObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: MapObjectDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_MapVideoCameraDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: MapVideoCameraDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_MapVideoDeviceDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: MapVideoDeviceDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_OrgDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: OrgDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_OrgTree_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: OrgTree[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_PlanCarDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: PlanCarDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_PlanGridPointDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: PlanGridPointDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_PlanInspectorUserDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: PlanInspectorUserDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_PlanUserDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: PlanUserDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_PlanViewGridDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: PlanViewGridDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_PlanViewMapGridDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: PlanViewMapGridDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_PlanViewMapObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: PlanViewMapObjectDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_PointStatisticDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: PointStatisticDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_ProjectDayExpenseDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: ProjectDayExpenseDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_ProjectSelectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: ProjectSelectDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_RectifierUserDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: RectifierUserDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_SimpleWechatInspectionRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: SimpleWechatInspectionRecordDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_SimpleWechatObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: SimpleWechatObjectDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_SimpleWechatProblemDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: SimpleWechatProblemDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_SimpleWechatRectificationRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: SimpleWechatRectificationRecordDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_string_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: string[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_SysDeptDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: SysDeptDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_TeamDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: TeamDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_UserDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: UserDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_UserGenderCountDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: UserGenderCountDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_UserOrCarJobTrackDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: UserOrCarJobTrackDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_UserProjectSwitchDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: UserProjectSwitchDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_UserTypeCountDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: UserTypeCountDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_VideoDeviceDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: VideoDeviceDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatBoardInspectionTaskDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatBoardInspectionTaskDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatCarDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatCarDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatClockingRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatClockingRecordDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatDefaultShiftDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatDefaultShiftDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatDepartmentDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatDepartmentDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatGridPageDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatGridPageDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatGridUserDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatGridUserDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatInspectionPointDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatInspectionPointDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatInspectionPointTaskDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatInspectionPointTaskDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatInspectionProblemDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatInspectionProblemDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatInspectionTaskDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatInspectionTaskDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatInspectionUserDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatInspectionUserDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatJobInspectionTaskDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatJobInspectionTaskDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatJobObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatJobObjectDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatJobPlanInspectionDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatJobPlanInspectionDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatJobTaskShiftDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatJobTaskShiftDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatJobTaskUserDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatJobTaskUserDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatObjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatObjectDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatProjectDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatProjectDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatRectificationRecordDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatRectificationRecordDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatShiftPageDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatShiftPageDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatUserCarMapDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatUserCarMapDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatUserCarMapInfo_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatUserCarMapInfo[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatUserDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatUserDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatUserFaceDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatUserFaceDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatUserInspectionDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatUserInspectionDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_WechatUserShiftDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: WechatUserShiftDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_Map_string_int_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: Record<string, any>;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_Map_string_List_double_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: Record<string, any>;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_Map_string_Map_string_string_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: Record<string, any>;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_OperLogInfo_ = {
    /** 状态码 */
    code: number;
    data: OperLogInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_OrgDTO_ = {
    /** 状态码 */
    code: number;
    data: OrgDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_PlanBindInfo_ = {
    /** 状态码 */
    code: number;
    data: PlanBindInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_PlanViewGridInfo_ = {
    /** 状态码 */
    code: number;
    data: PlanViewGridInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_ProblemInfo_ = {
    /** 状态码 */
    code: number;
    data: ProblemInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_ProblemItemInfo_ = {
    /** 状态码 */
    code: number;
    data: ProblemItemInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_ProjectInfo_ = {
    /** 状态码 */
    code: number;
    data: ProjectInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_RectifierRecordInfo_ = {
    /** 状态码 */
    code: number;
    data: RectifierRecordInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_RuleGroupInfo_ = {
    /** 状态码 */
    code: number;
    data: RuleGroupInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_ShiftRuleGroupDTO_ = {
    /** 状态码 */
    code: number;
    data: ShiftRuleGroupDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_SimpleWechatInspectionRecordInfo_ = {
    /** 状态码 */
    code: number;
    data: SimpleWechatInspectionRecordInfo;
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

  type ResultVo_SysUserRoleInfo_ = {
    /** 状态码 */
    code: number;
    data: SysUserRoleInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_TeamShiftInfo_ = {
    /** 状态码 */
    code: number;
    data: TeamShiftInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_UserAgeInfo_ = {
    /** 状态码 */
    code: number;
    data: UserAgeInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_UserDetails_ = {
    /** 状态码 */
    code: number;
    data: UserDetails;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_UserInspectionTaskDTO_ = {
    /** 状态码 */
    code: number;
    data: UserInspectionTaskDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_UserJobInspectionTaskDTO_ = {
    /** 状态码 */
    code: number;
    data: UserJobInspectionTaskDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_UserOrCarCurrentShiftInfo_ = {
    /** 状态码 */
    code: number;
    data: UserOrCarCurrentShiftInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_UserVo_ = {
    /** 状态码 */
    code: number;
    data: UserVo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatAllotRecordOverviewDTO_ = {
    /** 状态码 */
    code: number;
    data: WechatAllotRecordOverviewDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatAttendanceInspectionInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatAttendanceInspectionInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatBaseBoardDTO_ = {
    /** 状态码 */
    code: number;
    data: WechatBaseBoardDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatBoardInspectionTaskInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatBoardInspectionTaskInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatInspectionPointInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatInspectionPointInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatInspectionTaskInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatInspectionTaskInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatInspectionUserStatisticDTO_ = {
    /** 状态码 */
    code: number;
    data: WechatInspectionUserStatisticDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatJobObjectInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatJobObjectInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatJobObjectStatisticDTO_ = {
    /** 状态码 */
    code: number;
    data: WechatJobObjectStatisticDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatJobTaskInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatJobTaskInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatJobTaskMapInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatJobTaskMapInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatJobUserStatisticDTO_ = {
    /** 状态码 */
    code: number;
    data: WechatJobUserStatisticDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatObjectPlanInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatObjectPlanInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatRectificationRecordInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatRectificationRecordInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatShiftUserDTO_ = {
    /** 状态码 */
    code: number;
    data: WechatShiftUserDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatUserFaceInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatUserFaceInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatUserInspectionInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatUserInspectionInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_WechatUserShiftInfo_ = {
    /** 状态码 */
    code: number;
    data: WechatUserShiftInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type RuleDeleteRuleGroupParams = {
    /** 项目id */
    projectId: number;
    /** 规则组id */
    ruleGroupId: number;
    /** 规则组类型 */
    ruleGroupType: string;
  };

  type RuleGroupDTO = {
    /** 是否默认(0-否，1-是) */
    isDefault: number;
    /** 是否属于系统规则组(0-否，1-是) */
    isSystem: number;
    /** 规则组id */
    ruleGroupId: number;
    /** 规则组名称 */
    ruleGroupName: string;
    /** 规则组类型 */
    ruleGroupType: string;
    /** 规则 */
    rules: string[];
  };

  type RuleGroupInfo = {
    /** 规则组id */
    ruleGroupId: number;
    /** 规则组名称 */
    ruleGroupName: string;
    /** 规则组类型 */
    ruleGroupType: string;
    ruleList?: RuleVo[];
  };

  type RuleGroupInParam = {
    /** 项目id */
    projectId?: number;
    /** 规则组id,编辑时传 */
    ruleGroupId?: number;
    /** 规则组名称 */
    ruleGroupName?: string;
    /** 规则组类型(clocking-in:考勤督察，quality-质量督察，overtime-clocking-in：加班考勤督察，overtime-quality：加班质量督察) */
    ruleGroupType?: string;
    /** 规则集合 */
    ruleInParams?: RuleInParam[];
  };

  type RuleGroupVo = {
    /** 规则组id */
    ruleGroupId: number;
    /** 规则组名称 */
    ruleGroupName: string;
    /** 规则组类型 */
    ruleGroupType: string;
  };

  type RuleInParam = {
    /** 规则类型(start-before:开始前，start-after:开始后，end-before:结束前，end-after:结束后，segment:起始分段，natural-point:自然点) */
    ruleType?: string;
    /** 规则值 */
    ruleValue?: string;
  };

  type RuleQueryRuleGroupListByTypeParams = {
    /** 项目id */
    projectId: number;
  };

  type RuleRuleGroupInfoParams = {
    /** 规则组id */
    ruleGroupId: number;
  };

  type RuleRuleGroupPageListParams = {
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 规则组名称 */
    ruleGroupName?: string;
  };

  type RuleVo = {
    /** 规则类型(start-before:开始前，start-after:开始后，end-before:结束前，end-after:结束后，segment:起始分段，natural-point:自然点) */
    ruleType: string;
    /** 规则值 */
    ruleValue: string;
  };

  type ScreenQueryCarTypeCountParams = {
    /** 项目id */
    projectId: number;
  };

  type ScreenQueryMapObjectParams = {
    /** 项目id */
    projectId: number;
    /** 图层搜索 */
    sceneType?: string;
  };

  type ScreenQueryMapVideoCameraParams = {
    /** 设备序列号 */
    deviceSerial: string;
  };

  type ScreenQueryUserGenderCountParams = {
    /** 项目id */
    projectId: number;
  };

  type ScreenQueryUserTypeCountParams = {
    /** 项目id */
    projectId: number;
  };

  type ScreenUserTypeCountDTOParams = {
    /** 项目id */
    projectId: number;
  };

  type ShiftDTO = {
    /** 考勤规则组名称 */
    checkingRuleGroupName: string;
    /** 类型 */
    isSystem: number;
    /** 任务开始生成日期 */
    jobCreateTime: string;
    /** 工作时长，单位秒 */
    jobDuration: number;
    /** 结束时间点 */
    jobEndTime: string;
    /** 开始时间点 */
    jobStartTime: string;
    /** 所属组织 */
    orgName: string;
    /** 周期类型 */
    periodType: string;
    /** 周期值 */
    periodValue: string;
    /** 质量规则组名称 */
    qualityRuleGroupName: string;
    /** 班次id */
    shiftId: number;
    /** 班次名称 */
    shiftName: string;
    /** 类型 */
    type: string;
  };

  type ShiftInParam = {
    /** 绑定对象(org:组织，people:人员) */
    bingType?: string;
    /** 考勤规则组id */
    checkingRuleGroupId?: number;
    /** 任务开始生成日期 */
    jobCreateTime?: string;
    /** 工作时长(单位秒) */
    jobDuration?: number;
    /** 作业开始时间点 */
    jobStartTime?: string;
    /** 所属组织id或者人员id */
    orgId?: number;
    /** 周期类型(week:周重复，month:月重复，next-day:隔天重复) */
    periodType?: string;
    /** 周期值 */
    periodValue?: string;
    /** 质量规则组id */
    qualityRuleGroupId?: number;
    /** 班次id */
    shiftId?: number;
    /** 班次名称 */
    shiftName?: string;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type ShiftRuleGroupDTO = {
    /** 考勤规则组集合 */
    checkingRuleGroupList: RuleGroupVo[];
    /** 质量规则组集合 */
    qualityRuleGroupList: RuleGroupVo[];
  };

  type ShiftVo = {
    /** 绑定对象(org:组织，people:人员) */
    bingType: string;
    /** 考勤规则组id */
    checkingRuleGroupId: number;
    /** 任务开始生成日期 */
    jobCreateTime: string;
    /** 工作时长，单位秒 */
    jobDuration: number;
    /** 结束时间点 */
    jobEndTime: string;
    /** 开始时间点 */
    jobStartTime: string;
    /** 所属组织id或者人员id */
    orgId: number;
    /** 所属组织或者人员名称 */
    orgName: string;
    /** 周期类型(week:周重复，month:月重复，next-day:隔天重复) */
    periodType: string;
    /** 周期值 */
    periodValue: string;
    /** 质量规则组id */
    qualityRuleGroupId: number;
    /** 班次id */
    shiftId: number;
    /** 班次名称 */
    shiftName: string;
    /** 类型 */
    type: string;
  };

  type SimpleWechatChargeUserVo = {
    chargeUserId?: number;
    chargeUserName?: string;
  };

  type SimpleWechatInspectionRecordDTO = {
    /** 督查时间 */
    createTime?: string;
    /** 督察员 */
    inspectionUserName?: string;
    /** 是否存在问题(0-否，1-是) */
    isProblem?: number;
    /** 督查记录id */
    recordId?: string;
    rectificationStatus?: number[];
  };

  type SimpleWechatInspectionRecordInfo = {
    /** 督查文件 */
    inspectionFiles?: WechatSysFileVo[];
    /** 督查记录id */
    inspectionRecordId?: number;
    /** 问题类型列表 */
    problemList?: SimpleWechatProblemVo[];
    /** 问题备注 */
    remarks?: string;
  };

  type SimpleWechatInspectionRecordVo = {
    /** 实际督查时间 */
    createTime?: string;
    /** 督查文件 */
    inspectionFiles?: WechatSysFileVo[];
    /** 督察员 */
    inspectionUserName?: string;
    /** 督查记录id */
    rectificationRecordId?: number;
    /** 备注 */
    remarks?: string;
  };

  type SimpleWechatInspectionResultUploadParam = {
    /** 图片链接 */
    imageUrls: string[];
    /** 是否存在问题(0-否，1-是) */
    inspectionIsProblem?: number;
    /** 督查任务id */
    inspectionTaskId: number;
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 对象id */
    objectId?: number;
    /** 对象名称 */
    objectName?: string;
    /** 问题项 */
    problemItemList?: SimpleWechatRectificationRecordAddParam[];
    /** 项目id */
    projectId: number;
    /** 备注 */
    remarks?: string;
    /** 视频链接 */
    videoUrl?: string;
  };

  type SimpleWechatInspectionTaskVo = {
    actualCount?: number;
    inspectionCount?: number;
    inspectionStatus?: string;
    inspectionTaskId?: number;
  };

  type SimpleWechatLeaveParam = {
    /** 请假类型 */
    leaveType?: string;
    /** 任务ids */
    taskIds?: string;
  };

  type SimpleWechatObjectDTO = {
    /** 详细地址 */
    addr?: string;
    /** 待督查次数 */
    count?: number;
    /** 几何类型(1:点，2:线，3.面) */
    geometryType?: number;
    gridList?: WechatGridVo[];
    inspectionTaskList?: SimpleWechatInspectionTaskVo[];
    /** 督查类型 */
    inspectionType?: string;
    /** 中文督查类型 */
    inspectionTypeName?: string;
    /** 是否存在问题未整改(0-否,1-是) */
    isRectification?: number;
    jobTaskId?: number;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    jobType?: string;
    /** 点位编码 */
    objectCode?: string;
    /** 对象颜色 */
    objectColor?: string;
    /** 点位id */
    objectId?: number;
    /** 点位名称 */
    objectName?: string;
    /** 点位类型 */
    objectType?: string;
    /** 对象点位 */
    routePoint?: string;
    /** 对象点位坐标集合 */
    routePointList?: number[][];
    /** 状态(done-正常,undone-待督查,today-今日未整改,overdue-逾期待整改) */
    status?: string;
    /** 描边宽度 */
    strokeWidth?: number;
  };

  type SimpleWechatPlanBindingInParam = {
    /** 车辆id */
    carId?: number;
    /** 网格id */
    gridId?: number;
    /** 督查次数 */
    inspectionCount?: number;
    /** 督查员id */
    inspectorUserId?: number;
    /** 计划id,编辑时传 */
    planIds?: string;
    /** 班次 */
    shiftList?: WechatDefaultShiftDTO[];
    /** 作业人员id */
    userId?: number;
  };

  type SimpleWechatProblemDTO = {
    /** 问题类型id */
    problemId?: number;
    /** 问题项列表 */
    problemItemList?: SimpleWechatProblemItemDTO[];
    /** 问题类型 */
    problemType?: string;
  };

  type SimpleWechatProblemItemDTO = {
    /** 问题项 */
    problemItem?: string;
    /** 问题项id */
    problemItemId?: number;
    /** 整改员列表 */
    rectifierList?: SimpleWechatRectifierVo[];
  };

  type SimpleWechatProblemItemVo = {
    /** 问题项 */
    problemItem?: string;
    /** 整改图片 */
    rectificationFiles?: WechatSysFileVo[];
    /** 整改状态(0-未整改,1-已整改) */
    rectificationStatus?: string;
    /** 整改时间 */
    rectificationTime?: string;
    /** 整改员 */
    rectifierName?: string;
  };

  type SimpleWechatProblemVo = {
    /** 问题项列表 */
    problemItemList?: SimpleWechatProblemItemVo[];
    /** 问题类型 */
    problemType?: string;
  };

  type SimpleWechatRectificationRecordAddParam = {
    /** 问题项 */
    problemItem?: string;
    /** 问题项id */
    problemItemId?: number;
    /** 整改员id */
    rectifierId?: number;
  };

  type SimpleWechatRectificationRecordDTO = {
    /** 督查记录列表 */
    inspectionRecordList?: SimpleWechatInspectionRecordVo[];
    /** 问题项 */
    problemItem?: string;
  };

  type SimpleWechatRectificationResultUploadParam = {
    /** 图片链接 */
    imageUrls: string[];
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 整改记录id */
    rectificationRecordId: number;
    /** 整改描述 */
    remarks?: string;
  };

  type SimpleWechatRectifierVo = {
    /** 整改员id */
    rectifierId?: number;
    /** 整改员姓名 */
    rectifierName?: string;
  };

  type SimpleWechatSOSParam = {
    address?: string;
    projectId?: number;
  };

  type SysDeptDeleteSysDeptParams = {
    /** 部门id */
    id: number;
  };

  type SysDeptDTO = {
    /** 子节点 */
    children?: SysDeptDTO[];
    /** 负责人 */
    contactPerson?: string;
    /** 联系电话 */
    contactPhone?: string;
    /** 创建时间 */
    createTime?: string;
    /** 部门编码 */
    deptCode?: string;
    /** 部门名称 */
    deptName?: string;
    /** 邮箱 */
    email?: string;
    /** 主键id */
    id?: number;
    /** 级别(1-一级，2-二级，3-三级...) */
    level?: number;
    /** 父级id(一级默认-1) */
    parentId?: number;
    /** 排序 */
    sort?: number;
    /** 部门状态(0-启用,1-停用) */
    status?: number;
    userId?: number;
  };

  type SysDeptSelectDeptListParams = {
    /** 部门名称 */
    deptName?: string;
    /** 项目id */
    projectId: number;
    /** 启用状态 */
    status?: number;
  };

  type SysDeptSelectDeptTreeParams = {
    /** 项目id */
    projectId: number;
  };

  type SysFileVo = {
    /** 类型(1-图片，2-视频) */
    type?: string;
    /** 链接 */
    url?: string;
  };

  type SysUserRoleDTO = {
    /** 系统用户手机号 */
    mobile: string;
    /** 角色编码 */
    roleCode: string;
    /** 角色名称 */
    roleName: string;
    /** 系统用户id */
    sysUserId: number;
    /** 系统用户名称 */
    sysUserName: string;
    /** 用户角色关系id */
    userRoleId: number;
  };

  type SysUserRoleInfo = {
    /** 数据管理员下拉框列表 */
    projectClerkList?: SysUserRoleDTO[];
    /** 项目负责人下拉框列表 */
    projectManagerList?: SysUserRoleDTO[];
    /** 地图标绘员 */
    projectMapMakerList?: SysUserRoleDTO[];
    /** 人事管理员下拉框列表 */
    projectPersonnelList?: SysUserRoleDTO[];
  };

  type TeamDeleteTeamParams = {
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId?: number;
    /** 班组排班id */
    teamId?: number;
  };

  type TeamDTO = {
    /** 班组id */
    teamId: number;
    /** 班组名称 */
    teamName: string;
  };

  type TeamInParam = {
    /** 班次集合 */
    paramList: ShiftInParam[];
    /** 项目id */
    projectId?: number;
    /** 班组排班id,编辑时传 */
    teamId?: number;
    /** 班组名称 */
    teamName: string;
  };

  type TeamQueryTeamListParams = {
    /** 项目id */
    projectId: number;
  };

  type TeamQueryTeamShiftInfoParams = {
    /** 班组id */
    teamId: number;
  };

  type TeamShiftDTO = {
    /** 班次集合 */
    list: ShiftDTO[];
    /** 班组排班id */
    teamId: number;
    /** 班组名称 */
    teamName: string;
  };

  type TeamShiftInfo = {
    /** 班次信息 */
    shiftVoList: ShiftVo[];
    /** 班组排班id */
    teamId: number;
    /** 班组名称 */
    teamName: string;
  };

  type TeamTeamPageListParams = {
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 班次名称 */
    shiftName?: string;
    /** 班组名称 */
    teamName?: string;
  };

  type TrackData = {
    /** 精确度 */
    accuracy?: number;
    /** 纬度 */
    latitude?: number;
    /** 经度 */
    longitude?: number;
    /** 时间戳 */
    reportTime?: number;
    /** 速度 */
    speed?: number;
  };

  type TrackInParam = {
    /** 项目id */
    projectId?: number;
    /** 轨迹数据 */
    teackList?: TrackData[];
  };

  type UnbindInParam = {
    /** 绑定id */
    bindId?: number;
    /** 绑定类型(object:对象，point:督察点) */
    bindType?: string;
    /** 计划id */
    planId?: number;
  };

  type UpdatePlanPointInParam = {
    /** 计划点位关联主键id */
    planPointId?: number;
    /** 质量督察时间 */
    qualityInspectorTime?: string;
    /** 质量督察员id */
    qualityInspectorUserId?: number;
  };

  type UpdateRectifierInParam = {
    /** 整改记录id */
    recordId: number;
    /** 整改图片 */
    rectifierAfterPictureList: string[];
    /** 整改时间 */
    rectifierTime: string;
    /** 整改员id */
    rectifierUserId: number;
    /** 整改描述 */
    remarks: string;
  };

  type UpdateRuleGroupInParam = {
    /** 是否默认(0-否，1-是) */
    isDefault?: number;
    /** 项目id */
    projectId?: number;
    /** 规则组id */
    ruleGroupId?: number;
    /** 规则组类型(clocking-in:考勤督察，quality-质量督察，overtime-clocking-in：加班考勤督察，overtime-quality：加班质量督察) */
    ruleGroupType?: string;
  };

  type UserAgeCountDTO = {
    /** 数量 */
    total: number;
    /** 人员年龄阶段 */
    userAge: string;
  };

  type UserAgeInfo = {
    /** 平均年龄 */
    averageAge: number;
    /** 年龄阶层统计 */
    list: UserAgeCountDTO[];
  };

  type UserAttendanceTodayDTO = {
    /** 出勤状态 */
    attendanceStatus: string;
    /** 已打卡次数 */
    clockingTotal: number;
    /** 手机号 */
    mobile: string;
    /** 所属组织 */
    ordNames: string;
    /** 今日排班 */
    scheduls: string;
    /** 人员id */
    userId: number;
    /** 姓名 */
    userName: string;
    /** 人员类型 */
    userType: string;
  };

  type UserDetails = {
    /** 性别(man-男，woman-女， unknown-未知) */
    gender: string;
    /** 人员头像地址 */
    headUrl: string;
    /** 身份证号 */
    idCard: string;
    info: UserDetailsInParam;
    /** 手机号 */
    phone: string;
    /** 角色 */
    roleCodes: string[];
    /** 人员id */
    userId: number;
    /** 人员姓名 */
    userName: string;
    /** 人员所属组织 */
    userOrgDTOList: UserOrgDTO[];
    /** 人员类型 */
    userType: string;
    /** 工资 */
    wages: string;
    /** 工作状态(leave-离职，onjob-在职) */
    workStatus: string;
  };

  type UserDetailsInParam = {
    /** 公积金账号 */
    accumulationFundNumber: string;
    /** 年龄 */
    age: number;
    /** 基本工资 */
    basicSalary: number;
    /** 出生日期 */
    birth: string;
    /** 血型 */
    bloodType: string;
    /** 紧急联系人 */
    contactPerson: string;
    /** 紧急联系人电话 */
    contactPhone: string;
    /** 合同期限结束日期 */
    contractDeadlineEnd: string;
    /** 合同期限开始日期 */
    contractDeadlineStart: string;
    /** 合同类型 */
    contractType: string;
    /** 合同图片 */
    contractUrl: string;
    /** 驾驶证类型 */
    drivingLicenceType: string;
    /** 驾驶证图片 */
    drivingLicenceUrl: string;
    /** 驾驶证有效期 */
    drivingLicenceValidTime: string;
    /** 学历 */
    education: string;
    /** 入职日期 */
    entryDate: string;
    /** 户籍地址 */
    hujiAddr: string;
    /** 身份证图片 */
    idCardUrl: string;
    /** 工号 */
    jobNumber: string;
    /** 用工类型 */
    laborType: string;
    /** 籍贯 */
    nativePlace: string;
    /** 现居住地址 */
    nowLiveAddr: string;
    /** 岗位工资 */
    postSalary: number;
    /** 工资卡号 */
    salaryCardNumber: string;
    /** 工资卡开户行 */
    salaryOpenBank: string;
    /** 社保号 */
    socialSecurityNumber: string;
    /** 人员详情id */
    userDetailsId: number;
  };

  type UserDTO = {
    /** 年龄 */
    age: number;
    /** 创建时间 */
    createTime: string;
    /** 性别(man-男，woman-女， unknown-未知) */
    gender: string;
    /** 身份证号 */
    idCard: string;
    /** 组织名称 */
    orgName: string;
    /** 手机号 */
    phone: string;
    /** 角色类型 */
    rectifier: string;
    /** 人员id */
    userId: number;
    /** 人员姓名 */
    userName: string;
    /** 人员类型 */
    userType: string;
    /** 工作状态(leave-离职，onjob-在职) */
    workStatus: string;
  };

  type UserExportUserExcelParams = {
    /** 结束时间 */
    endTime?: string;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 手机号 */
    phone?: string;
    /** 项目id */
    projectId: number;
    /** 角色类型 */
    roleType?: string;
    /** 开始时间 */
    startTime?: string;
    /** 用户id,多个英文逗号拼接 */
    userIds?: string;
    /** 人员姓名 */
    userName?: string;
    /** 用户类型 */
    userType?: string;
  };

  type UserGenderCountDTO = {
    /** 数量 */
    total: number;
    /** 人员性别 */
    userGender: string;
  };

  type UserImportUserBaseInfoParams = {
    /** 项目id */
    projectId: number;
  };

  type UserInParam = {
    /** 人员头像地址 */
    headUrl?: string;
    /** 身份证号 */
    idCard?: string;
    /** 组织id集合 */
    orgIds?: number[];
    /** 手机号 */
    phone?: string;
    /** 项目id */
    projectId?: number;
    /** 所属角色 */
    roleCodes?: string[];
    /** 性别 */
    sex?: string;
    /** 人员id,编辑时传 */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
    /** 人员类型 */
    userType?: string;
    /** 工资 */
    wages?: string;
    /** 工作状态(leave-离职，onjob-在职) */
    workStatus?: string;
  };

  type UserInspectionTaskDTO = {
    userInspectionTaskList?: UserInspectionTaskVo[];
    userName?: string;
  };

  type UserInspectionTaskVo = {
    actualCount?: number;
    gridName?: string;
    inspectionCount?: number;
    inspectionStatus?: string;
    shiftName?: string;
    status?: string;
    taskId?: number;
  };

  type UserJobInspectionTaskDTO = {
    userId?: number;
    userJobInspectionTaskList?: UserJobInspectionTaskVo[];
    userName?: string;
  };

  type UserJobInspectionTaskVo = {
    actualCount?: number;
    gridId?: number;
    gridName?: string;
    inspectionCount?: number;
    jobInspectionList?: JobInspectionVo[];
    shiftId?: number;
    shiftName?: string;
    status?: string;
    taskIds?: string;
  };

  type UserJobStatusTodayDTO = {
    /** 实际作业时长 */
    actualJobDuration: number;
    /** 预警次数 */
    allotCount: number;
    /** 应作业时长 */
    jobDuration: number;
    /** 作业状态 */
    jobStatus: string;
    /** 手机号 */
    mobile: string;
    /** 所属组织 */
    ordNames: string;
    /** 人员id */
    userId: number;
    /** 姓名 */
    userName: string;
    /** 人员类型 */
    userType: string;
  };

  type UserOrCarCurrentShiftDTO = {
    /** 实际作业时长（单位：秒） */
    actualJobDuration: number;
    /** 实际作业里程（单位：米） */
    actualJobMileage: number;
    /** 预警次数 */
    allotCount: number;
    carId?: number;
    endTime?: string;
    /** 完成率 */
    finishRate: number;
    /** 应作业时长（单位：秒） */
    jobDuration: number;
    /** 作业结束时间 */
    jobEndTime: string;
    /** 作业开始时间 */
    jobStartTime: string;
    startTime?: string;
    userId?: number;
    /** 司机 */
    userName: string;
  };

  type UserOrCarCurrentShiftInfo = {
    /** 总作业时长（单位：秒） */
    actualJobDurationTotal: number;
    /** 总作业里程（单位：米） */
    actualJobMileageTotal: number;
    /** 总预警次数 */
    allotCountTotal: number;
    /** 排班信息 */
    list: UserOrCarCurrentShiftDTO[];
  };

  type UserOrCarJobTrackDTO = {
    /** 实际作业时长（单位：秒） */
    actualJobDuration: number;
    /** 实际作业里程（单位：米） */
    actualJobMileage: number;
    /** 完成率 */
    finishRate: number;
    /** 应作业时长（单位：秒） */
    jobDuration: number;
    /** 作业结束时间 */
    jobEndTime: string;
    /** 作业开始时间 */
    jobStartTime: string;
    /** 班次名称 */
    shiftName: string;
    /** 任务id */
    taskId: number;
    /** 作业轨迹集合 */
    trackList: number[][];
  };

  type UserOrgDTO = {
    /** 组织id */
    orgId: string;
    /** 组织名称 */
    orgName: string;
  };

  type UserProjectSwitchDTO = {
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
    /** 项目编码 */
    projectCode: string;
    /** 项目id */
    projectId: number;
    /** 项目名称 */
    projectName: string;
  };

  type UserQueryAllUserListParams = {
    /** 是否查询队长(true:是，false:否) */
    isCaptain?: boolean;
    /** 项目id */
    projectId: number;
    /** 人员姓名或手机号 */
    searchVal?: string;
  };

  type UserQueryUserBaseInfoParams = {
    /** 手机号 */
    phone: string;
  };

  type UserQueryUserInfoParams = {
    /** 项目id */
    projectId: number;
    /** 人员id */
    userId: number;
  };

  type UserRoleInVo = {
    /** 系统用户id */
    sysUserId?: number;
    /** 用户角色关系id */
    userRoleId?: number;
  };

  type UserTypeCountDTO = {
    /** 数量 */
    total: number;
    /** 人员类型 */
    userType: string;
  };

  type UserUserPageListParams = {
    /** 当前页 */
    current: number;
    /** 结束时间 */
    endTime?: string;
    /** 组织id,多个英文逗号拼接 */
    orgIds?: string;
    /** 每页条数 */
    pageSize: number;
    /** 手机号 */
    phone?: string;
    /** 项目id */
    projectId: number;
    /** 角色类型 */
    roleType?: string;
    /** 开始时间 */
    startTime?: string;
    /** 人员姓名 */
    userName?: string;
    /** 用户类型 */
    userType?: string;
  };

  type UserVo = {
    /** 人员头像地址 */
    headUrl: string;
    /** 身份证号 */
    idCard: string;
    /** 人员手机号 */
    phone?: string;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName: string;
  };

  type VerifyFaceInParam = {
    /** 项目id */
    projectId?: number;
    /** 自拍照片 */
    selfieUrl?: string;
  };

  type VideoCameraDTO = {
    /** 视频token */
    accessToken: string;
    /** 在线状态(0-不在线，1-在线，2-未上报) */
    cameraStatus: number;
    /** 通道名称 */
    channelName: string;
    /** 通道号 */
    channelNo: string;
    /** 设备序列号 */
    deviceSerial: string;
    /** 视频流播放地址 */
    liveUrl: string;
  };

  type VideoDeviceDTO = {
    /** 设备名称 */
    deviceName: string;
    /** 设备序列号 */
    deviceSerial: string;
    /** 0-不在线，1-在线 */
    deviceStatus: number;
    /** 视频通道列表 */
    list: VideoCameraDTO[];
  };

  type VideoQueryVideoDeviceListParams = {
    /** 设备序列号 */
    deviceSerial?: string;
  };

  type WechatAllotRecordDTO = {
    /** 预警规则 */
    allotRule?: string;
    /** 创建时间 */
    createTime?: string;
    /** 主键id */
    id?: number;
    /** 预警详情 */
    message?: string;
    /** 状态(0-未读，1-已读) */
    status?: number;
  };

  type WechatAllotRecordOverviewDTO = {
    /** 未读消息数 */
    count?: number;
    /** 最新消息时间 */
    latest?: string;
  };

  type WechatAttendanceInspectionInfo = {
    /** 作业车辆 */
    carNumber?: string;
    /** 结束时间 */
    endTime?: string;
    /** 作业人员姓名 */
    excutorUserName?: string;
    /** 作业人员电话 */
    excutorUserPhone?: string;
    /** 督查计划id */
    inspectionPlanId?: number;
    /** 督查时间 */
    inspectionTime?: string;
    /** 督查时间列表 */
    inspectionTimeList?: string[];
    /** 督查人员姓名 */
    inspectionUserName?: string;
    /** 督查人员电话 */
    inspectionUserPhone?: string;
    /** 点位名称 */
    objectName?: string;
    /** 点位名称 */
    pointName?: string;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
  };

  type WechatBaseBoardDTO = {
    /** 实际督查次数 */
    actualInspectionCount?: number;
    /** 实际整改次数 */
    actualRectificationCount?: number;
    /** 车辆 */
    car?: number;
    /** 网格 */
    grid?: number;
    /** 应督查次数 */
    inspectionCount?: number;
    /** 督察员总数 */
    inspectorCount?: number;
    /** 对象 */
    object?: number;
    /** 应整改次数 */
    rectificationCount?: number;
    /** 未督查次数 */
    unInspectionCount?: number;
    /** 作业人员 */
    user?: number;
  };

  type WechatBoardInspectionTaskDTO = {
    /** 结束时间 */
    endTime?: string;
    /** 作业人员姓名 */
    excutorUserName?: string;
    /** 作业人员电话 */
    excutorUserPhone?: string;
    /** 网格名称 */
    gridName?: string;
    /** 任务状态 */
    inspectionStatus?: string;
    /** 督察员姓名 */
    inspectionUserName?: string;
    /** 督察员电话 */
    inspectionUserPhone?: string;
    /** 对象名称 */
    objectName?: string;
    /** 点位名称 */
    pointName?: string;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 督查任务id */
    taskId?: number;
  };

  type WechatBoardInspectionTaskInfo = {
    /** 结束时间 */
    endTime?: string;
    /** 作业人员姓名 */
    excutorUserName?: string;
    /** 作业人员电话 */
    excutorUserPhone?: string;
    /** 网格名称 */
    gridName?: string;
    /** 督察日期 */
    inspectionDate?: string;
    /** 督查记录列表 */
    inspectionRecordList?: WechatInspectionRecordVo[];
    /** 督察员姓名 */
    inspectionUserName?: string;
    /** 督察员电话 */
    inspectionUserPhone?: string;
    /** 对象名称 */
    objectName?: string;
    /** 点位名称 */
    pointName?: string;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    taskId?: number;
    taskInspectionTime?: string;
  };

  type WechatCaptainCancelTaskParams = {
    /** 任务id */
    taskId: number;
  };

  type WechatCaptainExportLeaveRecordParams = {
    /** 组织id */
    departmentIds?: string;
    /** 结束日期 */
    endTime?: string;
    /** 手机号 */
    phone?: string;
    /** 项目id */
    projectId: number;
    /** 开始日期 */
    startTime?: string;
  };

  type WechatCaptainSelectCarListParams = {
    /** 车牌号 */
    carNumber?: string;
    /** 网格id */
    gridId?: number;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId?: number;
  };

  type WechatCaptainSelectGridListByPhoneParams = {
    /** 作业类型 */
    jobType: string;
    /** 地图类型(对象-object,督查点-point) */
    mapType: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSelectGridListParams = {
    /** 网格id */
    gridId?: number;
    /** 作业类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    jobType?: string;
    /** 项目id */
    projectId: number;
    /** 督查类型 */
    type?: string;
  };

  type WechatCaptainSelectInspectionObjectListParams = {
    /** 网格id */
    gridId?: number;
    /** 作业类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    jobType: string;
    /** 对象名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSelectInspectionPointListParams = {
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    pointName?: string;
    /** 网格名称 */
    pointType?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSelectInspectionShiftListParams = {
    /** 网格id */
    gridId: number;
    /** 作业类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    jobType: string;
    /** 督查类型 */
    type: string;
  };

  type WechatCaptainSelectInspectionTaskInfoByIdParams = {
    /** 督查时间 */
    inspectionTime?: string;
    /** 督查任务id */
    taskId: number;
  };

  type WechatCaptainSelectInspectionTaskListParams = {
    /** 网格id */
    gridId: number;
    /** 作业类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    jobType: string;
    /** 对象id */
    objectId?: number;
    /** 督查点id */
    pointId?: number;
    /** 班次id */
    shiftId?: number;
  };

  type WechatCaptainSelectJobInspectionTaskListParams = {
    /** 网格id */
    gridId?: number;
    /** 是否绑定督查点 */
    hasPoint?: number;
    /** 作业类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    jobType: string;
    /** 是否未绑定督查点 */
    noPoint?: number;
    /** 对象id */
    objectId?: number;
    /** 督查点id */
    pointId?: number;
    /** 点位名称 */
    pointName?: string;
    /** 项目id */
    projectId: number;
    /** 督查类型 */
    type: string;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatCaptainSelectJobTaskInfoParams = {
    /** 网格id */
    gridId: number;
    /** 作业类型 */
    jobType: string;
    /** 对象id */
    objectId?: number;
    /** 点位id */
    pointId?: number;
    /** 班次id */
    shiftId: number;
  };

  type WechatCaptainSelectJobTaskMapInfoParams = {
    /** 网格id */
    gridId: number;
    /** 作业类型 */
    jobType: string;
    /** 地图类型(对象-object,督查点-point) */
    mapType: string;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId?: number;
  };

  type WechatCaptainSelectJobTaskUserListParams = {
    /** 日期 */
    date: string;
    /** 作业类型 */
    jobType: string;
    /** 人员姓名 */
    name?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSelectLeaveRecordPageListParams = {
    /** 当前页 */
    current: number;
    /** 组织id */
    departmentIds?: string;
    /** 结束日期 */
    endTime?: string;
    /** 每页条数 */
    pageSize: number;
    /** 手机号 */
    phone?: string;
    /** 项目id */
    projectId: number;
    /** 开始日期 */
    startTime?: string;
  };

  type WechatCaptainSelectObjectListParams = {
    /** 网格id */
    gridId: number;
    /** 作业类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    jobType: string;
    /** 对象名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSelectPointListParams = {
    /** 作业网格id */
    gridId: number;
    /** 督查点名称 */
    pointName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSelectShiftUserListParams = {
    /** 日期 */
    date: string;
    /** 网格id */
    gridId: number;
    /** 任务结束时间 */
    jobEndTime: string;
    /** 任务开始时间 */
    jobStartTime: string;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatCaptainSelectUserListParams = {
    /** 项目id */
    projectId: number;
    /** 项目id */
    shiftId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatCaptainSimpleSelectCaptainObjectListParams = {
    /** 督查点名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSimpleSelectCaptainObjectPageListParams = {
    /** 当前页 */
    current: number;
    /** 作业类型 */
    jobType: string;
    /** 对象名称 */
    objectName?: string;
    /** 督查点名称 */
    objectType?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSimpleSelectInspectionObjectListParams = {
    /** 查询待督查点位传'undone',否则不传 */
    inspectionStatus?: string;
    /** 督查点id */
    objectName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSimpleSelectInspectionObjectPageListParams = {
    /** 当前页 */
    current: number;
    /** 作业类型 */
    jobType: string;
    /** 对象名称 */
    objectName?: string;
    /** 督查点名称 */
    objectType?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSimpleSelectInspectionRecordInfoByIdParams = {
    /** 督查记录id */
    recordId: string;
  };

  type WechatCaptainSimpleSelectInspectionRecordListParams = {
    /** 日期 */
    date?: string;
    /** 月份(格式:2023-05) */
    month?: string;
    /** 督查点id */
    objectId: number;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSimpleSelectProblemListParams = {
    /** 点位类型 */
    objectType: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSimpleSelectRectificationObjectListParams = {
    /** 对象名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSimpleSelectRectificationObjectPageListParams = {
    /** 当前页 */
    current: number;
    /** 作业类型 */
    jobType: string;
    /** 对象名称 */
    objectName?: string;
    /** 对象类型 */
    objectType?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSimpleSelectRectificationProblemListParams = {
    /** 对象id */
    objectId: number;
  };

  type WechatCaptainSimpleSelectRectificationRecordInfoParams = {
    /** 整改记录id */
    rectificationRecordId: number;
  };

  type WechatCaptainSimpleSelectRectificationRecordListParams = {
    /** 督查点名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSimpleSelectUserListParams = {
    /** 作业类型 */
    jobType?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSubmitLeaveParams = {
    /** 任务id */
    taskId: number;
  };

  type WechatCarDTO = {
    /** 车辆id */
    carId?: number;
    /** 车牌号 */
    carNumber?: string;
  };

  type WechatCarShiftSubmitParam = {
    /** 用户id */
    carId: number;
    /** 任务id */
    taskId: number;
  };

  type WechatClockingRecordDTO = {
    clockingId?: number;
    /** 打卡时间 */
    clockingTime?: string;
    /** 打卡人 */
    clockingUserName?: string;
  };

  type WechatDefaultShiftDTO = {
    cleaningCount?: number;
    duration?: number;
    jobDuration?: number;
    jobEndTime?: string;
    jobStartTime?: string;
    periodType?: string;
    periodValue?: string;
    planId?: number;
    ruleType?: string;
    ruleValue?: string;
    shiftId?: number;
    shiftName?: string;
    teamId?: number;
  };

  type WechatDepartmentDTO = {
    /** 部门id */
    departmentId?: number;
    /** 部门名称 */
    departmentName?: string;
  };

  type WechatFaceUrlVo = {
    /** 人脸id */
    faceId?: string;
    /** 链接 */
    url?: string;
  };

  type WechatGridPageDTO = {
    /** 网格颜色 */
    gridColor?: string;
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
    /** 网格坐标 */
    gridPoint?: string;
    /** 网格坐标系集合 */
    gridPointList: number[][];
    /** 对象列表 */
    objectList?: WechatObjectUserVo[];
    /** 督查点列表 */
    pointList?: WechatInspectionPointVo[];
  };

  type WechatGridUserDTO = {
    /** 网格颜色 */
    gridColor?: string;
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
    /** 网格坐标 */
    gridPoint?: string;
    /** 网格坐标系集合 */
    gridPointList: number[][];
    /** 对象列表 */
    objectList?: WechatObjectUserVo[];
  };

  type WechatGridVo = {
    gridId?: number;
    gridName?: string;
  };

  type WechatIndexQueryBaseBoardParams = {
    /** 项目id */
    projectId: number;
    /** 角色(PROJECT_MANAGER-项目经理,CAPTAIN-队长,INSPECTOR-督察员) */
    role: string;
  };

  type WechatIndexQueryDataBoardParams = {
    /** 项目id */
    projectId: number;
    /** 统计日期 */
    statisticsTime: string;
  };

  type WechatIndexSelectBoardAttendanceInspectionTaskListParams = {
    /** 日期 */
    date: string;
    /** 作业类型 */
    jobType: string;
    /** 项目id */
    projectId: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatIndexSelectBoardInspectionTaskInfoParams = {
    /** 项目id */
    taskId: number;
  };

  type WechatIndexSelectBoardJobInspectionTaskListParams = {
    /** 日期 */
    date: string;
    /** 作业类型 */
    jobType: string;
    /** 项目id */
    projectId: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatIndexSelectInspectionObjectListParams = {
    /** 作业类型 */
    jobType: string;
    /** 对象名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
    /** 作业类型(all-应督查,inspection-已督查,unInspection-未督查,unRectification-未整改) */
    status: string;
  };

  type WechatIndexSelectInspectionUserListParams = {
    /** 作业类型(inspection-已督查,unInspection-未督查) */
    inspectionStatus?: string;
    /** 作业类型 */
    jobType: string;
    /** 项目id */
    projectId: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatIndexSelectInspectionUserStatisticParams = {
    /** 作业类型 */
    jobType: string;
    /** 项目id */
    projectId: number;
  };

  type WechatIndexSelectJobObjectInfoParams = {
    /** 对象id */
    objectId: number;
    /** 类型(inspection-督查,job-排班) */
    type: string;
  };

  type WechatIndexSelectJobObjectListParams = {
    /** 作业类型 */
    jobType: string;
    /** 对象名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
    /** 角色(PROJECT_MANAGER-项目经理,CAPTAIN-队长) */
    role: string;
    /** 作业类型(noShift-未排班,shift-已排版,unInspection-未督查,unRectification-未整改) */
    status?: string;
  };

  type WechatIndexSelectJobObjectStatisticParams = {
    /** 作业类型 */
    jobType: string;
    /** 项目id */
    projectId: number;
    /** 角色(PROJECT_MANAGER-项目经理,CAPTAIN-队长) */
    role: string;
  };

  type WechatIndexSelectJobUserListParams = {
    /** 作业类型 */
    jobType: string;
    /** 项目id */
    projectId: number;
    /** 角色(PROJECT_MANAGER-项目经理,CAPTAIN-队长) */
    role: string;
    /** 作业类型(shift-已排班,noShift-未排班) */
    shiftStatus?: string;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatIndexSelectJobUserStatisticParams = {
    /** 作业类型 */
    jobType: string;
    /** 项目id */
    projectId: number;
    /** 角色(PROJECT_MANAGER-项目经理,CAPTAIN-队长) */
    role: string;
  };

  type WechatIndexSelectUserInspectionInfoParams = {
    /** 项目id */
    projectId: number;
    /** 人员id */
    userId: number;
  };

  type WechatIndexSelectUserShiftInfoParams = {
    /** 项目id */
    projectId: number;
    /** 人员id */
    userId: number;
  };

  type WechatInspectionPointDTO = {
    /** 详细地址 */
    fullAddress?: string;
    /** 网格id */
    gridId?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 督察点名称 */
    name?: string;
    /** 督查点id */
    pointId?: number;
    /** 点位类型 */
    pointType?: string;
  };

  type WechatInspectionPointInfo = {
    /** 详细地址 */
    fullAddress?: string;
    /** 网格id */
    gridId?: number;
    /** 主键id */
    id?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 督查点名称 */
    name?: string;
    /** 督查点类型 */
    pointType?: string;
  };

  type WechatInspectionPointSaveParam = {
    /** 详细地址 */
    addr?: string;
    /** 负责人id列表 */
    chargeUserIds?: string;
    /** 督察类型(must:必查点，census:普查点，other:其它) */
    inspectionType?: string;
    /** 主键id */
    objectId?: number;
    /** 督查点名称 */
    objectName?: string;
    planBindingInParams?: SimpleWechatPlanBindingInParam;
    /** 项目编码 */
    projectCode?: string;
    /** 项目id */
    projectId?: number;
    /** 对象坐标集合 */
    routePointList?: number[][];
    /** 督查点类型 */
    sceneType?: string;
    /** 类型(Manual_cleaning:人工清扫，Vehicle_operation:车辆作业) */
    type?: string;
  };

  type WechatInspectionPointTaskDTO = {
    /** 详细地址 */
    fullAddress?: string;
    /** 是否存在问题 */
    inspectionIsProblem?: number;
    /** 督查点状态 */
    inspectionStatus?: string;
    /** 督查任务列表 */
    inspectionTaskList?: WechatInspectionPointTaskVo[];
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 督察点名称 */
    name?: string;
    /** 督查点id */
    pointId?: number;
  };

  type WechatInspectionPointTaskVo = {
    /** 是否存在问题(0-否,1-是) */
    inspectionIsProblem?: number;
    /** 督查状态(undone-未督查,done-已督查) */
    inspectionStatus?: string;
    /** 督查任务id */
    taskId?: number;
  };

  type WechatInspectionPointVo = {
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 督查点id */
    pointId?: number;
    /** 督察点名称 */
    pointName?: string;
    /** 任务id */
    taskId?: number;
  };

  type WechatInspectionProblemDTO = {
    label?: string;
    type?: string;
    typeValue?: string;
    value?: string;
  };

  type WechatInspectionRecordVo = {
    /** 实际督查时间 */
    createTime?: string;
    /** 文件列表 */
    files?: WechatSysFileVo[];
    /** 督查时间 */
    inspectionTime?: string;
    /** 是否存在问题 */
    isProblem?: number;
    /** 问题项 */
    problemItem?: string;
    /** 督查记录id */
    recordId?: number;
    /** 备注 */
    remarks?: string;
  };

  type WechatInspectionResultUploadParam = {
    /** 图片链接 */
    imageUrls: string[];
    /** 是否存在问题(0-否，1-是) */
    inspectionIsProblem?: number;
    /** 督查任务id */
    inspectionTaskId: number;
    /** 督查时间 */
    inspectionTime: string;
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 问题项 */
    problemItem?: string;
    /** 备注 */
    remarks?: string;
    /** 视频链接 */
    videoUrl?: string;
  };

  type WechatInspectionTaskDTO = {
    /** 车牌号 */
    carNumber?: string;
    endTime?: LocalTime;
    /** 头像链接 */
    headUrl?: string;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 手机号 */
    phone?: string;
    /** 点位名称 */
    pointName?: string;
    /** 班次名称 */
    shiftName?: string;
    startTime?: LocalTime;
    /** 督查任务id */
    taskId?: number;
    /** 姓名 */
    userName?: string;
  };

  type WechatInspectionTaskInfo = {
    /** 督查记录列表 */
    inspectionRecordList?: WechatInspectionRecordVo[];
    /** 督查任务id */
    taskId?: number;
    /** 督查时间 */
    taskInspectionTime?: string;
  };

  type WechatInspectionTimeVo = {
    /** 督查时间 */
    inspectionTime?: string;
    /** 是否完成(0-否,1-是) */
    isDone?: number;
  };

  type WechatInspectionUserDTO = {
    /** 督察员姓名 */
    name?: string;
    /** 作业任务id */
    taskIds?: string;
    /** 督察员id */
    userId?: number;
  };

  type WechatInspectionUserStatisticDTO = {
    /** 已督查 */
    inspectionUser?: number;
    /** 未督查 */
    noInspectionUser?: number;
  };

  type WechatInspectionUserVo = {
    /** 督察员id */
    inspectionUserId?: number;
    /** 督察员姓名 */
    inspectionUserName?: string;
  };

  type WechatJobInspectionPlanUpdateParam = {
    /** 主键id */
    id?: number;
    /** 督察人id */
    inspectorUserId?: number;
    /** 质量督察时间 */
    qualityTime?: string;
  };

  type WechatJobInspectionTaskDTO = {
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
    /** 督查任务列表 */
    inspectionTaskList?: WechatJobInspectionTaskVo[];
  };

  type WechatJobInspectionTaskVo = {
    /** 车牌号 */
    carNumber?: string;
    /** 结束时间 */
    endTime?: string;
    /** 督查任务id */
    inspectionTaskId?: number;
    /** 督查时间 */
    inspectionTime?: string;
    /** 督查时间列表 */
    inspectionTimeList?: WechatInspectionTimeVo[];
    /** 对象名称 */
    objectName?: string;
    /** 手机号 */
    phone?: string;
    /** 督查点名称 */
    pointName?: string;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 姓名 */
    userName?: string;
  };

  type WechatJobObjectDTO = {
    inspectionStatus?: string;
    /** 对象id */
    objectId?: number;
    /** 对象名称 */
    objectName?: string;
    rectificationStatus?: string;
    taskId?: string;
  };

  type WechatJobObjectInfo = {
    /** 应作业时长 */
    jobDuration?: number;
    /** 对象id */
    objectId?: number;
    /** 对象名称 */
    objectName?: string;
    /** 班次列表 */
    shiftList?: WechatJobObjectVo[];
    /** 排班数 */
    shiftNum?: number;
    /** 未督查次数 */
    unInspectionCount?: number;
    /** 未整改次数 */
    unRectificationCount?: number;
  };

  type WechatJobObjectStatisticDTO = {
    actualInspection?: number;
    inspection?: number;
    noShiftObject?: number;
    shiftObject?: number;
    unInspection?: number;
    unRectification?: number;
  };

  type WechatJobObjectVo = {
    actualCount?: number;
    /** 车牌 */
    carNumber?: string;
    /** 结束时间 */
    endTime?: string;
    inspectionCount?: number;
    /** 应作业时长 */
    jobDuration?: number;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 任务id */
    taskId?: number;
    /** 未督查次数 */
    unInspectionCount?: number;
    /** 未整改次数 */
    unRectificationCount?: number;
    /** 人员名称 */
    userName?: string;
  };

  type WechatJobPlanInspectionDTO = {
    /** 人员电话 */
    excutorUserPhone?: string;
    /** 头像链接 */
    headUrl?: string;
    /** 对象id */
    objectId?: number;
    /** 计划id */
    planId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatJobPlanUpdateParam = {
    /** 督查时间 */
    inspectionTime: string;
    /** 计划id */
    inspectionUserId: number;
    /** 计划id */
    planId: number;
  };

  type WechatJobStatusSelectClockingListByUserIdParams = {
    /** 人员id */
    userId: number;
  };

  type WechatJobStatusSelectJobTaskInfoParams = {
    /** 车辆id */
    carId?: number;
    /** 作业类型 */
    jobType: string;
    /** 人员id */
    userId?: number;
  };

  type WechatJobStatusSelectShiftListByUserIdParams = {
    /** 车辆id */
    carId?: number;
    /** 日期 */
    date: string;
    /** 人员id */
    userId?: number;
  };

  type WechatJobStatusSelectTrackByTaskIdParams = {
    /** 人员id */
    taskId: number;
  };

  type WechatJobStatusSelectUserMapListParams = {
    /** 作业类型 */
    jobType: string;
    /** 项目id */
    projectId: number;
    /** 角色 */
    role: string;
    /** 类型(user-人员,car-车辆) */
    type: string;
  };

  type WechatJobTaskAddParam = {
    /** 车辆id */
    carId?: number;
    /** 日期id */
    date: string;
    /** 结束时间 */
    endTime: string;
    /** 网格id */
    gridId: number;
    /** 对象id */
    objectId?: number;
    /** 点位id */
    pointId?: number;
    /** 项目id */
    projectId: number;
    /** 开始时间 */
    startTime: string;
    /** 人员id */
    userId: number;
  };

  type WechatJobTaskInfo = {
    /** 车牌号 */
    carNumber?: string;
    /** 结束时间 */
    endTime?: string;
    /** 网格名称 */
    gridName?: string;
    /** 头像链接 */
    headUrl?: string;
    /** 是否请假(0-否,1-是) */
    isLeave?: number;
    /** 作业类型 */
    jobType?: string;
    /** 督查点名称/对象名称 */
    name?: string;
    /** 电话 */
    phone?: string;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 任务id */
    taskId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatJobTaskMapInfo = {
    /** 网格颜色 */
    gridColor?: string;
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
    /** 网格坐标 */
    gridPoint?: string;
    /** 网格坐标系集合 */
    gridPointList: number[][];
    /** 对象列表 */
    objectList?: WechatJobTaskObjectMapVo[];
    /** 点位列表 */
    pointList?: WechatInspectionPointVo[];
  };

  type WechatJobTaskObjectMapVo = {
    /** 几何类型(1:点，2:线，3.面) */
    geometryType?: number;
    /** 头像链接 */
    headUrl?: string;
    /** 对象颜色 */
    objectColor?: string;
    /** 对象id */
    objectId?: number;
    /** 对象名称 */
    objectName?: string;
    /** 对象点位 */
    routePoint?: string;
    /** 对象点位坐标集合 */
    routePointList?: number[][];
    /** 描边宽度 */
    strokeWidth?: number;
    /** 任务id */
    taskId?: number;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatJobTaskShiftDTO = {
    /** 结束时间 */
    endTime?: string;
    /** 应作业时长 */
    jobDuration?: number;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 任务id */
    taskId?: number;
  };

  type WechatJobTaskUserDTO = {
    endTime?: LocalTime;
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
    /** 任务结束时间 */
    jobEndTime?: string;
    /** 任务开始时间 */
    jobStartTime?: string;
    /** 人员列表 */
    jobTaskUserList?: WechatJobTaskUserVo[];
    /** 班次id */
    shiftId?: number;
    /** 班次名称 */
    shiftName?: string;
    startTime?: LocalTime;
    /** 总人数 */
    total?: number;
  };

  type WechatJobTaskUserVo = {
    /** 车牌号 */
    carNumber?: string;
    /** 头像链接 */
    headUrl?: string;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatJobUserStatisticDTO = {
    /** 未排班人员 */
    noShiftUser?: number;
    /** 脱岗 */
    offJobUser?: number;
    /** 离线 */
    offlineUser?: number;
    /** 在岗 */
    onJobUser?: number;
    /** 已排版人员 */
    shiftUser?: number;
  };

  type WechatObjectDTO = {
    /** 详细地址 */
    addr?: string;
    /** 几何类型(1:点，2:线，3.面) */
    geometryType?: number;
    /** 对象颜色 */
    objectColor?: string;
    /** 对象id */
    objectId?: number;
    /** 对象名称 */
    objectName?: string;
    /** 对象类型 */
    objectType?: string;
    /** 对象点位 */
    routePoint?: string;
    /** 对象点位坐标集合 */
    routePointList?: number[][];
    /** 描边宽度 */
    strokeWidth?: number;
  };

  type WechatObjectPlanInfo = {
    chargeUserList?: SimpleWechatChargeUserVo[];
    objectId?: number;
    planBindingList?: WechatPlanBindingVo[];
  };

  type WechatObjectUserVo = {
    /** 几何类型(1:点，2:线，3.面) */
    geometryType?: number;
    /** 对象颜色 */
    objectColor?: string;
    /** 对象id */
    objectId?: number;
    /** 对象名称 */
    objectName?: string;
    /** 对象点位 */
    routePoint?: string;
    /** 对象点位坐标集合 */
    routePointList?: number[][];
    /** 描边宽度 */
    strokeWidth?: number;
  };

  type WechatPlanBindingVo = {
    carId?: number;
    carNumber?: string;
    gridId?: number;
    gridName?: string;
    inspectionUserList?: WechatInspectionUserVo[];
    planIds?: string;
    shiftList?: WechatDefaultShiftDTO[];
    userId?: number;
    userName?: string;
  };

  type WechatProjectDTO = {
    /** 项目中心点纬度 */
    latitude?: string;
    /** 项目中心点经度 */
    longitude?: string;
    /** 人员库id */
    personGroupId?: number;
    /** 项目编码 */
    projectCode?: string;
    /** 项目id */
    projectId?: number;
    /** 项目名称 */
    projectName?: string;
    /** 项目类型 */
    projectType?: string;
  };

  type WechatProjectManagerDeletePointParams = {
    /** 点位id */
    pointId: number;
  };

  type WechatProjectManagerSelectAttendanceInspectionPlanInfoParams = {
    /** 计划id */
    planId: number;
  };

  type WechatProjectManagerSelectGridListByProjectParams = {
    /** 网格名称 */
    gridName?: string;
    /** 作业类型 */
    jobType: string;
    /** 项目id */
    projectId: number;
  };

  type WechatProjectManagerSelectGridListParams = {
    /** 督查类型 */
    gridId?: number;
    /** 作业类型 */
    jobType?: string;
    /** 项目id */
    projectId?: number;
  };

  type WechatProjectManagerSelectInspectionPointInfoParams = {
    /** 督查点id */
    pointId: number;
  };

  type WechatProjectManagerSelectInspectionPointsByGridIdParams = {
    /** 作业网格id */
    gridId?: number;
    /** 督查点名称 */
    pointName?: string;
    /** 项目id */
    projectId?: number;
    /** 班次id */
    shiftId?: number;
  };

  type WechatProjectManagerSelectInspectionUserListParams = {
    /** 项目id */
    projectId: number;
  };

  type WechatProjectManagerSelectJobInspectionPlanInfoParams = {
    /** 计划id */
    planId: number;
  };

  type WechatProjectManagerSelectJobInspectionPlanListParams = {
    /** 作业网格id */
    gridId: number;
    /** 作业类型 */
    jobType: string;
    /** 对象id */
    objectId?: number;
    /** 督查点为id */
    pointId?: number;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
  };

  type WechatProjectManagerSelectJobPlanInspectionListParams = {
    /** 作业网格id */
    gridId: number;
    /** 作业类型 */
    jobType: string;
    /** 对象id */
    objectId?: number;
    /** 督查点为id */
    pointId?: number;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatProjectManagerSelectJobPlanShiftListParams = {
    /** 作业网格id */
    gridId: number;
    /** 作业类型 */
    jobType: string;
  };

  type WechatProjectManagerSelectObjectPlanInfoParams = {
    /** 对象id */
    objectId: number;
  };

  type WechatProjectManagerSelectPointListParams = {
    /** 作业网格id */
    gridId?: number;
    /** 督查点名称 */
    pointName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatProjectManagerSelectShiftListParams = {
    /** 作业类型 */
    jobType: string;
    /** 对象id */
    objectId?: number;
    /** 项目id */
    projectId: number;
  };

  type WechatProjectManagerSelectUserListByProjectParams = {
    /** 项目id */
    projectId: number;
  };

  type WechatProjectManagerSimpleSelectAllUserListParams = {
    /** 负责人id */
    chargeUserIds?: string;
    /** 作业类型 */
    jobType?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatProjectManagerSimpleSelectObjectListParams = {
    /** 督查点名称 */
    objectName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatProjectManagerSimpleSelectObjectPageListParams = {
    /** 当前页 */
    current: number;
    /** 作业类型 */
    jobType: string;
    /** 对象名称 */
    objectName?: string;
    /** 督查点名称 */
    objectType?: string;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type WechatRectificationRecordDTO = {
    inspectionUserName?: string;
    objectName?: string;
    problemItem?: string;
    rectificationRecordId?: number;
    status?: number;
    updateTime?: string;
  };

  type WechatRectificationRecordInfo = {
    inspectionFiles?: WechatSysFileVo[];
    inspectionRemarks?: string;
    inspectionTime?: string;
    rectificationFiles?: WechatSysFileVo[];
    rectificationRecordId?: number;
    remarks?: string;
  };

  type WechatShiftPageDTO = {
    endTime?: LocalTime;
    /** 班组id */
    shiftId?: number;
    /** 班组名称 */
    shiftName?: string;
    startTime?: LocalTime;
  };

  type WechatShiftSubmitParam = {
    /** 任务id */
    taskId: number;
    /** 用户id */
    userId: number;
  };

  type WechatShiftUserAddParam = {
    /** 车辆id */
    carId?: number;
    /** 日期 */
    date: string;
    /** 网格id */
    gridId: number;
    /** 对象id */
    objectId?: number;
    /** 点位id */
    pointId?: number;
    /** 班次id */
    shiftId: number;
    /** 人员id */
    userId: number;
  };

  type WechatShiftUserDTO = {
    /** 已排班人员 */
    arrangedUsers?: WechatUserTaskDTO[];
    leave?: number;
    /** 未排班人员 */
    noArrangedUsers?: WechatUserTaskDTO[];
    shift?: number;
  };

  type WechatSysFileVo = {
    /** 文件类型(1-图片，2-视频) */
    type?: string;
    /** 文件链接 */
    url?: string;
  };

  type WechatTencentPersonFaceQueryPersonFaceInfoParams = {
    /** 人员id */
    userId: number;
  };

  type WechatTencentPersonFaceQueryPersonFaceListParams = {
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatTencentPersonFaceSelectDepartmentByPhoneParams = {
    /** 项目id */
    projectId: number;
  };

  type WechatTencentPersonFaceSelectPersonFaceInfoParams = {
    /** 人员id */
    userId: number;
  };

  type WechatTencentPersonFaceSelectPersonFaceListParams = {
    /** 部门id */
    departmentId?: number;
    /** 项目id */
    projectId: number;
    /** 人员姓名 */
    userName?: string;
    /** 用户类型 */
    userType: string;
  };

  type WechatUserCarMapDTO = {
    /** 车辆id */
    carId?: number;
    /** 车牌号 */
    carNumber?: string;
    /** 车辆类型 */
    carType?: string;
    /** 是否脱岗 */
    isOffJob?: number;
    /** 是否离线 */
    isOffline?: number;
    /** 是否在岗 */
    isOnJob?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 手机号 */
    phone?: string;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
    /** 类型 */
    userType?: string;
  };

  type WechatUserCarMapInfo = {
    /** 作业时长 */
    actualJobDuration?: number;
    /** 作业里程 */
    actualJobMileage?: number;
    /** 车牌号 */
    carNumber?: string;
    /** 结束时间 */
    endTime?: string;
    /** 实际作业时长 */
    jobDuration?: number;
    projectId?: number;
    /** 开始时间 */
    startTime?: string;
    taskId?: number;
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatUserDTO = {
    /** 头像链接 */
    headUrl?: string;
    organizations?: string;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatUserFaceDTO = {
    /** 性别 */
    gender?: string;
    /** 人脸照片数 */
    imageNum?: number;
    /** personId */
    personId?: string;
    urlStr?: string;
    /** 图片链接 */
    urls?: string[];
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatUserFaceInfo = {
    /** 性别 */
    gender?: string;
    /** 图片列表 */
    imageList?: WechatFaceUrlVo[];
    /** 人脸信息id */
    personId?: string;
    /** 人脸图片列表 */
    urls?: string[];
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatUserInspectionDTO = {
    headUrl?: string;
    inspectionStatus?: string;
    status?: number;
    userId?: number;
    userName?: string;
  };

  type WechatUserInspectionInfo = {
    /** 实际督查次数 */
    actualCount?: number;
    actualInspectionCount?: number;
    /** 应督查次数 */
    inspectionCount?: number;
    /** 督查列表 */
    inspectionList?: WechatUserInspectionVo[];
    /** 未督查次数 */
    unInspectionCount?: number;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatUserInspectionVo = {
    /** 实际督查次数 */
    actualCount?: number;
    /** 结束时间 */
    endTime?: string;
    inspectionCount?: number;
    /** 对象名称 */
    objectName?: string;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    taskId?: number;
    /** 未督查次数 */
    unInspectionCount?: number;
  };

  type WechatUserQueryAllotRecordOverviewParams = {
    /** 项目id */
    projectId: number;
  };

  type WechatUserQueryAllotRecordPageListParams = {
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
    /** 项目id */
    projectId: number;
  };

  type WechatUserReadMessageParams = {
    /** ids */
    ids?: string;
  };

  type WechatUserSelectUserProjectsParams = {
    /** 角色code */
    role: string;
  };

  type WechatUserSelectUserRolesParams = {
    /** 项目id */
    projectId?: number;
  };

  type WechatUserShiftDTO = {
    /** 头像链接 */
    headUrl?: string;
    isOffJob?: number;
    isOffline?: number;
    isOnJob?: number;
    /** 任务id */
    taskId?: number;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatUserShiftInfo = {
    /** 预警次数 */
    allotCount?: number;
    /** 作业时长 */
    jobDuration?: number;
    /** 班次列表 */
    shiftList?: WechatUserShiftVo[];
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatUserShiftVo = {
    /** 车牌 */
    carNumber?: string;
    /** 结束时间 */
    endTime?: string;
    /** 作业时长 */
    jobDuration?: number;
    /** 对象名称 */
    objectName?: string;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 任务id */
    taskId?: number;
  };

  type WechatUserTaskDTO = {
    /** 头像链接 */
    headUrl?: string;
    /** 任务id */
    taskId?: number;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
    /** 人员类型 */
    userType?: string;
  };
}
