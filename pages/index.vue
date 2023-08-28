<script setup lang="ts">
const { locale, setLocale } =useI18n()
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
      </div>
    </ElHeader>
    <ElMain>
      {{ locale }}
      <ElSelect @update:model-value="(v) => setLocale(v)">
        <ElOption value="en-GB">English</ElOption>
        <ElOption value="zh-CN">中文</ElOption>
      </ElSelect>
      <ElSelect v-model="colorMode.preference">
        <ElOption :label="$t('theme.light')" value="light">{{ $t('theme.light') }}</ElOption>
        <ElOption :label="$t('theme.dark')" value="dark">{{ $t('theme.dark') }}</ElOption>
      </ElSelect>
      <pre>{{ data }}</pre>
    </ElMain>
  </ElContainer>
</template>
