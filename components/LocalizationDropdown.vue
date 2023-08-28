<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>

<template>
  <ElDropdown>
    <span class="el-dropdown-link">
      <Icon name="lucide-languages" />
    </span>

    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="locale in availableLocales" :key="locale.code">
          <NuxtLink :to="switchLocalePath(locale.code)">
            {{ locale.name }}
          </NuxtLink>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
