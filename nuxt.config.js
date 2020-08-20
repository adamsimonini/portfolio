import colors from 'vuetify/es5/util/colors'
import English from './lang/en-CA.js'
import French from './lang/fr-CA.js'
import Japanese from './lang/jp-JP.js'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + "Find your conference",
    title: "Conference Tracker" || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    {src: "~/css/global.css"}
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/utilities.js'},
    {src: '~/plugins/localStorage.js', ssr: false },
    {src: '~/plugins/firebase.js'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],
  moment: {
    locales: ['fr', 'ja']
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-i18n', 
  ],
  generate: {
    fallback: true
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: 'fr',
        name: "français"
      
      },
    ],
    defaultLocale: "en",
    defaultLocaleRouteNameSuffix: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
    },
    vueI18n: {
      messages: {
        en: English,
        fr: French,
        jp: Japanese,
      }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // abc: true,
      dark: true,
      themes: {
        // dark: {
        //   primary: colors.blue.darken2,
        //   accent: colors.grey.darken3,
        //   secondary: colors.amber.darken3,
        //   info: colors.teal.lighten1,
        //   warning: colors.amber.base,
        //   error: colors.deepOrange.accent4,
        //   success: colors.green.accent3
        // },
        light: {
          primary: colors.amber.darken3,
          secondary: '#9c27b0',
          accent: '#e91e63',
          error: '#3f51b5',
          warning: '#ff5722',
          info: '#ffc107',
          success: '#4caf50',
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // these are custom paths, where @@ is the root directory, as defined by Nuxt under the hood
      config.resolve.alias['@c'] = '@@/components';
      config.resolve.alias['@l'] = '@@/layouts';
      config.resolve.alias['@p'] = '@@/plugins';
    }
  }
}
