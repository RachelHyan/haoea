<template>
  <div class="draw-tool">
    <!-- tip -->
    <div
      v-show="isDraw"
      class="draw-tool__tip"
    >
      <el-icon><Warning /></el-icon>单击继续，Enter键完成，Esc键取消
    </div>
    <div class="draw-tool__body">
      <template v-if="cardType === 'grid' && !isDraw">
        <div
          :class="[drawType === 'grid' ? 'draw-tool__body-item--active' : '','draw-tool__body-item']"
          @click="selectType('grid')"
        >
          <span class="icon grid-icon" />
          网格绘制
        </div>
      </template>
      <template v-else-if="cardType === 'object' && !isDraw">
        <div
          :class="[drawType === 'point' ? 'draw-tool__body-item--active' : '','draw-tool__body-item']"
          @click="selectType('point')"
        >
          <span class="icon point-icon" />
          点位
        </div>
        <div
          :class="[drawType === 'line' ? 'draw-tool__body-item--active' : '','draw-tool__body-item']"
          @click="selectType('line')"
        >
          <span class="icon line-icon" />
          轨迹
        </div>
        <div
          :class="[drawType === 'plane' ? 'draw-tool__body-item--active' : '','draw-tool__body-item']"
          @click="selectType('plane')"
        >
          <span class="icon plane-icon" />
          区域
        </div>
      </template>
      <template v-else-if="isDraw">
        <div
          v-show="!isAjustment"
          :class="[cuntHistory || pointUndo.length ? 'draw-tool__body-item-edit--active' : '','draw-tool__body-item-edit']"
          @click="selectEdit('undo')"
        >
          <span class="icon undo-icon" />
          撤回
        </div>
        <div
          v-show="!isAjustment"
          :class="[redoHistory.length || pointRedo.length ? 'draw-tool__body-item-edit--active' : '','draw-tool__body-item-edit']"
          @click="selectEdit('redo')"
        >
          <span class="icon redo-icon" />
          还原
        </div>
        <div
          :class="[drawType === 'exit' ? 'draw-tool__body-item-edit--active' : '','draw-tool__body-item-edit']"
          @click="selectEdit('exit')"
        >
          <span class="icon exit-icon" />
          退出绘制
        </div>
      </template>
    </div>
    <div
      v-show="isSetting && drawType !== 'point'"
      class="draw-tool__style"
    >
      <div class="draw-tool__style__color">
        <span class="draw-tool__style__color-title">颜色：</span>
        <div class="draw-tool__style__color-group">
          <template
            v-for="(item,index) in predefineColors"
            :key="index"
          >
            <div
              class="draw-tool__style__color-group-item"
              :style="{outline:currentColor === item ? `2px solid ${item}` : '',background:item}"
              @click="changeColor(item)"
            />
          </template>
          <el-color-picker
            v-model="currentColor"
            @active-change="changeColor"
          />
        </div>
      </div>
      <div
        v-show="cardType === 'object'"
        class="draw-tool__style__weight"
      >
        <span class="draw-tool__style__weight-title">宽度：</span>
        <div
          class="draw-tool__style__weight-item small"
          :style="{outline:currentWeight === 3 ? '1px solid #000' : ''}"
          @click="changeWeight(3)"
        />
        <div
          class="draw-tool__style__weight-item middle"
          :style="{outline:currentWeight === 6 ? '1px solid #000' : ''}"
          @click="changeWeight(6)"
        />
        <div
          class="draw-tool__style__weight-item large"
          :style="{outline:currentWeight === 9 ? '1px solid #000' : ''}"
          @click="changeWeight(9)"
        />
      </div>
    </div>
    <div />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DrawTool",
  props:{
    cardType:{
      type:String,
      default:"grid",
    },
    isDraw:{
      type:Boolean,
      default:false,
    },
    isSetting:{
      type:Boolean,
      default:false,
    },
    isAjustment:{
      type:Boolean,
      default:false,
    },
    cuntHistory:{
      type:Number,
      default:0,
    },
    redoHistory:{
      type:Array,
      default:() => [],
    },
    pointRedo:{
      type:Array,
      default:() => [],
    },
    pointUndo:{
      type:Array,
      default:() => [],
    },
    drawType:{
      type:String,
      default:"",
    },
  },
  emits:["changeColor","changeWeight","selectType","selectEdit"],
  setup (props,{emit,}) {
    const predefineColors = ref([ 
      "#D2C233",
      "#6958B4",
      "#CD6033",
      "#41A541",
      "#396EAC",
      "#8DA032",
      "#F9F0AF",
      "#A59DC8",
      "#EAB798",
      "#B4D3B2",
      "#B2C4D3"
    ]);
    const currentColor = ref("#D2C233");
    const currentWeight = ref(3);

    const changeColor = (color:string) => {
      currentColor.value = color;
			
      emit("changeColor",color);
    };

    const changeWeight = (weight:number) => {
      currentWeight.value = weight;

      emit("changeWeight",weight);
    };

    const selectType = (type:"grid"| "point" | "line" | "plane") => {
      emit("selectType",type);
    };

    const selectEdit = (type:"undo" | "redo" | "exit") => {
      emit("selectEdit",type);
    };

    return {
      predefineColors,
      currentColor,
      currentWeight,
      selectType,
      selectEdit,
      changeColor,
      changeWeight,
    }
  },
})
</script>

