<template>
  <el-pro-dialog-form
    ref="formRef"
    :model-value="modelValue"
    :title="formMethods === 'update' ? '编辑' : '新增'"
    :form-model="formModel"
    :form-rules="formRules"
    :submit="submit"
    :pro-dialog-props="{width:'494px'}"
    @update:model-value="(val: boolean) => { $emit('update:modelValue', val) }"
    @closed="closed"
  >
    <template #form="{ model }">
      <el-divider
        content-position="left"
        class="form-title"
      >
        基础信息
      </el-divider>
      <el-form-item
        v-for="item in formColumns"
        :key="item.dataIndex"
        :label="item.title"
        :prop="item.dataIndex"
      >
        <el-input
          v-if="item.valueType === 'string'"
          v-model="model[item.dataIndex]"
          placeholder="请输入"
          :disabled="item.disabled"
        />
        <el-select
          v-if="item.valueType === 'enum'"
          v-model="model[item.dataIndex]"
          clearable
          filterable
          placeholder="请选择"
          style="width: 100%;"
        >
          <el-option
            v-for="option in item.valueEnum"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-select
          v-if="item.dataIndex === 'facilityType'"
          v-model="formModel.facilityType"
          clearable
          filterable
          placeholder="请选择"
          @change="changeType"
        >
          <el-option
            v-for="type in dict.$state.facilityType as any"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          />
        </el-select>
        <div
          v-if="item.dataIndex === 'fullAddress'"
          style="width: 100%;position: relative;"
        >
          <el-input
            v-model="writeVal.fullAddress"
            placeholder="请输入"
            class="search-input"
            clearable
            @input="handleInput"
          />
          <ul
            v-if="showDropdown"
            class="search-list"
            style="overflow: auto;"
          >
            <li
              v-show="addressItems.length === 0"
              class="search-list__empty"
            >
              未找到相关地址
            </li>
            <li
              v-for="address of addressItems"
              :key="address.id"
              class="search-list__item"
              @click="searchResult(address)"
            >
              <div class="search-list__item--name">
                {{ address.name }}
              </div>
              <div class="search-list__item--address">
                {{ address.address }}
              </div>
            </li>
          </ul>
        </div>
        <el-select
          v-if="item.dataIndex === 'contactPerson'"
          v-model="writeVal.contactPerson"
          clearable
          filterable
          placeholder="请选择"
          @change="changeContactPerson"
        >
          <el-option
            v-for="user in contactUserItems as any"
            :key="user.userId"
            :label="user.userName"
            :value="user.userId"
          />
        </el-select>
        <el-select
          v-if="item.dataIndex === 'gridId'"
          v-model="formModel.gridId"
          clearable
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="grid in gridList as any"
            :key="grid.value"
            :label="grid.label"
            :value="grid.value"
          />
        </el-select>
        <el-input
          v-if="item.dataIndex === 'contactPhone'"
          v-model="writeVal.contactPhone"
          placeholder="请输入"
          readonly
        />
      </el-form-item>
      <el-divider
        content-position="left"
        class="form-title detail-title"
      >
        <template #default>
          <span style="padding:-10px">详细信息</span>
        </template>
      </el-divider>
      <div
        v-for="item in formData"
        v-show="item.id === formModel.facilityType"
        :key="item.id"
        class="facility-detail"
      >
        <div
          v-for="child in item.data"
          :key="child.value"
          class="facility-detail__item"
        >
          <span class="facility-detail__item-title">{{ child.label }}</span>
          <div class="facility-detail__item-content">
            <el-input
              v-if="child.valueType === 'string'"
              v-model="detailModel[child.value]"
              placeholder="请输入"
            >
              <template
                v-if="child.append"
                #append
              >
                {{ child.append }}
              </template>
            </el-input>
            <el-select
              v-else-if="child.valueType === 'enum'"
              v-model="detailModel[child.value]"
              :clearable="true"
              :filterable="true"
              placeholder="请选择"
            >
              <el-option
                v-for="option in child.valueEnum"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <el-date-picker
              v-else-if="child.valueType === 'date'"
              v-model="detailModel[child.value]"
              type="date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              clearable
              placeholder="请选择"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer="{ submit, cancel }">
      <div>
        <el-button
          type="danger"
          @click="cancel"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          :data-submit="submit"
          @click="submit"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-pro-dialog-form>
</template>

