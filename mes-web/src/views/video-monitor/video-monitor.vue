<template>
  <div class="video-monitor">
    <div class="video-monitor__header">
      <div class="video-monitor__header-left">
        <img
          class="logo"
          :src="userInfo.$state.logo"
          alt=""
        >
        <div class="name">
          视频监控
        </div>
      </div>
      <div class="video-monitor__header-right">
        <img
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench-header-icon.png"
          alt=""
          width="24"
          height="24"
          @click="router.replace('/workbench')"
        >
        <div class="video-monitor__header-right__user">
          <div class="video-monitor__header-right__user-avatar">
            <el-avatar
              :src="userInfo.$state && userInfo.$state.headUrl"
              :size="32"
            />
          </div>
          <el-dropdown
            style="cursor: pointer;"
            @command="handleCommand"
          >
            <span class="video-monitor__header-right__user-name">
              {{ userInfo.$state ? userInfo.$state.userName : '未登录' }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="userCenter">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item command="project">
                  切换项目
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="video-monitor__body">
      <div class="video-monitor__body-aside">
        <el-input
          v-model="searchValue"
          class="video-monitor__body-aside__input"
          size="large"
          placeholder="请输入设备序列号"
          :prefix-icon="Search"
          clearable
          @change="fetchData"
        />
        <div class="video-monitor__body-aside__menu">
          <div
            class="video-monitor__body-aside__menu-header"
            @click="changeAllExpand"
          >
            <div class="video-monitor__body-aside__menu-header__title">
              全部设备
            </div>
            <el-icon
              size="10"
              :class="allVisible ? 'rotate180' : 'rotate0'"
            >
              <ArrowDownBold />
            </el-icon>
          </div>
          <div
            v-show="allVisible"
            class="video-monitor__body-aside__menu-body"
          >
            <div
              class="video-monitor__body-aside__menu-header"
              @click="venueVisible = !venueVisible"
            >
              <div class="video-monitor__body-aside__menu-header__title">
                场地设备
              </div>
              <el-icon
                size="10"
                :class="venueVisible ? 'rotate180' : 'rotate0'"
              >
                <ArrowDownBold />
              </el-icon>
            </div>
            <div
              v-for="item in videoList"
              v-show="venueVisible"
              :key="item.deviceSerial"
              class="video-monitor__body-aside__menu-body__item"
            >
              <div
                class="video-monitor__body-aside__menu-body__item__title"
                @click="changeExpand(item.deviceSerial)"
              >
                <span>{{ item.deviceName }}</span>
                <el-icon
                  size="10"
                  :class="curDeviceSerial === item.deviceSerial ? 'rotate180' : 'rotate0'"
                >
                  <ArrowDownBold />
                </el-icon>
              </div>
              <div
                v-for="child in item.list"
                v-show="curDeviceSerial === item.deviceSerial"
                :key="child.channelName"
                class="video-monitor__body-aside__menu-body__item__children"
                :class="curChannelNames.includes(child.channelName) ? 'active' : ''"
                @click="changeChannel(child)"
              >
                {{ child.channelName }}
              </div>
            </div>
            <div
              class="video-monitor__body-aside__menu-header"
              @click="vehicleVisible = !vehicleVisible"
            >
              <div class="video-monitor__body-aside__menu-header__title">
                车载设备
              </div>
              <el-icon
                size="10"
                :class="vehicleVisible ? 'rotate180' : 'rotate0'"
              >
                <ArrowDownBold />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="video-monitor__body-content">
        <div
          v-if="monitorActiveTab === 1"
          ref="fullscreenRef"
          class="video-monitor__body-content__top"
          :style="monitorBodyStyle"
        >
          <div
            v-for="(_,index) in 1"
            ref="videoContainerRef"
            :key="index"
            class="video-monitor__body-content__top-item"
          >
            <div
              :id="'video-container' + index"
              ref="plearRef"
              class="video-monitor__body-content__top-item__container"
            />
          </div>
        </div>
        <div
          v-if="monitorActiveTab === 4"
          ref="fullscreenRef"
          class="video-monitor__body-content__top"
          :style="monitorBodyStyle"
        >
          <div
            v-for="(_,index) in 4"
            ref="videoContainerRef"
            :key="index"
            class="video-monitor__body-content__top-item"
          >
            <div
              :id="'video-container' + index"
              ref="plearRef"
              class="video-monitor__body-content__top-item__container"
            />
          </div>
        </div>
        <div
          v-if="monitorActiveTab === 9"
          ref="fullscreenRef"
          class="video-monitor__body-content__top"
          :style="monitorBodyStyle"
        >
          <div
            v-for="(_,index) in 9"
            ref="videoContainerRef"
            :key="index"
            class="video-monitor__body-content__top-item"
          >
            <div
              :id="'video-container' + index"
              ref="plearRef"
              class="video-monitor__body-content__top-item__container"
            />
          </div>
        </div>
        <div class="video-monitor__body-content__bottom">
          <img
            v-for="item in monitorIconList"
            :key="item.value"
            class="monitor-model__header-item"
            :src="monitorActiveTab === item.value ? item.activeIcon : item.icon"
            alt=""
            width="42"
            height="42"
            @click="changeTab(item.value)"
          >
          <!-- <img
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/black-monitor-full-icon.png"
            alt=""
            width="42"
            height="42"
            @click="goFullscreen"
          > -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { idpWeChatLogout } from "@/api/idp/weChatLogoutController";
import { mesVideoQueryVideoDeviceList } from "@/api/mes/videoController";
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import { Search } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import EZUIKit from "ezuikit-js";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "VideoMonitor",
  setup () {
    const router = useRouter()
    const route = useRoute()
    const userInfo = useUserInfo();
    const project = useProject();
    const videoContainerRef = ref();
    const searchValue = ref("");
    const videoList = ref();
    const allVisible = ref(true);
    const venueVisible = ref(true);
    const vehicleVisible = ref(true);
    const monitorActiveTab = ref(4);
    const fullscreenRef = ref();
    const curDeviceSerial = ref("");
    // const isPlayer = ref<any>([]);
    const curChannelNames = ref<any[]>([]);
    let player = null as any;
    let players = [] as any;
    const plearRef = ref();


    const monitorIconList = [
      {value:1,icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/black-monitor-one-icon.png",activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-one-icon-active.png",},
      {value:4,icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/black-monitor-four-icon.png",activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-four-icon-active.png",},
      {value:9,icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/black-monitor-nine-icon.png",activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-nine-icon-active.png",}
    ]

    const monitorBodyStyle = computed(() => {
      const num = Math.sqrt(monitorActiveTab.value)
      return {
        gridTemplateColumns: `repeat(${num}, 1fr)`,
        gridTemplateRows: `repeat(${num}, 1fr)`,
        gap: "10px",
      }
    })

    onMounted(async() => {
      await	fetchData();
      initPlayer();
    })
		
    const handleCommand = (command: string | number | object) => {
      switch(command){
      case "userCenter": 
        router.replace("/user-center")
        break;
      case "project": 
        router.replace({ path: "/project-selection", query: { from: route.name as string, },})
        break;
      case "logout":
        handleLogout()
        break
      }
    }

    const handleLogout = () => {
      ElMessageBox.confirm("确定退出登录吗？", "提示", {
        type: "warning",
      })
        .then( () => {
          idpWeChatLogout()
          setTimeout(() => {
            userInfo.$reset();
            project.$reset();
            router.replace("/login");
          }, 100);
        
        })
        .catch(() => {
          // 取消
        })
			
    }

    const fetchData = async() => {
      try {
        const {data,} = await mesVideoQueryVideoDeviceList({deviceSerial: searchValue.value,})
        videoList.value = data
      } catch (error) {
				
      }
    }

    const changeExpand = (deviceSerial: string) => {
      if (curDeviceSerial.value === deviceSerial) {
        curDeviceSerial.value = ""
        return
      }
      curDeviceSerial.value = deviceSerial
    }

    const changeTab = async (value: number) => {
      curChannelNames.value = []
      monitorActiveTab.value = value

      for (let item of players) {
        if (item) {
          await item.stop();
        }
      }
      
      initPlayer();
    }

    const changeChannel = (val:any) => {
      if (curChannelNames.value.includes(val.channelName)) {
        return
      }
      // 判断players中是否存在null,存在则初始化,将当前的player替换到players中的第一个null中
      if (players.includes(null)) {			
        const i = players.indexOf(null)
        curChannelNames.value.push(val.channelName)
        // 去重
        curChannelNames.value = Array.from(new Set(curChannelNames.value))
				
        var rect = plearRef.value[i].getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;
        player = new EZUIKit.EZUIKitPlayer({
          id: "video-container" + i,
          accessToken: val.accessToken,
          width,
          height,
          url: val.liveUrl,
          header: [],
          template: "security",
        });
        players[i] = player

      } else {
        // 不存在null，则将当前选择的替换到players的最后一个
        players[players.length - 1].stop().then(() => {
          players[players.length - 1].play({
            url: val.liveUrl,
          })
        })

        // 替换当前的channelName到最后一个
        curChannelNames.value[curChannelNames.value.length - 1] = val.channelName
      }
    }

    const initPlayer = () => {
      players = [];
      // 初始化播放器
      for (let i = 0; i < monitorActiveTab.value; i++) {
        players.push(null);
      }
    }

    const changeAllExpand = () => {
      allVisible.value = !allVisible.value

      venueVisible.value = false
      vehicleVisible.value = false
      curDeviceSerial.value = ""
    }

    fetchData()

    return {
      Search,
      videoContainerRef,
      router,
      userInfo,
      project,
      searchValue,
      videoList,
      allVisible,
      venueVisible,
      vehicleVisible,
      monitorIconList,
      monitorActiveTab,
      fullscreenRef,
      monitorBodyStyle,
      curDeviceSerial,
      // isPlayer,
      curChannelNames,
      plearRef,
      handleCommand,
      changeTab,
      changeExpand,
      fetchData,
      changeChannel,
      changeAllExpand,
    }
  },
})
</script>

