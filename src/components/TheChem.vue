<template>
  <div class="the-chem">
    <div class="commands">
      <div class="command">
        <ASelect v-model="currentFA">
          <AOption v-for="fa in allAlcohols" :key="fa" :label="fa" :value="fa"></AOption>
        </ASelect>
      </div>
      <div class="command">
        <AInputNumber v-model="searchMass" placeholder="搜索质量">
          <template #prefix>
            <IconSearch></IconSearch>
          </template>
        </AInputNumber>
      </div>
      <div class="command">
        <AInputNumber v-model="nEo" placeholder="Eo数">
          <template #suffix>
            EO
          </template>
        </AInputNumber>
      </div>
      <div class="command">
        <AInputNumber v-model="nPo" placeholder="Po数">
          <template #suffix>
            PO
          </template>
        </AInputNumber>
      </div>
    </div>

    <div class="table-data">
      <div :class="['table-row', `row-${i}`]" v-for="(row, i) in tableData" :key="i + 1">
        <div :class="['table-cell', `col-${j}`, cell.near ? 'near' : '']" v-for="(cell, j) in row" :key="j">
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
import { IconSearch } from '@arco-design/web-vue/es/icon';

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
  width: 100%;
}

.commands {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .command {
    width: 150px;
    margin-right: 1em;
  }
}

.table-data {
  width: 100%;
  overflow: auto;
  margin-top: 1em;

  .table-row {
    display: flex;
    align-items: center;

    .table-cell {
      width: 72px;
      flex-shrink: 0;
      height: 35px;
      padding-left: 0.5em;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      display: flex;
      align-items: center;

      &.near {
        background-color: aquamarine;
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
