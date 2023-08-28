<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'

const localePath = useLocalePath()
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <div class="h-full flex items-center">
        <NuxtLink :to="localePath('/')" class="font-semibold">
          {{ $t('appName') }}
        </NuxtLink>

        <div class="flex-1 flex justify-end space-x-4 items-center">
          <LocalizationDropdown />
          <ElButton circle @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'">
            <Icon v-if="$colorMode.unknown" name="lucide-smile" />
            <Icon v-else-if="$colorMode.value === 'dark'" name="lucide-sun" />
            <Icon v-else-if="$colorMode.value === 'light'" name="lucide-moon" />
          </ElButton>
        </div>
      </div>
    </ElHeader>
    <ElMain>
      <BusStops />
    </ElMain>
  </ElContainer>
</template>
