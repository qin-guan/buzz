import * as deepl from 'deepl-node'
import type { AllBusStopsStorageSchema } from '~/shared/types'

const localizationMap: Record<string, deepl.TargetLanguageCode> = {
  'zh-CN': 'zh',
}

export default defineCachedEventHandler(async (event) => {
  const { locale = 'zh-CN', code } = getRouterParams(event)

  if (locale !== 'zh-CN') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Locale must be zh-CN.',
    })
  }

  if (!code || code.length !== 5) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Please enter a valid bus stop code.',
    })
  }

  const storage = useStorage(`cache/bus-stop-translations/${locale}`)
  if (await storage.hasItem(code))
    return await storage.getItem(code)

  const allBusses = useStorage('cache/bus-stops')
  const bus = (await allBusses.getItem<AllBusStopsStorageSchema>('all'))?.find(x => x.BusStopCode === code)
  if (!bus) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Bus stop does not exist',
    })
  }

  const config = useRuntimeConfig()

  console.log(config.deeplApikey, bus.Description, localizationMap[locale])

  const translator = new deepl.Translator(config.deeplApikey)

  const result = await translator.translateText(bus?.Description, 'en', localizationMap[locale])
  await storage.setItem(code, result.text)

  return result.text
}, {
  swr: true,
  maxAge: 60 * 60 * 24 * 7, // 1 week
})
