<script setup lang="ts">
const { $data } = useNuxtApp()

const localePath = useLocalePath()
const route = useRoute()

const busStop = computed(() => {
  return $data.busStops.find(i => i.BusStopCode === route.params.code)
})
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <AppHeader />
    </ElHeader>
    <ElMain class="mx-4 my-4">
      <ElEmpty v-if="!busStop" description="Bus stop not found" />
      <div v-else>
        <ElBreadcrumb separator="/">
          <ElBreadcrumbItem :to="{ path: localePath('/') }">
            {{ $t('arrival.breadcrumb.busStop') }}
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>
            {{ busStop.Description }}
          </ElBreadcrumbItem>
        </ElBreadcrumb>
      </div>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.el-main {
  padding: 0;
}
</style>
