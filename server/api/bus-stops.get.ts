import { z } from 'zod'

const busStopSchema = z.object({
    BusStopCode: z.string(),
    RoadName: z.string(),
    Description: z.string(),
    Latitude: z.number(),
    Longitude: z.number()
  })

const responseSchema = z.object({
  value: z.array(busStopSchema)
})

type ResponseSchema = z.infer<typeof responseSchema>
type BusStopSchema = z.infer<typeof busStopSchema>

export default defineCachedEventHandler(async (event) => {
  const storage = useStorage<BusStopSchema[]>('cache/bus-stops/all')
  const { datamallApiKey } = useRuntimeConfig()

  try {
    if (await storage.hasItem('data')) {
      return await storage.getItem('data')
    }

    const data: BusStopSchema[] = []

    while (true) {
      const { value } = await $fetch<ResponseSchema>('http://datamall2.mytransport.sg/ltaodataservice/BusStops', {
        query: {
          $skip: data.length
        },
        headers: {
          AccountKey: datamallApiKey
        }
      })

      data.push(...value)

      if (value.length !== 500) {
        break
      }
    }

    await storage.setItem('data', data)
    await storage.setMeta('data', { length: data.length })

    return data
  } catch (e) {
    console.error(e)
  }
}, {
  swr: true,
  maxAge: 60 * 60 * 24 * 7 // 1 week
})
