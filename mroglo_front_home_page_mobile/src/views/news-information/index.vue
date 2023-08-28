<template>
  <div class="root-page news-information">
    <div class="top-banner">
      <div class="text">
        致力成为无人驾驶行业引领者
      </div>
    </div>
    <div class="tabs">
      <van-tabs
        v-model:active="active"
        line-height="0"
        @click-tab="handleClickTab"
      >
        <van-tab
          title="新闻中心"
        >
          <list :data="newsData" />
          <van-pagination
            v-if="newsData.length"
            v-model="newsCurrentPage"
            :total-items="newsTotal"
            :items-per-page="5"
            :show-page-size="newsPages"
            class="page"
            @change="newsPageChange"
          >
            <template #prev-text>
              <van-icon name="arrow-left" />
            </template>
            <template #next-text>
              <van-icon name="arrow" />
            </template>
            <template #page="{ text }">
              {{ text }}
            </template>
          </van-pagination>
        </van-tab>
        <van-tab
          title="媒体报道"
        >
          <list :data="mediaData" />
          <van-pagination
            v-if="mediaData.length"
            v-model="mediaCurrentPage"
            :total-items="mediaTotal"
            :items-per-page="5"
            :show-page-size="mediaPages"
            class="page"
            @change="mediaPageChange"
          >
            <template #prev-text>
              <van-icon name="arrow-left" />
            </template>
            <template #next-text>
              <van-icon name="arrow" />
            </template>
            <template #page="{ text }">
              {{ text }}
            </template>
          </van-pagination>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref, Ref } from "vue";
import List from "./components/list.vue";

export default defineComponent({
  name: "NewsInformation",
  components: { List, },
  setup() {
    const active: Ref<number> = ref<number>(0);
    let newsCurrentPage: Ref<number> = ref<number>(1);
    let mediaCurrentPage: Ref<number> = ref<number>(1);
    let newsData: Ref<Data[]> = ref<Data[]>([]);
    let mediaData: Ref<Data[]> = ref<Data[]>([]);
    const newsTotal:Ref<number> = ref<number>(0);
    const mediaTotal:Ref<number> = ref<number>(0);
    const newsPages:Ref<number> = ref<number>(0);
    const mediaPages:Ref<number> = ref<number>(0);

		interface Data {
				title: string;
				cardUrl: string;
				newsPaper: string;
				createTime: string;
				jumpUrl: string;
		}

		onMounted(() => {
		  getNewsData(newsCurrentPage.value);
		  getMediaData(mediaCurrentPage.value)
		});
		
		const getNewsData = async (newsCurrentPage:number) => {
		  const { data, } = await axios.get("/api/feishu/news/list", {
		    params: {
		      classifyLabel: "news",
		      current: newsCurrentPage,
		      pageSize: 5,
		    },
		  });
		  newsData.value = data.data;
		  newsTotal.value = data.total;
		  newsPages.value = data.pages;
		};

		const getMediaData = async (mediaCurrentPage:number) => {
		  const { data, } = await axios.get("/api/feishu/news/list", {
		    params: {
		      classifyLabel: "media",
		      current: mediaCurrentPage,
		      pageSize: 5,
		    },
		  });
		  mediaData.value = data.data;
		  mediaTotal.value = data.total;
		  mediaPages.value = data.pages;
		};

		const newsPageChange = (page: number) => {
		  newsCurrentPage.value = page;
		  window.scrollTo(0, 0);
		  getNewsData(newsCurrentPage.value)
		};
		
		const mediaPageChange = (page: number) => {
		  mediaCurrentPage.value = page;
		  window.scrollTo(0, 0);
		  getMediaData(mediaCurrentPage.value)
		};

		const handleClickTab = () => {
		  newsCurrentPage.value = 1;
		  newsPageChange(newsCurrentPage.value);
		  mediaCurrentPage.value = 1;
		  getMediaData(mediaCurrentPage.value)
		}

		return {
		  active,
		  newsData,
		  mediaData,
		  newsCurrentPage,
		  mediaCurrentPage,
		  mediaTotal,
		  newsTotal,
		  newsPages,
		  mediaPages,
		  newsPageChange,
		  mediaPageChange,
		  handleClickTab,
		};
  },
})
</script>

<style lang="less">
.news-information {
	.top-banner {
		background-image: url(https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/News%2Fnews-ct.png);
		background-size: cover;
		height: 265px;
		background-position: bottom center;
		.text {
			font-size: 17px;
			font-weight: 800;
			color: #FFF;
			word-spacing: 5px;
			text-align: center;
			padding-top: 52px;
		}
	}
	.tabs {
		.van-tabs__wrap {
			height: 33px;
		}
		.van-tabs__nav{
			width: 170px;
			margin: auto;
			height: 33px;
			padding-bottom: 0;
		}
		.van-tab--active {
			background-color: #e5e5e5;
		}
		.page {
			display: flex;
			justify-content: center;
			padding: 20px 0 60px;
			background-color: #fcfcfc;
			.van-pagination__item {
				min-width: 30px !important;
				height: 30px;
				border: 1px solid #333;
				border-radius: 5px;
				margin: 0 2px;
				color: #333;
				flex-grow: 0;
				&.van-pagination__item--active {
					background-color: #333;
					color: #fff;
				}
			}
			.van-pagination__item:not(:last-child):after {
				border: none;
			}
		}
	}
	.tabs-content {
		background-color: #fcfcfc;
		padding: 24px 22px;
		box-shadow: inset 0px 5px 5px 0 rgba(0, 0, 0, 0.1);
			.text {
				margin-bottom: 30px;
				background-color: #fff;
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
				a {
					color: #333;
				}
				.img {
					perspective: 500px;
					transform-style: preserve-3d;
					overflow: hidden;
					position: relative;
					img {
						width: 100%;
						transition: 1s;
					}
				}
				.details {
					padding: 23px 23px 15px;
					display: flex;
					flex-direction: column;
					.title {
						font-size: 15px;
						font-weight: bold;
						padding-bottom: 20px;
					}
					.con {
						font-size: 12px;
						padding-bottom: 27px;
					}
					.time {
						font-size:12px
					}
				}

			}
			.text:hover img {
				transform: scale(1.2);
			}
			
	}

}	
</style>