<style lang="less">
.video-monitor {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: #F6F8FA;

	&__header {
		width: 100vw;
		height: 64px;
		background-color: #fff;
		border-bottom: 1px solid #D6D6D6;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&-left {
			font-size: 22px;
			font-weight: 500;
			// color: #FFFFFF;
			display: flex;
			align-items: center;

			.logo {
				height: 45px;
				margin-right: 20px;
			}
		}
		
		&-right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			height: 64px;

			img {
				cursor: pointer;
			}
			
			&__user{
				display: flex;
				align-items: center;
				margin-left: 50px;
				margin-right: 29px;
				
				&-avatar{
					width: 32px;
					height: 32px;
					margin-right: 5px;
				}
				&-name{
					color: #191919;
					font-size: 14px;
					font-weight: 500;
				}
			}
		}
	}

	&__body {
		flex: 1;
		width: 100vw;
		display: flex;

		&-aside {
			width: 374px;
			height: 100%;
			background-color: #fff;
			box-sizing: border-box;
			padding: 30px;

			.el-input {
				height: 56px;
			}

			.el-input--large {
				font-size: 20px;
			}

			.el-input__wrapper {
				background: rgba(255, 255, 255, .2);
				border-radius: 15px;
				// box-shadow: none;
			}

			.el-input__inner {
				background: #D0D0D0;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;

				&:-ms-input-placeholder {
					color: #FFF;
				}
			}

			&__menu {
				.rotate180 {
					transform: rotate(180deg);
					transition: transform 0.3s ease-in-out;
				}

				.rotate0 {
					transform: rotate(360deg);
					transition: transform 0.3s ease-in-out;
				}

				&-header {
					font-size: 18px;
					font-weight: 500;
					// color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: space-between;
					line-height: 60px;
					cursor: pointer;
				}

				&-body {
					padding-left: 30px;

					&__item {
						line-height: 40px;
						font-size: 18px;
						padding-left: 30px;

						&__title {
							display: flex;
							align-items: center;
							justify-content: space-between;
							cursor: pointer;
							
							span {
								width: 100%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}

						&__children {
							padding-left: 30px;
							cursor: pointer;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.active {
							color: #1C4996;
						}
					}
				}
			}
		}

		&-content {
			flex: 1;
			padding: 25px;
			padding-bottom: 0;
			display: flex;
			flex-direction: column;

			&__top {
				flex: 1;
				background: #fff;
				display: grid;
				box-sizing: border-box;

				&-item {
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					position: relative;
					background-image: url(https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/bg.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					background-position: center center;

					&__container {
						width: 100%;
						height: 100%;
					}
					

					&__number {
						position: absolute;
						top: 0;
						left:0;
						width: 100%;
						height: 60px;
						background: rgba(0, 0, 0, .5);
						line-height: 60px;
						padding-left: 24px;
						color: #fff;
						font-size: 16px;
						font-weight: 500;
						box-sizing: border-box;
					}
				}
			}

			&__bottom {
				width: 100%;
				height: 77px;
				background: #fff;
				border-radius: 5px 5px 0 0;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 25px;

				img {
					margin-right: 42px;
					cursor: pointer;
				}

				img:last-child {
					margin-right: 0;
				}
			}
		}
	}
}
</style>
