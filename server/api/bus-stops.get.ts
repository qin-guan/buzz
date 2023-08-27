import { z } from 'zod'

const response = z.object({
  value: z.array(z.object({
    BusStopCode: z.string(),
    RoadName: z.string(),
    Description: z.string(),
    Latitude: z.number(),
    Longitude: z.number()
  }))
})

type ResponseSchema = z.infer<typeof response>

export default defineCachedEventHandler(async (event) => {
  const { datamallApiKey } = useRuntimeConfig()

  try {
    return $fetch<ResponseSchema>('http://datamall2.mytransport.sg/ltaodataservice/BusStops', {
      headers: {
        AccountKey: datamallApiKey
      }
    })
  } catch (e) {
    console.error(e)
  }
}, {
  swr: true,
  maxAge: 60 * 60 * 24 * 7 // 1 week
})
