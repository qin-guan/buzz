export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en-GB',
  messages: {
    'en-GB': {
      appName: 'Buzz',
      theme: {
        light: 'Light',
        dark: 'Dark'
      }
    },
    'zh-CN': {
      appName: '巴士',
      theme: {
        light: '明亮模式',
        dark: '深色模式'
      }
    }
  }
}))
