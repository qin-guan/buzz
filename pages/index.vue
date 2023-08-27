<script setup lang="ts">
const colorMode = useColorMode()

function toggle() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}

const { data } = useLazyFetch('/api/bus-stops')
</script>

<template>
  <ElContainer>
    <ElHeader>
      <div class="h-full flex items-center">
        <NuxtLink to="/" class="font-semibold">
          Buzz
        </NuxtLink>
      </div>
    </ElHeader>
    <ElMain>
      <ElButton @click="toggle">
        Toggle
      </ElButton>
      <pre>{{ data }}</pre>
    </ElMain>
  </ElContainer>
</template>
