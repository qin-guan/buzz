<script setup lang="ts">
import { f7Page, f7Navbar, f7List, f7ListItem, f7Subnavbar, f7Searchbar } from 'framework7-vue'
import MiniSearch from 'minisearch'
import type { BusStop } from '~/api/app/models'

const { data: busStops, status: busStopsStatus } = useBusStops()
const { data: minisearchIndex, status: minisearchIndexStatus } = useMiniSearchIndex()

const vlData = ref({ items: [] as (BusStop & { index: number })[], topPosition: 0 })

const minisearch = computed(() => {
  if (minisearchIndexStatus.value !== 'success' || minisearchIndex.value === undefined)
    return null

  return MiniSearch.loadJSON<BusStop>(minisearchIndex.value, {
    idField: 'code',
    fields: ['description', 'roadName', 'code'],
    storeFields: ['description', 'roadName', 'code', 'longitude', 'latitude'],
  })
})

function renderExternal(_: unknown, _vlData: typeof vlData.value) {
  vlData.value = _vlData
}

function searchAll(query: string, items: BusStop[]) {
  return minisearch.value
    ?.search(query, {
      prefix: true,
      fuzzy: 0.2,
      boost: { description: 2, roadName: 1 },
    })
    .map(result => items.findIndex(busStop => busStop.code === result.code))
}
</script>

<template>
  <f7Page>
    <f7Navbar
      large
      title="Bus stops"
      sliding
    >
      <f7-subnavbar :inner="false">
        <f7-searchbar
          search-container=".virtual-list"
          search-item="li"
          search-in=".item-title"
        />
      </f7-subnavbar>
    </f7Navbar>

    <f7List
      strong
      outline-ios
      inset-md
      dividers-ios
      medial-list
      virtual-list
      :virtual-list-params="{
        items: busStops,
        searchAll,
        renderExternal,
        height: 69,
      }"
    >
      <ul>
        <f7ListItem
          v-for="(item, index) in vlData.items"
          :key="index"
          media-item
          :link="`/stops/${item.code}`"
          :title="item.description"
          :subtitle="item.code"
          :style="`top: ${vlData.topPosition}px`"
          :virtual-list-index="item.index"
        />
      </ul>
    </f7List>
  </f7Page>
</template>
