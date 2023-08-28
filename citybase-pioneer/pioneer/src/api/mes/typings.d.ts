declare namespace MES {
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
    pointId?: number;
    pointName?: string;
    shiftName?: string;
    startTime?: string;
    taskId?: number;
    taskInspectionTime?: string;
  };

  type BaseInfoReportDTO = {
    /** 网格数 */
    gridTotal: number;
    /** 项目人数 */
    projectPeopleTotal: number;
    /** 项目数 */
    projectTotal: number;
  };

  type CaptainRankingReportDTO = {
    /** 考勤完成率 */
    clockingFinishRate: number;
    /** 考勤督察率 */
    clockingInspectionRate: number;
    /** 所属组织 */
    orgName: string;
    /** 作业完成率 */
    qualityFinishRate: number;
    /** 作业督察率 */
    qualityInspectionRate: number;
    /** 队长名称 */
    userName: string;
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
    /** 车辆类型(sweep-清扫车，garbageIn-垃圾收运，garbageOut-垃圾转运，other-其它) */
    carType: string;
    /** 车辆负责人 */
    carUserName: string;
    /** 折扣年限 */
    depreciationLife: number;
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
    /** 车辆类型(sweep-清扫车，garbageIn-垃圾收运，garbageOut-垃圾转运，other-其它) */
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
    /** 车辆类型(sweep-清扫车，garbageIn-垃圾收运，garbageOut-垃圾转运，other-其它) */
    carType?: string;
    /** 负责人id */
    carUserId?: number;
    /** 折旧年限 */
    depreciationLife?: number;
    /** 项目id */
    projectId?: number;
    /** 购入日期 */
    purchaseTime?: string;
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
  };

  type DelLedgerFlowInParam = {
    /** 台账id集合 */
    ledgerIds?: number[];
  };

  type DelUserInParam = {
    /** 客户端id,同步负责人时使用 */
    clientId?: string;
    /** 项目id */
    projectId?: number;
    /** 删除人员集合 */
    users?: UserInVo[];
  };

  type DelUserOrgRelationInParam = {
    /** 组织id */
    orgId?: number;
    /** 项目id */
    projectId?: number;
    /** 人员id */
    userId?: number;
  };

  type DepartmentDelOrgParams = {
    /** 客户端id */
    clientId: string;
    /** 组织id */
    orgId: number;
  };

  type DepartmentQueryOrgInfoParams = {
    /** 组织id */
    orgId: number;
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
    /** 字典类型 */
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
    /** 设施名称 */
    facilityName?: string;
    /** 设施类型 */
    facilityType?: string;
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

  type GridFiltrateDTO = {
    /** 网格id */
    gridId: number;
    /** 网格名称 */
    gridName: string;
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
    /** 颜色 */
    color: string;
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
    /** 颜色 */
    color?: string;
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
  };

  type GridJobReportDTO = {
    /** 网格名称 */
    gridName: string;
    /** 作业完成率 */
    qualityFinishRate: number;
    /** 排班人数 */
    schedulTotal: number;
    /** 所属班组 */
    teamName: string;
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

  type IndexQuertPeopleJobReportParams = {
    /** 项目id */
    projectId: number;
  };

  type IndexQueryCaptainRankingReportParams = {
    /** 项目id */
    projectId: number;
  };

  type IndexQueryGridFiltrateListParams = {
    /** 项目id */
    projectId: number;
  };

  type IndexQueryGridJobReportParams = {
    /** 项目id */
    projectId: number;
  };

  type IndexQueryIndexDataBoardParams = {
    /** 项目id(不传，则传全部项目) */
    projectId?: number;
  };

  type IndexQueryPointMapReportParams = {
    /** 点位类型 */
    pointType?: string;
    /** 项目id */
    projectId: number;
  };

  type IndexQueryShiftJobReportParams = {
    /** 网格id */
    gridId: number;
    /** 项目id */
    projectId: number;
    /** 排序(1:倒序，0:正序) */
    sort: number;
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
    /** 点位id */
    pointId: number;
    /** 点位名称 */
    pointName: string;
    /** 点位类型 */
    pointType: string;
  };

  type InspectionPointInfo = {
    /** 详细地址 */
    fullAddress: string;
    /** 网格id */
    gridId: number;
    /** 网格名称 */
    gridName: string;
    /** 纬度 */
    latitude: string;
    /** 经度 */
    longitude: string;
    /** 点位id */
    pointId: number;
    /** 点位名称 */
    pointName: string;
    /** 点位类型 */
    pointType: string;
  };

  type InspectionPointInParam = {
    /** 详细地址 */
    fullAddress?: string;
    /** 网格id */
    gridId?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 点位id,编辑时传 */
    pointId?: number;
    /** 点位名称 */
    pointName?: string;
    /** 点位类型 */
    pointType?: string;
    /** 项目id */
    projectId?: number;
  };

  type InspectionPointVo = {
    latitude?: string;
    longitude?: string;
    pointName?: string;
  };

  type InspectionRecordVo = {
    createTime?: string;
    files?: SysFileVo[];
    inspectionTime?: string;
    inspectionUserName?: string;
    isProblem?: number;
    pointName?: string;
    recordId?: number;
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
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type InspectionTaskHandleParam = {
    /** 处理结果(cancel-确认取消，confirm-确认出勤，absence-确认缺勤) */
    result: string;
    /** 任务id */
    taskId: number;
  };

  type InspectionTaskSelectInspectionTaskListParams = {
    /** 当前页 */
    current: number;
    /** 日期 */
    endDate?: string;
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
    endTime?: string;
    excutorUserName?: string;
    gridColor?: string;
    gridName?: string;
    gridPoint?: string;
    gridPointList?: number[][];
    inspectionPointList?: InspectionPointVo[];
    inspectionRecordList?: InspectionRecordVo[];
    shiftName?: string;
    startTime?: string;
  };

  type JobInspectionVo = {
    actualCount?: number;
    inspectionCount?: number;
    inspectionIsProblem?: number;
    inspectionStatus?: string;
    taskId?: number;
  };

  type JobPlanInParam = {
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
    /** 督察点id */
    pointId?: number;
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
    /** 作业人员 */
    userId?: number;
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

  type LocalTime = {
    hour?: number;
    minute?: number;
    nano?: number;
    second?: number;
  };

  type OrgAndUserDTO = {
    /** 组织列表 */
    orgDTOList: OrgDTO[];
    /** 非组织人员列表 */
    userDTOList: UserDTO[];
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
    userId: number;
    /** 负责人姓名 */
    userName: string;
  };

  type OrgInParam = {
    /** 客户端id,同步负责人时使用 */
    clientId?: string;
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
    userId?: number;
  };

  type OrgTree = {
    /** 子集集合 */
    children?: OrgTree[];
    /** id */
    id?: Record<string, any>;
    /** 层级 */
    level: number;
    /** 组织名称 */
    orgName: string;
    /** 父级id */
    parentId?: Record<string, any>;
    /** 排序 */
    sort: number;
    /** 负责人id */
    userId: number;
    /** 负责人姓名 */
    userName: string;
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

  type PeopleAttendanceReportDTO = {
    /** 缺勤人数 */
    absenceTotal: number;
    /** 出勤人数集合 */
    attendanceList: number[];
    /** 出勤率集合 */
    attendanceRateList: number[];
    /** 出勤人数 */
    attendanceTotal: number;
    /** 平均出勤率 */
    averageAttendanceRate: number;
    /** 日期集合 */
    dateList: string[];
    /** 请假人数 */
    leaveTotal: number;
    /** 排班人数 */
    schedulTotal: number;
  };

  type PeopleJobReportDTO = {
    /** 平均作业时长 */
    averageJobTime: number;
    /** 平均作业时长集合 */
    averageJobTimeList: number[];
    /** 日期集合 */
    dateList: string[];
    /** 作业人数集合 */
    jobPeopleList: number[];
    /** 总体达标率 */
    reachStandardRate: number;
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

  type PlanInspectionInParam = {
    /** 考勤督察时间 */
    checkingInspectorTime?: string;
    /** 考勤督察员id */
    checkingInspectorUserId?: number;
    /** 计划id */
    planId?: number;
    /** 计划点位关联主键id */
    planPointId?: number;
    /** 质量督察时间 */
    qualityInspectorTime?: string;
    /** 质量督察员id */
    qualityInspectorUserId?: number;
  };

  type PlanInspectorUserDTO = {
    /** 督察员id */
    inspectorUserId: number;
    /** 督察员姓名 */
    inspectorUserName: string;
  };

  type PlanPointInfo = {
    /** 责任人名称 */
    chargeUserName: string;
    /** 计划点位关联主键id */
    planPointId: number;
    /** 点位id */
    pointId: number;
    /** 点位名称 */
    pointName: string;
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

  type PlanQueryPlanInspectorUserListParams = {
    /** 项目id */
    projectId: number;
    /** 都察员名称或手机号 */
    searchVal?: string;
  };

  type PlanQueryPlanPointBindingInfoParams = {
    /** 点位id */
    pointId: number;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
  };

  type PlanQueryPlanViewGridInfoShiftParams = {
    /** 作业网格id */
    gridId: number;
    /** 项目id */
    projectId: number;
    /** 班组id */
    teamId: number;
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
  };

  type PlanQueryPlanViewMapGridListParams = {
    /** 项目id */
    projectId: number;
  };

  type PlanQueryPlanViewShiftUserParams = {
    /** 作业网格id */
    gridId: number;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
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
    userPointList?: PlanUserInspectorVo;
  };

  type PlanUserInspectorPointVo = {
    /** 计划点位关联主键id */
    planPointId: number;
    /** 督察点id */
    pointId: number;
    /** 督察点名称 */
    pointName: string;
    /** 质量督察时间 */
    qualityInspectorTime: string;
    /** 质量督察员id */
    qualityInspectorUserId: number;
    /** 质量督察员姓名 */
    qualityInspectorUserName: string;
  };

  type PlanUserInspectorVo = {
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
  };

  type PointMapReportDTO = {
    /** 纬度 */
    latitude: number;
    /** 经度 */
    longitude: number;
    /** 点位名称 */
    pointName: string;
    /** 点位类型 */
    pointType: string;
    /** 点位绑定所属人员名称 */
    userNames: string;
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

  type ProjectDTO = {
    /** 甲方名称 */
    firstParty: string;
    /** 数据管理员 */
    projectClerkName: string;
    /** 项目编码 */
    projectCode: string;
    /** 项目id */
    projectId: number;
    /** 项目负责人手机号 */
    projectManagerMobile: string;
    /** 项目负责人 */
    projectManagerName: string;
    /** 项目名称 */
    projectName: string;
    /** 人事管理员 */
    projectPersonnelName: string;
  };

  type ProjectInfo = {
    /** 合同金额 */
    contractAmount: string;
    /** 甲方名称 */
    firstParty: string;
    /** 数据管理员 */
    projectClerkList: ProjectMemberDTO[];
    /** 项目编码 */
    projectCode: string;
    /** 项目id */
    projectId: number;
    /** 项目负责人id */
    projectManagerId: number;
    /** 项目负责人手机号 */
    projectManagerMobile: string;
    /** 项目负责人 */
    projectManagerName: string;
    /** 项目名称 */
    projectName: string;
    /** 人事管理员 */
    projectPersonnelList: ProjectMemberDTO[];
  };

  type ProjectInParam = {
    /** 合同金额 */
    contractAmount?: string;
    /** 甲方名称 */
    firstParty?: string;
    /** 数据管理员 */
    projectClerkList?: UserRoleInVo[];
    /** 项目id，编辑时传 */
    projectId?: number;
    projectManagerInfo?: UserRoleInVo;
    /** 项目名称 */
    projectName?: string;
    /** 人事管理员 */
    projectPersonnelList?: UserRoleInVo[];
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
    /** 项目负责人 */
    projectManagerName?: string;
    /** 项目名称 */
    projectName?: string;
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
    /** 项目id */
    projectId: number;
    /** 项目名称 */
    projectName: string;
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

  type ResultVo_BaseInfoReportDTO_ = {
    /** 状态码 */
    code: number;
    data: BaseInfoReportDTO;
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

  type ResultVo_IotCarRelationInfo_ = {
    /** 状态码 */
    code: number;
    data: IotCarRelationInfo;
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

  type ResultVo_LedgerFlowInfo_ = {
    /** 状态码 */
    code: number;
    data: LedgerFlowInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_CaptainRankingReportDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: CaptainRankingReportDTO[];
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

  type ResultVo_List_GridFiltrateDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: GridFiltrateDTO[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_List_GridJobReportDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: GridJobReportDTO[];
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

  type ResultVo_List_PointMapReportDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: PointMapReportDTO[];
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

  type ResultVo_List_ShiftJobReportDTO_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: ShiftJobReportDTO[];
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

  type ResultVo_Map_string_string_ = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: Record<string, any>;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_OrgAndUserDTO_ = {
    /** 状态码 */
    code: number;
    data: OrgAndUserDTO;
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

  type ResultVo_PeopleAttendanceReportDTO_ = {
    /** 状态码 */
    code: number;
    data: PeopleAttendanceReportDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_PeopleJobReportDTO_ = {
    /** 状态码 */
    code: number;
    data: PeopleJobReportDTO;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVo_PlanPointInfo_ = {
    /** 状态码 */
    code: number;
    data: PlanPointInfo;
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

  type ResultVo_ProjectInfo_ = {
    /** 状态码 */
    code: number;
    data: ProjectInfo;
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

  type ResultVo_UserVo_ = {
    /** 状态码 */
    code: number;
    data: UserVo;
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

  type ResultVo_WechatShiftUserDTO_ = {
    /** 状态码 */
    code: number;
    data: WechatShiftUserDTO;
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

  type ShiftDTO = {
    /** 考勤规则组名称 */
    checkingRuleGroupName: string;
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
  };

  type ShiftJobReportDTO = {
    /** 考勤完成率 */
    clockingFinishRate: number;
    /** 所属组织 */
    orgName: string;
    /** 作业完成率 */
    qualityFinishRate: number;
    /** 班次名称 */
    shiftName: string;
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
  };

  type SysFileVo = {
    type?: string;
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

  type UpdatePlanPointInParam = {
    /** 计划点位关联主键id */
    planPointId?: number;
    /** 质量督察时间 */
    qualityInspectorTime?: string;
    /** 质量督察员id */
    qualityInspectorUserId?: number;
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
    /** 开始时间 */
    startTime?: string;
    /** 用户id,多个英文逗号拼接 */
    userIds?: string;
    /** 人员姓名 */
    userName?: string;
    /** 用户类型 */
    userType?: string;
  };

  type UserImportUserBaseInfoParams = {
    /** 项目id */
    projectId: number;
  };

  type UserInParam = {
    /** 客户端id */
    clientId?: string;
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

  type UserInVo = {
    /** 手机号 */
    phone?: string;
    /** 人员id */
    userId?: number;
    /** 人员类型 */
    userType?: string;
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

  type UserOrgDTO = {
    /** 组织id */
    orgId: string;
    /** 组织名称 */
    orgName: string;
  };

  type UserProjectSwitchDTO = {
    /** 项目id */
    projectId: number;
    /** 项目名称 */
    projectName: string;
  };

  type UserQueryAllUserListParams = {
    /** 项目id */
    projectId: number;
    /** 人员姓名或手机号 */
    searchVal?: string;
  };

  type UserQueryOrgAndUserListParams = {
    /** 项目id */
    projectId: number;
    /** 组织名称或人员姓名或手机号 */
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

  type WechatAttendanceInspectionInfo = {
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
    pointName?: string;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
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

  type WechatCaptainSelectGridListByPhoneParams = {
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSelectGridListParams = {
    /** 督查类型 */
    gridId?: number;
    /** 项目id */
    projectId: number;
    /** 督查类型 */
    type?: string;
  };

  type WechatCaptainSelectInspectionPointListParams = {
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    pointName?: string;
    /** 项目id */
    projectId: number;
  };

  type WechatCaptainSelectInspectionShiftListParams = {
    /** 网格id */
    gridId: number;
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
    /** 是否未绑定督查点 */
    noPoint?: number;
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

  type WechatCaptainSelectJobTaskUserListParams = {
    /** 日期 */
    date: string;
    /** 网格或班次名称 */
    name?: string;
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
    /** 人员姓名 */
    userName?: string;
  };

  type WechatCaptainSubmitLeaveParams = {
    /** 任务id */
    taskId: number;
  };

  type WechatGridPageDTO = {
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
  };

  type WechatGridUserDTO = {
    /** 网格颜色 */
    gridColor?: string;
    /** 网格id */
    gridId?: number;
    /** 网格名称 */
    gridName?: string;
    /** 网格坐标集合 */
    gridPoint?: string;
    /** 网格坐标系集合 */
    gridPointList: number[][];
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
    /** 项目id */
    projectId: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatInspectionPointDTO = {
    /** 详细地址 */
    fullAddress?: string;
    /** 网格id */
    gridId?: number;
    /** 督查点id */
    id?: number;
    /** 纬度 */
    latitude?: string;
    /** 经度 */
    longitude?: string;
    /** 督察点名称 */
    name?: string;
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
    /** 项目id */
    projectId?: number;
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
    /** 督察员id */
    userId?: number;
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
    /** 结束时间 */
    endTime?: string;
    /** 督查任务id */
    inspectionTaskId?: number;
    /** 督查时间 */
    inspectionTime?: string;
    /** 督查时间列表 */
    inspectionTimeList?: WechatInspectionTimeVo[];
    /** 手机号 */
    phone?: string;
    /** 网格名称 */
    pointName?: string;
    /** 班次名称 */
    shiftName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 姓名 */
    userName?: string;
  };

  type WechatJobPlanInspectionDTO = {
    /** 人员电话 */
    excutorUserPhone?: string;
    /** 头像链接 */
    headUrl?: string;
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

  type WechatJobTaskAddParam = {
    /** 日期id */
    date: string;
    /** 结束时间 */
    endTime: string;
    /** 网格id */
    gridId: number;
    /** 开始时间 */
    startTime: string;
    /** 人员id */
    userId: number;
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
    /** 头像链接 */
    headUrl?: string;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatProjectDTO = {
    projectId?: number;
    projectName?: string;
  };

  type WechatProjectManagerSelectAttendanceInspectionPlanInfoParams = {
    /** 计划id */
    planId: number;
  };

  type WechatProjectManagerSelectGridListParams = {
    /** 督查类型 */
    gridId?: number;
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
    /** 督查点为id */
    pointId: number;
    /** 项目id */
    projectId: number;
    /** 班次id */
    shiftId: number;
  };

  type WechatProjectManagerSelectJobPlanInspectionListParams = {
    /** 作业网格id */
    gridId: number;
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
  };

  type WechatProjectManagerSelectPointListParams = {
    /** 作业网格id */
    gridId?: number;
    /** 督查点名称 */
    pointName?: string;
    /** 项目id */
    projectId: number;
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
    /** 日期 */
    date: string;
    /** 网格id */
    gridId: number;
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

  type WechatUserDTO = {
    /** 头像链接 */
    headUrl?: string;
    /** 人员id */
    userId?: number;
    /** 人员姓名 */
    userName?: string;
  };

  type WechatUserSelectUserProjectsParams = {
    /** 角色code */
    role: string;
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
