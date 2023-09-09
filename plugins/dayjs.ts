export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    const { default: dayjs } = await import('dayjs')
    const { default: relativeTime } = await import('dayjs/plugin/relativeTime')

    dayjs.extend(relativeTime)

    return {
      provide: {
        dayjs,
      },
    }
  },
})
