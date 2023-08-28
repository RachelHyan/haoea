<template>
  <div class="address">
    <div
      v-if="addressState.searchMethod === 'input'"
      class="address--left"
      @click="addressState.searchMethod = 'change'"
    >
      <el-icon size="12">
        <ArrowRight />
      </el-icon>
    </div>
    <el-cascader
      v-if="addressState.searchMethod === 'change'"
      v-model="addressState.selectedAddress"
      class="address--middle"
      placeholder="请选择区域"
      :options="addressOptions"
      clearable
      filterable
      @change="handleAddressChange"
    />
    <div
      v-else-if="addressState.searchMethod === 'input'"
      class="address--middle-input"
    >
      <el-input
        id="addressInput"
        v-model="addressState.inputAddress"
        placeholder="请输入详细地址"
        clearable
        @input="handleInputChange"
      />
      <ul
        v-if="addressInputListVisible"
        class="address--middle-list"
        style="overflow: auto"
      >
        <el-empty
          v-show="addressState.inputAddress && addressList.length === 0"
          description="未找到相关地址"
          :image-size="100"
        />
        <li
          v-for="item in (addressList as any)"
          :key="item.id"
          class="address--middle-list--item"
          @click="selectInputAddress(item)"
        >
          <div class="address--middle-list--item-name">
            {{ item.name }}
          </div>
          <div class="address--middle-list--item-address">
            {{ item.district + item.address }}
          </div>
        </li>
      </ul>
    </div>
    <div
      class="address--right"
      @click="addressState.searchMethod = 'input'"
    >
      <el-icon size="12">
        <Search />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "AddressSearchBar",
  emits: ["handleAddressChange", "handleInputChange", "selectInputAddress","selectInputAddress"],
  setup (prop, { emit, }) {
    const addressOptions = ref<any[]>([]); // 地址搜索栏
    const addressList = ref<any[]>([]); // 地址列表
    const addressInputListVisible = ref(false); // 地址列表是否显示

    // 地址搜索栏
    const addressState = reactive({
      selectedAddress: [],
      inputAddress: "",
      searchMethod: "change" as "change" | "input",
    });

    let geocoder:any;


    onMounted(async () => {
      await lazyAMapApiLoaderInstance;

      AMap.plugin("AMap.Geocoder", function() {
        // @ts-ignore
        geocoder = new AMap.Geocoder()
      })

      fetchDistrict()
    })

    const fetchDistrict = () => {
      AMap.plugin("AMap.DistrictSearch", function () {
        // @ts-ignore
        var districtSearch = new AMap.DistrictSearch({
          level: "province",
          subdistrict: 4,
          showbiz: false,
          extensions: "all",
        })
  
        // 搜索所有省/直辖市信息
        districtSearch.search("中国", function(status:any, result:any) {
          if (status === "complete") {
            const {districtList,} = result.districtList[0];
            addressOptions.value = districtList.map((province:any) => ({
              value: province.name,
              label: province.name,
              children: province.districtList?.map((city:any) => ({
                value: city.name,
                label: city.name,
                children: city.districtList?.map((district:any) => ({
                  value: district.name,
                  label: district.name,
                  children: district.districtList?.map((street:any) => ({
                    value: street.name,
                    label: street.name,
                  })),
                })),
              })),
            }))
          }
        })
      })
    }

    const handleAddressChange = () => {
      if (!addressState.selectedAddress) return	
      const address = addressState.selectedAddress.map(item => item).join("")
      geocoder.getLocation(address, (status:any, result:any) => {
        if (status === "complete" && result.info === "OK") {
          const {lng, lat,} = result.geocodes[0].location
          emit("handleAddressChange", [lng, lat])
        }
      })
    }

    const handleInputChange = () => {
      if (!addressState.inputAddress) return
      AMap.plugin(["AMap.AutoComplete","AMap.PlaceSearch"],function(){
        // @ts-ignore
        var autocomplete= new AMap.AutoComplete()
        autocomplete.search(addressState.inputAddress, (status:any, result:any) => {
          if (status === "complete" && result.tips.length) {
            addressList.value = result.tips
            addressInputListVisible.value = true
          }
        })
      })
    }

    const selectInputAddress = (item:any) => {
      geocoder.getLocation(item.district + item.address, (status:any, result:any) => {
        if (status === "complete" && result.geocodes.length) {
          const {lng, lat,} = result.geocodes[0].location
          emit("selectInputAddress", [lng, lat])
          addressInputListVisible.value = false
        }
      })
    }


    return {
      addressState,
      addressOptions,
      addressList,
      addressInputListVisible,
      handleAddressChange,
      handleInputChange,
      selectInputAddress,
    }
  },
})
</script>

<style lang="less">
.address {
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 0 6px;
		border-radius: 5px;
		height: 48px;

		.el-cascader .el-input.is-focus .el-input__wrapper, 
		.el-input__wrapper,
		.el-cascader:not(.is-disabled):hover .el-input__wrapper {
			box-shadow: none;
			border: none;
			border-radius: 0%;
		}

		&--left, &--right {
			cursor: pointer;
		}
		
		&--left {
			padding-right: 5px;
			border-right: 1px solid #E6E6E6;
		}

		&--right {
			padding-left: 5px;
			border-left: 1px solid #E6E6E6;
		}

		&--middle-input {
			position: relative;
			width: 190px;
			
			.address--middle-list {
				position: absolute;
				background-color: #fff;
				width: 97%;
				height: 200px;
				top: 44px;
				border-radius: 4px;
				box-shadow: 0 1px 4px 2px rgb(0 0 0 / 11%);

				&--item {
					padding: 5px 10px;
					cursor: pointer;

					&:hover {
						background-color: #F2F3F4;
					}

					&-name {
						font-size: 14px;
						color: #333;
					}

					&-address {
						font-size: 12px;
						color: #999;
					}
				}
			}
		}	
	}
</style>
