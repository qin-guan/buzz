<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <div class="h-full flex items-center">
    <NuxtLink :to="localePath('/')" class="font-semibold">
      {{ $t('appName') }}
    </NuxtLink>

    <div class="flex-1 flex justify-end space-x-4 items-center">
      <AppHeaderGeolocationDropdown />
      <AppHeaderLocalizationDropdown />
      <ElButton circle @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'">
        <Icon v-if="$colorMode.unknown" name="lucide-smile" />
        <Icon v-else-if="$colorMode.value === 'dark'" name="lucide-sun" />
        <Icon v-else-if="$colorMode.value === 'light'" name="lucide-moon" />
      </ElButton>
    </div>
  </div>
</template>
