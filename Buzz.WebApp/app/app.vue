<script setup lang="ts">
import 'framework7/css/bundle'
import 'framework7-icons/css/framework7-icons.css'
import 'material-icons/iconfont/material-icons.css'

import Framework7 from 'framework7/lite-bundle'
import Framework7Vue, { f7App, f7Views, f7View, f7Link, f7Toolbar } from 'framework7-vue/bundle'

import StopPage from '~/components/stops/[code]/page.vue'

Framework7.use(Framework7Vue)

const routes = [
  {
    path: '/',
  },
  {
    path: '/stops/:code',
    component: StopPage,
  },
]
</script>

<template>
  <f7App
    name="Buzz"
    theme="md"
    :routes="routes"
  >
    <f7Views
      tabs
      url="/"
      class="safe-areas"
      :master-detail-breakpoint="768"
      ios-swipe-back
      preload-previous-page
    >
      <f7Toolbar
        position="bottom"
        tabbar
        icons
      >
        <f7Link
          tab-link="#stops"
          tab-link-active
          text="Stops"
          icon-md="material:home"
        />
        <f7Link
          tab-link="#services"
          text="Services"
          icon-md="material:sparkle"
        />
      </f7Toolbar>

      <f7View
        id="stops"
        tab
        tab-active
      >
        <HomeTabsStops />
      </f7View>

      <f7View
        id="services"
        tab
      >
        <HomeTabsServices />
      </f7View>
    </f7Views>
  </f7App>
</template>
