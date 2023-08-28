<template>
  <div class="cooperative-partner">
    <div class="title">
      城市之光生态合作伙伴
    </div>
    <div class="partners">
      <div
        v-for="value in imgs"
        :key="value"
        class="items"
      >
        <img
          :src="value"
          alt=""
          class="cooperative-partner-img"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CooperativePartner",
  setup () {
    const imgs = [
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-01.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-02.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-03.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-04.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-05.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-06.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-07.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-08.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-09.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-010.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-11.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-12.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-13.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-14.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fhezuo-15.png"
    ]

    return {
      imgs,
    }
  },
})
</script>

<style lang="less">
.cooperative-partner {
	padding: 40px 17px;
	.title {
		font-size: 15px;
		font-weight: 800;
		color: #333;
		margin-bottom: 20px;
	}
	.partners{
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		.items {
			border: 1px solid rgb(231,231,231);
		}
	}

	&-img {
		width: 100%;
		filter: brightness(0%) contrast(0%) saturate(100%) blur(0px) hue-rotate(0deg);

		&:hover {
			filter: none
		}
	}

}
</style>
