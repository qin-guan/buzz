import defaultTheme from 'tailwindcss/defaultTheme'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    headNext: true
  },

  devtools: { enabled: true },

  modules: [
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontaine',
    '@nuxtjs/tailwindcss'
  ],

  runtimeConfig: {
    datamallApiKey: process.env.NUXT_DATAMALL_API_KEY || ''
  },

nitro: {
  storage: {
    cache: {
      driver: 'cloudflare-kv-binding',
      binding: 'KV_BUZZ'
    }
  },
  devStorage: {
    cache: {
      driver: 'fsLite',
      base: './tmp'
    }
  }
},

  elementPlus: {
    themes: [
      'dark'
    ]
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
            sans: ['Inter', 'Inter fallback', 'Helvetica Neue', "Helvetica Neue fallback", 'Helvetica', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'Arial', 'sans-serif'],
          },
        },
      },
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: ''
  }
})
