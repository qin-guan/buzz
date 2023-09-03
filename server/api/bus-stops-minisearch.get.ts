import { subtle } from 'node:crypto'
import MiniSearch from 'minisearch'
import { options } from '~/shared/minisearch'
import type { AllBusStops } from '~/shared/types/storage'

export default defineCachedEventHandler(async () => {
  const storage = useStorage('cache/bus-stops')

  try {
    if (await storage.hasItem('minisearch-index'))
      return await storage.getItem<string>('minisearch-index')

    if (!(await storage.hasItem('all'))) // Populate cache first
      await $fetch('/api/bus-stops')

    const data = await storage.getItem<AllBusStops>('all')
    if (!data) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error',
      })
    }

    const minisearch = new MiniSearch(options)
    await minisearch.addAllAsync(data)

    const index = JSON.stringify(minisearch)

    await storage.setItem('minisearch-index', index)

    const textBuffer = new TextEncoder().encode(JSON.stringify(data))
    const hashBuffer = await subtle.digest('SHA-1', textBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray
      .map(item => item.toString(16).padStart(2, '0'))
      .join('')

    await storage.setMeta('minisearch-index', {
      checksum: hash,
    })

    return index
  }
  catch (e) {
    console.error(e)
  }
}, {
  swr: true,
  maxAge: 60 * 60 * 24 * 7, // 1 week
})
