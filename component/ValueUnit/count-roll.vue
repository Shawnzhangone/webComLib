<!-- 
  * @Author: ZHANGXIAO
 * @Date: 2022-12-15 17:15:47
 * @LastEditors: ZHANGXIAO
 * @LastEditTime: 2023-12-15 17:18:47
 * @Description: 数字滚动组件vue3.2
-->
<template>
  <span>{{ displayValue }}</span>
</template>
<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";

import {
  requestAnimationFrame,
  cancelAnimationFrame,
} from "./requestAnimationFrame";
const props = defineProps({
  // 终止数字 展示的数字
  value: {
    type: [String, Number] as PropType<string | number>,
    default: 0,
  },
  // 动画持续时间
  duration: {
    type: Number as PropType<number>,
    default: 1000 * 3,
  },
  // 每三位数的间隔 2020 变成 2,020 （不需要','时，传''空）
  separator: {
    type: String as PropType<string>,
    default: ",",
  },
});
const displayValue = ref<number | string>("");
watch(
  () => props.value,
  (val: number | string) => {
    start(val);
  }
);
const emit = defineEmits(["callback"]);

onMounted(() => {
  start(props.value);
});
let decimals = 0; // 小数
let startVal = 0;
let localStartVal = 0;
let startTime: null | number = null;
let rAF: null | number = null;
let printVal: null | number = null;
const paused = ref(false);

const start = (val: number | string) => {
  if (isNaN(Number(val))) return (displayValue.value = val || "--");
  decimals = getNumberDecimals(val);
  localStartVal = startVal;
  startTime = null;
  paused.value = false;
  rAF = requestAnimationFrame(count);
};

const localDuration = computed(() => props.duration);

const countDown = computed(() => {
  return startVal > (props.value as number);
});

const endValue = computed(() => {
  const { value } = props;
  if (typeof value === "number") {
    return value;
  }
  return +(value as string).replace(/,/g, "");
});

const count = (time: number) => {
  if (!startTime) {
    startTime = time;
  }
  const progress = time - startTime;
  if (countDown.value) {
    let val =
      localStartVal -
      easingFn(
        progress,
        0,
        localStartVal - endValue.value,
        localDuration.value
      );
    printVal = val < endValue.value ? endValue.value : val;
  } else {
    let val = easingFn(
      progress,
      localStartVal,
      endValue.value - localStartVal,
      localDuration.value
    );
    printVal = val > endValue.value ? endValue.value : val;
  }

  displayValue.value = formatNumber(printVal as number);
  startVal = +(printVal as number).toFixed(decimals);
  if (progress < localDuration.value) {
    rAF = requestAnimationFrame(count);
  } else {
    emit("callback");
  }
};
//数字计算
const easingFn = (t: number, b: number, c: number, d: number) => {
  return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
};
// 格式化显示数字
const formatNumber = (num: number) => {
  let numString = num.toFixed(decimals).toString();
  const x = numString.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? "." + x[1] : "";
  const rgx = /(\d+)(\d{3})/;
  if (props.separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + props.separator + "$2");
    }
  }
  return x1 + x2;
};
// 获取小数长度
const getNumberDecimals = (numStr: string | number) => {
  const b = (numStr + "").split(".")[1];
  return b ? b.length : 0;
};

onBeforeUnmount(() => {
  if (rAF) {
    cancelAnimationFrame(rAF);
  }
});
</script>
