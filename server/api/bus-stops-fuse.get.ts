import Fuse from 'fuse.js'
import type { BusStopSchema } from './bus-stops.get'

const options = {
  keys: ['BusStopCode', 'Description', 'RoadName'],
}

export default defineCachedEventHandler(async () => {
  const storage = useStorage('cache/bus-stops')

  try {
    if (await storage.hasItem('fuse-index'))
      return await storage.getItem('fuse-index')

    if (!(await storage.hasItem('all'))) // Populate cache first
      await $fetch('/api/bus-stops')

    const data = await storage.getItem<BusStopSchema[]>('all')
    if (!data) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error',
      })
    }

    const dataIndex = Fuse.createIndex(options.keys, data)
    await storage.setItem('fuse-index', dataIndex.toJSON())

    return dataIndex
  }
  catch (e) {
    console.error(e)
  }
}, {
  swr: true,
  maxAge: 60 * 60 * 24 * 7, // 1 week
})
