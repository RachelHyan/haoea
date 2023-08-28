<template>
  <div class="supervision-statistics  page-root">
    <card-header title="督查记录统计" />
    <div class="supervision-statistics-form">
      <el-date-picker
        v-model="daterange"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        :disabled-date="disabledDate"
      />
      <el-button
        type="primary"
        @click="remoteStatistics"
      >
        查询
      </el-button>
    </div>
    <div class="supervision-statistics-table">
      <el-table
        :data="tableData"
      >
        <el-table-column
          prop="inspectionUserName"
          label="姓名"
          width="90"
          align="center"
          fixed
        />
        <el-table-column
          v-for="item in tableColumn"
          :key="item"
          :label="item"
          align="center"
        >
          <el-table-column
            :prop="`inspectionCount-${item}`"
            label="应督查"
            width="100"
            align="center"
          />
          <el-table-column
            :prop="`doInspectionCount-${item}`"
            label="已督查"
            width="100"
            align="center"
          />
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { mesIndexQueryInspectionRecordStatisticData } from "@/api/mes/indexController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import { dayjs } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SupervisionStatistics",
  components: {
    CardHeader,
  },
  setup () {
    const project = useProject();
    const daterange = ref<string[]>([dayjs().subtract(6, "day").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
    const tableColumn = ref<string[]>([]);
    const tableData = ref<any[]>([]);
    
    const remoteStatistics = async () => {
      tableColumn.value = getDatesInRange(daterange.value[0], daterange.value[1]);
      const { data, } = await mesIndexQueryInspectionRecordStatisticData({projectId: project.$state.projectId as number,startDate: daterange.value[0],endDate: daterange.value[1],});
      tableData.value = data.map((item) => {
        const obj:any = {
          inspectionUserName: item.inspectionUserName,
        };
        item.list.forEach((j) => {
          obj[`inspectionCount-${j.inspectionDate}`] = j.inspectionCount
          obj[`doInspectionCount-${j.inspectionDate}`] = j.doInspectionCount
        });
        return obj;
      });
    };

    const disabledDate = (date:Date) => {
      return dayjs(date).isAfter(dayjs());
    };

    /**
     * 获取指定日期区间内的所有日期
     * @param {string} start 开始日期，格式为YYYY-MM-DD
     * @param {string} end 结束日期，格式为YYYY-MM-DD
     * @returns {string[]} 日期数组，格式为YYYY-MM-DD
    */
    const getDatesInRange = (start:string, end:string) => {
      const dates = [];

      // 获取开始时间和结束时间，并转换成dayjs对象
      const startDate = dayjs(start);
      const endDate = dayjs(end);

      // 遍历时间区间内的每一天，并将其格式化成YYYY-MM-DD格式后加入日期数组中
      let currentDate = startDate;
      while (currentDate.diff(endDate, "day") <= 0) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
      }

      return dates;
    };

    remoteStatistics();

    return {
      daterange,
      tableColumn,
      tableData,
      disabledDate,
      remoteStatistics,
    }
  },
})
</script>

<style lang="less">
.supervision-statistics-form {
  padding: 10px 24px;

  .el-button {
    vertical-align: top;
    margin-left: 12px;
  }
}
.supervision-statistics-table {
  // width: calc(100vw - 496px);
  padding: 10px 24px;

  .el-table thead.is-group th.el-table__cell {
    background-color: #fff;
  }
}
</style>
