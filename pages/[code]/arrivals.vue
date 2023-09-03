<script setup lang="ts">
const route = useRoute()

const { data: stop, error, pending } = await useLazyFetch(`/api/bus-stops/${route.params.code}`)
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <AppHeader />
    </ElHeader>
    <ElMain class="mx-4 my-4">
      <ElBreadcrumb separator="/">
        <ElBreadcrumbItem :to="{ path: '/' }">
          {{ $t('arrival.breadcrumb.busStop') }}
        </ElBreadcrumbItem>
        <ElBreadcrumbItem>
          {{ stop.Description }}
        </ElBreadcrumbItem>
      </ElBreadcrumb>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.el-main {
  padding: 0;
}
</style>
