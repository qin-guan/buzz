export const useSharedGeolocation = createSharedComposable(() => {
  const geolocation = useGeolocation({
    immediate: false,
  })

  onMounted(() => {
    if (settings.value.geolocation)
      geolocation.resume()
  })

  watch(() => settings.value.geolocation, (value) => {
    if (value)
      geolocation.resume()
    else
      geolocation.pause()
  })

  return geolocation
})
