// https://stackoverflow.com/questions/73966323/sorting-latitude-and-longitude-by-distance-and-grouping-them-based-on-tolerance
export const getDistance = useMemoize((lat1: number, lon1: number, lat2: number, lon2: number) => {
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180

  const theta = lon1 - lon2
  const radtheta = (Math.PI * theta) / 180

  let dist
    = Math.sin(radlat1) * Math.sin(radlat2)
    + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
})

export const isWithinRadius = useMemoize((lat: number, lon: number, centerLat: number, centerLon: number, radius: number = 0.5) => {
  const ky = 40000 / 360
  const kx = Math.cos(Math.PI * centerLat / 180.0) * ky
  const dx = Math.abs(centerLon - lon) * kx
  const dy = Math.abs(centerLat - lat) * ky
  return Math.sqrt(dx * dx + dy * dy) <= radius
})
