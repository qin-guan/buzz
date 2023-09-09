<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()

const { data: busStop, pending: busStopPending, error } = await useBusStop(route.params.code as string)

const { data, refresh } = await useBusStopArrivals(route.params.code as string)

useIntervalFn(refresh, 2000)
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <AppHeader />
    </ElHeader>
    <ElMain class="mx-4 my-4">
      {{ busStopPending }}
      <div v-if="busStopPending">
        <ElSkeleton />
      </div>

      <div v-else-if="!busStop">
        <ElEmpty description="Bus stop not found" />
      </div>

      <div v-else class="flex flex-col space-y-10">
        <ElBreadcrumb separator="/">
          <ElBreadcrumbItem :to="{ path: localePath('/') }">
            {{ $t('arrival.breadcrumb.busStop') }}
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>
            {{ busStop.Description }}
          </ElBreadcrumbItem>
        </ElBreadcrumb>

        <h2>Bus Services</h2>
        <ElButton @click="refresh()">
          Refresh
        </ElButton>
        <div v-for="service in data?.Services" :key="service?.ServiceNo" class="flex">
          <div>
            <div class="rounded-md bg-blue-700 bg-opacity-20 text-blue-500 p-3">
              <span class="font-semibold">
                {{ service?.ServiceNo }}
              </span>
            </div>
          </div>
          <div class="flex flex-col">
            <BusArrivalCard :estimated-arrival="service?.NextBus?.EstimatedArrival" />
            <BusArrivalCard :estimated-arrival="service?.NextBus?.EstimatedArrival" />
            <BusArrivalCard :estimated-arrival="service?.NextBus?.EstimatedArrival" />
          </div>
        </div>
      </div>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.el-main {
  padding: 0;
}
</style>
