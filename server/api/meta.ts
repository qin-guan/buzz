export default defineEventHandler(async () => {
  const storage = useStorage('cache/bus-stops')

  const [busStops, miniSearchIndex] = await Promise.all([
    storage.getMeta('all'),
    storage.getMeta('minisearch-index'),
  ])

  return {
    busStops,
    miniSearchIndex,
  }
})
