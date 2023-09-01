export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en-GB',
  messages: {
    'en-GB': {
      appName: 'Buzz',
      busStops: {
        searchBar: 'Search for bus stop codes, names, or roads',
        distance: '{distance}m',
      },
    },
    'zh-CN': {
      appName: '巴士',
      busStops: {
        searchBar: '搜索巴士站编号、名称或路名',
        distance: '{distance}米',
      },
    },
  },
}))
