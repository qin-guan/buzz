<script setup lang="ts">
const localePath = useLocalePath()

const { locatedAt, error } = useSharedGeolocation()
</script>

<template>
  <div class="h-full flex items-center">
    <NuxtLink :to="localePath('/')" class="font-semibold">
      {{ $t('appName') }}
    </NuxtLink>

    <div class="flex-1 flex justify-end space-x-4 items-center">
      {{ locatedAt }}
      <LocalizationDropdown />
      <ElButton circle @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'">
        <Icon v-if="$colorMode.unknown" name="lucide-smile" />
        <Icon v-else-if="$colorMode.value === 'dark'" name="lucide-sun" />
        <Icon v-else-if="$colorMode.value === 'light'" name="lucide-moon" />
      </ElButton>
    </div>
  </div>
</template>
