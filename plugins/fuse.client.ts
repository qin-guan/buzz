import { wrap } from 'comlink'
import FuseWorker from '~/assets/fuse-worker?worker'
import type { FuseWorker as IFuseWorker } from '~/shared/types'

export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    const { $data } = useNuxtApp()

    const worker = new FuseWorker()
    const obj = wrap<IFuseWorker>(worker)

    try {
      await obj.init($data.busStops, $data.busStopsIndex)
    }
    catch (e) { console.error(e) }

    return {
      provide: {
        fuse: {
          search: obj.search,
        },
      },
    }
  },
})
