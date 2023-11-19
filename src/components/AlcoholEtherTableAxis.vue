<template>
  <div class="alcohol-ether-table-axis">
    {{ axisTag }}
    <div class="axis-item">
      <ASelect v-model="axisType">
        <AOption v-for="at in axisTypes" :key="at" :label="at" :value="at"></AOption>
      </ASelect>
    </div>
    <div class="axis-item">
      <AInputNumber v-model="minNum" :placeholder="`${axisType}最小值`"> </AInputNumber>
    </div>
    <div class="axis-item">
      <AInputNumber v-model="maxNum" :placeholder="`${axisType}最大值`"> </AInputNumber>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Select as ASelect,
  Option as AOption,
  InputNumber as AInputNumber,
} from "@arco-design/web-vue";

import {
  AXIS_TYPE,
  type AxisType,
  getDefaultAxisRange,
  type Axis,
  type AxisTag,
} from "@/utils/alcohol";
import { computed } from "vue";

const props = defineProps<{
  axisTag: AxisTag;
  defaultAxisType?: AxisType;
}>();

const axisTypes: AxisType[] = Object.values(AXIS_TYPE);

const axisType = ref<AxisType>(props.defaultAxisType || AXIS_TYPE.alcohol);
const maxNum = ref(0);
const minNum = ref(0);

const initAxisRangeDefaults = () => {
  maxNum.value = getDefaultAxisRange(axisType.value).max;
  minNum.value = getDefaultAxisRange(axisType.value).min;
};

const axis = computed((): Axis => {
  return {
    max: maxNum.value,
    min: minNum.value,
    type: axisType.value,
    step: 1,
  };
});
const emit = defineEmits<{
  (event: "change", axis: Axis): void;
}>();

watch(axisType, initAxisRangeDefaults, { immediate: true });
watch(
  axis,
  () => {
    emit("change", axis.value);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.alcohol-ether-table-axis {
  display: flex;
  align-items: center;
  .axis-item {
    width: 100px;
    height: 40px;
    margin-right: 1em;
    display: flex;
    align-items: center;
  }
}
</style>
