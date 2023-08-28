<template>
  <div class="layout-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :key="item.name"
        :to="{ name: item.name }"
      >
        {{ item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import type { RouteRecordName } from 'vue-router';
import { useRoute } from 'vue-router';

type Breadcrumb = {
	label:string
	name: RouteRecordName | undefined
}

export default defineComponent({
  name:'LayoutBreadcrumb',
  setup() {
    const route = useRoute()
    const breadcrumbs:Ref<Breadcrumb[]> = ref<Breadcrumb[]>([])

    breadcrumbs.value = route.matched.filter(({meta,}) => Boolean(meta.title)).map(({name,meta,}) => {
      return {
        name,
        label: meta.title,
      }
    })

    watch(() => route.matched,(value) => {
      breadcrumbs.value = value.filter(({meta,}) => Boolean(meta.title)).map(({name,meta,}) => {
        return {
          name,
          label: meta.title,
        }
      })
    })

    return {
      breadcrumbs,
    }
		
  },
})
</script>
<style lang="less">
.layout-breadcrumb {
	padding: 14px 24px;

	.el-breadcrumb {
		line-height: 20px;
	}
}
</style>
