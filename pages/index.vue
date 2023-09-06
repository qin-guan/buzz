<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <AppHeader />
    </ElHeader>
    <ElMain>
      <ClientOnly>
        <Suspense>
          <template #fallback>
            <div>hello!</div>
          </template>
          <BusStopSearch />
        </Suspense>
      </ClientOnly>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.el-main {
  padding: 0;
}
</style>
