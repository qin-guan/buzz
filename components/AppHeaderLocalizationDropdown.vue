<script setup lang="ts">
import type { LocaleObject } from 'vue-i18n-routing'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value as LocaleObject[]).filter(i => i.code !== locale.value)
})
</script>

<template>
  <ElDropdown>
    <span class="text-xl p-2">
      <Icon name="lucide-languages" />
    </span>

    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="l in availableLocales" :key="l.code">
          <NuxtLink :to="switchLocalePath(l.code)">
            {{ l.name }}
          </NuxtLink>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
