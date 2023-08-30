import type { AllBusStopsStorageSchema, DatamallBusStopQueryResponse } from '~/shared/types'

export default defineCachedEventHandler(async () => {
  const storage = useStorage<AllBusStopsStorageSchema>('cache/bus-stops')
  const { datamallApiKey } = useRuntimeConfig()

  try {
    if (await storage.hasItem('all'))
      return await storage.getItem('all')

    const data: AllBusStopsStorageSchema = []

    while (true) {
      const { value } = await $fetch<DatamallBusStopQueryResponse>('http://datamall2.mytransport.sg/ltaodataservice/BusStops', {
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
