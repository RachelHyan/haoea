<template>
  <div>
    <van-list
      class="tabs-content"
    >
      <div
        v-for="item in data"
        :key="item.title"
        class="text"
      >
        <a :href="item.jumpUrl">
          <div class="img">
            <img
              :src="item.cardUrl"
              alt=""
            >
          </div>
          <div class="details">
            <span class="title">
              {{ item.title }}
            </span>
            <span class="con">
              {{ item.newsPaper }}
            </span>
            <span class="time">
              {{ item.createTime }}
            </span>
          </div>
        </a>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ListData",
  props:{
    data:{
      type:Array as ()=>any[],
      default:() => [],
    },
  },
  setup() {
   

    

    return {

    };
  },
})
</script>

<style scoped>

</style>
