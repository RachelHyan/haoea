<template>
  <div
    ref="dragRef"
    class="draggable"
    :style="dragStyle"
    @mousedown="handleMouseDown"
  >
    <slot name="content" />
  </div>
</template>

<script lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { Ref, computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "DraggableModel",
  props: {
    boundary: { // 边界
      type: Boolean,
    },
    width: {
      type: [Number, String],
      default: 300,
    },
    left: {
      type: [Number, String],
      default: 0,
    },
    right: {
      type: [Number, String],
      default: 0,
    },
    top: {
      type: [Number, String],
      default: 0,
    },
    boundaryTop: {
      type: [Number, String],
      default: 0,
    },
    boundaryLeft: {
      type: [Number, String],
      default: 0,
    },
  },
  emits: ["move"],
  setup (props,{ emit, }) {
    const dragRef = ref<HTMLElement | null>(null);
    const isMouseDown = ref(false);
    const collapsed:Ref<boolean> = useLocalStorage("collapsed",false);

    const boundaryLeft = computed(() => {
      return collapsed.value ? 85 : 225;
    })

    const dragData = ref({
      width: props.width,
      // height: props.height,
      left: props.left,
      right: props.right,
      top: props.top,
      boundaryTop: 135,
      boundaryLeft: boundaryLeft,
    })


    const dragStyle = computed(() => {
      const { left, top, right, } = dragData.value;
      return {
        width: withUnit(props.width),
        // height: withUnit(height),
        left: left ? withUnit(left) : "auto",
        right: right ? withUnit(right) : "auto",
        top: withUnit(top),
      }
    })

    // 单位处理
    const withUnit = (val:number | string = 0) => {
      return parseInt(val.toString()) + "px";
    }

    // 鼠标按下
    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown.value = true;
      const el = dragRef.value;

      // 鼠标按下时的坐标
      const downX = e.clientX;
      const downY = e.clientY;

      // 元素的初始位置
      const elRect = el?.getBoundingClientRect();
			

      // 鼠标在元素内的坐标
      // @ts-ignore
      const offsetX = downX - elRect.left;
      // @ts-ignore
      const offsetY = downY - elRect.top;

      let minX = 0, minY = 0, maxX = 0, maxY = 0;

      if (props.boundary) {
        const parentEl = el?.parentElement || document.body;
        const parentElRect = parentEl.getBoundingClientRect();

        minX = parentElRect.left;
        // @ts-ignore
        maxX = parentElRect.left + parentElRect.width - elRect.width;
        minY = parentElRect.top;
        // @ts-ignore
        maxY = parentElRect.top + parentElRect.height - elRect.height;
				
      }

      // 鼠标移动
      const handleMouseMove = (e: MouseEvent) => {
        // 当前鼠标的位置减去鼠标在盒子里的位置就是要移动的距离
			 let moveX = e.clientX - offsetX;
			 let moveY = e.clientY - offsetY;

        if (props.boundary) {
          moveX = moveX < minX ? minX : moveX;
          moveX = moveX > maxX ? maxX : moveX;

          moveY = moveY < minY ? minY : moveY;
          moveY = moveY > maxY ? maxY : moveY;
        }

			 dragData.value.left = moveX - Number(dragData.value.boundaryLeft);
			 dragData.value.top = moveY - Number(dragData.value.boundaryTop);

			 emit("move", dragData.value)
      }

      // 鼠标抬起
      const handleMouseUp = () => {
        isMouseDown.value = false;

        // 移除事件
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }

      // 添加事件
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return {
      dragRef,
      dragStyle,
      handleMouseDown,
    }
  },
})
</script>

<style lang="less">
.draggable {
	position: absolute;
	z-index: 1000;
}
</style>
