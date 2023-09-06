export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    const dayjs = await import('dayjs')
    const relativeTime = await import('dayjs/plugin/relativeTime')

    dayjs.default.extend(relativeTime.default)
    return {
      provide: {
        dayjs: dayjs.default
      }
    }
  }
})
