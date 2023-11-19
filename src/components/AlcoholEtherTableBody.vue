<template>
  <div class="alcohol-ether-table-body">
    <div v-for="(row, i) in table" :key="i + 1" :class="['table-row', `row-${i}`]">
      <span
        v-for="(cell, j) in row"
        :key="j"
        class="table-cell"
        :class="{ highlight: isAlcoholEhterMatched(cell), ['col-' + j]: true }"
        @dblclick="$emit('cell-dbclick', cell)"
      >
        <ATooltip :content="`${cell.alcohol.formula} EO: ${cell.eoNum} PO: ${cell.poNum}`">
          <span>{{ cell.weight.toFixed(2) }}</span>
        </ATooltip>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tooltip as ATooltip } from "@arco-design/web-vue";

import type { AlcoholEther, AlcoholEtherTable } from "@/utils/alcohol";

defineEmits<{
  (event: "cell-dbclick", ae: AlcoholEther): void;
}>();

const props = defineProps<{
  table: AlcoholEtherTable;
  searchWeight?: number;
  searchPrecision?: number;
}>();

const isAlcoholEhterMatched = (ae: AlcoholEther) => {
  if (!props.searchWeight) {
    return false;
  }
  const precision = props.searchPrecision || 2.0;
  return Math.abs(ae.weight - props.searchWeight) <= precision;
};
</script>

<style scoped lang="scss">
.alcohol-ether-table-body {
  margin: 1em 0;
  width: 100%;
  overflow-x: auto;
  .table-row {
    display: flex;
    align-items: center;
    .table-cell {
      display: flex;
      align-items: center;
      width: 72px;
      flex-shrink: 0;
      height: 35px;
      padding-left: 0.5em;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      &.highlight {
        background-color: lightsteelblue;
      }
    }
  }

  .row-0 .table-cell {
    border-top: 1px solid #ddd;
  }

  .col-0.table-cell {
    border-left: 1px solid #ddd;
  }
}
</style>
