export default defineEventHandler(async () => {
  const storage = useStorage('cache')
  await storage.clear()
  return { ok: true }
})
