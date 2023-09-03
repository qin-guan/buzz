import type { MetaSchema } from '~/shared/types/core'

export default defineEventHandler(async () => {
  const storage = useStorage('cache/bus-stops')
  return await storage.getMeta('all') as MetaSchema
})
