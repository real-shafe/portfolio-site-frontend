// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  routeRules: {
    // the game moved to its own Worker; keep old links working
    '/weasel-run': { redirect: { to: 'https://weasel-run.shafe.dev', statusCode: 301 } },
    '/weasel-run/**': { redirect: { to: 'https://weasel-run.shafe.dev', statusCode: 301 } },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
