<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';
import { f7Card, f7List, f7ListItem, f7NavTitle, f7NavTitleLarge, f7Navbar, f7Page } from 'framework7-vue'

const { data: stations, refresh } = useTrainStations()

useIntervalFn(refresh, 5000)
</script>

<template>
  <f7Page>
    <f7Navbar
      large
      transparent
      :sliding="false"
    >
      <f7NavTitle sliding>
        Services
      </f7NavTitle>
      <f7NavTitleLarge>
        Services
      </f7NavTitleLarge>
    </f7Navbar>
    
    <f7List>
      <f7ListItem
        v-for="station in stations"
        :key="station.code"
        :title="station.code"
      >
      
      <f7Card>
        {{ station.crowdLevel }}
      </f7Card>
    </f7ListItem>
    </f7List>
  </f7Page>
</template>
