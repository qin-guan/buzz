export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en-GB',
  messages: {
    'en-GB': {
      appName: 'Buzz',
      busStop: {
        searchBar: 'Search for bus stop codes, names, or roads',
        distance: '{distance}m',
        empty: 'No bus stops found',
      },
      arrival: {
        breadcrumb: {
          busStop: 'Bus Stops',
        },
      },
      appHeader: {
        geolocation: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
    },
    'zh-CN': {
      appName: '巴士',
      busStop: {
        searchBar: '搜索巴士站编号、名称或路名',
        distance: '{distance}米',
        empty: '没有找到巴士站',
      },
      arrival: {
        breadcrumb: {
          busStop: '巴士站',
        },
      },
      appHeader: {
        geolocation: {
          enable: '开启定位',
          disable: '关闭定位',
        },
      },
    },
  },
}))
