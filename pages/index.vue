<script setup lang="ts">
const localePath = useLocalePath()

const colorMode = useColorMode()

const { data } = useLazyFetch('/api/bus-stops')
</script>

<template>
  <ElContainer>
    <ElHeader>
      <div class="h-full flex items-center">
        <NuxtLink :to="localePath('/')" class="font-semibold">
          {{ $t('appName') }}
        </NuxtLink>

        <div class="flex-1 flex justify-end">
          <LocalizationDropdown/>
        </div>
      </div>
    </ElHeader>
    <ElMain>
      <ElSelect v-model="colorMode.preference">
        <ElOption :label="$t('theme.light')" value="light">{{ $t('theme.light') }}</ElOption>
        <ElOption :label="$t('theme.dark')" value="dark">{{ $t('theme.dark') }}</ElOption>
      </ElSelect>
      <pre>{{ data }}</pre>
    </ElMain>
  </ElContainer>
</template>
