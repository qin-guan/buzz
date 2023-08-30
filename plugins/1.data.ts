export default defineNuxtPlugin({
  async setup() {
    const [busStops, busStopsIndex] = await Promise.all([
      $fetch('/api/bus-stops'),
      $fetch('/api/bus-stops-fuse'),
    ])

    if (!busStops || !busStopsIndex)
      throw new Error('invariant')

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
