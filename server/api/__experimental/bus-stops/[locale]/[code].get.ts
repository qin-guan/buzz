import type { TranslateResponse } from '~/shared/types/deepl'
import type { AllBusStops } from '~/shared/types/storage'

const localizationMap: Record<string, string> = {
  'zh-CN': 'ZH',
}

export default defineCachedEventHandler(async (event) => {
  const { locale = 'zh-CN', code } = getRouterParams(event)

  if (Object.keys(localizationMap).includes(locale) === false) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Locale is not valid.',
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
  const bus = (await allBusses.getItem<AllBusStops>('all'))?.find(x => x.busStopCode === code)
  if (!bus) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      message: 'Bus stop does not exist',
    })
  }

  const config = useRuntimeConfig()

  const { translations: [{ text }] } = await $fetch<TranslateResponse>('https://deepl-proxy.netlify.app/v2/translate', {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${config.deeplApikey}`,
    },
    body: {
      source_lang: 'EN',
      text: [bus.description],
      target_lang: localizationMap[locale],
    },
  })

  await storage.setItem(code, text)

  return text
}, {
  swr: true,
  maxAge: 60 * 60 * 24 * 7, // 1 week
})
