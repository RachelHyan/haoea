<template>
  <div class="media-report">
    <div class="container">
      <div class="title">
        媒体报道
      </div>
      <div

        class="card-container"
      >
        <div
          v-for="item in mediaData"
          :key="item.title"
          class="card-item"
        >
          <img
            :src="item.cardUrl"
            alt=""
          >
          <div class="right-contents">
            <a
              :href="item.jumpUrl"
              class="card-title"
            >{{ item.title }}</a>
            <span class="card-content">
              {{ item.newsPaper }}
            </span>
            <a
              :href="item.jumpUrl"
              class="card-more"
            >More</a>
          </div>
        </div>
      </div>
      <button
        class="btn"
        @click="getMore"
      >
        了解更多
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref, Ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MediaReport",
  setup () {
    let mediaData: Ref<Data[]> = ref<Data[]>([]);
    let router = useRouter();

				interface Data {
					title: string;
					cardUrl: string;
					newsPaper: string;
					createTime: string;
					jumpUrl: string;
				}

				onMounted(() => {
				  getMediaData()
				})

				const getMediaData = async () => {
		  	const { data, } = await axios.get("/api/feishu/news/list", {
				    params: {
				      classifyLabel: "media",
				      current: 1,
				      pageSize: 3,
				    },
		  	});
		  	mediaData.value = data.data;
				};

				const getMore = () => {
				  router.push("/news-information")
				}

				return {mediaData,getMore,}
  },
})
</script>

<style scoped lang="less">
.media-report{
	height: 420px;
	background-image: url("https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fditu.png");
	background-size: cover;	
	box-sizing: border-box;
	padding: 17px;
	.container{
		.title {
			font-size: 15px;
			font-weight: 800;
			color: #fff;
			margin-bottom: 20px;
		}
		.card-container {
			.card-item {
				height: 95px;
				background-color: #fff;
				border-radius: 5px;
				box-sizing: border-box;
				display: flex;
				padding: 10px 0;
				margin-bottom: 10px;
				img {
					width: 108px;
					margin-left:10px
				}
				.right-contents {
					display: flex;
					flex-direction: column;
					padding: 0 18px;
					justify-content: space-between;
					.card-title{
						font-size:8px;
						font-weight: 800;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						display: -webkit-box;
						color: #333;
					}
					.card-content {
						font-size: 7px;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						display: -webkit-box;
					}
					.card-more {
						font-size: 7px;
						color: #000;
					}
				}
			}
		}
		.btn {
			width: 102px;
			height: 28px;
			display: block;
			background-color: transparent;
			color: #fff;
			font-size: 11px;
			font-weight: bold;
			border-radius: 5px;
			border: 1px solid #fff;
			letter-spacing: 5px;
			margin: 14px auto 22px;
		}
	}
}
</style>
