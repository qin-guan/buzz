import { wrap } from 'comlink'
import FuseWorker from '~/assets/fuse-worker?worker'

export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    const [data, index] = await Promise.all([
      $fetch('/api/bus-stops'),
      $fetch('/api/bus-stops-fuse'),
    ])

    const worker = new FuseWorker()
    const obj = wrap<{
      init(data: any, index: any): void
      search(query: string): any
    }>(worker)

    try {
      await obj.init(data, index)
    }
    catch (e) { console.error(e) }

    return {
      provide: {
        fuse: {
          search: obj.search,
          data,
          index,
        },
      },
    }
  },
})
