<template>
  <div class="boot-load">
    <img
      src="@/assets/images/logo.png"
      alt="logo"
      style="width:180px"
      class="app-logo"
    >
    <h1 class="app-title">
      CityBase 运营平台
    </h1>
    <el-button
      type="warning"
      :icon="Star"
      circle
    />
    <el-icon><House /></el-icon>
  </div>
</template>

<script lang="ts">
import { authResourceGetRouters } from '@/api/auth/resourceController';
import { useUserInfo } from '@/stores/userInfo';
import { House, Star } from '@element-plus/icons-vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'BootLoad',
  components:{
    House,
  },
  setup () {
    const router = useRouter()
    const userInfo = useUserInfo()
    const path = ref<string>('/login')

    const getRouters = async () => {
      try {
        let params:{projectId?:number} = {}
        if (userInfo.$state.projectId) {
          params.projectId = userInfo.$state.projectId
        }
        const {data,} = await authResourceGetRouters(params)
        userInfo.$patch((state) => {
          state.siderMenu = data
        })
        path.value = data[0].path
        router.replace({path:path.value,})
      } catch (error) {
      }
    }
		
    if (userInfo.$state.siderMenu && userInfo.$state.siderMenu.length) {
      path.value = userInfo.$state.siderMenu[0].path
      router.replace({path:path.value,})
    } else {
      getRouters()
    }
    return {
      Star,
    }
  },
})
</script>

<style lang="less">
.boot-load {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  .app-title {
    color: var(--color-primary);
  }
}
</style>
