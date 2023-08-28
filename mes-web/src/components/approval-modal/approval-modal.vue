<template>
  <div class="approval-modal">
    <div class="approval-modal-wrapper">
      <div class="approval-modal--left">
        <div class="modal--left-title">
          <span>{{ dialogData.applyTime.split('-')[1] + '月' + dialogData.applyTime.split('-')[2] + '日' }}</span>
          <span v-if="dialogData.applyUserName">申请人员：{{ dialogData.applyUserName }}</span>
        </div>
        <el-descriptions
          :column="1"
          size="small"
          border
          class="modal--left-descriptions"
        >
          <div v-if="listData.applyType === 'card' || dialogData.attendanceStatus === 'abnormal'">
            <el-descriptions-item
              label="班次名称"
              label-align="right"
            >
              {{ listData.shiftName || dialogData.shiftName }}
            </el-descriptions-item>
            <el-descriptions-item
              label="状态"
              label-align="right"
            >
              <div class="modal--left-descriptions--status">
                <span
                  :style="{ backgroundColor: tipColorList.filter(item => item.value === dialogData.attendanceStatus)[0] ? tipColorList.filter(item => item.value === dialogData.attendanceStatus)[0].color : '#BE0D0D' }"
                />
                {{ tipColorList.filter(item => item.value === dialogData.attendanceStatus)[0] ? tipColorList.filter(item => item.value === dialogData.attendanceStatus)[0].label : '异常'
                }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              label="班次时间"
              label-align="right"
            >
              {{ listData.shiftTime || dialogData.shiftTime }}
            </el-descriptions-item>
            <el-descriptions-item
              label="工作进度"
              label-align="right"
            >
              <el-progress
                :percentage="listData.workData ? Math.round(listData.workData) : dialogData.workData ? Math.round(dialogData.workData) : 0"
                color="#5C5C5C"
                :stroke-width="10"
              />
            </el-descriptions-item>
            <el-descriptions-item
              v-if="dialogData.attendanceStatus !== 'vacate' && dialogData.attendanceStatus !== 'normal'"
              label="异常原因"
              label-align="right"
              style="color: #BE0D0D;"
            >
              {{ listData.abnormalCause || dialogData.abnormalCause }}
            </el-descriptions-item>
            <el-descriptions-item
              label="作业人员"
              label-align="right"
            >
              {{ dialogData.userName }}
            </el-descriptions-item>
          </div>
          <div v-else-if="listData.applyType === 'leave'">
            <el-descriptions-item
              label="作业网格"
              label-align="right"
            >
              {{ listData.gridName }}
            </el-descriptions-item>
            <el-descriptions-item
              label="作业对象"
              label-align="right"
            >
              {{ listData.objectName }}
            </el-descriptions-item>
            <el-descriptions-item
              label="请假班次"
              label-align="right"
            >
              {{ listData.shiftName }}
            </el-descriptions-item>
            <el-descriptions-item
              label="请假时间"
              label-align="right"
            >
              {{ listData.times }}
            </el-descriptions-item>
            <el-descriptions-item
              label="作业人员"
              label-align="right"
            >
              {{ dialogData.userName }}
            </el-descriptions-item>
          </div>
          <div v-else-if="listData.applyType === 'overtime'">
            <el-descriptions-item
              label="作业网格"
              label-align="right"
            >
              {{ listData.gridName }}
            </el-descriptions-item>
            <el-descriptions-item
              label="作业对象"
              label-align="right"
            >
              {{ listData.objectName }}
            </el-descriptions-item>
            <el-descriptions-item
              label="加班时间"
              label-align="right"
            >
              {{ listData.times }}
            </el-descriptions-item>
            <el-descriptions-item
              label="作业人员"
              label-align="right"
            >
              {{ dialogData.userName }}
            </el-descriptions-item>
          </div>
          <div v-else-if="listData.applyType === 'shift'">
            <el-descriptions-item
              label="调班人员"
              label-align="right"
            >
              {{ listData.shfitUserName }}
            </el-descriptions-item>
            <el-descriptions-item
              label="作业网格"
              label-align="right"
            >
              {{ listData.gridName }}
            </el-descriptions-item>
            <el-descriptions-item
              label="作业对象"
              label-align="right"
            >
              {{ listData.objectName }}
            </el-descriptions-item>
            <el-descriptions-item
              label="班次时间"
              label-align="right"
            >
              {{ listData.shiftTime }}
            </el-descriptions-item>
            <el-descriptions-item
              label="原作业人员"
              label-align="right"
            >
              {{ dialogData.userName }}
            </el-descriptions-item>
          </div>
        </el-descriptions>
        <div class="modal-left-content">
          <div
            v-if="listData.dealStatus !== 0"
            class="modal--left--result"
          >
            <el-descriptions
              v-if="(listData.dealStatus === 1 || listData.dealStatus === 2) && dialogData.type !== 'attendance'"
              :column="1"
              size="small"
              border
              class="modal--left-descriptions"
            >
              {{ dialogData.type }}
              <el-descriptions-item
                label="审批人员"
                label-align="right"
              >
                <div v-if="listData.dealStatus !== 2">
                  <span>{{ listData.auditUserName }}</span>
                  <span>{{ listData.auditTime }}</span>
                </div>
                <div v-else>
                  未处理审批已过期
                </div>
              </el-descriptions-item>
            </el-descriptions>
            <template v-if="listData.dealStatus !== 2">
              <img
                v-if="listData.dealResult === 'done' || listData.dealResult === 'agree'"
                class="modal--left--result--img"
                src="@/assets/images/pass.png"
                alt=""
              >
              <img
                v-else-if="listData.dealResult === 'refuse' || listData.dealResult === 'cancel'"
                class="modal--left--result--img"
                src="@/assets/images/refuse.png"
                alt=""
              >
            </template>
            <template v-else-if="listData.dealStatus === 2">
              <img
                class="modal--left--result--img"
                src="@/assets/images/overdue.png"
                alt=""
              >
            </template>
            <p
              v-if="listData.dealStatus === 1"
              :style="{ color: (listData.dealResult === 'agree' || listData.dealResult === 'done' || dialogData.type === 'attendance') ? '#1D51F4' : '#E16A02', marginTop: '16px' }"
            >
              <span v-if="listData.applyType === 'card'">
                已处理：{{ listData.dealResult === 'agree' || listData.dealResult === 'done' ? '满勤' : dialogData.type ==
                  'attendance' ? dialogData.dealResult : '任务已取消'
                }}
              </span>
              <span v-else-if="listData.applyType !== 'card'">
                已处理：{{ listData.dealResult === 'agree' || listData.dealResult === 'done' ? '同意' : '拒绝' }}{{
                  getType(listData.applyType)
                }}
              </span>
            </p>
            <p
              v-else-if="listData.dealStatus === 2"
              style="color: #90929D;margin-top:16px"
            >
              已过期：超过审批时间
            </p>
          </div>
          <slot
            v-else-if="listData.dealStatus === 0"
            name="content"
          />
        </div>
      </div>
      <div class="approval-modal--right">
        <div class="modal--right-title">
          <span>{{ listData.gridName }}-{{ listData.objectName }}</span>
        </div>
        <div
          ref="mapRef"
          class="modal--right-map"
        >
          <div
            v-if="listData.applyType !== 'leave' && listData.clockInTime !== null"
            class="modal--right-map-time"
          >
            <el-icon
              color="#1D51F4"
              :size="23"
            >
              <LocationFilled />
            </el-icon>
            <span>打卡时间：上班{{ listData.clockInTime }} 下班{{ listData.clockOutTime }}</span>
          </div>
          <div
            v-if="listData.applyType === 'card'"
            class="modal--right-map-tags"
          >
            <div>预设作业轨迹 <span :style="{ background: '#B9C8E5' }" /></div>
            <div>实际作业轨迹 <span :style="{ background: '#4783FE' }" /></div>
          </div>
          <div
            v-else
            class="modal--right-map-tags"
          >
            <div>作业对象 <span :style="{ background: listData.objectColor }" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { tipColorList } from "@/components";
import "@amap/amap-jsapi-types";
import { LocationFilled } from "@element-plus/icons-vue";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  name: "ApprovalModal",
  components: {
    LocationFilled,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    dialogData: {
      type: Object,
      default: () => ({}),
    },
    request: {
      type: Function,
      default: () => ({}),
    },
  },
  setup(props) {
    let map: AMap.Map;
    const mapRef: Ref<HTMLDivElement | string> = ref<HTMLDivElement | string>("");
    const listData = ref<any>({});
    const trackData = ref<any>([]);
    const locusTagShow: Ref<boolean> = ref<boolean>(false);
    const objTagShow: Ref<boolean> = ref<boolean>(false);
    const signInTimeShow: Ref<boolean> = ref<boolean>(false);
    let gridPolygon: AMap.Polygon;
    let objPolyline: AMap.Polyline;
    let trackPolyline: AMap.Polyline;
    let trackPolylineArr: AMap.Polyline[] = [];


    const getType = (type: string) => {
      const types: any = {
        "card": "补卡",
        "shift": "调班",
        "leave": "请假",
      }
      return types[type] ?? "加班"
    }

    const getResult = (result: string) => {
      const types: any = {
        "agree": "同意",
        "refuse": "拒绝",
        "done": "满勤",
      }
      return types[result] ?? "排班已取消"
    }

    const init = async () => {
      if (props.request && typeof props.request === "function") {
        try {
          const { data, } = await props.request(props.dialogData)
          listData.value = data
          if (listData.value.trackJson) {
            trackData.value = JSON.parse(listData.value.trackJson)
          }
          initMap()
        } catch (error) {
          console.error(error)
        }
      }
    }

    const initMap = async () => {
      await lazyAMapApiLoaderInstance;
      map = new AMap.Map(mapRef.value);
      drawMap();
    }

    const drawMap = () => {
      gridPolygon = new AMap.Polygon({
        path: listData.value.gridPointList,
        strokeColor: listData.value.gridColor,
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: listData.value.gridColor,
        fillOpacity: 0.2,
        bubble: true,
      })
      objPolyline = new AMap.Polyline({
        path: listData.value.routePointList,
        strokeColor: "#B9C8E5",
        strokeOpacity: 1,
        strokeWeight: listData.value.strokeWidth,
      })
      trackData.value && trackData.value.forEach((item: any) => {
        if (item.done === true) {
          trackPolyline = new AMap.Polyline({
            path: [item.ps, item.pt],
            strokeColor: "#4783FE",
            strokeStyle: "solid",
            strokeWeight: 5,
            strokeOpacity: 1,
          })
          trackPolylineArr.push(trackPolyline)
        }
      })

      map.add(gridPolygon);
      map.add(objPolyline);
      map.add(trackPolylineArr)
      let res = map.getFitZoomAndCenterByBounds(objPolyline?.getBounds() as AMap.Bounds);
      map.setZoomAndCenter(res[0] - 1, res[1]);
    }

    init();

    return {
      mapRef,
      listData,
      locusTagShow,
      objTagShow,
      signInTimeShow,
      tipColorList,
      getType,
      getResult,
    }
  },
})
</script>

