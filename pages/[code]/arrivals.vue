<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()

const { data: busStop, pending: busStopPending, error } = await useBusStop(route.params.code as string)
const { data: arrivals, pending: arrivalsPending, refresh } = await useBusStopArrivals(route.params.code as string)

useIntervalFn(refresh, 2000)

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined)
    return false
  return true
}

const services = computed(() => {
  if (!arrivals.value)
    return []
  return arrivals.value.services.map(service => ({
    number: service.serviceNo,
    arrivals: [
      service.nextBus,
      service.nextBus2,
      service.nextBus3,
    ]
      .filter(notEmpty)
      .map(next => ({
        time: next?.estimatedArrival,
        longitude: next?.longitude,
        latitude: next?.latitude,
        load: next?.load,
        type: next?.type,
      })),
  }))
})
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
            {{ busStop.description }}
          </ElBreadcrumbItem>
        </ElBreadcrumb>

        <h2>Bus Services</h2>
        <ElButton @click="refresh()">
          Refresh
        </ElButton>

        <BusArrivalTrack :services="services" />
      </div>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.el-main {
  padding: 0;
}
</style>
