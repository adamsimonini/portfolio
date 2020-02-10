<!-- Applicable when compoent's layout value = the name of this file -->

<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="navOptions.drawer = !navOptions.drawer" />
      <v-btn
        icon
        @click.stop="navOptions.mini = !navOptions.mini"
      >
        <v-icon>mdi-{{ `chevron-${navOptions.mini ? 'left' : 'right'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="this.$t('conferenceTracker')"/>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <NavDrawer :navOptions="navOptions" :right='true'/>
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
    NavDrawer
  },
  data () {
    return {
      locale: '',
      clipped: false,
      fixed: false,
      item: 0,
      // right: true,
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
    }
  }
}
</script>
