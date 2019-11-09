module.exports = {
  mode: 'spa',
  head: {
    title: 'Curatee',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#000' },
  css: [],
  plugins: [],
  buildModules: [],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
  axios: {},
  build: {
    extend(config, ctx) {}
  }
}
