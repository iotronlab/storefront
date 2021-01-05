import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
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
    titleTemplate: process.env.npm_package_name + ' - curated store for art',
    title: process.env.npm_package_name || 'artistic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || 'curated store for art',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    script: [
      {
        hid: 'rzpay',
        src: 'https://checkout.razorpay.com/v1/checkout.js',
        defer: true,
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: '~/plugins/vee-validate.js',
    },
  ],
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
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/pwa',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios', { anotherOption: true }],
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxtjs/component-cache',
    '@nuxtjs/toast',
  ],
  toast: {
    position: 'top-center',
    duration: 4000,
    theme: 'bubble',
    action: {
      text: 'Close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      },
    },
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
        },
      },
    ],
  },
  optimizedImages: {
    optimizeImages: true,
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:8000/api',
    // browserBaseURL: 'http://api.butiq.store/api'
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
            url: '/login',
            method: 'post',
            propertyName: 'accessToken',
          },
          user: {
            url: '/details',
            method: 'get',
            propertyName: 'data',
          },
          logout: {
            url: '/logout',
            method: 'get',
          },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
        watchLoggedIn: true,
        localStorage: true,
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

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#bb86fc',
          accent: colors.grey.darken3,
          secondary: '#8a34c9',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.darken4,
          success: colors.green.accent4,
        },
        light: {
          primary: colors.purple.darken3,
          accent: colors.grey.darken3,
          secondary: colors.purple.base,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.darken4,
          success: colors.green.accent4,
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    analyze: {
      analyzerMode: 'static',
    },
    transpile: ['vee-validate/dist/rules'],
  },
}
