const formData = [
  {
    id: 1,
    data: [
      {value: "type", label: "中转站类型", valueType: "enum", valueEnum: [
        {label:"垃圾转运中转站",value: "垃圾转运中转站",},
        {label:"垃圾分类中转站",value: "垃圾分类中转站",},
        {label:"压缩装载中转站",value: "压缩装载中转站",},
        {label:"回收物中转站",value: "回收物中转站",}
      ],},
      {value: "floorArea", label: "占地面积", valueType: "string",append:"m²",},
      {value: "cost", label: "造价", valueType: "string",append:"元",},
      {value: "inspectStandard", label: "检查标准", valueType: "string",},
      {value: "startDate", label: "启用日期", valueType: "date",}
    ],
  },
  {
    id: 2,
    data: [
      {value: "type", label: "收集点类型", valueType: "enum", valueEnum: [
        {label:"可回收物收集点",value: "可回收物收集点",},
        {label:"有害垃圾收集点",value: "有害垃圾收集点",},
        {label:"厨余垃圾收集点",value: "厨余垃圾收集点",},
        {label:"其他垃圾收集点",value: "其他垃圾收集点",}
      ],},
      {value: "floorArea", label: "占地面积", valueType: "string",append:"m²",},
      {value: "cost", label: "造价", valueType: "string",append:"元",},
      {value: "inspectStandard", label: "检查标准", valueType: "string",},
      {value: "startDate", label: "启用日期", valueType: "date",}
    ],
  },
  {
    id: 3,
    data: [
      {value: "processMode", label: "处理方式", valueType: "string",},
      {value: "floorArea", label: "占地面积", valueType: "string",append:"m²",},
      {value: "runningCost", label: "年运行成本", valueType: "string",append:"元",},
      {value: "design", label: "设计处理能力", valueType: "string",append:"万t",},
      {value: "inspectStandard", label: "检查标准", valueType: "string",},
      {value: "startDate", label: "启用日期", valueType: "date",}
    ],
  },
  {
    id: 4,
    data: [
      {value: "user", label: "使用单位", valueType: "string",},
      {value: "floorArea", label: "占地面积", valueType: "string",append:"m²",},
      {value: "userTotal", label: "使用总人数", valueType: "string",append:"人",},
      {value: "inspectStandard", label: "检查标准", valueType: "string",},
      {value: "startDate", label: "启用日期", valueType: "date",}
    ],
  },
  {
    id: 5,
    data: [
      {value: "operatingUnit", label: "运营单位", valueType: "string",},
      {value: "floorArea", label: "占地面积", valueType: "string",append:"m²",},
      {value: "userTotal", label: "使用总人数", valueType: "string",append:"人",},
      {value: "inspectStandard", label: "检查标准", valueType: "string",},
      {value: "startDate", label: "启用日期", valueType: "date",}
    ],
  },
  {
    id: 6,
    data: [
      {value: "volume", label: "容积", valueType: "string",append:"L",},
      {value: "colour", label: "颜色", valueType: "string",},
      {value: "inspectStandard", label: "检查标准", valueType: "string",},
      {value: "startDate", label: "启用日期", valueType: "date",}
    ],
  },
  {
    id: 7,
    data: [
      {value: "inspectStandard", label: "检查标准", valueType: "string",},
      {value: "startDate", label: "启用日期", valueType: "date",}
    ],
  }
]


export default formData
