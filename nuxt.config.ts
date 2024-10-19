// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    headNext: true,
    componentIslands: true,
  },

  devtools: { enabled: true },

  modules: [
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontaine',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-icon',
  ],

  runtimeConfig: {
    deeplApikey: process.env.NUXT_DEEPL_API_KEY || '',
    datamallApiKey: process.env.NUXT_DATAMALL_API_KEY || '',
  },

  nitro: {
    storage: {
      cache: {
        driver: 'cloudflare-kv-binding',
        binding: 'KV_BUZZ',
      },
    },
    devStorage: {
      cache: {
        driver: 'fsLite',
        base: '.nuxt/cache',
      },
    },
  },

  elementPlus: {
    themes: [
      'dark',
    ],
  },

  i18n: {
    locales: [
      {
        code: 'en-GB',
        name: 'English',
      },
      {
        code: 'zh-CN',
        name: '简体中文',
      },
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'en-GB',
  },

  googleFonts: {
    families: {
      Inter: [400, 600, 800],
    },
  },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'Inter fallback', 'Helvetica Neue', 'Helvetica Neue fallback', 'Helvetica', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'Arial', 'sans-serif'],
          },
        },
      },
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
  },
})
