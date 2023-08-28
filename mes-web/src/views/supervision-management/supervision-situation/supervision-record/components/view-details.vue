<template>
  <el-pro-dialog
    class="view-details"
    :model-value="modelValue"
    title="查看督查详情"
    :width="'50%'"
    @update:model-value="(val:boolean) => {$emit('update:modelValue',val)}"
  >
    <el-form
      ref="formRef"
      :model="detailData"
      :label-width="70"
    >
      <div>
        <el-row :gutter="20">
          <el-col
            v-for="item in writeColumns"
            :key="item.dataIndex"
            :span="12"
          >
            <el-form-item :label="item.title">
              <el-input
                v-if="item.valueType === 'string'"
                v-model="detailData[item.dataIndex]"
                disabled
              />
              <el-select
                v-else-if="item.valueType === 'enum'"
                v-model="detailData[item.dataIndex]"
                :clearable="true"
                :filterable="true"
                disabled
                style="width: 100%;"
              >
                <el-option
                  v-for="option in item.valueEnum"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="问题详情">
              <div v-if="!detailData.rectifierRecordList">
                暂无
              </div>
              <div v-else>
                <div
                  v-for="(item,index) in detailData.rectifierRecordList"
                  :key="index"
                  style="width:100%;"
                >
                  <span>{{ item.problemType }}：</span>
                  <span
                    v-for="(items,i) in item.list"
                    :key="i"
                    :style="{color:items.rectifierStatus === 1 ? 'green' : 'red'}"
                  >{{ items.problemItem }}<label
                    v-show="i !== item.list.length - 1"
                    style="color:#000"
                  >、</label></span>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="督查拍照">
              <div v-if="rectifierBeforePictureList.length === 0">
                暂无
              </div>
              <div
                v-else
                style="display:flex;"
              >
                <div
                  v-for="(img,index) in rectifierBeforePictureList"
                  :key="index"
                  style="display:flex;"
                >
                  <el-image
                    :src="img"
                    style="width: 90px; height: 90px; margin-right: 10px; cursor: pointer;"
                    :zoom-rate="1.2"
                    :preview-src-list="rectifierBeforePictureList"
                    :initial-index="index"
                    fit="cover"
                    preview-teleported
                  >
                    <template #error>
                      <span class="avatar-error">加载失败</span>
                    </template>
                  </el-image>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-if="detailData.inspection">
        <el-col>
          <el-form-item label="整改员">
            <div v-if="!detailData.rectifierRecordList">
              暂无
            </div>
            <div
              v-else
              style="display:flex;"
            >
              <div
                v-for="(item,index) in detailData.rectifierRecordList"
                :key="index"
                style="display:flex;"
              >
                <span
                  v-for="(items,i) in item.list"
                  :key="i"
                >{{ items.rectifierUserName }}<label
                  v-show="index !== detailData.rectifierRecordList.length - 1 || i !== item.list.length - 1"
                >；</label></span>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="整改照片">
            <div v-if="rectifierAfterPictureList.length === 0">
              暂无
            </div>
            <div
              v-else
            >
              <el-image
                v-for="(i, ii) in rectifierAfterPictureList"
                :key="ii"
                :src="i"
                style="width: 90px; height: 90px; margin-right: 10px; cursor: pointer;"
                :zoom-rate="1.2"
                :preview-src-list="rectifierAfterPictureList"
                :initial-index="ii"
                fit="cover"
                preview-teleported
              >
                <template #error>
                  <span class="avatar-error">加载失败</span>
                </template>
              </el-image>
            </div>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="整改情况">
            <div v-if="!detailData.rectifierRecordList">
              暂无
            </div>
            <div
              v-else
              style="display:flex;"
            >
              <div
                v-for="(item,index) in detailData.rectifierRecordList"
                :key="index"
                style="display:flex;"
              >
                <span
                  v-for="(items,i) in item.list"
                  :key="i"
                >
                  {{ items.rectifierUserName }}：{{ !items.rectifierStatus ? '未整改' : '已整改' }}
                  <label
                    v-show="index !== detailData.rectifierRecordList.length - 1 || i !== item.list.length - 1"
                  >；</label>
                </span>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </div>
    </el-form>	
    <template #footer>
      <div class="organization-dialog-footer">
        <el-button
          type="danger"
          plain
          @click="$emit('update:modelValue',false)"
        >
          取消
        </el-button>
      </div>
    </template>
  </el-pro-dialog>
</template>

<script lang="ts">
import { ProCrudWriteColumn } from "element-plus";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "ViewDetails",
  props:{
    modelValue:{
      type:Boolean,
      default:false,
    },
    data:{
      type:Object,
      default:() => ({}),
    },
  },
  emit:["update:modelValue"],
  setup (props) {
    const formRef = ref();
    const detailData = ref(props.data);
    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "对象",
        dataIndex: "pointName",
        valueType: "string",
      },
      {
        title: "督查员",
        dataIndex: "inspectionUserName",
        valueType: "string",
      },
      {
        title:"督查时间",
        dataIndex:"inspectionTime",
        valueType:"string",
      },
      {
        title:"存在问题",
        dataIndex:"inspection",
        valueType:"enum",
        valueEnum:[
          {
            label:"是",
            value:1,
          },
          {
            label:"否",
            value:0,
          }
        ],
      }
    ];

    const rectifierAfterPictureList = computed(() => {
      // 将多个整改后照片合并成一个数组
      const arr:any[] = [];
      if (!detailData.value.rectifierRecordList) return arr;
      detailData.value.rectifierRecordList.forEach((item:any) => {
        item.list.forEach((items:any) => {
          items.rectifierAfterPictureList?.forEach((i:any) => {
            arr.push(i);
          });
        });
      });
      return arr;
    });

    const rectifierBeforePictureList = computed(() => {
      // 将多个整改前照片合并成一个数组
      const arr:any[] = [];
      if (!detailData.value.rectifierBeforePictureList) return arr;
      detailData.value.rectifierBeforePictureList?.forEach((item:any) => {
        arr.push(item);
      });
      return arr;
    });

    return {
      formRef,
      writeColumns,
      detailData,
      rectifierAfterPictureList,
      rectifierBeforePictureList,
    }
  },
})
</script>

<style scoped>

</style>
