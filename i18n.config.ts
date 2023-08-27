export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      appName: 'Buzz',
      theme: {
        light: 'Light',
        dark: 'Dark'
      }
    },
    cn: {
      appName: '巴士',
      theme: {
        light: '明亮模式',
        dark: '深色模式'
      }
    }
  }
}))