<script lang="ts">
import { mesFacilityPointAddFacilityPoint, mesFacilityPointFacilityPointInfo, mesFacilityPointUpdateFacilityPoint } from "@/api/mes/facilityPointController";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import { debounce } from "@/utils/fn";
import { ElMessage, FormRules, ProCrudWriteColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import formData from "./form-data";

export default defineComponent({
  name: "FacilityForm",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    formMethods: {
      type: String,
      default: "",
    },
    contactUserItems: {
      type: Array,
      default: () => [],
    },
    gridList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "closed"],
  setup(props, { emit, }) {
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const formRef = ref();
    const detailModelRef = ref();
    const submitLoading = ref(false);
    const addressItems = ref<any>([]);
    const showDropdown = ref(false);
    const formModel = reactive<MES.FacilityPointInfo | any>({});
    const detailModel = reactive<any>({});
    const writeVal: Record<string, string> = reactive({
      contactPerson: "",
      contactPhone: "",
      fullAddress: "",
      latitude: "",
      longitude: "",
    });

    const formColumns: ProCrudWriteColumn[] = [
      {
        title: "名称",
        dataIndex: "facilityName",
        valueType: "string",
      },
      {
        title: "类型",
        dataIndex: "facilityType",
        valueType: "slot",
      },
      {
        title: "负责人",
        dataIndex: "contactPerson",
        valueType: "slot",
      },
      {
        title: "联系方式",
        dataIndex: "contactPhone",
        valueType: "slot",
      },
      {
        title: "所属网格",
        dataIndex: "gridId",
        valueType: "slot",
      },
      {
        title: "详细地址",
        dataIndex: "fullAddress",
        valueType: "slot",
      }
    ];

    const formRules: FormRules = {
      facilityName: [
        { required: true, message: "请输入名称", trigger: "blur", }
      ],
      facilityType: [
        { required: true, message: "请选择类型", trigger: "change", }
      ],
      gridId: [
        { required: true, message: "请选择网格", trigger: "change", }
      ],
      fullAddress: [
        {
          required: true, validator: (rule: any, value: string, callback: any) => {
            if (!writeVal.fullAddress) {
              callback(new Error("请输入详细地址"));
            } else {
              callback();
            }
          }, trigger: "blur",
        }
      ],
    };

    const fetchInfo = async (params: MES.FacilityPointFacilityPointInfoParams) => {
      try {
        let { data, } = await mesFacilityPointFacilityPointInfo(params);

        if (data) {
          Object.assign(formModel, data);
          Object.assign(detailModel, JSON.parse(data.details as string));

          Object.assign(writeVal, {
            fullAddress: data.fullAddress as string,
            latitude: data.latitude as string,
            longitude: data.longitude as string,
            contactPerson: data.contactPerson as string,
            contactPhone: data.contactPhone as string,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const submit = async () => {
      submitLoading.value = true;
      // 将detailModelRef.value.model转为json字符串
      const detailModelStr = JSON.stringify(detailModel);
      const params = {
        ...formModel,
        ...writeVal,
        details: detailModelStr,
        projectId,
      }
      try {
        if (props.formMethods === "add") {
          await mesFacilityPointAddFacilityPoint(params);
          ElMessage.success("新增成功");
        } else {
          await mesFacilityPointUpdateFacilityPoint(params);
          ElMessage.success("编辑成功");
        }
      } catch (error) {

      } finally {
        submitLoading.value = false;
        emit("update:modelValue", false);
      }
    }

    const closed = () => {
      emit("update:modelValue", false);
      emit("closed");
      clearAddress();
    }

    const handleInput = (() => {
      if (!writeVal.fullAddress) {
        showDropdown.value = false;
        return;
      }

      debounce(() => {
        AMap.WebService.get("https://restapi.amap.com/v3/place/text",
          {
            keywords: writeVal.fullAddress,
          }, function (error, result) {
            if (result.info === "OK") {
              addressItems.value = result.pois
              showDropdown.value = true
            }
          });
      }, 500);
    });

    const searchResult = (item: any) => {
      const address = `${item.pname + item.cityname + item.adname + item.name + item.address}`;

      // @ts-ignore
      const geocoder = new AMap.Geocoder();

      geocoder.getLocation(address, (status: any, result: any) => {
        if (status === "complete" && result.info === "OK") {
          showDropdown.value = false;
          writeVal.fullAddress = result.geocodes[0].formattedAddress;
          writeVal.latitude = result.geocodes[0].location.lat;
          writeVal.longitude = result.geocodes[0].location.lng;
        }
      });
    };

    const clearAddress = () => {
      for (let key in writeVal) {
        writeVal[key] = "";
      }
    };

    const changeContactPerson = (val: any) => {
      if (!val) {
        writeVal.contactPhone = "";
        return;
      }

      const user = props.contactUserItems.find((item: any) => item.userId === val) as MES.UserDTO;

      if (user) {
        const { phone, userName, } = user;
        writeVal.contactPhone = phone;
        writeVal.contactPerson = userName;
      }
    };

    const changeType = (val: number) => {
      updateModel(val);
    }

    const updateModel = (id: number) => {
      Object.keys(detailModel).forEach((key) => {
        delete detailModel[key];
      });

      const item = formData.find(item => item.id === id);

      if (item) {
        item.data.forEach((child: any) => {
          detailModel[child.value] = null;
        })
      }

      console.log(detailModel);

    }

    return {
      dict,
      formRef,
      detailModelRef,
      submitLoading,
      formModel,
      detailModel,
      formColumns,
      formRules,
      writeVal,
      addressItems,
      showDropdown,
      formData,
      submit,
      fetchInfo,
      handleInput,
      searchResult,
      changeContactPerson,
      changeType,
      closed,
    }
  },
})
</script>

<style lang="less">
.search-list {
  // 脱离文档流
  position: absolute;
  z-index: 999;
}

.el-dialog__body {
	position:relative;
  min-height: 350px;
	max-height: 440px;
  overflow-y: auto;

  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
}

.el-pro-dialog .el-dialog__body {
  padding: 50px 80px 0;
}

.form-title {
	position: absolute;
	top: 0;
  left: 0;
}

.detail-title {
  top: 350px;
}

.el-divider__text.is-left {
  left: 0;
}

.facility-detail {
  margin-top: 80px;

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &-title {
      width: 80px;
      text-align: right;
      margin-right: 10px;
    }

    &-content {
      flex: 1;
    }
  }
}
</style>
