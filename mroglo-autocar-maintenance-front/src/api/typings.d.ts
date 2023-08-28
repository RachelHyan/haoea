declare namespace API {
  type banbenshengjiduixiang = {
    /** 车辆id */
    carId?: number;
    /** 新版本号 */
    newVersion?: string;
    /** 更新地址 */
    url?: string;
  };

  type banbenxinxiduixiang = {
    /** 新版本升级时间 */
    createTime: string;
    /** 当前版本号 */
    currentVersion: string;
    /** 新版本升级描述 */
    describe: string;
    /** 新版本号 */
    newVersion: string;
    /** 上次更新时间 */
    updateTime: string;
    /** 更新地址 */
    url: string;
    version?: boolean;
  };

  type caozuoyuanliebiaoduixiang = {
    /** 用户id */
    userId: number;
    /** 用户姓名 */
    userName: string;
  };

  type CarInfo = {
    /** 车辆编号 */
    carNumber: string;
    /** 车辆用户表主键id */
    carUserId: number;
    /** 车辆生产日期 */
    dateProduced: string;
    /** 车辆id */
    id: number;
    /** 初始里程 */
    mileage: number;
    /** 负责人 */
    principal: string;
    /** 负责人用户id */
    principalUserId: number;
    /** VIN码 */
    vinCode: string;
    /** 作业区域 */
    workArea: string;
    /** 作业区域编码 */
    workAreaCode: string;
  };

  type CheckIncidentParam = {
    /** 事件id */
    incidentId?: number;
  };

  type cheliangguzhangtongjiliebiaoduixiang = {
    /** 摄像头故障上报时间戳 */
    cameraFaultTs: number;
    /** 故障上报时间戳 */
    incidentTs: number;
    /** 摄像头故障信息 */
    info: shexiangtouguzhangxinxi[];
    /** 故障类型 */
    list: IncidentStatiVo[];
  };

  type cheliangxinxibiao = {
    /** 车辆编号 */
    carNumber: string;
    /** 创建人 */
    createBy: string;
    /** 创建时间 */
    createTime: string;
    /** 车辆生产日期 */
    dateProduced: string;
    delete?: boolean;
    /** 设备的deviceKey */
    deviceKey: string;
    /** 设备密钥 */
    deviceSecret: string;
    id?: number;
    /** 初始里程 */
    mileage: string;
    /** 产品的productKey */
    productKey: string;
    /** 更新人 */
    updateBy: string;
    /** 更新时间 */
    updateTime: string;
    /** VIN码 */
    vinCode: string;
    /** 作业区域 */
    workArea: string;
    /** 作业区域编码 */
    workAreaCode: string;
  };

  type cheliangzhuangtai = {
    /** 车辆故障状态 */
    fault: boolean;
    /** 电子驻车制动模式 */
    parkBrakeStatus: string;
    /** 上报时间戳 */
    ts: number;
    /** 车辆模式 */
    vehicleModel: string;
    /** 车辆状态 */
    vehicleStatus: string;
  };

  type cheliangzhuangtaiyunxingzhuangtaidianchizhuangtaiduixiang = dianchizhuangtai;

  type delUserUsingDELETEParams = {
    /** 用户id */
    userId: number;
  };

  type detuquyucheliangdianweiduixiang = {
    /** 车辆id */
    carId: number;
    /** 车辆编号 */
    carNumber: string;
    /** 物联平台设备key */
    deviceKey: string;
    /** 垃圾箱 */
    dustbin: string;
    /** 电量 */
    electric: string;
    /** 纬度 */
    latitude: number;
    /** 经度 */
    longtitude: number;
    /** 0：设备在线,1：设备离线,2：设备未激活 */
    status: string;
    /** 总里程 */
    totalMileage: string;
    /** 上报时间戳 */
    ts: number;
    /** 水量 */
    waterTank: string;
    /** 作业区域 */
    workArea: string;
    /** 作业状态 */
    workStatus: string;
  };

  type detuquyutongjiduixiang = {
    /** 物联平台设备key */
    deviceKeys: string;
    /** 在线车辆数 */
    onlineCount: number;
    /** 在线车辆集合 */
    onlineDeviceKeys: string[];
    /** 总车辆数 */
    total: number;
    /** 区域名称编码 */
    workAreaCode: string;
  };

  type dianchizhuangtai = {
    /** 电池温度 */
    batteryTemperature: number;
    /** 电流 */
    current: number;
    /** 电量 */
    electric: number;
    /** 上报时间戳 */
    ts: number;
    /** 电压 */
    voltage: number;
  };

  type fenpeicheliangduixiang = {
    /** 车辆编码 */
    carNumber?: string;
    /** 用户id */
    userId?: number;
  };

  type finishTaskUsingGETParams = {
    /** platformTaskId */
    platformTaskId: string;
  };

  type gengxincaozuoyuanduixiang = {
    /** 车辆用户表主键id */
    carUserId?: number;
    /** 用户id */
    userId?: number;
  };

  type guanliyuancheliangliebiaoduixiang = {
    /** 车辆id */
    carId: number;
    /** 车辆编号 */
    carNumber: string;
    /** 车辆用户表主键id */
    carUserId: number;
    /** 录入时间 */
    createTime: string;
    /** 物联平台设备key */
    deviceKey: string;
    /** 是否故障:true 是， flase 否 */
    fault: boolean;
    /** 负责人 */
    principal: string;
    /** 总里程 */
    totalMileage: string;
    /** 作业区域 */
    workArea: string;
    /** 作业状态 */
    workStatus: string;
  };

  type IncidentStatiVo = {
    /** 消息未读统计次数 */
    checkNum: number;
    /** 是否故障：true 是，false 否 */
    fault: boolean;
    /** 事件故障名称 */
    incidentName: string;
    /** 事件故障类型 */
    incidentType: string;
    /** 故障统计次数 */
    num: number;
  };

  type lishirenwuliebiaoduixiang = {
    /** 结束时间 */
    endTime: string;
    /** 开始时间 */
    startTime: string;
    /** 任务id */
    taskId: number;
    /** 任务名称 */
    taskName: string;
    /** 任务轨迹数据对象 */
    trackInfo: string;
  };

  type luyoupeizhixinxi = {
    /** 子路由 */
    children: luyoupeizhixinxi[];
    /** 设置该路由的图标，对应路径src/assets/icons/svg */
    icon: string;
    /** 路由id */
    id: number;
    /** 匹配路由的地址 */
    matched: string[];
    /** 路由名字 */
    name: string;
    /** 路由地址 */
    path: string;
    /** 设置该路由在侧边栏和面包屑中展示的名字 */
    title: string;
  };

  type PageResultListguanliyuancheliangliebiaoduixiang = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: guanliyuancheliangliebiaoduixiang[];
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

  type PageResultListshijianliebiaoduixiang = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: shijianliebiaoduixiang[];
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

  type PageResultListyonghucheliangliebiaoduixiang = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: yonghucheliangliebiaoduixiang[];
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

  type PageResultListyonghuliebiaoduixiang = {
    /** 状态码 */
    code: number;
    /** 当前页数 */
    current: number;
    /** 返回数据 */
    data: yonghuliebiaoduixiang[];
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

  type queryAdminCarPageListUsingGETParams = {
    /** 车辆编号 */
    carNumber?: string;
    /** 负责人 */
    principal?: string;
    /** 作业状态 */
    workStatus?: string;
    /** 是否故障:true 是， false 否，不传-全部 */
    fault?: string;
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
  };

  type queryCarFarultStatiInfoUsingGETParams = {
    /** 车辆id */
    carId: number;
  };

  type queryCarInfoUsingGETParams = {
    /** 车辆id */
    carId: number;
  };

  type queryCarVersionInfoUsingGETParams = {
    /** 车辆id */
    carId: number;
  };

  type queryElectrifyStatusUsingGETParams = {
    /** 车辆vin码 */
    vinCode: string;
  };

  type queryHistoryTaskListUsingGETParams = {
    /** 车辆id */
    carId: number;
    /** 日期 */
    taskTime: string;
  };

  type queryHistoryTrackByIdUsingGETParams = {
    /** 任务id */
    taskId: number;
  };

  type queryIncidentPageListUsingGETParams = {
    /** 车辆id */
    carId: number;
    /** 事件等级 */
    incidentLevel?: string;
    /** 事件类型 */
    incidentType?: string;
    /** 是否查看：1 已查看，0 未查看，不传 全部 */
    isCheck?: number;
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
  };

  type queryInfoByIdUsingGETParams = {
    /** 车辆id */
    carId: number;
  };

  type queryMapCarPointUsingGETParams = {
    /** 区域编码 */
    workArea?: string;
    /** 在线车辆集合 */
    onlineDeviceKeys?: string;
  };

  type queryOpratorUserListUsingGETParams = {
    /** 操作员名称 */
    userName?: string;
  };

  type queryRealTimeTrackUsingGETParams = {
    /** 车辆id */
    carId: number;
  };

  type queryTaskListUsingGETParams = {
    /** 任务名称 */
    taskName?: string;
  };

  type queryTaskTrackUsingGETParams = {
    /** 车辆id */
    carId: number;
  };

  type queryUserCarPageListUsingGETParams = {
    /** 车辆编号 */
    carNumber?: string;
    /** 作业状态 */
    workStatus?: string;
    /** 是否故障:true 是， flase 否，不传-全部 */
    fault?: string;
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
  };

  type queryUserInfoUsingGETParams = {
    /** 用户id */
    userId: number;
  };

  type queryUserPageListUsingGETParams = {
    /** 用户类型：COMMON_ADMIN-管理员，OPERATOR-操作员，不传-全部 */
    userType?: string;
    /** 真实姓名 */
    userName?: string;
    /** 工号 */
    jobNum?: string;
    /** 手机号 */
    mobile?: string;
    /** 当前页 */
    current: number;
    /** 每页条数 */
    pageSize: number;
  };

  type ResultVobanbenxinxiduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: banbenxinxiduixiang;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoboolean = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: boolean;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoCarInfo = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: CarInfo;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVocheliangguzhangtongjiliebiaoduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: cheliangguzhangtongjiliebiaoduixiang;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVocheliangxinxibiao = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: cheliangxinxibiao;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVocheliangzhuangtaiyunxingzhuangtaidianchizhuangtaiduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: {
			carStatusDTO:cheliangzhuangtai
			runStatusDTO:yunxingzhuangtai
			batteryStatusDTO:dianchizhuangtai
			deviceStatus: "online" | "offline"
		}
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoint = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: number;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoListcaozuoyuanliebiaoduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: caozuoyuanliebiaoduixiang[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoListdetuquyucheliangdianweiduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: detuquyucheliangdianweiduixiang[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoListdetuquyutongjiduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: detuquyutongjiduixiang[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoListlishirenwuliebiaoduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: lishirenwuliebiaoduixiang[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoListListdouble = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: number[][];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoListluyoupeizhixinxi = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: luyoupeizhixinxi[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoListzuoyerenwuliebiaoduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: zuoyerenwuliebiaoduixiang[];
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVostring = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: string;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoweizhishujuduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: weizhishujuduixiang;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoyonghuliebiaoduixiang = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: yonghuliebiaoduixiang;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type ResultVoyonghuxinxi = {
    /** 状态码 */
    code: number;
    /** 返回数据 */
    data: yonghuxinxi;
    /** 返回消息 */
    msg: string;
    /** 是否成功 */
    success: boolean;
  };

  type sendCodeUsingGETParams = {
    /** 手机号 */
    mobile: string;
  };

  type shangdianyuxiadianduixiang = {
    /** 车辆id */
    carId?: number;
    /** 0-下电，1-上电 */
    electrifyStatus?: number;
  };

  type shexiangtouguzhangxinxi = {
    /** 是否故障：true 是，false 否 */
    fault: boolean;
    /** 摄像头标识名称 */
    name: string;
  };

  type shijianliebiaoduixiang = {
    /** 创建时间 */
    createTime: string;
    /** 事件id */
    incidentId: number;
    /** 事件详情 */
    incidentInfo: string;
    /** 事件名称 */
    incidentName: string;
    /** 事件类型 */
    incidentType: string;
    /** 是否查看：1 已查看，0 未查看 */
    isCheck: number;
  };

  type tianjiacheliang = {
    /** 车辆生产日期 */
    dateProduced?: string;
    /** 初始里程 */
    mileage?: string;
    /** VIN码 */
    vinCode?: string;
    /** 作业区域编码 */
    workAreaCode?: string;
  };

  type tianjiayonghu = {
    /** 身份证号 */
    idCard?: string;
    /** 手机号 */
    mobile?: string;
    /** 密码 */
    passWord?: string;
    /** 真实姓名 */
    userName?: string;
    /** 用户类型：0-管理员，1-操作员 */
    userType?: string;
  };

  type verifyCodeUsingGETParams = {
    /** 手机号 */
    mobile: string;
    /** 验证码 */
    code: string;
  };

  type weizhishujuduixiang = {
    /** 纬度 */
    latitude: number;
    /** 经度 */
    longtitude: number;
    /** 轨迹集合 */
    tracks: number[][];
  };

  type xiafarenwuduixiang = {
    /** 车辆id */
    carId?: number;
    /** 任务名称 */
    taskName?: string;
    /** 预制任务id */
    vehicleTaskId?: string;
  };

  type xiugaimimaduixiang = {
    /** 新密码 */
    newPassWord?: string;
    /** 原密码 */
    oldPassWord?: string;
  };

  type yonghucheliangliebiaoduixiang = {
    /** 车辆id */
    carId: number;
    /** 车辆编号 */
    carNumber: string;
    /** 物联平台设备key */
    deviceKey: string;
    /** 垃圾箱 */
    dustbin: string;
    /** 电量 */
    electric: string;
    /** 0：设备在线,1：设备离线,2：设备未激活 */
    status: string;
    /** 总里程 */
    totalMileage: string;
    /** 水量 */
    waterTank: string;
    /** 作业区域 */
    workArea: string;
    /** 作业状态 */
    workStatus: string;
  };

  type yonghudengluduixiang = {
    /** 密码 */
    password?: string;
    /** 账号 */
    username?: string;
  };

  type yonghuliebiaoduixiang = {
    /** 车辆数 */
    carNum: number;
    /** 创建时间 */
    createTime: string;
    /** 工号 */
    jobNum: string;
    /** 手机号 */
    mobile: string;
    /** 操作员人数 */
    operatorNum: number;
    /** 用户id */
    userId: number;
    /** 真实姓名 */
    userName: string;
    /** 用户类型(管理员-COMMON_ADMIN,操作员-OPERATOR) */
    userType: string;
  };

  type yonghuxinxi = {
    /** 用户菜单权限信息 */
    permissions: string[];
    /** 用户角色信息 */
    roles: string[];
    /** 用户个人信息 */
    user: yonghuxinxibiao;
  };

  type yonghuxinxibiao = {
    admin?: boolean;
    /** 创建人 */
    createBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 用户id */
    id?: number;
    /** 身份证号 */
    idCard?: string;
    /** 是否删除(0-正常，1-删除) */
    isDelete?: number;
    /** 工号 */
    jobNum?: string;
    /** 姓名 */
    mobile?: string;
    /** 密码 */
    password?: string;
    /** 更新人 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 姓名 */
    userName?: string;
  };

  type yunxingzhuangtai = {
    /** 油门踏板 */
    acceleratorPedal: number;
    /** 大灯 */
    bigLamp: boolean;
    /** 制动灯 */
    brakeLamp: boolean;
    /** 制动踏板 */
    brakePedal: number;
    /** 车速 */
    carSpeed: number;
    /** 当次里程 */
    currentMileage: number;
    /** 垃圾箱 */
    dustbin: number;
    /** 紧急制动开关 */
    emergencyBrakeSwitch: number;
    /** EPB开关 */
    epb: boolean;
    /** 车内急停开关 */
    insideStopSwitch: number;
    /** 钥匙 */
    key: string;
    /** 左转向灯 */
    leftTurnLamp: boolean;
    /** 车外急停开关 */
    outsideStopSwitch: number;
    /** 位置灯 */
    placeLamp: boolean;
    /** 右转向灯 */
    rightTurnLamp: boolean;
    /** 总里程 */
    totalMileage: number;
    /** 上报时间戳 */
    ts: number;
    /** 水箱 */
    waterTank: number;
    /** 雨刮器 */
    wiper: boolean;
    /** 作业灯 */
    workLamp: boolean;
  };

  type zhongzhimimaduixiang = {
    /** 手机号 */
    mobile?: string;
    /** 密码 */
    passWord?: string;
  };

  type zuoyerenwuliebiaoduixiang = {
    /** 终点点位 */
    endPoint: string;
    /** 场景点数据 */
    scenePointData: string;
    /** 起始点位 */
    startPoint: string;
    /** 任务名称 */
    taskName: string;
    /** 任务类型 */
    taskType: string;
    /** 轨迹数据 */
    trackData: string;
    /** 预制任务id */
    vehicleTaskId: string;
  };
}