<style lang="less">
.draw-tool {
	position: absolute;
	top: 16px;
	right: 16px;
	z-index: 9;

	&__tip {
		position: absolute;
		width: 241px;
		right: 0;
		top: -18px;
		display: flex;
		align-items: center;
		color: #d81212;
	}

	&__body {
		border-radius: 5px;
		height: 48px;
		background: rgba(255,255,255,0.85);
		backdrop-filter: blur(2px);
		display: flex;
		align-items: center;
		justify-content: space-around;

		&-item {
			display: flex;
			align-items: center;
			cursor: pointer;
			margin: 0 10px;
			color: #90919D;

			.icon {
				width: 16px;
				height: 16px;
				background-size: cover;
				margin-right: 5px;
				display: inline-block;
			}

			&:hover,&--active {
				color: #1D51F4;
				cursor: pointer;
			}

			.grid-icon {
				background-image: url(@/assets/images/polygon.png);
			}

			&:hover .grid-icon,&--active .grid-icon {
				background-image: url(@/assets/images/polygon-active.png);
			}

			.point-icon {
				height: 19px;
				background-image: url(@/assets/images/point.png);
			}

			&:hover .point-icon,&--active .point-icon {
				background-image: url(@/assets/images/point-active.png);
			}

			.line-icon {
				width: 21px;
				background-image: url(@/assets/images/line.png);
			}

			&:hover .line-icon,&--active .line-icon {
				background-image: url(@/assets/images/line-active.png);
			}

			.plane-icon {
				background-image: url(@/assets/images/plane.png);
			}

			&:hover .plane-icon,&--active .plane-icon {
				background-image: url(@/assets/images/plane-active.png);
			}
		}

		&-item-edit {
			display: flex;
			align-items: center;
			cursor: pointer;
			margin: 0 10px;
			color: #90919D;

			.icon {
				width: 16px;
				height: 16px;
				background-size: cover;
				margin-right: 5px;
				display: inline-block;
			}

			&:hover,&--active {
				color: #000;
				cursor: pointer;
			}

			.undo-icon {
				background-image: url(@/assets/images/undo.png);
			}

			&:hover .undo-icon,&--active .undo-icon {
				background-image: url(@/assets/images/undo-active.png);
			}

			.redo-icon {
				width: 17px;
				background-image: url(@/assets/images/redo.png);
			}

			&:hover .redo-icon,&--active .redo-icon {
				background-image: url(@/assets/images/redo-active.png);
			}

			.exit-icon {
				background-image: url(@/assets/images/exit.png);
			}
		}
	}

	&__style {
		position: absolute;
		top: 50px;
		right: 0;
		background: rgba(255,255,255,0.85);
		backdrop-filter: blur(2px);
		border-radius: 5px;
		padding: 10px;
		display: flex;
		justify-content: space-between;

		&__color {
			display: flex;
			align-items: center;

			&-title {
				width: 45px;
			}

			&-group {
				display: grid;
				grid-template-columns: repeat(6, 1fr);
				grid-template-rows: repeat(2, 1fr);
				grid-gap: 10px;

				&-item {
					width: 16px;
					height: 16px;
					border: 2px solid white;
					margin-right: 5px;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
				}
			}

			.el-color-picker__trigger {
				width: 17px;
				height: 17px;
				padding: 0;
				border: none;
				margin-left: 2px;
				cursor: pointer;
			}
		}

		&__weight {
			width: 120px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-left: 20px;

			&-item {
				position: relative;
				border-radius: 50%;
				background-color: #000;
				border: 3px solid white;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 5px;
				cursor: pointer;
			}

			&-item.small {
				width: 8px;
				height: 8px;
			}

			&-item.middle {
				width: 12px;
				height: 12px;
			}

			&-item.large {
				width: 14px;
				height: 14px;
			}
		}
	}
}
</style>
