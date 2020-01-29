<!-- When the 'layout' key is not specified in a page's export default, then this layout will automatically be used-->

<template>
  <v-app dark>
    <NavDrawer :navOptions="navOptions"/>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="navOptions.drawer = !navOptions.drawer" />
      <v-btn
        icon
        @click.stop="navOptions.mini = !navOptions.mini"
      >
        <v-icon>mdi-{{ `chevron-${navOptions.mini ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavDrawer from '@c/navDrawer.vue';

export default {
  components: {
    NavDrawer,
  },
  data() {
    return {
      locale: '',
      clipped: false,
      fixed: false,
      item: 0,
      navOptions: {
        drawer: true,
        mini: false,
      },
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          path: "/"
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          path: '/inspire'
        },
      ],
      title: "PSD Conference Tracker",
    }
  },
  created() {
    this.locale = this.$i18n.locale;
  },
  methods: {
  },
}
</script>

<style>
.nuxt-link{
  width: 100%;
}
</style>