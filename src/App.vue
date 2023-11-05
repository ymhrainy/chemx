<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- <header class="app-header">
    <RouterLink to="/">EoPo</RouterLink>
  </header> -->
  <content class="app-content">
    <RouterView></RouterView>
  </content>
</template>

<style scoped lang="scss">
.app-header {
  margin: 1em 0;
}
</style>
