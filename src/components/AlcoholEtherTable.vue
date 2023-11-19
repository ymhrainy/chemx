<template>
  <div class="alcohol-ether-table">
    <div class="axis-panel">
      <AlcoholEtherTableAxis
        :default-axis-type="AXIS_TYPE.po"
        :axis-tag="AXIS_TAG.h"
        @change="(axis) => handleAxisChanged(AXIS_TAG.h, axis)"
      ></AlcoholEtherTableAxis>
      <AlcoholEtherTableAxis
        :default-axis-type="AXIS_TYPE.eo"
        :axis-tag="AXIS_TAG.v"
        @change="(axis) => handleAxisChanged(AXIS_TAG.v, axis)"
      ></AlcoholEtherTableAxis>
      <div class="z-axis">
        <span>{{ zAxisType }}</span>
        <span
          ><AInputNumber v-model="zNum" style="width: 100px" @change="onZNumChanged"> </AInputNumber
        ></span>
      </div>
    </div>
    <AlcoholEtherTableBody
      :table="table"
      :search-weight="searchWeight"
      @cell-dbclick="$emit('cell-dbclick', $event)"
    ></AlcoholEtherTableBody>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { InputNumber as AInputNumber } from "@arco-design/web-vue";
import {
  type AlcoholEtherTable,
  type Axis,
  AXIS_TYPE,
  AXIS_TAG,
  type AxisTag,
  type AxisType,
  generateAlcoholEtherCube,
  getDefaultAxisRange,
  type AlcoholEther,
} from "@/utils/alcohol";
import AlcoholEtherTableAxis from "./AlcoholEtherTableAxis.vue";
import AlcoholEtherTableBody from "./AlcoholEtherTableBody.vue";

defineProps<{
  searchWeight?: number;
}>();

defineEmits<{
  (event: "cell-dbclick", ae: AlcoholEther): void;
}>();

const table = ref<AlcoholEtherTable>([]);
const zNum = ref(0);

const axisMap = ref(new Map<AxisTag, Axis>());
const zAxisType = computed<AxisType>(() => {
  const hAxis = axisMap.value.get(AXIS_TAG.h);
  const vAxis = axisMap.value.get(AXIS_TAG.v);
  if (!hAxis || !vAxis) {
    return AXIS_TYPE.alcohol;
  }
  const existTypes = [hAxis.type, vAxis.type];
  for (const at of [AXIS_TYPE.alcohol, AXIS_TYPE.eo, AXIS_TYPE.po]) {
    if (!existTypes.includes(at)) {
      return at;
    }
  }
  return AXIS_TYPE.alcohol;
});

watch(
  zAxisType,
  () => {
    zNum.value = getDefaultAxisRange(zAxisType.value).min;
  },
  { immediate: true },
);

const zAxisV = computed<Axis>(() => {
  return {
    type: zAxisType.value,
    min: zNum.value,
    max: zNum.value,
    step: 1,
  };
});

const handleAxisChanged = (axisTag: AxisTag, axis: Axis) => {
  axisMap.value.set(axisTag, axis);
  generateTableByAxis();
};

const onZNumChanged = () => {
  generateTableByAxis();
};

const generateTableByAxis = () => {
  const hAxis = axisMap.value.get(AXIS_TAG.h);
  const vAxis = axisMap.value.get(AXIS_TAG.v);
  const zAxis = zAxisV.value;
  if (!hAxis || !vAxis || !zAxis) {
    return;
  }
  table.value = generateAlcoholEtherCube(hAxis, vAxis, zAxis)[0];
};
</script>

<style lang="scss" scoped>
.alcohol-ether-table {
  padding: 0 1em;
  .axis-panel {
    display: flex;
    align-items: center;
    .z-axis {
      height: 40px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
