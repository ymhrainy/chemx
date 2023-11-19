<template>
  <div class="the-chem">
    <div class="commands">
      <ASpace>
        <AButton type="primary" shape="round" @click="removeTable"> 移除表格 </AButton>
        <AButton type="primary" shape="round" @click="addTable"> 添加表格 </AButton>
        搜索
        <AInputNumber v-model="searchWeight" style="width: 100px"></AInputNumber>
      </ASpace>
    </div>
    <div class="tables">
      <AlcoholEtherTable
        v-for="t in tableCount"
        :key="t + 1"
        :search-weight="searchWeight"
        @cell-dbclick="onCellDbClicked"
      ></AlcoholEtherTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Button as AButton,
  InputNumber as AInputNumber,
  Space as ASpace,
} from "@arco-design/web-vue";

import AlcoholEtherTable from "../components/AlcoholEtherTable.vue";
import type { AlcoholEther } from "@/utils/alcohol";

const tableCount = ref(1);

const addTable = () => {
  tableCount.value++;
};
const removeTable = () => {
  if (tableCount.value > 1) {
    tableCount.value--;
  }
};

const searchWeight = ref(0);
const onCellDbClicked = (ae: AlcoholEther) => {
  searchWeight.value = parseFloat(ae.weight.toFixed(2));
};
</script>

<style lang="scss" scoped>
.the-chem {
  overflow: auto;
  width: 100%;
  .commands {
    margin: 0.5em 0;
  }
}
</style>
