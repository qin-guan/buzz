import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'
import { useState } from '#app'

export default defineNuxtPlugin(async (nuxt) => {
  const { QueryClient, VueQueryPlugin, dehydrate, hydrate } = await import('@tanstack/vue-query')
  const { persistQueryClient } = await import('@tanstack/query-persist-client-core')
  const { createSyncStoragePersister } = await import('@tanstack/query-sync-storage-persister')

  const vueQueryState = useState<DehydratedState | null>('vue-query')

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
      },
    },
  })
  const options: VueQueryPluginOptions = {
    queryClient,
    // clientPersister: (queryClient) => {
    //   return persistQueryClient({
    //     queryClient,
    //     persister: createSyncStoragePersister({ storage: process.client ? localStorage : undefined }),
    //   })
    // },
  }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (process.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (process.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value)
    })
  }
})
