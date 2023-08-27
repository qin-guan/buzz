// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    headNext: true
  },

  devtools: { enabled: true },

  modules: [
    '@element-plus/nuxt'
  ],

  runtimeConfig: {
    datamallApiKey: process.env.DATAMALL_API_KEY || ''
  }
})
