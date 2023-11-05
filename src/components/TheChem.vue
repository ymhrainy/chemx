<template>
  <div class="the-chem">
    <div class="commands">
      <div class="command">
        <AInputNumber
          style="width: 80px; margin-right: 1em"
          v-model="nEo"
          placeholder="Eo数"
        ></AInputNumber
        >行

        <AInputNumber style="width: 80px" v-model="nPo" placeholder="Po数"></AInputNumber>列
      </div>

      <div class="command">
        <ASelect v-model="currentFA">
          <AOption v-for="fa in allAlcohols" :key="fa" :label="fa" :value="fa"></AOption>
        </ASelect>
      </div>
      <div class="command">
        <AInputNumber v-model="searchMass" type="number" placeholder="搜索质量"></AInputNumber>
      </div>
    </div>

    <div class="table-data">
      <div :class="['table-row', `row-${i}`]" v-for="(row, i) in tableData" :key="i + 1">
        <div
          :class="['table-cell', `col-${j}`, cell.near ? 'near' : '']"
          v-for="(cell, j) in row"
          :key="j"
        >
          {{ cell.data }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  InputNumber as AInputNumber,
  Select as ASelect,
  Option as AOption,
} from "@arco-design/web-vue";

import { FATTY_ALCOHOLS, getFATable } from "./utils";

const nEo = ref(20);
const nPo = ref(20);
const searchMass = ref(0);

const allAlcohols = ref<string[]>(Object.keys(FATTY_ALCOHOLS));

const currentFA = ref<string>(allAlcohols.value[0]);
const tableData = computed(() => {
  const fa = FATTY_ALCOHOLS[currentFA.value];
  return getFATable(fa, Number(searchMass.value), nEo.value, nPo.value);
});
</script>

<style lang="scss">
.the-chem {
  overflow: auto;
}

.commands {
  display: flex;

  .command {
    width: 300px;
    margin: 0 1em;
  }
}

.table-data {
  margin-top: 1em;

  .table-row {
    display: flex;
    align-items: center;

    .table-cell {
      width: 70px;
      flex-shrink: 0;
      height: 35px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      display: flex;
      align-items: center;

      &.near {
        background-color: aquamarine;
      }
    }
  }

  .row-0 {
    border-top: 1px solid #ddd;
  }

  .col-0 {
    border-left: 1px solid #ddd;
  }
}
</style>
