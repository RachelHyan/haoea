<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts">
import { useDict } from "@/stores/dict";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { useCascader } from "./stores/cascader";

export default defineComponent({
  setup() {
    const dict = useDict();
    const cascader = useCascader();
    
    // 获取数据字典失败
    const fetchDict = async () => {
      try {
        await dict.fetch();
				
      } catch (error) {
        ElMessage.error("获取数据字典失败");
      }
    };  

    // 获取级联数据
    const fetchCascader = async () => {
      try {
        await cascader.fetch();
      } catch (error) {
        ElMessage.error("获取级联数据失败");
      }
    };

    fetchDict();
    fetchCascader();
    return {
      locale: zhCn,
    };
  },
});
</script>
