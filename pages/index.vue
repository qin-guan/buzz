<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'

const localePath = useLocalePath()
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <AppHeader />
    </ElHeader>
    <ElMain>
      <BusStops />
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.el-main {
  padding: 0;
}
</style>
