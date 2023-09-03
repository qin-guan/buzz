import type { BusStopSchema } from '~/shared/types/core'
import type { AllBusStops } from '~/shared/types/storage'

export default defineCachedEventHandler(async (event) => {
  const params = getRouterParams(event)
  const storage = useStorage('cache/bus-stops')

  if (!params.code || params.code.length !== 5 || Number.isNaN(Number.parseInt(params.code))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    })
  }

  try {
    if (await storage.hasItem(params.code))
      return await storage.getItem<BusStopSchema>(params.code)

    let busStops = await storage.getItem<AllBusStops>('all')
    if (!busStops) // Populate cache
      busStops = await $fetch('/api/bus-stops')

    const stop = busStops!.find(item => item.BusStopCode === params.code)
    if (!stop) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not found',
      })
    }

    await storage.setItem(params.code, stop)
    return stop
  }
  catch (e) {
    console.error(e)
  }
}, {
  swr: true,
  maxAge: 60 * 60 * 24 * 7, // 1 week
})
