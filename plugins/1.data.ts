export default defineNuxtPlugin({
  async setup() {
    const [busStops, busStopsIndex] = await Promise.all([
      $fetch('/api/bus-stops'),
      $fetch('/api/bus-stops-minisearch', { parseResponse: txt => txt }),
    ])

    if (!busStops || !busStopsIndex)
      throw new Error('[plugins/1.data.ts] invariant')

    return {
      provide: {
        data: {
          busStops,
          busStopsIndex,
        },
      },
    }
  },
})
