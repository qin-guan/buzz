import type { ArrivalResponse } from '~/shared/types/datamall'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)

  const { datamallApiKey } = useRuntimeConfig()
  const data = await $fetch<ArrivalResponse>('https://datamall-proxy.netlify.app/ltaodataservice/BusArrivalv2', {
    query: {
      camel: true,
      BusStopCode: params.code,
    },
    headers: {
      AccountKey: datamallApiKey,
    },
  })

  return data
})
