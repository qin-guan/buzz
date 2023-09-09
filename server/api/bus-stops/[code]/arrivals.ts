import type { ArrivalResponse } from '~/shared/types/datamall'

export default defineCachedEventHandler(async (event) => {
  const params = getRouterParams(event)

  const { datamallApiKey } = useRuntimeConfig()
  const d = await $fetch<ArrivalResponse>('https://datamall-proxy.netlify.app/ltaodataservice/BusArrivalv2', {
    query: {
      BusStopCode: params.code,
    },
    headers: {
      AccountKey: datamallApiKey,
    },
  })

  return d
}, {
  maxAge: 5,
})
