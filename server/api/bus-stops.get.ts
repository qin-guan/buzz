import type { BusStopRespone } from '~/shared/types/datamall'
import type { AllBusStops } from '~/shared/types/storage'

export default defineCachedEventHandler(async () => {
  const storage = useStorage<AllBusStops>('cache/bus-stops')
  const { datamallApiKey } = useRuntimeConfig()

  try {
    if (await storage.hasItem('all'))
      return await storage.getItem('all')

    const data: AllBusStops = []

    while (true) {
      const { value } = await $fetch<BusStopRespone>('https://datamall-proxy.netlify.app/ltaodataservice/BusStops', {
        query: {
          $skip: data.length,
        },
        headers: {
          AccountKey: datamallApiKey,
        },
      })

      data.push(...value)

      if (value.length !== 500)
        break
    }

    await storage.setItem('all', data)
    await storage.setMeta('all', { length: data.length })

    return data
  }
  catch (e) {
    console.error(e)
  }
}, {
  swr: true,
  maxAge: 60 * 60 * 24 * 7, // 1 week
})
