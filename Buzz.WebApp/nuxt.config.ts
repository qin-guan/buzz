// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint', 
    '@vueuse/nuxt',
  ],

  ssr: true,

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      api: process.env.services__api__http__0 || '',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-10-31',

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
