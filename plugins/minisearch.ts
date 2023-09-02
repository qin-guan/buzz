import MiniSearch from 'minisearch'

import { options } from '~/shared/minisearch'
import type { BusStopSchema } from '~/shared/types'

export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    const { $data } = useNuxtApp()

    const minisearch: MiniSearch<BusStopSchema> = MiniSearch.loadJSON<BusStopSchema>($data.busStopsIndex, options)

    return {
      provide: {
        minisearch,
      },
    }
  },
})