<style lang="less">
.app-dialog .el-dialog__body {
	padding: 0;
}

.approval-modal {
	width: 100%;

	&-wrapper {
		width: 100%;
		padding: 24px 48px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	&--left {
		width: calc(100% - 405px - 24px);
		height: 100%;

		.modal--left-title {
			font-size: 14px;
			font-weight: 500;
			color: #181B28;
			padding-bottom: 16px;

			:first-child {
				padding-right: 5px;
			}
		}

		.modal--left-descriptions {
			.el-descriptions__label {
				width: 106px;
			}

			.el-progress {
				width: 141px;
			}

			.el-progress__text {
				font-size: 12px !important;
			}

			&--status {
				display: flex;
				align-items: center;

				span {
					display: flex;
					width: 16px;
					height: 16px;
					margin-right: 4px;
				}
			}
		}


		.modal--left--result {
			margin-top: 24px;
			position: relative;

			span:nth-child(2) {
				margin-left: 15px;
			}

			&--img {
				width: 86px;
				height: 86px;
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}

		.el-descriptions__body .el-descriptions__table .el-descriptions__cell.is-right {
			width: 106px;
		}

		.el-descriptions--small .el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell {
			padding: 4px 16px 4px;
		}
	}

	&--right {
		width: 405px;
		height: 100%;
		position: relative;

		.modal--right-title {
			font-size: 14px;
			font-weight: 500;
			color: #181B28;
			padding-bottom: 16px;
			height: 18px;
		}

		.modal--right-map {
			width: 100%;
			height: 295px;
			position: relative;

			:first-child {
				padding-right: 5px;
			}

			&-time {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 32px;
				background: rgba(255, 255, 255, 0.83);
				backdrop-filter: blur(2px);
				display: flex;
				align-items: center;
				padding-left: 16px;
				font-size: 12px;
				color: #51565D;
				line-height: 17px;
				z-index: 1;
			}

			&-tags {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 32px;
				background: rgba(255, 255, 255, 0.83);
				backdrop-filter: blur(2px);
				display: flex;
				align-items: center;
				padding-left: 16px;
				font-size: 12px;
				color: #51565D;
				line-height: 17px;
				z-index: 1;

				:first-child {
					padding: 0;

					span {
						margin: 0 28px 0 8px;
						padding: 0;
						width: 30px;
						height: 8px;
						display: inline-block;
						background: #B9C8E5;
						border: 1px solid #7F91B2;
					}
				}

				:nth-child(2) {

					span {
						margin-left: 8px;
						padding: 0;
						width: 30px;
						height: 8px;
						display: inline-block;
						background: #4783FE;
						border: 1px solid #1D51F4;
					}
				}
			}
		}
	}
}
</style>
