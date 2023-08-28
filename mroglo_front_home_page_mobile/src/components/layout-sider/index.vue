<template>
  <div class="layout-sider">
    <div class="layout-sider-header">
      <div class="layout-sider-close">
        <van-icon
          name="cross"
          color="#fff"
          :size="12"
          @click="$emit('hidden')"
        />
      </div>
    </div>
    <ul class="layout-sider-list van-hairline--top">
      <li
        v-for="(item,index) in siderData"
        :key="index"
        class="layout-sider-item van-hairline--bottom"
      >
        <div
          class="layout-sider-item-info"
          @click="item.unfold = !item.unfold"
        >
          <p
            v-if="item.children"
            class="layout-sider-item-name"
          >
            {{ item.name }}
          </p>
          <router-link
            v-else
            :to="item.path"
            class="layout-sider-item-name"
          >
            {{ item.name }}
          </router-link>
          <template v-if="item.children">
            <van-icon
              v-show="item.unfold"
              name="cross"
              color="#CCC"
              :size="14"
            />
            <van-icon
              v-show="!item.unfold"
              name="plus"
              color="#CCC"
              :size="14"
            />
          </template>
        </div>
        <template v-if="item.children">
          <div
            v-show="item.unfold"
            class="layout-sider-item-children"
          >
            <p
              v-for="(c,j) in item.children"
              :key="j"
              class="layout-sider-children-item"
            >
              <router-link
                :to="c.path"
                class="layout-sider-item-name"
              >
                {{ c.name }}
              </router-link>
            </p>
          </div>
        </template>
      </li>
      <li class="layout-sider-item van-hairline--bottom">
        <p class="layout-sider-item-info">
          <a
            href="https://www.zhipin.com/gongsi/04a5322012b7fc281XV42t27FVs~.html?ka=search_list_company_11_custompage"
            target="_blank"
            class="layout-sider-item-name"
          >加入我们</a>
        </p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import type { Ref } from "vue";
import { defineComponent, ref, watch } from "vue";
import type { RouteLocationMatched } from "vue-router";
import { useRoute } from "vue-router";

type SiderItem = {
	path: string
	name: string
	children?: SiderItem[],
	unfold?: boolean
}

export default defineComponent({
  name:"LayoutSider",
  emits: ["hidden"],
  setup(props,{emit,}) {
    const route = useRoute()
    const siderData:Ref<SiderItem[]> = ref<SiderItem[]>([])

    siderData.value.push({
      path: "/home",
      name: "首页",
    })

    siderData.value.push({
      path: "/product",
      name: "产品",
      children: [
        {
          path: "/product-pilotless",
          name: "高级别无人驾驶环卫车",
        },
        {
          path: "/product-scheme",
          name: "公共环卫智慧解决方案",
        }
      ],
      unfold: false,
    })

    siderData.value.push({
      path: "/core-technology",
      name: "核心技术",
    })

    siderData.value.push({
      path: "/news-information",
      name: "新闻动态",
    })

    siderData.value.push({
      path: "/about-us",
      name: "关于我们",
    })

    const diffUnfold = (matched:RouteLocationMatched[]) => {
      let index = -1;
      siderData.value.forEach(({children,},i) => {
        if (children) {
          siderData.value[i].unfold = false
          children.forEach(({path,}) => {
            let find = matched.findIndex((item) => item.path === path)
            if (find != -1) {
              index = i
            }
          })
        }
      })
      if (index != -1) {
        siderData.value[index].unfold = true
      }
      emit("hidden")
    }
		
    diffUnfold(route.matched)
    watch(() => route.matched,diffUnfold)

    return {
      siderData,
    }
  },
})
</script>
<style lang="less">
.layout-sider {
	padding: 0 16px;

	&-header {
		height: 57px;
		position: relative;
	}
	&-close {
		width: 20px;
		height: 20px;
		background-color: #3E3A39;
		font-size: 12px;
		color: #fff;
		text-align: center;
		line-height: 20px;
		position: absolute;
		bottom: 8px;
		right: 0;
	}

	&-item {
		
		&-info {
			height: 38px;
			display: flex;
			padding-right: 4px;
			align-items: center;
			justify-content: space-between;
		}

		&-name {
			font-size: 14px;
			color: #808080;
		}

		.router-link-active {
			color: #231815;
		}

		&-children {
			padding: 0 14px;
		}

	}
	
	.layout-sider-children-item {
		height: 26px;
		display: flex;
		align-items: center;
	}
}
</style>
