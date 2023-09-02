<script setup lang="ts">
const { locatedAt } = useSharedGeolocation()

function handleCommand(cmd: 'enable' | 'disable') {
  settings.value.geolocation = cmd === 'enable'
}
</script>

<template>
  <ElDropdown @command="handleCommand">
    <span class="text-xl p-2">
      <ClientOnly>
        <Icon v-if="!settings.geolocation" name="lucide-locate-off" />
        <Icon v-else-if="locatedAt" name="lucide-locate-fixed" />
        <Icon v-else name="lucide-locate" />

        <template #fallback>
          <Icon name="lucide-locate" />
        </template>
      </ClientOnly>
    </span>

    <template #dropdown>
      <ClientOnly>
        <ElDropdownMenu>
          <ElDropdownItem command="enable">
            <div class="flex space-x-4 items-center">
              <Icon name="lucide-locate" />
              <span>
                Enable
              </span>
            </div>
          </ElDropdownItem>
          <ElDropdownItem command="disable">
            <div class="flex space-x-4 items-center">
              <Icon name="lucide-locate-off" />
              <span>
                Disable
              </span>
            </div>
          </ElDropdownItem>
        </ElDropdownMenu>
      </ClientOnly>
    </template>
  </ElDropdown>
</template>
