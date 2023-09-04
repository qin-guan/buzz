import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'

// Nuxt 3 app aliases
import { useState } from '#app'
import type { MetaSchema } from '~/shared/types/core'

export default defineNuxtPlugin(async (nuxt) => {
  const { QueryClient, VueQueryPlugin, dehydrate, hydrate } = await import('@tanstack/vue-query')

  const vueQueryState = useState<DehydratedState | null>('vue-query')

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
  })
  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (process.server) {
    const cookie = useCookie<MetaSchema>('meta')
    const meta = await $fetch('/api/bus-stops/meta')

    if (!cookie.value || cookie.value.checksum !== meta.checksum) {
      await queryClient.prefetchQuery(['bus-stops'], () => $fetch('/api/bus-stops'))
      await queryClient.prefetchQuery(['bus-stops-index'], () => $fetch('/api/bus-stops-minisearch', { parseResponse: txt => txt }))
    }

    cookie.value = meta

    nuxt.hooks.hook('app:rendered', async () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (process.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value)

      const busStops = queryClient.getQueryData(['bus-stops'])
      if (busStops)
        localStorage.setItem('bus-stops', JSON.stringify(busStops))

      const busStopsIndex = queryClient.getQueryData<string>(['bus-stops-index'])
      if (busStopsIndex)
        localStorage.setItem('bus-stops-index', busStopsIndex)
    })
  }
})
