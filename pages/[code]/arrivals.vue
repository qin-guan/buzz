<script setup lang="ts">
import { differenceInMinutes, parseISO } from 'date-fns'

const { $data } = useNuxtApp()

const localePath = useLocalePath()
const route = useRoute()

const busStop = computed(() => {
  return $data.busStops.find(i => i.BusStopCode === route.params.code)
})

const { data, refresh } = await useFetch(`/api/bus-stops/${route.params.code}/arrivals`)

useIntervalFn(refresh, 500)
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <AppHeader />
    </ElHeader>
    <ElMain class="mx-4 my-4">
      <ElEmpty v-if="!busStop" description="Bus stop not found" />
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
        <ElButton @click="refresh">
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
            <span>
              In {{ differenceInMinutes(parseISO(service?.NextBus?.EstimatedArrival!), new Date()) }}m
            </span>
            <span>
              In {{ differenceInMinutes(parseISO(service?.NextBus2?.EstimatedArrival!), new Date()) }}m
            </span>
            <span>
              In {{ differenceInMinutes(parseISO(service?.NextBus3?.EstimatedArrival!), new Date()) }}m
            </span>
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
