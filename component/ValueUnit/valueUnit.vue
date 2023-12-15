<!-- 
  * @Author: ZHANGXIAO
 * @Date: 2022-12-15 17:15:47
 * @LastEditors: ZHANGXIAO
 * @LastEditTime: 2023-12-15 17:18:21
 * @Description: 数字滚动组件vue3.2,带单位 
-->

<template>
  <div class="valueUnit_container" :style="valueBoxStyle">
    <count-roll
      :value="value"
      :separator="separator"
      class="value"
      :style="valueStyle"
      :duration="duration"
    />
    <span class="unit" :style="unitStyle">{{ unit }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import CountRoll from "./count-roll.vue"; // 数字滚动

const props = defineProps({
  // 分隔符
  separator: {
    type: String,
    default: ",",
  },
  // 数字
  value: {
    type: [Number, String],
    default: 0 || "",
  },
  valueFamily: {
    type: String,
    default: "DINPro-Bold",
  },
  valueWeight: {
    type: String,
    default: "bold",
  },
  // 持续时间
  duration: {
    type: Number,
    default: 1000 * 3,
  },
  valueSize: {
    type: Number,
    default: 20,
  },
  valueColor: {
    type: String,
    default: "--color22",
  },
  unit: {
    type: String,
    default: "",
  },
  unitFamily: {
    type: String,
    default: "PingFangSC-Regular",
  },
  unitSize: {
    type: Number,
    default: 12,
  },
  unitColor: {
    type: String,
    default: "--color22",
  },
  unitML: {
    type: [Number, String],
    default: "6px",
  },
  paddingRight: {
    type: Number,
    default: 0,
  },
  justifyContent: {
    type: String,
    default: "flex-end",
  },
  alignItems: {
    type: String,
    default: "baseline",
  },
  underline: {
    type: String,
    default: "",
  },
  italic: {
    type: String,
    default: "",
  },
});
const formatColor = (color) => {
  if (!color) {
    return "";
  }
  if (color.indexOf("--") > -1) {
    return `var(${color})`;
  }
  return color;
};
const valueBoxStyle = computed(() => {
  return {
    justifyContent: `${props.justifyContent}`,
    alignItems: props.alignItems,
  };
});
const valueStyle = computed(() => {
  return {
    fontFamily: `${props.valueFamily}`,
    fontWeight: `${props.valueWeight}`,
    fontSize: `${props.valueSize}px`,
    color: formatColor(props.valueColor),
    paddingRight: `${props.paddingRight}px`,
    justifyContent: `${props.justifyContent}`,
    textDecoration: `${props.underline}`,
    cursor: `${props.underline ? "pointer" : ""}`,
    fontStyle: props.italic,
  };
});
const unitStyle = computed(() => {
  return {
    fontFamily: `${props.unitFamily}`,
    fontSize: `${props.unitSize}px`,
    color: formatColor(props.unitColor),
    marginLeft: `${props.unitML}`,
  };
});
</script>
<style scoped>
.valueUnit_container {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
}

.unit {
  margin-left: 6px;
  font-weight: normal;
}
</style>
