import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
const dynamicRoutes = async () => {
  const routesForCategories = axios
    .get('http://localhost:8000/api/categories')
    .then((res) => {
      return res.data.map((category) => {
        return {
          route: `/category/${category.slug}`,
          payload: category,
        }
      })
    })

  const routesForProducts = axios
    .get('http://localhost:8000/api/products')
    .then((res) => {
      return res.data.map((product) => {
        return {
          route: `/products/${product.slug}`,
          payload: product,
        }
      })
    })
  const routes = routesForCategories.concat(routesForProducts)
  return routes
}

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:8000/api',
  },
  // auth module config
  auth: {
    redirect: {
      home: '/',
      logout: '/',
      login: '/',
      callback: '/',
    },

    refresh_token: {
      prefix: '_refresh_token.',
    },
    token: {
      prefix: '_token.',
    },

    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: '/auth/me',
            method: 'get',
            propertyName: 'data',
          },
          logout: {
            url: '/auth/logout',
            method: 'get',
          },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
        watchLoggedIn: true,
        localStorage: true,
      },

      'laravel.passport': {
        url: '/auth/login',
        client_id: '1',
        client_secret: 'qncrYUzAv4Qdtj6A0Z6yiYVLRj88yZztq13PRUy5',
      },
    },
  },

  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  generate: {
    routes: dynamicRoutes,
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.purple.base,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.purple.base,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
