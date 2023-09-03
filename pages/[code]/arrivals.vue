<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()

const { data: stop, error, pending } = await useLazyFetch(`/api/bus-stops/${route.params.code}`)
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <AppHeader />
    </ElHeader>
    <ElMain class="mx-4 my-4">
      <ElBreadcrumb v-if="!pending" separator="/">
        <ElBreadcrumbItem :to="{ path: localePath('/') }">
          {{ $t('arrival.breadcrumb.busStop') }}
        </ElBreadcrumbItem>
        <ElBreadcrumbItem>
          {{ stop }}
          {{ error }}
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
